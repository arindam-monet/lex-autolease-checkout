"use client"

import { useEffect, useState } from "react"
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
import { Label } from "../ui/label"
import Link from "next/link"
import { Checkbox } from "../ui/checkbox"

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
  const [dialogTitle, setDialogTitle] = useState("Login to Lex Autolease");

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


  useEffect(() => {
    if (step === "phone") {
      setDialogTitle("Login to Lex Autolease");
    } else {
      setDialogTitle("Verify your phone number");
    }
  }, [step])

  return (
    <Dialog open={open} onOpenChange={() => {
      setStep("phone");
      phoneForm.reset();
      otpForm.reset();
      onClose();
    }}>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
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
      <form onSubmit={form.handleSubmit((data) => onSubmit(data.mobileNumber))}
        className="space-y-4 mx-auto">
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
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

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
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

      <form onSubmit={form.handleSubmit((data) => onSubmit(data.otp))}
        className="space-y-4 w-full max-w-md mx-auto">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                >
                  <InputOTPGroup className="flex justify-center gap-2 sm:gap-4">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-600 rounded-md"
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