import type { Metadata } from 'next'
import About from '@/components/About'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Ajai Kumar',
  description: 'Computer Science + AI student building production systems for real clients.',
}

export default function AboutPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh' }}>
      <div className="px-[8vw] pt-10">
        <Link href="/" style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}>
          ← HOME
        </Link>
      </div>
      <About />
    </main>
  )
}
