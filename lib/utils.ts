import { StreamResponse } from '@/types/consumer';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const LBGtoGBP = (lbgPoints: number, conversionRate = 0.1): number => {
  return lbgPoints * conversionRate
}

export const maxRewardAmount = (LBGPoints: number, checkoutTotal: number, maxPercentage = 0.5): number => {
  return Math.min(LBGtoGBP(LBGPoints), checkoutTotal * maxPercentage)
}

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