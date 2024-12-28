import axios from 'axios';
import { RewardOption } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const verifyPhone = async (phone: string) => {
  const response = await api.post('/auth/verify-phone', { phone });
  return response.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
  const response = await api.post('/auth/verify-otp', { phone, otp });
  return response.data;
};

export const fetchRewardOptions = async (): Promise<RewardOption[]> => {
  const response = await api.get('/rewards/options');
  return response.data;
};

export const applyReward = async (rewardId: string, cartTotal: number) => {
  const response = await api.post('/rewards/apply', { rewardId, cartTotal });
  return response.data;
};