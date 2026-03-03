import styles from './Testimonials.module.css'

const testimonials = [
  {
    stars: '★★★★★',
    text: '"ShotStack transformed how we handle video at scale. What took us months to build, we did in days with their API."',
    initials: 'MK',
    name: 'Michael K.',
    company: 'CTO at TechScale'
  },
  {
    stars: '★★★★★',
    text: '"The best video API we\'ve used. Incredibly fast rendering and the white-label editor integrates perfectly with our product."',
    initials: 'SL',
    name: 'Sarah L.',
    company: 'Lead Developer at MediaFlow'
  },
  {
    stars: '★★★★★',
    text: '"Reduced our video processing costs by 70%. The API is intuitive and their support team is fantastic."',
    initials: 'JR',
    name: 'James R.',
    company: 'VP Engineering at VideoPro'
  }
]

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Loved by Developers</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>{testimonial.stars}</div>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{testimonial.initials}</div>
                <div className={styles.testimonialInfo}>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
