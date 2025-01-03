'use client'

import { useRouter } from "next/navigation"
import { PaymentOptions } from "@/components/payment-options"
import { PageContainer } from "@/components/layout/page-container"
import { ProgressIndicator } from "@/components/progress-indicator"
import { Home } from 'lucide-react'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePayment } from "@/components/providers/payment-provider"
import { PaymentModal } from "@/components/checkout/payment-modal"



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter()
  const [finalPrice, setFinalPrice] = useState(24.50)
  const originalTotal = 24.50

  const { isOpen, closePayment } = usePayment()

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
      closePayment()
    }
  }

  const handlePriceUpdate = (newPrice: number) => {
    setFinalPrice(newPrice)
  }


  return (
    <PageContainer
      variant="checkout"
      showSearch={false}
      total={finalPrice}
      onProceed={handleProceedToPayment}
    >
      <ProgressIndicator />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Confirm & pay</h1>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Your order (1 item)</h2>
              <button className="text-blue-600 text-sm">View</button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium">Collection details</h3>
              <p className="text-sm text-gray-600">{`Waterloo Road (Sainsbury's C&C)`}</p>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between">
              <span className="font-medium">Total to pay</span>
              <div className="text-right">
                {finalPrice !== originalTotal && (
                  <span className="text-sm text-gray-500 line-through block">
                    £{originalTotal.toFixed(2)}
                  </span>
                )}
                <span className="font-bold">£{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Billing address</h2>
              <button className="text-blue-600 text-sm">Change</button>
            </div>
            <button className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              What is this for? <span className="text-gray-400">▼</span>
            </button>

            <div className="mt-4 space-y-1">
              <div className="flex gap-2">
                <Home className="h-5 w-5 text-gray-400" />
                <div className="text-sm">
                  <p>Miss Ritika Garud</p>
                  <p className="text-gray-600">372682763 jehfuhskjfbksjd f</p>
                  <p className="text-gray-600">london</p>
                  <p className="text-gray-600">400069</p>
                  <p className="text-gray-600">9702070264</p>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Codes Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <button className="w-full text-left flex justify-between items-center">
              <span className="font-medium">Promo codes, Gift cards & Flexecash</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>

          {/* Nectar Card Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <button className="w-full text-left flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full" />
                  <span className="font-medium">Nectar Card</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Add your Nectar card and collect points</p>
                <p className="text-sm text-gray-600">Collect 24 Nectar points on this order</p>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <PaymentOptions onPriceUpdate={handlePriceUpdate} />
          </div>

          <div className="text-sm text-gray-600">
            <p>
              By placing this order you agree to our{" "}
              <button className="text-blue-600">Terms</button> and{" "}
              <button className="text-blue-600">Conditions</button>.
            </p>
            <p className="mt-1">
              Also learn more about{" "}
              <button className="text-blue-600">data sharing with Monet</button>.
            </p>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={isOpen}
        onClose={closePayment}
        amount={finalPrice}
      />
    </PageContainer >
  )
}

