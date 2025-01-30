'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Receipt, CreditCard, Gift } from 'lucide-react'
import { formatCurrency, formatTransactionId, LBGtoGBP } from '@/lib/utils'
import Image from 'next/image'
import { storage } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { mockFormData } from '@/lib/mock-data'

interface ProductDetails {
  name: string
  sku: string
  image: string
  quantity: number
  price: number
}

interface OrderDetails {
  orderId: string
  date: string
  total: number
  rewardsUsed: number
  remainingPoints: number
  product: ProductDetails
  transactionId?: string
  paymentBreakdown: {
    subtotal: number
    rewards: number
    finalAmount: number
  }
}

export default function SuccessPage() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderId: 'ORD-2024-001',
    date: '',
    total: 0,
    rewardsUsed: 500,
    remainingPoints: 1500,
    transactionId: '',
    product: {
      name: "FINERY Kimmy Dress 22",
      sku: "tue145514061",
      image: "/images/female-dress.webp",
      quantity: 1,
      price: 24.50
    },
    paymentBreakdown: {
      subtotal: 0,
      rewards: 0,
      finalAmount: 0
    }
  })

  const appliedRewardPoints = Number(storage.get('appliedRewardPoints')) || 0
  const appliedRewardAmount = Number(storage.get('appliedRewardAmount')) || 0
  const transactionId = storage.get('txnId') || ''

  useEffect(() => {
    const totalPoints = Number(storage.get('totalLloydsPoints') || '0')

    setOrderDetails({
      orderId: 'ORD-2024-001',
      date: new Date().toLocaleDateString(),
      total: Number(mockFormData.feeDue),
      rewardsUsed: appliedRewardPoints,
      remainingPoints: totalPoints - appliedRewardPoints,
      transactionId: transactionId,
      product: {
        name: "FINERY Kimmy Dress 22",
        sku: "tue145514061",
        image: "/images/female-dress.webp",
        quantity: 1,
        price: 24.50
      },
      paymentBreakdown: {
        subtotal: Number(mockFormData.feeDue),
        rewards: LBGtoGBP(appliedRewardPoints),
        finalAmount: Number(mockFormData.feeDue) - LBGtoGBP(appliedRewardPoints)
      }
    })
  }, [])

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="rounded-full bg-green-100 p-4 inline-block">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600">A copy of your order confirmation has been mailed to haedarah.ali@monet.work</p>
        </div>



        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Order Details</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Reference</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{orderDetails.date}</span>
            </div>
          </div>
        </div>

        {/* Payment and Rewards Consolidated Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Payment Breakdown */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Payment Details</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(orderDetails.paymentBreakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Rewards Applied (LBG Rewards)</span>
                <span>-{formatCurrency(orderDetails.paymentBreakdown.rewards)}</span>
              </div>
              <div className="flex justify-between font-bold pt-3 border-t">
                <span>Final Amount Paid</span>
                <span>{formatCurrency(orderDetails.paymentBreakdown.finalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Lloyds Rewards */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src={'/images/lloyds-icon.svg'} alt="Lloyds Rewards" width={20} height={20} />
              <h2 className="text-lg font-semibold">LBG Reward Details</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{formatTransactionId(orderDetails.transactionId)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Points Used</span>
                <span className="font-medium">{orderDetails.rewardsUsed} LBG points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining Balance</span>
                <span className="font-medium">{orderDetails.remainingPoints} LBG points</span>
              </div>
            </div>
          </div>


        </div>
        {/* Action Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => router.push('/')}

          >
            Get another quote
          </Button>
        </div>
      </div>
    </>
  )
}