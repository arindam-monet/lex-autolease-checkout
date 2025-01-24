'use client'

import { PaymentOptions } from "@/components/payment-options"
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePayment } from "@/components/providers/payment-provider"
import { PaymentModal } from "@/components/checkout/payment-modal"
import { Button } from "@/components/ui/button";
import { mockFormData } from "@/lib/mock-data";
import { GBPtoLBG, LBGtoGBP, maxApplicablePoints } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RewardsApiClient } from "@/lib/api-client";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const originalTotal = 480

  const { isOpen, closePayment, openPayment } = usePayment()
  const [finalPrice, setFinalPrice] = useState(originalTotal);

  const router = useRouter();
  const apiClient = new RewardsApiClient('apikey');

  const checkoutTotal = Number(mockFormData.feeDue);
  const [rewardPercentage, setRewardPercentage] = useState(100) // Default to max
  const availablePoints = Number(storage.get('totalLloydsPoints')) || 0;

  const [useRewards, setUseRewards] = useState(availablePoints > 0)

  const maxRedeemablePoints = Math.min(
    maxApplicablePoints(checkoutTotal),
    availablePoints
  );
  const actualMaxPoints = Math.min(availablePoints, maxRedeemablePoints);
  const appliedRewardPoints = Number(storage.get('appliedRewardPoints')) || 0


  // Calculate applied points based on percentage of max redeemable
  const appliedPoints = Math.min(
    Math.round((maxRedeemablePoints * rewardPercentage) / 100),
    availablePoints
  );
  const appliedRewardAmount = LBGtoGBP(appliedPoints);


  const handleProceedToPayment = async () => {
    console.log('handle proceed to payment')
    if (finalPrice === 0) {
      // Navigate to payment success



      const redeemPointsRes = await apiClient.redeemPoints({
        "apiKey": "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
        "secretKey": "sk_secret_Qlkfd8dfsdfs23fsdfs2323fsdf3",
        "brandName": "LLOYD",
        "totalPoints": (appliedRewardPoints),
        "consumerId": storage.get('consumerId') || '',
      })

      const txnId = redeemPointsRes.id;
      storage.set('txnId', txnId);

      console.log(redeemPointsRes, 'result')

      router.push('/checkout/success');

      return;
    }

    try {
      const stripe = await stripePromise

      if (!stripe) throw new Error('Stripe failed to load')

      const response = await fetch('/api/checkout/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalPrice,
        }),
      })

      const { sessionId } = await response.json()

      const result = await stripe.redirectToCheckout({
        sessionId,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      openPayment(originalTotal)
    }
  }

  const handlePriceUpdate = (newPrice: number) => {
    setFinalPrice(newPrice)
  }

  useEffect(() => {
    const newPrice = checkoutTotal - appliedRewardAmount
    setFinalPrice(newPrice)
    storage.set('appliedRewardPoints', appliedPoints.toString())


  }, [rewardPercentage])


  return (
    <>

      <div className="card max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="space-y-6">



          <div className="border rounded-lg p-4 border-green-500">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="use-rewards"
                    checked={useRewards}
                    onCheckedChange={(checked) => setUseRewards(checked as boolean)}
                    disabled={!availablePoints}
                  />
                  <div className="flex items-center gap-2">
                    <Image src={'/images/lloyds-icon.svg'} alt="Lloyds Rewards" width={20} height={20} />
                    <Label htmlFor="use-rewards" className="text-lg font-medium">LBG Loyalty Points</Label>
                  </div>
                </div>
                <span className="text-sm text-gray-600">1 LBG Point = 0.1 £</span>
              </div>

              {useRewards && (
                <>
                  <div className="space-y-2">
                    <p className="text-lg text-purple-800 font-semibold">{availablePoints} Points Available (Max redeemable: {maxRedeemablePoints})</p>

                    <div className="relative pt-2">
                      <Slider
                        value={[rewardPercentage]}
                        onValueChange={([value]) => setRewardPercentage(value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>0</span>
                        <span>{actualMaxPoints}</span>
                      </div>
                    </div>

                    <p className="text-green-600 text-lg">
                      Using {appliedPoints} Points (Balance: {availablePoints - appliedPoints} Points)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <PaymentOptions onPriceUpdate={handlePriceUpdate} />
          </div>


          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <h4 className="font-medium mb-2">Price Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Amount Payable (1 item)</span>
                <span>£{checkoutTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col"><span>Reward points</span>

                  <span className="text-xs text-green-600 block mt-1">
                    {(storage.get('appliedRewardPoints'))} points applied
                  </span>

                </div>
                <span>-£{appliedRewardAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>You pay</span>
                <span>£{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              By placing this order you agree to our{" "}
              <button className="text-blue-600">Terms</button> and{" "}
              <button className="text-blue-600">Conditions</button>.
            </p>
          </div>

          {/* proceed to payment button */}
          <div className="flex justify-end">
            <Button
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isOpen}
        onClose={closePayment}
        amount={finalPrice}
      />
    </>
  )
}

