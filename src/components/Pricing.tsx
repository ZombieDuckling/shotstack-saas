import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for testing and small projects',
    features: [
      '100 renders/month',
      '720p output',
      'Community support',
      'Basic analytics'
    ],
    cta: 'Get Started',
    featured: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/mo',
    description: 'For growing teams and businesses',
    features: [
      '2,000 renders/month',
      '4K output',
      'Priority support',
      'Advanced analytics',
      'White-label editor',
      'Custom templates'
    ],
    cta: 'Start Free Trial',
    featured: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large-scale deployments',
    features: [
      'Unlimited renders',
      '8K output',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option'
    ],
    cta: 'Contact Sales',
    featured: false
  }
]

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-desc">Start free and scale as you grow. No hidden fees.</p>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <div key={index} className={`${styles.pricingCard} ${plan.featured ? styles.featured : ''}`}>
              <h3>{plan.name}</h3>
              <div className={styles.price}>
                {plan.price}<small>{plan.period}</small>
              </div>
              <p style={{ color: 'var(--gray-400)', fontSize: '14px', marginBottom: '16px' }}>{plan.description}</p>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <a href="#" className={plan.featured ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', textAlign: 'center', display: 'block', padding: '14px 24px' }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
