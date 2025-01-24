import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const phoneSchema = z.object({
  mobileNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy"
  })
})

export const otpSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be 6 digits.",
  }),
})

export type PhoneFormData = z.infer<typeof phoneSchema>
export type OtpFormData = z.infer<typeof otpSchema>
