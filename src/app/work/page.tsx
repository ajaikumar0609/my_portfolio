import type { Metadata } from 'next'
import SelectedSystems from '@/components/SelectedSystems'

export const metadata: Metadata = {
  title: 'Selected Systems — Ajai Kumar',
  description: 'Yamini Infotech ERP, Kavya Transports and UZHAVAN AI: systems built for real-world use.',
}

export default function WorkPage() {
  return (
    <main>
      <SelectedSystems standalone />
    </main>
  )
}
