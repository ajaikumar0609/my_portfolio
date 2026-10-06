import type { Metadata } from 'next'
import WorldShell from '@/components/worlds/WorldShell'
import KavyaBackdrop from '@/components/worlds/kavya/KavyaBackdrop'
import KavyaSections from '@/components/worlds/kavya/KavyaSections'
import { projects } from '@/data/content'
import { EvidenceFigure } from '@/components/worlds/Evidence'
import { screenshots } from '@/data/screenshots'

const kavyaProject = projects.find(p => p.id === 'kavya')!

export const metadata: Metadata = {
  title: 'KAVYA TRANSPORTS',
  alternates: { canonical: '/work/kavya' },
  description: kavyaProject.summary,
}

export default function KavyaPage() {
  const hero = screenshots.kavya.find(s => s.role === 'hero')
  return (
    <WorldShell
      id="kavya"
      backdrop={<KavyaBackdrop />}
      anchor={hero && <EvidenceFigure shot={hero} priority sizes="(max-width: 1024px) 92vw, 44vw" />}
    >
      <KavyaSections />
    </WorldShell>
  )
}
