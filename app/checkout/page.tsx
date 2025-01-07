'use client'

import { useRouter } from "next/navigation"
import { PaymentOptions } from "@/components/payment-options"
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePayment } from "@/components/providers/payment-provider"
import { PaymentModal } from "@/components/checkout/payment-modal"
import { Button } from "@/components/ui/button";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [finalPrice, setFinalPrice] = useState(200)
  const originalTotal = 200

  const { isOpen, closePayment, openPayment } = usePayment()

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


  return (
    <>

      <div className="card max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="space-y-6">

          {/* Payment Options */}
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <PaymentOptions onPriceUpdate={handlePriceUpdate} />
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

