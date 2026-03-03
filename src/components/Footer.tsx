import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>ShotStack</div>
          <ul className={styles.footerLinks}>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Support</a></li>
          </ul>
          <div className={styles.footerCopy}>© 2026 ShotStack. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
