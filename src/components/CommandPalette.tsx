'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Item {
  label: string
  sub: string
  href: string
  external?: boolean
  group: string
}

const items: Item[] = [
  { label: 'Yamini Infotech ERP', sub: '/work/yamini', href: '/work/yamini', group: 'PROJECTS' },
  { label: 'Kavya Transports', sub: '/work/kavya', href: '/work/kavya', group: 'PROJECTS' },
  { label: 'UZHAVAN AI', sub: '/work/uzhavan', href: '/work/uzhavan', group: 'PROJECTS' },
  { label: 'About', sub: '/about', href: '/about', group: 'NAVIGATE' },
  { label: 'Contact', sub: '/contact', href: '/contact', group: 'NAVIGATE' },
  { label: 'GitHub', sub: '↗ github.com/ajaikumarN', href: 'https://github.com/ajaikumarN', external: true, group: 'EXTERNAL' },
  { label: 'Download Resume', sub: '↓ resume.pdf', href: '/resume.pdf', external: true, group: 'EXTERNAL' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.group.toLowerCase().includes(query.toLowerCase())
  )

  const execute = useCallback((item: Item) => {
    if (item.external) {
      window.open(item.href, '_blank', 'noopener noreferrer')
    } else {
      router.push(item.href)
    }
    setOpen(false)
    setQuery('')
  }, [router])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
        setQuery('')
        setActiveIndex(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      execute(filtered[activeIndex])
    }
  }

  if (!open) return null

  const groups = [...new Set(filtered.map(i => i.group))]

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh]"
      style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[560px] mx-4 overflow-hidden"
        style={{
          background: 'rgba(5,5,5,0.98)',
          border: '1px solid rgba(184,255,61,0.2)',
          boxShadow: '0 0 80px rgba(184,255,61,0.06)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(244,241,234,0.07)' }}
        >
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#B8FF3D' }}>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
            onKeyDown={onKeyDown}
            placeholder="Search AJAI.SYSTEM..."
            className="flex-1 bg-transparent outline-none text-[#F4F1EA] placeholder-[rgba(244,241,234,0.25)]"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', letterSpacing: '0.05em' }}
          />
          <span
            onClick={() => setOpen(false)}
            className="cursor-none text-[rgba(244,241,234,0.3)] hover:text-[#F4F1EA] transition-colors"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em' }}
          >
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="pb-3">
          {groups.map(group => {
            const groupItems = filtered.filter(i => i.group === group)
            return (
              <div key={group}>
                <div
                  className="px-5 pt-4 pb-2"
                  style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.25)' }}
                >
                  {group}
                </div>
                {groupItems.map(item => {
                  const globalIndex = filtered.indexOf(item)
                  return (
                    <button
                      key={item.label}
                      onClick={() => execute(item)}
                      className="w-full text-left px-5 py-3 flex items-center justify-between group transition-colors"
                      style={{
                        background: globalIndex === activeIndex ? 'rgba(184,255,61,0.06)' : 'transparent',
                        borderLeft: globalIndex === activeIndex ? '2px solid #B8FF3D' : '2px solid transparent',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'rgba(244,241,234,0.3)' }}>→</span>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', color: globalIndex === activeIndex ? '#F4F1EA' : 'rgba(244,241,234,0.65)' }}>
                          {item.label}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'rgba(244,241,234,0.25)' }}>
                        {item.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="px-5 py-6 text-center" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'rgba(244,241,234,0.25)' }}>
              NO RESULTS
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
