import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
  description: 'Get in touch with Ajai Kumar: email, LinkedIn, GitHub and resume.',
}

export default function ContactPage() {
  return (
    <main id="main">
      <h1 className="sr-only">Contact Ajai Kumar</h1>
      <ContactSection />
    </main>
  )
}
