'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PhoneVerificationDialog } from "../rewards/phone-verification-dialog"
import { useState } from "react"
import { StreamResponse } from "@/types/consumer"
import { RewardsApiClient } from "@/lib/api-client"
import { useRewardsAuth } from "@/hooks/use-rewards-auth"

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const {
    apiClient,
    handlePhoneVerified,
    isVerified,
    streamData,
    setShowPhoneDialog,
    setShowRewardsDialog,
    setStreamData,
    showPhoneDialog,
    showRewardsDialog

  } = useRewardsAuth('test');

  const router = useRouter();

  return (
    <div className="relative">
      <nav className="bg-primary text-white relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col">
              <Image src={'/images/cavendish-logo.svg'} alt="Cavendish Online" width={130} height={50} />
            </Link>

            {isHomePage ? (
              <>
                {/* Navigation Links - Only shown on homepage */}
                <div className="hidden lg:flex items-center space-x-8 text-sm">
                  <Link href="/" className="text-white hover:text-gray-200">HOME</Link>
                  <Link href="/services" className="text-white hover:text-gray-200">OUR SERVICES</Link>
                  <Link href="/life-insurance" className="text-white hover:text-gray-200">LIFE INSURANCE</Link>
                  <Link href="/income-protection" className="text-white hover:text-gray-200">INCOME PROTECTION</Link>
                  <Link href="/about" className="text-white hover:text-gray-200">ABOUT US</Link>
                  <Link href="/news" className="text-white hover:text-gray-200">LATEST NEWS</Link>
                  <Link href="/contact" className="text-white hover:text-gray-200">CONTACT US</Link>
                </div>

                {/* Login and Search - Only shown on homepage */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon"
                    onClick={() => setShowPhoneDialog(true)}
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </>
            ) : (
              // Contact info - Shown on other pages
              <div className="flex flex-col items-end space-y-1">
                <p className="text-lg">Unsure of your options?</p>
                <p className="text-xl font-medium">Speak to an expert</p>
                <a href="tel:01392455584" className="text-2xl font-bold hover:text-gray-200 transition-colors">
                  01392 455 584
                </a>
              </div>
            )}
          </div>
        </div>

        <PhoneVerificationDialog
          open={showPhoneDialog}
          onClose={() => {
            setShowPhoneDialog(false);
            router.push('/fee-payment');
          }
          }
          onVerified={handlePhoneVerified}
          apiClient={apiClient}
        />


      </nav>
    </div>
  )
}
