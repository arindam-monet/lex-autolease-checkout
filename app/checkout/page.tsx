"use client";

import { useState } from 'react';
import { PayWithRewards } from '@/components/rewards/PayWithRewards';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { SAMPLE_PRODUCT } from '@/lib/constants';

export default function CheckoutPage() {
  const [cartTotal, setCartTotal] = useState(24.50);
  const [appliedReward, setAppliedReward] = useState<number | null>(null);

  const handleRewardApplied = (savings: number) => {
    setAppliedReward(savings);
  };

  return (
    <div className="max-w-lg mx-auto pb-24"> {/* Added padding bottom for sticky button */}
      <div className="flex items-center justify-between p-4 border-b">
        <img src="/argos-logo.svg" alt="Argos" className="h-8" />
        <div className="flex items-center text-gray-600">
          <Lock className="w-4 h-4 mr-2" />
          Secure Checkout
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow">
          <img
            src={SAMPLE_PRODUCT.image}
            alt={SAMPLE_PRODUCT.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{SAMPLE_PRODUCT.name}</h3>
            <p className="text-sm text-gray-500">{SAMPLE_PRODUCT.id}</p>
            <div className="mt-2">£{SAMPLE_PRODUCT.price.toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Payment options</h2>
            <RadioGroup defaultValue="rewards">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="rewards" id="rewards" />
                    <label htmlFor="rewards" className="font-medium">
                      Pay With Rewards
                    </label>
                  </div>
                  <PayWithRewards
                    cartTotal={cartTotal}
                    onRewardApplied={handleRewardApplied}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="font-medium">
                      Credit/Debit card
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <img src="/visa.svg" alt="Visa" className="h-6" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="/amex.svg" alt="American Express" className="h-6" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="font-medium">
                      PayPal
                    </label>
                  </div>
                  <img src="/paypal.svg" alt="PayPal" className="h-6" />
                </div>
              </div>
            </RadioGroup>

            <div className="pt-6 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              {appliedReward && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Reward Discount</span>
                  <span>-£{appliedReward.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg">
                <span>Total to pay</span>
                <span>£{(cartTotal - (appliedReward || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-footer">
        <Button className="w-full bg-[#00844F] hover:bg-[#006F42] text-white">
          Proceed to Pay £{(cartTotal - (appliedReward || 0)).toFixed(2)}
        </Button>
      </div>
    </div>
  );
}