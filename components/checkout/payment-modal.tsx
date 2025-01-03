'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react'
import { PaymentForm } from './payment-form'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function createPaymentIntent() {
      if (!isOpen) return
      setLoading(true)
      
      try {
        const response = await fetch('/api/checkout/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error('Payment failed:', error)
        onClose()
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [isOpen, amount, onClose])

  const handlePaymentSuccess = () => {
    router.push('/checkout/success')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm amount={amount} onSuccess={handlePaymentSuccess} />
          </Elements>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}