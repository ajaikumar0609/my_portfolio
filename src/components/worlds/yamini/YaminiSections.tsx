'use client'

import dynamic from 'next/dynamic'
import { Beats, Section } from '@/components/worlds/ui'
import { yamini } from '@/data/worlds'
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
  return (
    <>
      <Section label="STORY · PROBLEM → SYSTEM → CHALLENGE → SOLUTION → RESULT">
        <Beats beats={yamini.beats} />
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
      <Section label="DOCUMENTED RESULT">
        <Result />
      </Section>
    </>
  )
}
