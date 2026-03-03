import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShotStack - The Cloud Video Editing API',
  description: 'Supercharge your product and workflows with our AI-powered video editing API and white label video editor. Create stunning videos at scale in days, not months.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      {children}
    </html>
  )
}
