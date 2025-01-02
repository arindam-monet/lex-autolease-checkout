"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { RewardProgram } from "@/types/rewards"

interface RewardsSelectionDialogProps {
  open: boolean
  onClose: () => void
  rewards: RewardProgram[]
  onSelect: (reward: RewardProgram) => void
}

export function RewardsSelectionDialog({
  open,
  onClose,
  rewards,
  onSelect,
}: RewardsSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reward Points</DialogTitle>
        </DialogHeader>
        <RadioGroup className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`flex items-center space-x-4 rounded-lg border p-4 ${
                reward.points > 0 ? "cursor-pointer hover:bg-accent" : "opacity-50"
              }`}
              onClick={() => reward.points > 0 && onSelect(reward)}
            >
              <RadioGroupItem value={reward.id} disabled={reward.points === 0} />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <img src={reward.logo} alt="" className="h-6 w-6" />
                  <span className="font-medium">{reward.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
                <p className="text-sm font-medium">
                  Save £{reward.value.toFixed(2)} using {reward.points} points
                </p>
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

