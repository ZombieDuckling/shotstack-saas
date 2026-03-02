# Billing & Subscriptions

## Overview

This document describes the billing infrastructure for the application, including subscription management, Stripe integration, and webhook handling.

## Architecture

### Subscription Plans

The application supports four subscription tiers:

| Tier | Monthly Price | Yearly Price | Videos/Month | Storage |
|------|---------------|--------------|--------------|---------|
| Free | $0 | $0 | 5 | 1GB |
| Starter | $19 | $190 | 25 | 5GB |
| Pro | $49 | $490 | Unlimited | 50GB |
| Enterprise | $199 | $1990 | Unlimited | Unlimited |

## File Structure

```
lib/billing/
  subscription.ts         # Subscription models, plans, and utilities

app/
  pricing/
    page.tsx               # Pricing page with Stripe-ready checkout flow
  api/
    checkout/
      route.ts             # Checkout session creation endpoint
    webhooks/
      stripe/
        route.ts           # Stripe webhook handler
```

## API Endpoints

### POST /api/checkout

Creates a Stripe checkout session for subscription purchase.

**Request Body:**
```json
{
  "tier": "pro",
  "billingPeriod": "monthly"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/...",
  "plan": "Pro",
  "billingPeriod": "monthly"
}
```

### POST /api/webhooks/stripe

Receives Stripe webhook events. Requires `stripe-signature` header for verification.

**Supported Events:**
- `checkout.session.completed` - Payment successful
- `customer.subscription.created` - New subscription
- `customer.subscription.updated` - Subscription modified
- `customer.subscription.deleted` - Subscription canceled
- `invoice.payment_succeeded` - Invoice paid
- `invoice.payment_failed` - Payment failed

## Stripe Configuration

To enable full Stripe functionality:

1. Set up Stripe products and prices in the Stripe Dashboard
2. Update `stripePriceIdMonthly` and `stripePriceIdYearly` in `lib/billing/subscription.ts`
3. Configure webhook endpoint in Stripe Dashboard: `https://your-domain.com/api/webhooks/stripe`
4. Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` environment variables

## Environment Variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
# etc.
```

## User Flow

1. User visits `/pricing` page
2. Selects billing period (monthly/yearly)
3. Clicks "Get Started" on desired plan
4. Frontend calls `/api/checkout` with tier and billing period
5. API returns Stripe checkout URL
6. User redirected to Stripe checkout
7. On success, user redirected back to app
8. Stripe sends webhook to `/api/webhooks/stripe`
9. Webhook handler updates user subscription in database
