'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    question: 'How does the API work?',
    answer: 'You send a JSON payload describing your video edit, and our API processes it on our cloud infrastructure. The rendered video is returned as a download URL or webhook notification.'
  },
  {
    question: 'What languages are supported?',
    answer: 'We provide official SDKs for Node.js, Python, PHP, and more. You can also use our REST API directly with any HTTP client.'
  },
  {
    question: 'How long does rendering take?',
    answer: 'Rendering time depends on video length and complexity. Most short videos (under 1 minute) complete in under 60 seconds.'
  },
  {
    question: 'Can I customize the video editor?',
    answer: 'Yes! Our white-label editor can be fully customized with your branding, colors, and features to match your application.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all plans come with a free tier to get started. The Professional plan includes a 14-day free trial with full access to all features.'
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className={styles.faqQuestion}>{faq.question}</div>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
