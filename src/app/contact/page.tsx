import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact — Ajai Kumar',
  description: 'Get in touch with Ajai Kumar: email, LinkedIn, GitHub and resume.',
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  )
}
