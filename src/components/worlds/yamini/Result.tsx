'use client'

import { useEffect, useRef, useState } from 'react'
import { projects } from '@/data/content'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const reduced = useReduced()
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (reduced) {
      setV(target)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1200)
        setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduced, target])
  return (
    <>
      <span ref={ref} aria-hidden="true">{v}{suffix}</span>
      <span className="sr-only">{target}{suffix === '+' ? ' plus' : ''}</span>
    </>
  )
}

// Documented metrics only: values come from content.ts.
export default function Result() {
  const p = projects.find(x => x.id === 'yamini')!
  return (
    <div>
      <p className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', color: 'var(--w-accent)' }}>● {p.status}</p>
      <dl className="m-0 mt-8 grid gap-px md:grid-cols-2" style={{ background: 'var(--w-line)' }}>
        {p.metrics.map(m => (
          <div key={m.label} className="p-8" style={{ background: '#060a05' }}>
            <dt style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.75)', order: 2 }}>{m.label}</dt>
            <dd className="m-0 mt-3" style={{ ...sans, fontSize: 'clamp(3.2rem, 9vw, 7rem)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1, color: '#F4F1EA' }}>
              <CountUp target={parseInt(m.value, 10)} suffix={m.value.replace(/[0-9]/g, '')} />
            </dd>
            {m.note && <p className="m-0 mt-3" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', lineHeight: 1.6, color: 'rgba(244,241,234,0.65)' }}>{m.note.toUpperCase()}</p>}
          </div>
        ))}
      </dl>
    </div>
  )
}
