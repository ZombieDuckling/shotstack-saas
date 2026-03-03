import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Video Workflow?</h2>
          <p>Join 20,000+ developers building the future of video.</p>
          <a href="#pricing" className="btn-primary">Start Building Today</a>
        </div>
      </div>
    </section>
  )
}
