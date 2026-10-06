'use client'

import dynamic from 'next/dynamic'
import { Beats, Section } from '@/components/worlds/ui'
import { kavya } from '@/data/worlds'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

const Placeholder = ({ label }: { label: string }) => (
  <div className="grid min-h-[320px] place-items-center" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)', border: '1px solid var(--w-line)' }}>
    {label}
  </div>
)

const FleetSim = dynamic(() => import('./FleetSim'), { ssr: false, loading: () => <Placeholder label="LOADING SIMULATION" /> })
const SystemFlow = dynamic(() => import('./SystemFlow'), { ssr: false, loading: () => <Placeholder label="LOADING FLOW" /> })

export default function KavyaSections() {
  return (
    <>
      <Section label="STORY">
        <Beats beats={kavya.beats} />
      </Section>
      <Section label="FLEET SIMULATION">
        <FleetSim />
      </Section>
      <Section label="SYSTEM FLOW">
        <SystemFlow />
      </Section>
      <Section label="STATUS">
        <p className="m-0" style={{ ...mono, fontSize: 12, letterSpacing: '0.2em', color: '#F4F1EA' }}>
          <span style={{ color: 'var(--w-accent)' }}>●</span> BUILT · JAN–MAY 2026
        </p>
      </Section>
    </>
  )
}
