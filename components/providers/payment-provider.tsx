import { createContext, useContext, useState } from 'react'

interface PaymentContextType {
  isOpen: boolean
  amount: number | null
  openPayment: (amount: number) => void
  closePayment: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState<number | null>(null)

  const openPayment = (amount: number) => {
    setAmount(amount)
    setIsOpen(true)
  }

  const closePayment = () => {
    setIsOpen(false)
    setAmount(null)
  }

  return (
    <PaymentContext.Provider value={{ isOpen, amount, openPayment, closePayment }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if (!context) throw new Error('usePayment must be used within PaymentProvider')
  return context
}