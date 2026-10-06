'use client'

import { useState } from 'react'
import { useReduced } from '@/lib/useReduced'
import { DEFAULT_SELECTION, type Selection } from '@/data/stack'
import A11yList from '@/components/stack/A11yList'
import DesktopGraph from '@/components/stack/DesktopGraph'
import MobileStack from '@/components/stack/MobileStack'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

export default function StackGraph() {
  const reduced = useReduced()
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION)

  return (
    <section
      id="stack"
      data-nav="stack"
      aria-label="System stack"
      className="relative w-full px-[6vw] py-[10svh] md:px-[7vw]"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.55)' }}>
          04 / STACK
        </p>
        <h2
          className="m-0 mt-5"
          style={{ ...sans, fontSize: 'clamp(2.4rem, 6vw, 5.6rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.035em' }}
        >
          SYSTEM STACK
        </h2>
        <p className="m-0 mt-4" style={{ ...mono, fontSize: 12, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.7)' }}>
          TOOLS I USE TO BUILD REAL SYSTEMS.
        </p>

        <div className="mt-10">
          <DesktopGraph selection={selection} onSelect={setSelection} reduced={reduced} />
          <MobileStack selection={selection} onSelect={setSelection} />
          <A11yList />
        </div>
      </div>
    </section>
  )
}
