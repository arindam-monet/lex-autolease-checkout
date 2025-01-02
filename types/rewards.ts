import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const phoneSchema = z.object({
  mobileNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
})

export const otpSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits.",
  }),
})

export type PhoneFormData = z.infer<typeof phoneSchema>
export type OtpFormData = z.infer<typeof otpSchema>

export interface RewardProgram {
  id: string
  name: string
  logo: string
  description: string
  points: number
  value: number
}

