'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  // useEffect(() => {
  //   if (!sessionId) {
  //     router.push('/checkout')
  //   }
  // }, [sessionId, router])

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="rounded-full bg-green-100 p-4 inline-block">
          <Check className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been received.
      </p>
      
      <button 
        onClick={() => router.push('/')}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  )
}