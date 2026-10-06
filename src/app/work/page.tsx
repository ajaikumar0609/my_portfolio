import type { Metadata } from 'next'
import SelectedSystems from '@/components/SelectedSystems'

export const metadata: Metadata = {
  title: 'Selected Systems',
  alternates: { canonical: '/work' },
  description: 'Yamini Infotech ERP, Kavya Transports and UZHAVAN AI: systems built for real-world use.',
}

export default function WorkPage() {
  return (
    <main id="main">
      <h1 className="sr-only">Selected systems by Ajai Kumar</h1>
      <SelectedSystems standalone />
    </main>
  )
}
