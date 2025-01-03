import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PayWithRewards } from "./rewards/pay-with-rewards"
import { useState, useEffect } from 'react'
import { StreamResponse } from '@/types/consumer'
import { calculateLloydsPoints, GBPtoLBG, LBGtoGBP, maxRewardAmount } from "@/lib/utils"
import { Slider } from "./ui/slider"
import { Skeleton } from "./ui/skeleton"
import { storage } from "@/lib/storage"
import Image from "next/image"

interface PaymentOptionsProps {
  onPriceUpdate: (price: number) => void;
}

export function PaymentOptions({ onPriceUpdate }: PaymentOptionsProps) {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false)
  const [appliedReward, setAppliedReward] = useState<StreamResponse | null>(null)
  const checkoutTotal = 24.50;
  const [rewardPercentage, setRewardPercentage] = useState(50) // Default to max

  const handleRewardSelect = (reward: StreamResponse) => {
    setAppliedReward(reward)
    const totalPoints = calculateLloydsPoints([reward])
    const maxAllowed = Math.min(LBGtoGBP(totalPoints), checkoutTotal * 0.5)
    console.log("Reward selected:", totalPoints, maxAllowed)
    console.log(`Max reward available: £${maxAllowed.toFixed(2)}`)
  }

  const availablePoints = appliedReward ? calculateLloydsPoints([appliedReward]) : 0
  const maxReward = appliedReward ? Math.min(LBGtoGBP(availablePoints), checkoutTotal * 0.5) : 0
  const appliedRewardAmount = (maxReward * rewardPercentage) / 50 // Since max percentage is 50%
  const finalPrice = checkoutTotal - appliedRewardAmount

  useEffect(() => {
    onPriceUpdate(finalPrice)
  }, [finalPrice, onPriceUpdate])

  useEffect(() => {
    console.log(appliedRewardAmount, 'appliedReward')
    storage.set('appliedRewardPoints', GBPtoLBG(Number(appliedRewardAmount)).toString())
    storage.set('appliedRewardAmount', appliedRewardAmount.toString())
  }, [rewardPercentage, appliedRewardAmount])

  const handleViewOffers = () => {
    setShowPhoneDialog(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payment options</h2>
      <RadioGroup defaultValue={"rewards"}>
        <div className="space-y-4">
          <PayWithRewards
            apiKey="your_api_key_here"
            amount={checkoutTotal}
            onRewardSelect={handleRewardSelect}
            showPhoneDialog={showPhoneDialog}
            onShowPhoneDialog={setShowPhoneDialog}
          >
            <div className="border rounded-lg p-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rewards" id="rewards" defaultChecked />
                    <Label htmlFor="rewards" className="text-sm">Pay With Rewards</Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    Powered by <span className="font-semibold">Monet</span>
                  </p>
                </div>
                <button
                  onClick={handleViewOffers}
                  className="text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  View offers {appliedReward && "(1 applied)"}
                </button>
              </div>

              {appliedReward && (
                <div className="space-y-4 ml-6">
                  <div className="bg-yellow-50 p-2 rounded-md">
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
                    {/* <div className="flex justify-between text-sm text-gray-600 w-full">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div> */}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md space-y-2">
                    <h4 className="font-medium mb-2">Price Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bag Item (1 item)</span>
                        <span>£{checkoutTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex flex-col"><span>Reward points</span>
                          {appliedReward && (
                            <span className="text-xs text-green-600 block mt-1">
                              {(storage.get('appliedRewardPoints'))} points applied
                            </span>
                          )}
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
                </div>
              )}
            </div>
          </PayWithRewards>

          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="text-sm">Credit/Debit card</Label>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-6 relative">
                <Image
                  src="/images/visa.svg"
                  alt="Visa"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-10 h-6 relative">
                <Image
                  src="/images/mastercard.svg"
                  alt="Mastercard"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-10 h-6 relative">
                <Image
                  src="/images/amex.svg"
                  alt="American Express"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-48 ml-6" />
            </div>
            <Skeleton className="w-16 h-6" />
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
