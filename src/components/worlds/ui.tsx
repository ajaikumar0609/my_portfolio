'use client'

import { useId, type ReactNode } from 'react'
import Badge from '@/components/ui/Badge'
import type { Beat, ClaimSource } from '@/data/worlds'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const SOURCE_TEXT: Record<ClaimSource, string> = {
  resume: 'SOURCE · RESUME',
  owner: 'SOURCE · OWNER',
  concept: 'EXPLANATORY',
}

export function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.24em', color: 'var(--w-accent)', fontWeight: 500 }}>
      {children}
    </h2>
  )
}

export function Section({ label, children, id }: { label: string; children: ReactNode; id?: string }) {
  const hid = useId()
  return (
    <section aria-labelledby={hid} id={id} className="px-[6vw] py-[10svh] md:px-[7vw]" style={{ borderBottom: '1px solid var(--w-line)' }}>
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel id={hid}>{label}</SectionLabel>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export function Beats({ beats }: { beats: Beat[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {beats.map(b => (
        <li key={b.key} className="grid gap-3 py-6 md:grid-cols-[180px_1fr]" style={{ borderTop: '1px solid var(--w-line)' }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', color: '#F4F1EA' }}>{b.key}</div>
          <div>
            <p className="m-0" style={{ ...sans, fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)', lineHeight: 1.5, color: 'rgba(244,241,234,0.9)', maxWidth: '60ch' }}>
              {b.text}
            </p>
            <p className="m-0 mt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.45)' }}>
              {SOURCE_TEXT[b.source]}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function LabFrame({
  title,
  kind = 'simulation',
  caption,
  children,
}: {
  title: string
  kind?: 'simulation' | 'simulated-data' | 'concept'
  caption: string
  children: ReactNode
}) {
  return (
    <figure className="m-0 p-5 md:p-7" style={{ border: '1px solid var(--w-line)', background: 'rgba(5,5,5,0.55)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', color: '#F4F1EA' }}>{title}</figcaption>
        <Badge kind={kind} />
      </div>
      <p className="m-0 mt-3 max-w-[70ch]" style={{ ...sans, fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.75)' }}>
        {caption}
      </p>
      <div className="mt-6">{children}</div>
    </figure>
  )
}

// Labelled, keyboard-operable range input with a spoken value.
export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  describe,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (v: number) => void
  describe?: (v: number) => string
}) {
  const id = useId()
  const text = describe ? describe(value) : `${value} ${unit}`
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4" style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', color: '#F4F1EA' }}>
        <span>{label}</span>
        <span aria-hidden="true" style={{ color: 'var(--w-accent)' }}>
          {value} {unit}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-valuetext={text}
        className="mt-3 w-full"
        style={{ accentColor: 'var(--w-accent)' }}
      />
    </div>
  )
}

export function LabButton({
  children,
  onClick,
  pressed,
  disabled,
  tone = 'default',
}: {
  children: ReactNode
  onClick: () => void
  pressed?: boolean
  disabled?: boolean
  tone?: 'default' | 'accent'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      disabled={disabled}
      className="bg-transparent px-4 py-3 transition-colors disabled:opacity-40"
      style={{
        ...mono,
        fontSize: 11,
        letterSpacing: '0.18em',
        color: tone === 'accent' ? '#050505' : '#F4F1EA',
        background: tone === 'accent' ? 'var(--w-accent)' : pressed ? 'rgba(244,241,234,0.1)' : 'transparent',
        border: `1px solid ${tone === 'accent' ? 'var(--w-accent)' : 'var(--w-line)'}`,
      }}
    >
      {children}
    </button>
  )
}

// Everything a simulation shows must also exist as text for screen readers.
export function LiveStatus({ children }: { children: ReactNode }) {
  return (
    <p role="status" aria-live="polite" className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.85)' }}>
      {children}
    </p>
  )
}
