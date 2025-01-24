'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PhoneVerificationDialog } from "../rewards/phone-verification-dialog"
import { useRewardsAuth } from "@/hooks/use-rewards-auth"

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const {
    apiClient,
    handlePhoneVerified,
    setShowPhoneDialog,
    showPhoneDialog,

  } = useRewardsAuth('test');

  const router = useRouter();

  return (
    <div className="relative">
      <nav className="bg-white text-white relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col">
              <Image src={'/images/lex-logo.svg'} alt="Lex autolease" width={150} height={50} />
            </Link>

            {isHomePage ? (
              <>

                {/* Login and Search - Only shown on homepage */}
                <div className="flex items-center space-x-4 text-accent">
                  <Button variant="link" size="default"
                    onClick={() => setShowPhoneDialog(true)}
                  >
                    <Lock className="h-6 w-6 text-secondary" />
                    <span className="text-xl text-secondary ml-1">Login</span>
                  </Button>
                </div>
              </>
            ) : (
              // Contact info - Shown on other pages
              <div className="flex flex-col items-end space-y-1">

              </div>
            )}
          </div>
        </div>

        <PhoneVerificationDialog
          open={showPhoneDialog}
          onClose={() => {
            setShowPhoneDialog(false);
          }}
          onVerified={() => {
            router.push('/fee-payment');
            handlePhoneVerified();
          }}
          apiClient={apiClient}
        />


      </nav>
    </div>
  )
}
