import type { Metadata } from 'next'
import WorldShell from '@/components/worlds/WorldShell'
import KavyaBackdrop from '@/components/worlds/kavya/KavyaBackdrop'
import KavyaSections from '@/components/worlds/kavya/KavyaSections'
import { projects } from '@/data/content'

const kavyaProject = projects.find(p => p.id === 'kavya')!

export const metadata: Metadata = {
  title: 'KAVYA TRANSPORTS — Ajai Kumar',
  description: kavyaProject.summary,
}

export default function KavyaPage() {
  return (
    <WorldShell id="kavya" backdrop={<KavyaBackdrop />}>
      <KavyaSections />
    </WorldShell>
  )
}
