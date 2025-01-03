"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { StreamResponse } from "@/types/consumer"
import { calculateLloydsPoints } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"
import { useEffect } from "react"
import { storage } from "@/lib/storage"

interface RewardsSelectionDialogProps {
  open: boolean
  onClose: () => void
  streamData: StreamResponse[]
  onSelect: (reward: StreamResponse) => void
  onDialogClose?: () => void
}

export function RewardsSelectionDialog({
  open,
  onClose,
  streamData,
  onSelect,
  onDialogClose
}: RewardsSelectionDialogProps) {

  useEffect(() => {
    if (!open && onDialogClose) {
      onDialogClose()
    }
  }, [open, onDialogClose])

  const totalLloydsPoints = calculateLloydsPoints(streamData);

  useEffect(() => {
    if (!totalLloydsPoints) return;
    storage.set('totalLloydsPoints', totalLloydsPoints.toString());
  }, [totalLloydsPoints])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Available Rewards</DialogTitle>
        </DialogHeader>

        <RadioGroup className="space-y-4">
          <div className="flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-accent"
            onClick={() => onSelect(streamData[0])}>
            <RadioGroupItem value="lloyds" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/lloyds-icon.svg"
                  alt="Lloyds Banking Group"
                  className="h-6 w-6"
                />
                <span className="font-medium">LBG Loyalty Points</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Redeem up to 50% LBG Loyalty Points with this partner
              </p>
              <p className="text-sm font-medium mt-2">
                Available Points: {totalLloydsPoints}
              </p>
            </div>
          </div>

          {[1, 2].map((index) => (
            <div key={index} className="flex items-center space-x-4 rounded-lg border p-4">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </RadioGroup>

        <Button onClick={onClose} className="w-full">
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  )
}
