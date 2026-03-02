export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

export type SubscriptionStatus = 
  | 'active' 
  | 'canceled' 
  | 'incomplete' 
  | 'incomplete_expired' 
  | 'past_due' 
  | 'trialing' 
  | 'unpaid';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  features: string[];
  limits: {
    videosPerMonth?: number;
    storageGb?: number;
    teamMembers?: number;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  description: string;
  invoiceDate: Date;
  paidDate?: Date;
  stripeInvoiceId?: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      '5 videos per month',
      '720p rendering',
      'Basic templates',
      'Community support',
    ],
    limits: {
      videosPerMonth: 5,
      storageGb: 1,
      teamMembers: 1,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    tier: 'starter',
    priceMonthly: 19,
    priceYearly: 190,
    stripePriceIdMonthly: 'price_starter_monthly',
    stripePriceIdYearly: 'price_starter_yearly',
    features: [
      '25 videos per month',
      '1080p rendering',
      'All templates',
      'Email support',
      '5GB storage',
    ],
    limits: {
      videosPerMonth: 25,
      storageGb: 5,
      teamMembers: 2,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tier: 'pro',
    priceMonthly: 49,
    priceYearly: 490,
    stripePriceIdMonthly: 'price_pro_monthly',
    stripePriceIdYearly: 'price_pro_yearly',
    features: [
      'Unlimited videos',
      '4K rendering',
      'Priority support',
      'API access',
      '50GB storage',
      'Custom branding',
    ],
    limits: {
      videosPerMonth: -1,
      storageGb: 50,
      teamMembers: 5,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    priceMonthly: 199,
    priceYearly: 1990,
    stripePriceIdMonthly: 'price_enterprise_monthly',
    stripePriceIdYearly: 'price_enterprise_yearly',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Unlimited storage',
      'Unlimited team members',
      'SSO/SAML',
    ],
    limits: {
      videosPerMonth: -1,
      storageGb: -1,
      teamMembers: -1,
    },
  },
];

export function getPlanByTier(tier: SubscriptionTier): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.tier === tier);
}

export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return ['active', 'trialing'].includes(status);
}
