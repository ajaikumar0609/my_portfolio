'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { kavya } from '@/data/worlds'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

const STACK_FACTS = [
  'POSTGRESQL · FLEET DATA',
  'MONGODB · GPS AND LOG DATA',
  'WEBSOCKETS · REAL-TIME UPDATES',
  'REDIS · PART OF THE STACK',
]

export default function SystemFlow() {
  const reduced = useReduced()
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    if (reduced || !ref.current) {
      setRun(false)
      return
    }
    let visible = false
    const sync = () => setRun(visible && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    io.observe(ref.current)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [reduced])

  return (
    <div>
      <style>{`
        @keyframes kvFlowH{to{background-position:28px 0}}
        @keyframes kvFlowV{to{background-position:0 28px}}
        .kv-link{background-size:14px 14px}
        .kv-link-h{width:56px;height:2px;background-image:repeating-linear-gradient(90deg,#4DE8FF 0 6px,transparent 6px 14px);animation:kvFlowH 1.1s linear infinite}
        .kv-link-v{width:2px;height:40px;background-image:repeating-linear-gradient(180deg,#4DE8FF 0 6px,transparent 6px 14px);animation:kvFlowV 1.1s linear infinite}
        .kv-flow[data-run="0"] .kv-link{animation-play-state:paused;opacity:.5}
      `}</style>

      <p className="sr-only">
        Flow: a GPS device sends data to the backend API. The API serves vehicles, trips, routes and dashboard modules, which are stored in PostgreSQL and MongoDB.
      </p>

      <div
        ref={ref}
        data-cursor="architecture"
        data-run={run ? '1' : '0'}
        aria-hidden="true"
        className="kv-flow flex flex-col items-center gap-0 md:flex-row md:items-stretch md:justify-between"
      >
        {kavya.flow.map((n, i) => (
          <Fragment key={n.id}>
            <div
              className="flex w-full min-h-[84px] items-center justify-center px-4 py-4 text-center md:w-auto md:flex-1"
              style={{ border: '1px solid var(--w-line)', background: 'rgba(4,7,13,0.7)', ...mono, fontSize: 11, letterSpacing: '0.18em', color: '#F4F1EA', lineHeight: 1.6 }}
            >
              <span>
                <span style={{ color: 'var(--w-accent)', display: 'block', fontSize: 9, marginBottom: 6 }}>{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </span>
            </div>
            {i < kavya.flow.length - 1 && (
              <div className="flex items-center justify-center py-1 md:px-1 md:py-0">
                <span className="kv-link kv-link-v md:hidden" />
                <span className="kv-link kv-link-h hidden md:block" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-6 gap-y-2 p-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.75)' }}>
        {STACK_FACTS.map(f => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="m-0 mt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.45)' }}>SOURCE · RESUME</p>
    </div>
  )
}
