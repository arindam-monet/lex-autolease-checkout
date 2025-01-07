'use client'

import { useRouter } from "next/navigation"
import { PaymentOptions } from "@/components/payment-options"
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePayment } from "@/components/providers/payment-provider"
import { PaymentModal } from "@/components/checkout/payment-modal"
import { Button } from "@/components/ui/button";
import { mockFormData } from "@/lib/mock-data";
import { calculateLloydsPoints, GBPtoLBG, LBGtoGBP } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const originalTotal = 200

  const { isOpen, closePayment, openPayment } = usePayment()
  const [finalPrice, setFinalPrice] = useState(originalTotal);

  const checkoutTotal = Number(mockFormData.feeDue);
  const [rewardPercentage, setRewardPercentage] = useState(50) // Default to max
  const availablePoints = Number(storage.get('totalLloydsPoints')) || 0;

  const maxReward = Math.min(LBGtoGBP(availablePoints), checkoutTotal * 0.5);
  const appliedRewardAmount = (maxReward * rewardPercentage) / 50 // Since max percentage is 50%


  const handleProceedToPayment = async () => {
    console.log('handle proceed to payment')
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
    storage.set('appliedRewardPoints', GBPtoLBG(Number(appliedRewardAmount)).toString())
    storage.set('appliedRewardAmount', appliedRewardAmount.toString())
  }, [rewardPercentage, appliedRewardAmount])


  return (
    <>

      <div className="card max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="space-y-6">



          <div className="border rounded-lg p-4 border-green-500">

            <div className="space-y-4">
              <div className="rounded-md">
                <h3 className="font-medium">LBG Loyalty Points</h3>
                <p className="text-sm text-gray-600">
                  Points available: <span className="font-semibold">{storage.get('totalLloydsPoints')}</span>
                </p>
                <p className="text-sm text-blue-600">
                  Points available for redemption: <span className="font-semibold">{storage.get('appliedRewardPoints')}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label>Select reward amount</Label>
                <Slider
                  value={[rewardPercentage]}
                  onValueChange={([value]) => setRewardPercentage(value)}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
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

