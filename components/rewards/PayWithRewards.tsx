"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PhoneVerification } from './PhoneVerification';
import { OtpVerification } from './OtpVerification';
import { RewardOptions } from './RewardOptions';
import { RewardOption } from '@/lib/types';

interface PayWithRewardsProps {
  cartTotal: number;
  onRewardApplied: (savings: number) => void;
}

type Step = 'phone' | 'otp' | 'rewards';

export function PayWithRewards({ cartTotal, onRewardApplied }: PayWithRewardsProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);

  const handlePhoneVerified = (verifiedPhone: string) => {
    setPhone(verifiedPhone);
    setStep('otp');
  };

  const handleOtpVerified = () => {
    setStep('rewards');
  };

  const handleRewardSelected = async (reward: RewardOption) => {
    try {
      await applyReward(reward.id, cartTotal);
      onRewardApplied(reward.savings);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[#0066CC] hover:text-[#0052A3]">View offers</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {step === 'phone' && <PhoneVerification onVerified={handlePhoneVerified} />}
        {step === 'otp' && <OtpVerification phone={phone} onVerified={handleOtpVerified} />}
        {step === 'rewards' && <RewardOptions onSelect={handleRewardSelected} />}
      </DialogContent>
    </Dialog>
  );
}