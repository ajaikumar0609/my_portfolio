import type { Metadata } from 'next'
import WorldShell from '@/components/worlds/WorldShell'
import Backdrop from '@/components/worlds/yamini/Backdrop'
import YaminiSections from '@/components/worlds/yamini/YaminiSections'
import { projects } from '@/data/content'

const project = projects.find(p => p.id === 'yamini')!

export const metadata: Metadata = {
  title: 'YAMINI INFOTECH ERP — Ajai Kumar',
  description: project.summary,
}

export default function YaminiPage() {
  return (
    <WorldShell id="yamini" backdrop={<Backdrop />}>
      <YaminiSections />
    </WorldShell>
  )
}
