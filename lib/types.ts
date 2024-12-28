import { z } from 'zod';

export const phoneNumberSchema = z.string().regex(/^[0-9]{10}$/, 'Invalid phone number');
export const otpSchema = z.string().length(6, 'OTP must be 6 digits');

export const rewardOptionSchema = z.object({
  id: z.string(),
  provider: z.string(),
  logo: z.string(),
  description: z.string(),
  points: z.number(),
  savings: z.number(),
});

export type RewardOption = z.infer<typeof rewardOptionSchema>;

export const cartSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string(),
  })),
  total: z.number(),
});

export type Cart = z.infer<typeof cartSchema>;