import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function PaymentOptions() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Payment options</h2>
      <RadioGroup defaultValue="rewards">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rewards" id="rewards" />
              <Label htmlFor="rewards">Pay With Rewards</Label>
            </div>
            <button className="text-blue-600 text-sm">View offers</button>
          </div>

          <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit card</Label>
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
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <p className="text-sm text-gray-600 ml-6">Pay now or in 3 interest-free payments</p>
            </div>
            <div className="w-16 h-6 relative">
              <Image
                src="/images/paypal.svg"
                alt="PayPal"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
