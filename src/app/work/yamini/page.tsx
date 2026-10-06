import type { Metadata } from 'next'
import WorldShell from '@/components/worlds/WorldShell'
import Backdrop from '@/components/worlds/yamini/Backdrop'
import YaminiSections from '@/components/worlds/yamini/YaminiSections'
import { projects } from '@/data/content'
import { EvidenceFigure } from '@/components/worlds/Evidence'
import { screenshots } from '@/data/screenshots'

const project = projects.find(p => p.id === 'yamini')!

export const metadata: Metadata = {
  title: 'YAMINI INFOTECH ERP',
  alternates: { canonical: '/work/yamini' },
  description: project.summary,
}

export default function YaminiPage() {
  const hero = screenshots.yamini.find(s => s.role === 'hero')
  return (
    <WorldShell
      id="yamini"
      backdrop={<Backdrop />}
      anchor={hero && <EvidenceFigure shot={hero} priority sizes="(max-width: 1024px) 92vw, 44vw" />}
    >
      <YaminiSections />
    </WorldShell>
  )
}
