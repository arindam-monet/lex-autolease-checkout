"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { phoneSchema, otpSchema, PhoneFormData, OtpFormData } from "@/types/rewards"
import { RewardsApiClient } from "@/lib/api-client"
import { PhoneInput } from "@/components/ui/phone-input"
import { parsePhoneNumber } from "react-phone-number-input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

interface PhoneVerificationDialogProps {
  open: boolean
  onClose: () => void
  onVerified: (phoneNumber: string) => void
  apiClient: RewardsApiClient
}

export function PhoneVerificationDialog({
  open,
  onClose,
  onVerified,
  apiClient,
}: PhoneVerificationDialogProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [requestId, setRequestId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  })

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  })

  const handleLogin = (mobileNumber: string) => {
    const countryCode = parsePhoneNumber(mobileNumber)?.countryCallingCode;
    const nationalNumber = parsePhoneNumber(mobileNumber)?.nationalNumber;
    const formattedCountryCode = `+${countryCode}`;

    setMobileNumber(String(nationalNumber));
    setCountryCode(formattedCountryCode);

    const loginPayload = {
      mobileNumber: String(nationalNumber),
      countryCode: formattedCountryCode,
    };

    apiClient.requestOtp(loginPayload).then((response) => {
      setRequestId(response.requestId);
      setStep("otp");
    });
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    try {
      const result = await apiClient.verifyOtp({
        requestId: requestId,
        otp: data.otp,
        countryCode: countryCode,
        mobileNumber: mobileNumber,
      });

      if (result.tokens) {
        onVerified(phoneNumber);
        //temp fix.. need to update this
        localStorage.setItem('accessToken', result.tokens.access.token);
        localStorage.setItem('refreshToken', result.tokens.refresh.token);
        setStep('phone');
        otpForm.reset();
      } else {
        console.error("Failed to verify OTP:");
      }


    } catch (error) {
      console.error("Failed to verify OTP:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => {
      setStep("phone");
      phoneForm.reset();
      otpForm.reset();
      onClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === "phone" ? "Enter your phone number" : "Enter verification code"}
          </DialogTitle>
        </DialogHeader>
        {step === "phone" ? (
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit((data) => {
              handleLogin(data.mobileNumber);
            }
            )} className="space-y-4 mx-auto">
              <FormField
                control={phoneForm.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Mobile Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className=" sm:text-lg"
                        placeholder="Enter your mobile number"
                        {...field}
                        defaultCountry="IN"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Send Code
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 mx-auto">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} className="w-full">
                        <InputOTPGroup className="flex gap-4">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-12 h-12 text-center border-2 border-gray-600 rounded-md"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}

