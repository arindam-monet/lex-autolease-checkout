"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

interface PhoneVerificationProps {
  onVerified: (phone: string) => void;
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: { phone: string }) => {
    setIsLoading(true);
    try {
      // await verifyPhone(data.phone);
      onVerified(data.phone);
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter mobile number"
                  {...field}
                  type="tel"
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}