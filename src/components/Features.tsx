import styles from './Features.module.css'

const features = [
  {
    icon: '🎬',
    title: 'Video Editing API',
    description: 'Cut, trim, stitch clips, add transitions, filters and effects. Merge videos, images, text and audio programmatically.'
  },
  {
    icon: '🤖',
    title: 'AI-Powered Templates',
    description: 'Design dynamic templates with AI and turn them into code. Instantly render personalized videos at scale.'
  },
  {
    icon: '⚡',
    title: 'White-Label Editor',
    description: 'Integrate a fully-featured video editor directly into your application with your own branding.'
  },
  {
    icon: '🌐',
    title: 'Multi-Language SDKs',
    description: 'SDKs available for Node.js, Python, PHP, and more. Get started in minutes with our easy-to-use libraries.'
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track video renders, monitor usage, and gain insights with comprehensive analytics and reporting.'
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption. GDPR ready with data residency options.'
  }
]

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything You Need to Build Video Apps</h2>
          <p className="section-desc">Powerful features designed to help developers create stunning video experiences.</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
