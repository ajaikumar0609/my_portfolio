'use client'

import dynamic from 'next/dynamic'

const Demo = dynamic(() => import('./Demo'), {
  ssr: false,
  loading: () => (
    <p className="m-0" style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>
      LOADING SIMULATION
    </p>
  ),
})

export default function DemoLazy() {
  return <Demo />
}
