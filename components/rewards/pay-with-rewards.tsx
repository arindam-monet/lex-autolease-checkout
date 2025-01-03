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
import { calculateLloydsPoints } from "@/lib/utils"
import { storage } from "@/lib/storage"

interface PayWithRewardsProps {
  apiKey: string
  amount: number
  onRewardSelect: (reward: StreamResponse) => void
  showPhoneDialog: boolean
  onShowPhoneDialog: (show: boolean) => void
  className?: string
  asChild?: boolean
  children?: React.ReactNode
  
}

export function PayWithRewards({
  apiKey,
  amount,
  onRewardSelect,
  showPhoneDialog,
  onShowPhoneDialog,
  className = "",
  asChild,
  children
}: PayWithRewardsProps) {
  const [showRewardsDialog, setShowRewardsDialog] = useState(false)
  const [streamData, setStreamData] = useState<StreamResponse[]>([])
  const [selectedReward, setSelectedReward] = useState<StreamResponse | null>(null)
  const apiClient = new RewardsApiClient(apiKey)
  const handlePhoneVerified = async () => {
    try {
      const dashboardData = await apiClient.getConsumerDashboardData();
      storage.set("consumerId", dashboardData.session.consumerId);
      setStreamData([]);

      const cleanup = apiClient.subscribeToRewardsStream(
        dashboardData.session.sessionId,
        dashboardData.session.consumerId,
        (data) => {
          setStreamData(prev => {
            if (prev.find(item => item.account.id === data.account.id)) {
              return prev;
            }
            return [...prev, data];
          });
        }
      );

      onShowPhoneDialog(false)
      setShowRewardsDialog(true)
      return () => {
        cleanup();
        setStreamData([]);
      };
    } catch (error) {
      console.error("Failed to fetch rewards:", error)
    }
  }

  const handleRewardSelect = (reward: StreamResponse) => {
    setSelectedReward(reward)
    setShowRewardsDialog(false)
    onRewardSelect(reward)
  }

  return (
    <div className={className}>
      {children}

      <PhoneVerificationDialog
        open={showPhoneDialog}
        onClose={() => onShowPhoneDialog(false)}
        onVerified={handlePhoneVerified}
        apiClient={apiClient}
      />

      <RewardsSelectionDialog
        open={showRewardsDialog}
        onClose={() => setShowRewardsDialog(false)}
        streamData={streamData}
        onSelect={handleRewardSelect}
        onDialogClose={() => setStreamData([])}
      />
    </div>
  )
}

