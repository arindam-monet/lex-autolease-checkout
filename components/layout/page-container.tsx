import { cn } from "@/lib/utils"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { usePayment } from "@/components/providers/payment-provider"

interface PageContainerProps {
  children: React.ReactNode
  variant?: 'cart' | 'checkout'
  cartCount?: number
  showSearch?: boolean
  total?: number
  onProceed?: () => void
  className?: string
  processing?: boolean
}

export function PageContainer({
  children,
  variant = 'cart',
  cartCount,
  showSearch,
  total,
  onProceed,
  className,
  processing
}: PageContainerProps) {

  const { openPayment } = usePayment()

  const handleProceed = async () => {
    if (variant === 'checkout' && total) {
      openPayment(total)
    } else if (onProceed) {
      onProceed()
    }
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      variant === 'checkout' && "bg-gray-50",
      className
    )}>
      <Navbar

      />

      <main className="flex-1 container mx-auto px-2 py-6 pb-24">
        {children}
      </main>

      <Footer

      />
    </div>
  )
}

