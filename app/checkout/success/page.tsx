'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Receipt, CreditCard, Gift } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import { Navbar } from '@/components/layout/navbar'
import { storage } from '@/lib/storage'

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
  paymentBreakdown: {
    subtotal: number
    rewards: number
    finalAmount: number
  }
}

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderId: 'ORD-2024-001',
    date: '',
    total: 24.50,
    rewardsUsed: 500,
    remainingPoints: 1500,
    product: {
      name: "FINERY Kimmy Dress 22",
      sku: "tue145514061",
      image: "/images/female-dress.webp",
      quantity: 1,
      price: 24.50
    },
    paymentBreakdown: {
      subtotal: 24.50,
      rewards: 5.00,
      finalAmount: 19.50
    }
  })


  useEffect(() => {
    const appliedPoints = Number(storage.get('appliedRewardPoints') || '0')
    const totalPoints = Number(storage.get('totalLloydsPoints') || '0')
    const rewardAmount = Number(storage.get('maxRewardAmount') || '0')
    const percentageApplied = Number(storage.get('rewardPercentage') || '50')

    const actualRewardAmount = (rewardAmount * percentageApplied) / 50
    const actualPointsUsed = Math.round((percentageApplied / 50) * appliedPoints)

    setOrderDetails({
      orderId: 'ORD-2024-001',
      date: new Date().toLocaleDateString(),
      total: 24.50,
      rewardsUsed: actualPointsUsed,
      remainingPoints: totalPoints - actualPointsUsed,
      product: {
        name: "FINERY Kimmy Dress 22",
        sku: "tue145514061",
        image: "/images/female-dress.webp",
        quantity: 1,
        price: 24.50
      },
      paymentBreakdown: {
        subtotal: 24.50,
        rewards: actualRewardAmount,
        finalAmount: 24.50 - actualRewardAmount
      }
    })

    // Clear applied rewards from localStorage after usage
    storage.remove('appliedRewardPoints')
    storage.remove('maxRewardAmount')
  }, [])

  return (
    <>
      <Navbar
        variant="checkout"
        showSearch={false}
      />
      <div className="max-w-3xl mx-auto p-6">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="rounded-full bg-green-100 p-4 inline-block">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Product Details</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Image
                src={orderDetails.product.image}
                alt={orderDetails.product.name}
                width={100}
                height={100}
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{orderDetails.product.name}</h3>
              <p className="text-sm text-gray-500">{orderDetails.product.sku}</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-600">Quantity: </span>
                <span className="font-medium">{orderDetails.product.quantity}</span>
              </div>
              <div className="mt-1 text-sm">
                <span className="text-gray-600">Price: </span>
                <span className="font-medium">{formatCurrency(orderDetails.product.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Order Details</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{orderDetails.date}</span>
            </div>
          </div>
        </div>

        {/* Payment Breakdown Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Payment Breakdown</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(orderDetails.paymentBreakdown.subtotal)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Rewards Applied</span>
              <span>-{formatCurrency(orderDetails.paymentBreakdown.rewards)}</span>
            </div>
            <div className="flex justify-between font-bold pt-3 border-t">
              <span>Final Amount Paid</span>
              <span>{formatCurrency(orderDetails.paymentBreakdown.finalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Rewards Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Lloyds Rewards</h2>
          </div>
          <div className="space-y-3 text-sm">
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

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>

  )
}