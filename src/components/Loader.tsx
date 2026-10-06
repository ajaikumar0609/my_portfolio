'use client'

import { useEffect, useRef, useState } from 'react'

const BOOT_MS = 1000
const READY_MS = 250
const FADE_MS = 350

// Under 1.5s end to end. Skipped on repeat visits and under reduced motion.
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'boot' | 'ready' | 'out' | 'done'>('boot')
  const [pct, setPct] = useState(0)
  const doneRef = useRef(onComplete)
  doneRef.current = onComplete

  useEffect(() => {
    let skip = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      if (sessionStorage.getItem('ajai_loaded')) skip = true
    } catch {}
    if (skip) {
      setPhase('done')
      doneRef.current()
      return
    }

    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / BOOT_MS)
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setPhase('ready')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (phase === 'ready') {
      const id = setTimeout(() => {
        setPhase('out')
        try {
          sessionStorage.setItem('ajai_loaded', '1')
        } catch {}
        doneRef.current()
      }, READY_MS)
      return () => clearTimeout(id)
    }
    if (phase === 'out') {
      const id = setTimeout(() => setPhase('done'), FADE_MS)
      return () => clearTimeout(id)
    }
  }, [phase])

  if (phase === 'done') return null

  const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading AJAI.SYSTEM"
      className="fixed inset-0 z-[10000]"
      style={{
        background: '#050505',
        opacity: phase === 'out' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
    >
      <div className="absolute bottom-[8vh] left-[7vw] right-[7vw] max-w-[360px]" style={mono}>
        <div style={{ fontSize: 11, letterSpacing: '0.22em', color: '#F4F1EA' }}>AJAI.SYSTEM</div>
        <div
          className="mt-2 flex justify-between"
          style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}
        >
          <span>{phase === 'boot' ? 'INITIALIZING' : 'SYSTEM READY'}</span>
          <span>{String(pct).padStart(3, '0')}</span>
        </div>
        <div className="mt-3 h-px w-full" style={{ background: 'rgba(244,241,234,0.12)' }}>
          <div
            className="h-px"
            style={{ width: `${pct}%`, background: '#B8FF3D', transition: 'width 60ms linear' }}
          />
        </div>
      </div>
    </div>
  )
}
