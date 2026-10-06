'use client'

import dynamic from 'next/dynamic'
import { Beats, Section } from '@/components/worlds/ui'
import { kavya } from '@/data/worlds'
import LivePortal from '@/components/worlds/LivePortal'
import { EvidenceFigure } from '@/components/worlds/Evidence'
import { screenshots } from '@/data/screenshots'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

const Placeholder = ({ label }: { label: string }) => (
  <div className="grid min-h-[320px] place-items-center" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)', border: '1px solid var(--w-line)' }}>
    {label}
  </div>
)

const FleetSim = dynamic(() => import('./FleetSim'), { ssr: false, loading: () => <Placeholder label="LOADING SIMULATION" /> })
const SystemFlow = dynamic(() => import('./SystemFlow'), { ssr: false, loading: () => <Placeholder label="LOADING FLOW" /> })

export default function KavyaSections() {
  const [dashboard, vehicles] = ['kavya-fleet-dashboard', 'kavya-vehicles'].map(n => screenshots.kavya.find(s => s.src.includes(n)))
  return (
    <>
      <Section label="STORY">
        <Beats beats={kavya.beats} />
      </Section>
      <Section label="THE SYSTEM · AS BUILT">
        <p className="m-0 mb-8 max-w-[62ch]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.5, color: 'rgba(244,241,234,0.88)' }}>
          Real screens from the fleet-management app (its interface is titled TransportERP · Fleet Management): the dashboard and the vehicle master list. The simulation below is illustrative and is not connected to this system.
        </p>
        <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          {dashboard && <EvidenceFigure shot={dashboard} sizes="(max-width: 1024px) 92vw, 58vw" />}
          {vehicles && <EvidenceFigure shot={vehicles} sizes="(max-width: 1024px) 92vw, 40vw" className="lg:mt-16" />}
        </div>
      </Section>
      <Section label="FLEET SIMULATION">
        <FleetSim />
      </Section>
      <Section label="SYSTEM FLOW">
        <SystemFlow />
      </Section>
      <LivePortal id="kavya" />
      <Section label="STATUS">
        <p className="m-0" style={{ ...mono, fontSize: 12, letterSpacing: '0.2em', color: '#F4F1EA' }}>
          <span style={{ color: 'var(--w-accent)' }}>●</span> BUILT · JAN–MAY 2026
        </p>
      </Section>
    </>
  )
}
