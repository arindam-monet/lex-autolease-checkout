import Link from "next/link"
import { Menu, User, Heart, ShoppingCart, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <div className="sticky top-0 bg-white z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-red-600 p-2 rounded">
              <span className="text-white font-bold">Argos</span>
            </div>
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-600 text-white rounded-full flex items-center justify-center">
                1
              </span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
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
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

