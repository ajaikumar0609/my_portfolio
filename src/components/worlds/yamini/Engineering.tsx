'use client'

import { useState } from 'react'
import { yamini } from '@/data/worlds'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

// Spotlight list: the row under the pointer or keyboard focus is bright, the rest recede.
export default function Engineering() {
  const [open, setOpen] = useState<string | null>(yamini.engineering[0].id)
  const [focus, setFocus] = useState<string | null>(null)

  return (
    <ul className="m-0 list-none p-0" style={{ borderTop: '1px solid var(--w-line)' }}>
      {yamini.engineering.map((it, i) => {
        const lit = focus === it.id
        const isOpen = open === it.id
        return (
          <li
            key={it.id}
            onPointerEnter={() => setFocus(it.id)}
            onPointerLeave={() => setFocus(null)}
            onPointerMove={e => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}
            style={{
              borderBottom: '1px solid var(--w-line)',
              opacity: focus && !lit ? 0.4 : 1,
              transition: 'opacity 0.3s',
              background: lit ? 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(184,255,61,0.07), transparent 65%)' : 'transparent',
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`yam-eng-${it.id}`}
              onClick={() => setOpen(isOpen ? null : it.id)}
              onFocus={() => setFocus(it.id)}
              onBlur={() => setFocus(null)}
              className="flex w-full items-baseline justify-between gap-4 bg-transparent py-5 text-left"
            >
              <span className="flex items-baseline gap-5">
                <span style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: lit || isOpen ? 'var(--w-accent)' : 'rgba(244,241,234,0.55)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ ...sans, fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#F4F1EA' }}>
                  {it.label}
                </span>
              </span>
              <span aria-hidden="true" style={{ ...mono, fontSize: 14, color: 'rgba(244,241,234,0.6)' }}>{isOpen ? '−' : '+'}</span>
            </button>
            <div id={`yam-eng-${it.id}`} hidden={!isOpen} className="pb-6 pl-0 md:pl-10">
              <p className="m-0 max-w-[60ch]" style={{ ...sans, fontSize: 16, lineHeight: 1.55, color: 'rgba(244,241,234,0.85)' }}>{it.text}</p>
              <p className="m-0 mt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>SOURCE · OWNER</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
