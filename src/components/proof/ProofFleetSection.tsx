'use client'

import dynamic from 'next/dynamic'

const ProofFleet = dynamic(() => import('./ProofFleet'), { ssr: false })

export default function ProofFleetSection() {
  return (
    <section className="px-[8vw] md:px-[12vw] py-20" style={{ borderTop: '1px solid rgba(244,241,234,0.08)' }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF' }} className="mb-4">
        PROOF // INTERACTIVE DEMO
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 600, color: '#F4F1EA', marginBottom: '24px', letterSpacing: '-0.02em' }}>
        Fleet Control — Touch the Engineering
      </div>
      <ProofFleet />
    </section>
  )
}
