import { StreamResponse } from '@/types/consumer';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const LBGtoGBP = (lbgPoints: number, conversionRate = 0.1): number => {
  return lbgPoints * conversionRate
}

export const maxRewardAmount = (LBGPoints: number, checkoutTotal: number, maxPercentage = 0.9): number => {
  return Math.min(LBGtoGBP(LBGPoints), checkoutTotal * maxPercentage)
}

export const maxApplicablePoints = (checkoutTotal: number, maxPercentage = 0.9): number => {
  return checkoutTotal * 10 * maxPercentage
}

export const GBPtoLBG = (gbpAmount: number, conversionRate = 0.1): number => {
  return Math.round(gbpAmount / conversionRate);
};

export const calculateLloydsPoints = (streamData: StreamResponse[]): number => {
  return streamData
    .filter(data => data.account.brand.parentBrand === 'LLOYD')
    .reduce((total, data) => {
      return total + data.points.reduce((pointsTotal, point) =>
        pointsTotal + parseInt(point.points, 10), 0)
    }, 0)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount)
}

export const formatTransactionId = (id?: string): string => {
  if (!id) return '';
  if (id.length <= 8) return id
  return `${id.slice(0, 4)}...${id.slice(-4)}`
}