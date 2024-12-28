import { cn } from "@/lib/utils"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

interface PageContainerProps {
  children: React.ReactNode
  variant?: 'cart' | 'checkout'
  cartCount?: number
  showSearch?: boolean
  total?: number
  onProceed?: () => void
  className?: string
}

export function PageContainer({
  children,
  variant = 'cart',
  cartCount,
  showSearch,
  total,
  onProceed,
  className
}: PageContainerProps) {
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      variant === 'checkout' && "bg-gray-50",
      className
    )}>
      <Navbar 
        variant={variant === 'checkout' ? 'checkout' : 'default'}
        cartCount={cartCount}
        showSearch={showSearch}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      
      <Footer 
        variant={variant}
        total={total}
        onProceed={onProceed}
      />
    </div>
  )
}

