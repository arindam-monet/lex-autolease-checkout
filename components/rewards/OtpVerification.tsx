"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

interface OtpVerificationProps {
  phone: string;
  onVerified: () => void;
}

export function OtpVerification({ phone, onVerified }: OtpVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: { otp: string }) => {
    setIsLoading(true);
    try {
      // await verifyOtp(phone, data.otp);
      onVerified();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
}