"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhoneVerificationDialog } from "@/components/rewards/phone-verification-dialog"
import { RewardsSelectionDialog } from "@/components/rewards/rewards-selection-dialog"
import { RewardsApiClient } from "@/lib/api-client"
import { Slot } from "@/components/ui/slot"
import { BrandAccount } from "@/types/brand"
import { StreamResponse } from "@/types/consumer"

interface PayWithRewardsProps {
  apiKey: string
  amount: number
  onRewardSelect: (reward: StreamResponse) => void
  className?: string
  asChild?: boolean // Add this prop
  children?: React.ReactNode // Add this prop
}

export function PayWithRewards({
  apiKey,
  amount,
  onRewardSelect,
  className = "",
  asChild,
  children
}: PayWithRewardsProps) {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false)
  const [showRewardsDialog, setShowRewardsDialog] = useState(false)
  const [rewards, setRewards] = useState<BrandAccount[]>([])
  const [selectedReward, setSelectedReward] = useState<BrandAccount | null>(null)
  const [streamData, setStreamData] = useState<StreamResponse[]>([])
  const apiClient = new RewardsApiClient(apiKey)

  const Trigger = asChild ? Slot : "div"

  const handlePhoneVerified = async () => {
    try {
      const dashboardData = await apiClient.getConsumerDashboardData();

      const cleanup = apiClient.subscribeToRewardsStream(
        dashboardData.session.sessionId,
        dashboardData.session.consumerId,
        (data) => {
          setStreamData(prev => [...prev, data])
        }
      )

      setShowPhoneDialog(false)
      setShowRewardsDialog(true)
      return cleanup
    } catch (error) {
      console.error("Failed to fetch rewards:", error)
    }
  }

  return (
    <div className={className}>
      <Trigger onClick={() => setShowPhoneDialog(true)}>
        {children || (
          <RadioGroup value={selectedReward ? "rewards" : undefined}>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <RadioGroupItem value="rewards" id="rewards" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pay With Rewards</span>
                  <Button variant="link">View offers</Button>
                </div>
                {selectedReward && (
                  <p className="text-sm text-muted-foreground">
                    Save x amount
                    {/* Save £{selectedReward.value.toFixed(2)} using {selectedReward.points} {selectedReward.name} */}
                  </p>
                )}
              </div>
            </div>
          </RadioGroup>
        )}
      </Trigger>

      <PhoneVerificationDialog
        open={showPhoneDialog}
        onClose={() => setShowPhoneDialog(false)}
        onVerified={handlePhoneVerified}
        apiClient={apiClient}
      />

      <RewardsSelectionDialog
        open={showRewardsDialog}
        onClose={() => setShowRewardsDialog(false)}
        streamData={streamData}
        onSelect={(reward) => {
          console.log(reward, 'reward')
        }}
      />
    </div>
  )
}

