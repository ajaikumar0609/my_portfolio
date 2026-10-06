'use client'

import dynamic from 'next/dynamic'
import { Beats, Section } from '@/components/worlds/ui'
import { yamini } from '@/data/worlds'
import { EvidenceFigure } from '@/components/worlds/Evidence'
import { screenshots } from '@/data/screenshots'
import LivePortal from '@/components/worlds/LivePortal'
import Engineering from './Engineering'
import Result from './Result'

const Loading = () => (
  <div className="grid h-40 place-items-center" style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>
    LOADING LAB
  </div>
)
const OfflineQueueLab = dynamic(() => import('./OfflineQueueLab'), { ssr: false, loading: Loading })
const SegmentationLab = dynamic(() => import('./SegmentationLab'), { ssr: false, loading: Loading })
const Architecture = dynamic(() => import('./Architecture'), { ssr: false, loading: Loading })

export default function YaminiSections() {
  const erp = screenshots.yamini.find(s => s.role === 'support')
  const attendance = screenshots.yamini.find(s => s.role === 'detail')
  return (
    <>
      <Section label="STORY · PROBLEM → SYSTEM → CHALLENGE → SOLUTION → RESULT">
        <Beats beats={yamini.beats} />
      </Section>
      <Section label="THE SYSTEM · AS BUILT">
        <p className="m-0 mb-8 max-w-[62ch]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.5, color: 'rgba(244,241,234,0.88)' }}>
          The admin app covers workforce management, service operations and CRM, with GPS live tracking and attendance. These are the real screens.
        </p>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {erp && <EvidenceFigure shot={erp} sizes="(max-width: 1024px) 92vw, 55vw" />}
          {attendance && <EvidenceFigure shot={attendance} sizes="(max-width: 1024px) 92vw, 42vw" className="lg:mt-16" />}
        </div>
      </Section>
      <Section label="ENGINEERING">
        <Engineering />
      </Section>
      <Section label="ENGINEERING LAB · OFFLINE GPS QUEUE">
        <OfflineQueueLab />
      </Section>
      <Section label="ENGINEERING LAB · ROUTE SEGMENTATION">
        <SegmentationLab />
      </Section>
      <Section label="ARCHITECTURE">
        <Architecture />
      </Section>
      <LivePortal id="yamini" />
      <Section label="DOCUMENTED RESULT">
        <Result />
      </Section>
    </>
  )
}
