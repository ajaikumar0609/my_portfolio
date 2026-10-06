'use client'

import { useEffect, useRef } from 'react'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

const ROWS: [string, string][] = [
  ['⌘K / CTRL K', 'Command palette'],
  ['/', 'Command palette'],
  ['W', 'Work'],
  ['A', 'About'],
  ['S', 'Stack'],
  ['C', 'Contact'],
  ['R', 'Resume (PDF)'],
  ['G', 'GitHub'],
  ['?', 'This panel'],
  ['ESC', 'Close'],
]

export default function ShortcutsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      requestAnimationFrame(() => closeRef.current?.focus())
    } else {
      returnFocus.current?.focus?.()
      returnFocus.current = null
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[10010] flex items-center justify-center px-4"
      style={{ background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)' }}
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        onKeyDown={e => {
          if (e.key === 'Escape') onClose()
          if (e.key === 'Tab') e.preventDefault()
        }}
        className="w-full max-w-[420px] rounded-xl p-6"
        style={{ background: '#0a0a0a', border: '1px solid rgba(184,255,61,0.22)' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', color: '#F4F1EA', fontWeight: 500 }}>
            SHORTCUTS
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="ESC, close shortcuts"
            className="bg-transparent px-2 py-1"
            style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.7)', border: '1px solid var(--border)' }}
          >
            ESC
          </button>
        </div>
        <dl className="m-0">
          {ROWS.map(([k, v]) => (
            <div key={k + v} className="flex justify-between py-2" style={{ borderTop: '1px solid var(--border)' }}>
              <dt style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', color: '#B8FF3D' }}>{k}</dt>
              <dd className="m-0" style={{ fontSize: 14, color: 'rgba(244,241,234,0.85)' }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
