'use client'

import { useEffect, useRef, useState } from 'react'
import { yamini } from '@/data/worlds'
import { useReduced } from '@/lib/useReduced'
import { useActive } from './useActive'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

type Pos = Record<string, [number, number]>
const HORIZONTAL: Pos = {
  flutter: [0.1, 0.28], react: [0.1, 0.72], api: [0.36, 0.5],
  auth: [0.62, 0.12], attendance: [0.62, 0.37], gps: [0.62, 0.63], ops: [0.62, 0.88],
  pg: [0.36, 0.92], mongo: [0.9, 0.63],
}
const VERTICAL: Pos = {
  flutter: [0.25, 0.06], react: [0.75, 0.06], api: [0.5, 0.26],
  auth: [0.13, 0.5], attendance: [0.38, 0.5], gps: [0.63, 0.5], ops: [0.87, 0.5],
  pg: [0.86, 0.26], mongo: [0.63, 0.9],
}

export default function Architecture() {
  const { nodes, edges, note } = yamini.architecture
  const reduced = useReduced()
  const [ref, active] = useActive<HTMLDivElement>()
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [w, setW] = useState(0)
  const [hover, setHover] = useState<string | null>(null)
  const [pin, setPin] = useState<string | null>(null)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const svg = svgRef.current as (SVGSVGElement & { pauseAnimations?: () => void; unpauseAnimations?: () => void }) | null
    if (!svg) return
    if (active && !reduced) svg.unpauseAnimations?.()
    else svg.pauseAnimations?.()
  }, [active, reduced, w])

  const vertical = w > 0 && w < 640
  const h = vertical ? 540 : 440
  const pos = vertical ? VERTICAL : HORIZONTAL
  const px = (id: string): [number, number] => [pos[id][0] * w, pos[id][1] * h]
  const sel = hover ?? pin
  const label = (id: string) => nodes.find(n => n.id === id)!.label
  const neighbors = (id: string) => edges.filter(e => e.includes(id)).flat().filter(x => x !== id)
  const litNodes = sel ? new Set([sel, ...neighbors(sel)]) : null
  const bw = vertical ? 76 : 124
  const bh = vertical ? 42 : 44

  return (
    <div ref={ref}>
      <div ref={boxRef} data-cursor="architecture" className="relative w-full" style={{ height: h, border: '1px solid var(--w-line)', background: '#050805' }}>
        {w > 0 && (
          <>
            <svg ref={svgRef} width={w} height={h} className="absolute inset-0" aria-hidden="true">
              {edges.map(([a, b], i) => {
                const [x1, y1] = px(a)
                const [x2, y2] = px(b)
                const on = !sel || a === sel || b === sel
                const d = `M${x1} ${y1} L${x2} ${y2}`
                return (
                  <g key={`${a}-${b}`} style={{ opacity: on ? 1 : 0.18, transition: 'opacity 0.25s' }}>
                    <path d={d} stroke={sel && on ? '#B8FF3D' : '#F4F1EA'} strokeOpacity={sel && on ? 0.9 : 0.28} strokeWidth="1" fill="none" />
                    {!reduced && (
                      <circle r="2.6" fill="#B8FF3D">
                        <animateMotion dur="2.6s" begin={`${(i % 5) * 0.5}s`} repeatCount="indefinite" path={d} />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>
            {nodes.map(n => {
              const [x, y] = px(n.id)
              const lit = !litNodes || litNodes.has(n.id)
              const isSel = sel === n.id
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={pin === n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => setPin(p => (p === n.id ? null : n.id))}
                  className="absolute flex items-center justify-center bg-[#060a05] px-1 text-center"
                  style={{
                    left: x,
                    top: y,
                    width: n.id === 'api' ? bw + 12 : bw,
                    minHeight: bh,
                    transform: 'translate(-50%, -50%)',
                    ...mono,
                    fontSize: vertical ? 9 : 11,
                    letterSpacing: vertical ? '0.06em' : '0.14em',
                    lineHeight: 1.25,
                    color: isSel ? '#050505' : '#F4F1EA',
                    background: isSel ? 'var(--w-accent)' : '#060a05',
                    border: `1px solid ${n.group === 'core' || isSel ? 'var(--w-accent)' : 'rgba(244,241,234,0.3)'}`,
                    opacity: lit ? 1 : 0.35,
                    transition: 'opacity 0.25s',
                  }}
                >
                  {n.label}
                </button>
              )
            })}
          </>
        )}
      </div>

      <p className="m-0 mt-3" aria-live="polite" style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.85)', minHeight: 18 }}>
        {sel ? `${label(sel)} ↔ ${neighbors(sel).map(label).join(', ')}` : 'HOVER, FOCUS OR TAP A NODE TO TRACE ITS CONNECTIONS'}
      </p>
      <p className="m-0 mt-2" style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', lineHeight: 1.6, color: 'rgba(244,241,234,0.6)' }}>{note}</p>

      <ul className="sr-only">
        {edges.map(([a, b]) => (
          <li key={`${a}-${b}`}>{label(a)} connects to {label(b)}</li>
        ))}
      </ul>
    </div>
  )
}
