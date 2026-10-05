import type { Metadata } from 'next'
import Contact from '@/components/Contact'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — Ajai Kumar',
  description: 'Get in touch with Ajai Kumar — AI Engineer & Backend Developer.',
}

export default function ContactPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh' }}>
      <div className="px-[8vw] pt-10 absolute top-0 left-0 z-10">
        <Link href="/" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}>
          ← HOME
        </Link>
      </div>
      <Contact />
    </main>
  )
}
