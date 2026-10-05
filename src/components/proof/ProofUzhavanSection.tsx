'use client'

import dynamic from 'next/dynamic'

const ProofUzhavan = dynamic(() => import('./ProofUzhavan'), { ssr: false })

export default function ProofUzhavanSection() {
  return (
    <section className="px-[8vw] md:px-[12vw] py-20" style={{ borderTop: '1px solid rgba(244,241,234,0.08)' }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }} className="mb-4">
        PROOF // INTERACTIVE DEMO
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 600, color: '#F4F1EA', marginBottom: '24px', letterSpacing: '-0.02em' }}>
        UZHAVAN AI Decision Flow — Touch the Engineering
      </div>
      <ProofUzhavan />
    </section>
  )
}
