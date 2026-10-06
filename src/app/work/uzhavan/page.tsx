import type { Metadata } from 'next'
import WorldShell from '@/components/worlds/WorldShell'
import { Beats, Section } from '@/components/worlds/ui'
import Backdrop from '@/components/worlds/uzhavan/Backdrop'
import DescentStrip from '@/components/worlds/uzhavan/DescentStrip'
import Metrics from '@/components/worlds/uzhavan/Metrics'
import DemoLazy from '@/components/worlds/uzhavan/DemoLazy'
import { MONO_FONT, TAMIL_FONT } from '@/components/worlds/uzhavan/tamil'
import { projects } from '@/data/content'
import { uzhavan } from '@/data/worlds'

const project = projects.find(p => p.id === 'uzhavan')!

export const metadata: Metadata = {
  title: 'UZHAVAN AI — Ajai Kumar',
  description: project.summary,
}

const BASIS = [
  'TNAU-grounded knowledge',
  'Weather-aware recommendations',
  'Crop and disease intelligence',
  'Agricultural scheme information retrieval',
  'ML pipelines for crop classification and yield prediction, developed and evaluated',
]

export default function UzhavanPage() {
  return (
    <WorldShell
      id="uzhavan"
      backdrop={<Backdrop />}
      heroExtra={
        <p lang="ta" className="m-0 mt-5" style={{ fontFamily: TAMIL_FONT, fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)', lineHeight: 1.7, color: 'var(--w-accent)' }}>
          உழவன்
        </p>
      }
    >
      <Section label="FIELD · CROP · LEAF · AI">
        <DescentStrip />
      </Section>

      <Section label="STORY">
        <p className="m-0 mb-8 flex flex-wrap items-baseline gap-x-5 gap-y-1" style={{ fontFamily: MONO_FONT, letterSpacing: '0.2em' }}>
          <span style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--w-accent)' }}>● {uzhavan.status}</span>
          <span style={{ fontSize: 11, color: 'rgba(244,241,234,0.7)' }}>PROJECT STATUS</span>
        </p>
        <Beats beats={uzhavan.beats} />
      </Section>

      <Section label="VERIFIED METRICS">
        <Metrics />
      </Section>

      <Section label="PIPELINE · DEMO">
        <DemoLazy />
      </Section>

      <Section label="KNOWLEDGE BASIS">
        <ul className="m-0 list-none p-0">
          {BASIS.map(b => (
            <li key={b} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4" style={{ borderTop: '1px solid var(--w-line)' }}>
              <span style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)', color: 'rgba(244,241,234,0.9)' }}>{b}</span>
              <span style={{ fontFamily: MONO_FONT, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}>SOURCE · RESUME</span>
            </li>
          ))}
        </ul>
      </Section>
    </WorldShell>
  )
}
