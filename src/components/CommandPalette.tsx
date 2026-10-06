'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { person } from '@/data/content'
import { search, type Command } from '@/lib/palette'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

export default function CommandPalette({
  open,
  onClose,
  commands,
}: {
  open: boolean
  onClose: () => void
  commands: Command[]
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const uid = useId()
  const listId = `${uid}-list`

  const results = useMemo(() => search(commands, query), [commands, query])

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      // Reset on close so the input always mounts empty and fast typing is never appended to stale text.
      setQuery('')
      setActive(0)
      returnFocus.current?.focus?.()
      returnFocus.current = null
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const run = (i: number) => {
    const r = results[i]
    if (!r) return
    onClose()
    requestAnimationFrame(() => r.cmd.run())
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(active)
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  let lastGroup = ''

  return (
    <div
      className="fixed inset-0 z-[10010] flex items-start justify-center px-4 pt-[14vh]"
      style={{ background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)' }}
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="w-full max-w-[640px] overflow-hidden rounded-xl"
        style={{ background: '#0a0a0a', border: '1px solid rgba(184,255,61,0.22)' }}
      >
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <span aria-hidden="true" style={{ ...mono, fontSize: 12, color: '#B8FF3D' }}>⌘</span>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `${uid}-opt-${active}` : undefined}
            aria-label="Search AJAI.SYSTEM"
            placeholder="Search AJAI.SYSTEM  ·  try gps, fleet, tamil"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent"
            style={{ ...mono, fontSize: 14, color: '#F4F1EA', outline: 'none' }}
          />
          <span aria-hidden="true" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.5)' }}>
            ESC
          </span>
        </div>

        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-label="Results"
          className="m-0 max-h-[52vh] list-none overflow-y-auto p-2"
        >
          {results.map(({ cmd, match }, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null
            lastGroup = cmd.group
            return (
              <li key={cmd.id} role="presentation">
                {header && !query && (
                  <div
                    aria-hidden="true"
                    className="px-3 pb-1 pt-3"
                    style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}
                  >
                    {header}
                  </div>
                )}
                <div
                  id={`${uid}-opt-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => i !== active && setActive(i)}
                  onClick={() => run(i)}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2.5"
                  style={{
                    background: i === active ? 'rgba(184,255,61,0.08)' : 'transparent',
                    outline: i === active ? '1px solid rgba(184,255,61,0.3)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 15, color: '#F4F1EA' }}>
                    <span aria-hidden="true" style={{ color: i === active ? '#B8FF3D' : 'rgba(244,241,234,0.4)' }}>→ </span>
                    {cmd.label}
                  </span>
                  <span style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.55)' }}>
                    {match ? `↳ ${match.toUpperCase()}  ` : ''}
                    {cmd.hint}
                  </span>
                </div>
              </li>
            )
          })}
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-6 text-center" style={{ ...mono, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.55)' }}>
              NO MATCH FOR “{query.toUpperCase()}”
            </li>
          )}
        </ul>
        <div className="sr-only" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </div>
        <div
          className="flex justify-between px-5 py-3"
          style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.5)', borderTop: '1px solid var(--border)' }}
        >
          <span>↑↓ NAVIGATE · ↵ OPEN</span>
          <span>{person.short}</span>
        </div>
      </div>
    </div>
  )
}
