"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { phoneSchema, otpSchema, PhoneFormData, OtpFormData } from "@/types/rewards"
import { RewardsApiClient } from "@/lib/api-client"
import { PhoneInput } from "@/components/ui/phone-input"
import { parsePhoneNumber } from "react-phone-number-input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { storage } from "@/lib/storage"
import Image from "next/image"

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

  const handleLoginSubmit = (mobileNumber: string) => {
    setPhoneNumber(mobileNumber);
    const countryCode = parsePhoneNumber(mobileNumber)?.countryCallingCode;
    const nationalNumber = parsePhoneNumber(mobileNumber)?.nationalNumber;
    const formattedCountryCode = `+${countryCode}`;

    setMobileNumber(String(nationalNumber));
    setCountryCode(formattedCountryCode);

    apiClient.requestOtp({
      mobileNumber: String(nationalNumber),
      countryCode: formattedCountryCode,
    }).then((response) => {
      setRequestId(response.requestId);
      setStep("otp");
    });
  };

  const handleOtpSubmit = async (otp: string) => {
    try {
      const result = await apiClient.verifyOtp({
        requestId,
        otp,
        countryCode,
        mobileNumber,
      });

      if (result.tokens) {
        storage.set('accessToken', result.tokens.access.token);
        storage.set('refreshToken', result.tokens.refresh.token);
        onVerified(phoneNumber);
        setStep('phone');
        onClose();
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {
      setStep("phone");
      phoneForm.reset();
      otpForm.reset();
      onClose();
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-2 mx-auto">
            <Image src="/images/monetlogo.svg" alt="Monet Rewards" width={100} height={100} />

            <h4 className="font-bold text-xl">Monet Rewards</h4>
            <p className="text-sm text-gray-500">Redeem your points on every purchase and Save Monet</p>
          </div>
          <div>

          </div>
        </DialogHeader>
        <div className="">
        {step === "phone" ? (
          <PhoneForm onSubmit={handleLoginSubmit} />
        ) : (
          <OtpForm onSubmit={handleOtpSubmit} />
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


interface LoginFormProps {
  onSubmit: (mobileNumber: string) => void;
}

export function PhoneForm({ onSubmit }: LoginFormProps) {
  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  return (
    <Form {...form}>

      <h3 className="mx-auto font-semibold py-2">Enter your phone number</h3>

      <form onSubmit={form.handleSubmit((data) => onSubmit(data.mobileNumber))}
        className="space-y-4 mx-auto">
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  className="text-sm lg:text-lg"
                  placeholder="Enter your phone number"
                  {...field}
                  defaultCountry="IN"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send OTP
        </Button>
      </form>
    </Form>
  );
}


interface OtpFormProps {
  onSubmit: (otp: string) => void;
}

export function OtpForm({ onSubmit }: OtpFormProps) {
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  return (
    <Form {...form}>

      <h3 className="mx-auto font-semibold py-2">Enter OTP</h3>

      <form onSubmit={form.handleSubmit((data) => onSubmit(data.otp))}
        className="space-y-4 mx-auto">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                >
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
          Verify OTP
        </Button>
      </form>
    </Form>
  );
}