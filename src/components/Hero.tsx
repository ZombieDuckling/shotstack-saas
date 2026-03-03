'use client'

import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={`${styles.heroBadge} fade-in`}>
          <span></span>
          Trusted by 20,000+ developers worldwide
        </div>
        <h1 className={`fade-in fade-in-delay-1`}>
          The Cloud Video<br />
          <span className={styles.highlight}>Editing API</span>
        </h1>
        <p className={`fade-in fade-in-delay-2`}>
          Supercharge your product and workflows with our AI-powered video editing API and white label video editor. Create stunning videos at scale in days, not months.
        </p>
        <div className={`${styles.heroButtons} fade-in fade-in-delay-3`}>
          <a href="#pricing" className="btn-primary">Start Free Trial</a>
          <a href="#features" className="btn-secondary">View Features</a>
        </div>
        <div className={`${styles.heroStats} fade-in fade-in-delay-4`}>
          <div className={styles.stat}>
            <div className={styles.statValue}>206K+</div>
            <div className={styles.statLabel}>Videos/Month</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>6.2M+</div>
            <div className={styles.statLabel}>Videos Rendered</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>10K+</div>
            <div className={styles.statLabel}>Developers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
