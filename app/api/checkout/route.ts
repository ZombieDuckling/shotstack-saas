import { NextRequest, NextResponse } from 'next/server';
import { getPlanByTier, SubscriptionTier } from '@/lib/billing/subscription';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier, billingPeriod } = body as { tier: SubscriptionTier; billingPeriod: 'monthly' | 'yearly' };

    if (!tier || !billingPeriod) {
      return NextResponse.json(
        { error: 'Missing tier or billingPeriod' },
        { status: 400 }
      );
    }

    const plan = getPlanByTier(tier);
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    if (tier === 'free') {
      return NextResponse.json(
        { error: 'Free tier does not require checkout' },
        { status: 400 }
      );
    }

    const stripePriceId = billingPeriod === 'monthly' 
      ? plan.stripePriceIdMonthly 
      : plan.stripePriceIdYearly;

    if (!stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured for this plan' },
        { status: 500 }
      );
    }

    const checkoutUrl = `https://checkout.stripe.com/pay/${stripePriceId}`;

    return NextResponse.json({
      url: checkoutUrl,
      plan: plan.name,
      billingPeriod,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
