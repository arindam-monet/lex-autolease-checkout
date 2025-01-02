import { StreamResponse } from '@/types/consumer';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateLloydsPoints = (streamData: StreamResponse[]): number => {
  return streamData
    .filter(data => data.account.brand.parentBrand === 'LLOYD')
    .reduce((total, data) => {
      return total + data.points.reduce((pointsTotal, point) =>
        pointsTotal + parseInt(point.points, 10), 0)
    }, 0)
}