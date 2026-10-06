'use client'

import { useRef, type ReactNode } from 'react'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

interface Props {
  index: string
  label: string
  hint: string
  hintId?: string
  href: string
  cursor: 'email' | 'github' | 'resume'
  reduced: boolean
  external?: boolean
  download?: boolean
  children?: ReactNode
}

// Large typographic row. Magnetic nudge (max 8px) only on fine pointers and never under reduced motion.
export default function ContactLink({ index, label, hint, hintId, href, cursor, reduced, external, download }: Props) {
  const inner = useRef<HTMLSpanElement>(null)

  const canMove = () => !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!inner.current || !canMove()) return
    const r = e.currentTarget.getBoundingClientRect()
    const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 16
    const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8
    const cl = (v: number) => Math.max(-8, Math.min(8, v))
    inner.current.style.transform = `translate3d(${cl(dx).toFixed(1)}px, ${cl(dy).toFixed(1)}px, 0)`
  }
  const reset = () => {
    if (inner.current) inner.current.style.transform = 'translate3d(0,0,0)'
  }

  const arrowMove = reduced ? '' : 'transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-focus-visible:translate-x-1.5 group-focus-visible:-translate-y-1.5'

  return (
    <a
      href={href}
      data-cursor={cursor}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download ? '' : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      className="group grid min-h-[64px] grid-cols-[2.2rem_1fr_auto] items-center gap-x-3 py-3 md:grid-cols-[3rem_1fr_auto] md:gap-x-6 md:py-4"
      style={{ borderTop: '1px solid var(--border)', color: '#F4F1EA' }}
    >
      <span style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>{index}</span>
      <span ref={inner} className="block" style={{ transition: reduced ? 'none' : 'transform 0.25s ease-out' }}>
        <span
          className="block transition-colors group-hover:text-[#B8FF3D] group-focus-visible:text-[#B8FF3D]"
          style={{ ...sans, fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.05 }}
        >
          {label}
        </span>
        <span
          id={hintId}
          className="mt-1 block break-all"
          style={{ ...mono, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.65)' }}
        >
          {hint}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`inline-block transition-colors group-hover:text-[#B8FF3D] group-focus-visible:text-[#B8FF3D] ${arrowMove}`}
        style={{ ...sans, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
      >
        ↗
      </span>
    </a>
  )
}
