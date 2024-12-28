import Link from "next/link"
import { Menu, User, Heart, ShoppingCart, Search, Lock } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavbarProps {
  variant?: 'default' | 'checkout'
  cartCount?: number
  showSearch?: boolean
  className?: string
}

export function Navbar({
  variant = 'default',
  cartCount = 0,
  showSearch = true,
  className
}: NavbarProps) {
  return (
    <div className={cn(
      "sticky top-0 bg-white z-50 border-b w-full",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-red-600 p-2 rounded">
              <span className="text-white font-bold">Argos</span>
            </div>
          </Link>

          {variant === 'checkout' ? (
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600">Secure Checkout</span>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative" aria-label={`Cart with ${cartCount} items`}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="py-2 pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products or brands"
                className="w-full pl-4 pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
