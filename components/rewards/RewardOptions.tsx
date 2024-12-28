"use client";

import { useQuery } from '@tanstack/react-query';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { fetchRewardOptions } from '@/lib/api';
import { RewardOption } from '@/lib/types';
import Image from 'next/image';

interface RewardOptionsProps {
  onSelect: (reward: RewardOption) => void;
}

export function RewardOptions({ onSelect }: RewardOptionsProps) {
  const { data: rewards, isLoading } = useQuery({
    queryKey: ['rewardOptions'],
    queryFn: fetchRewardOptions,
  });

  if (isLoading) {
    return <div>Loading rewards...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reward Points</h2>
      <RadioGroup className="space-y-4">
        {rewards?.map((reward) => (
          <div
            key={reward.id}
            className="flex items-center space-x-4 p-4 rounded-lg border hover:border-[#00844F] cursor-pointer"
            onClick={() => onSelect(reward)}
          >
            <RadioGroupItem value={reward.id} id={reward.id} />
            <Image
              src={reward.logo}
              alt={reward.provider}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-semibold">{reward.provider}</div>
              <div className="text-sm text-gray-500">{reward.description}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Save £{reward.savings.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{reward.points} points</div>
            </div>
          </div>
        ))}
      </RadioGroup>
      <Button className="w-full bg-[#00844F] hover:bg-[#006F42]">Continue</Button>
    </div>
  );
}