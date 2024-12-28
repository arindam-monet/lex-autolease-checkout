import { cn } from "@/lib/utils"

interface FooterProps {
  variant?: 'cart' | 'checkout'
  total?: number
  onProceed?: () => void
  className?: string
}

export function Footer({
  variant = 'cart',
  total = 0,
  onProceed,
  className
}: FooterProps) {
  return (
    <footer className={cn(
      "sticky bottom-0 w-full bg-white border-t p-4",
      className
    )}>
      <button 
        onClick={onProceed}
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-6 font-medium transition-colors"
      >
        {variant === 'cart' ? (
          'Proceed to Checkout'
        ) : (
          `Proceed to Pay ${total ? `£${total.toFixed(2)}` : ''}`
        )}
      </button>
    </footer>
  )
}
