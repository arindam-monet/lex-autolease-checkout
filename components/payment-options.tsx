
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface PaymentOptionsProps {
  onPriceUpdate: (price: number) => void;
}

export function PaymentOptions({ onPriceUpdate }: PaymentOptionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Payment options</h2>

      <div className="space-y-4">


        <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            {/* <RadioGroupItem value="card" id="card" /> */}
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

        {/* <div className="flex items-center justify-between space-x-2 border rounded-lg p-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-48 ml-6" />
            </div>
            <Skeleton className="w-16 h-6" />
          </div> */}
      </div>

    </div>
  )
}
