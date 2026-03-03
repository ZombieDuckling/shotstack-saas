'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionTier, formatPrice } from '@/lib/billing/subscription';

type BillingPeriod = 'monthly' | 'yearly';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [loadingTier, setLoadingTier] = useState<SubscriptionTier | null>(null);

  const handleSubscribe = async (tier: SubscriptionTier) => {
    setLoadingTier(tier);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tier, 
          billingPeriod,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that&apos;s right for you
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-green-600 font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const price = billingPeriod === 'monthly' 
              ? plan.priceMonthly 
              : plan.priceYearly / 12;
            const isPopular = plan.tier === 'pro';

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border ${
                  isPopular 
                    ? 'border-blue-500 shadow-xl' 
                    : 'border-gray-200 shadow-sm'
                } bg-white overflow-hidden`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </p>
                  {billingPeriod === 'yearly' && plan.priceYearly > 0 && (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatPrice(plan.priceYearly)} billed yearly
                    </p>
                  )}

                  <button
                    onClick={() => handleSubscribe(plan.tier)}
                    disabled={loadingTier === plan.tier || plan.tier === 'free'}
                    className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                      isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loadingTier === plan.tier 
                      ? 'Processing...' 
                      : plan.tier === 'free' 
                        ? 'Current Plan' 
                        : 'Get Started'
                    }
                  </button>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="ml-3 text-sm text-gray-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
