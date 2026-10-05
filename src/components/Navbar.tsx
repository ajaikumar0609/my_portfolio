'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const sections = [
  { id: 'hero', label: 'SYSTEM' },
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Navbar() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeMode, setResumeMode] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Skip if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'g':
          window.open('https://github.com/ajaikumarN', '_blank', 'noopener')
          break
        case 'w':
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'a':
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          break
        case 'r':
          window.open('/resume.pdf', '_blank')
          break
        case '/':
          e.preventDefault()
          // Trigger command palette (dispatch custom event)
          document.dispatchEvent(new CustomEvent('open-palette'))
          break
        case '?':
          setShortcutsOpen(v => !v)
          break
        case 'Escape':
          setShortcutsOpen(false)
          setMenuOpen(false)
          break
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Desktop — vertical left nav */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-[800] hidden md:flex flex-col gap-5">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="flex items-center gap-3 group text-left"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
          >
            <span style={{ color: active === i ? '#B8FF3D' : 'rgba(244,241,234,0.35)' }}>
              0{i + 1} / {s.label}
            </span>
            {active === i && (
              <span className="text-[#B8FF3D] text-[8px]">●</span>
            )}
          </button>
        ))}
      </nav>

      {/* Top right — AK + Resume toggle + hamburger */}
      <div className="fixed top-6 right-6 z-[800] flex items-center gap-4">
        <Link
          href="/"
          className="text-[#F4F1EA] tracking-[0.2em]"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}
        >
          AK
        </Link>
        <button
          onClick={() => setResumeMode(v => !v)}
          className="hover:text-[#B8FF3D] transition-colors"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: resumeMode ? '#B8FF3D' : 'rgba(244,241,234,0.35)',
            background: 'transparent',
            border: '1px solid',
            borderColor: resumeMode ? 'rgba(184,255,61,0.3)' : 'rgba(244,241,234,0.1)',
            padding: '4px 10px',
            cursor: 'none',
          }}
        >
          {resumeMode ? 'CREATIVE' : 'RESUME'}
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[rgba(244,241,234,0.4)] hover:text-[#B8FF3D] transition-colors"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.1em' }}
        >
          RESUME ↗
        </a>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#F4F1EA] transition-transform ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F4F1EA] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F4F1EA] transition-transform ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Resume mode overlay banner */}
      {resumeMode && (
        <div
          className="fixed top-0 left-0 right-0 z-[850] text-center py-2"
          style={{
            background: 'rgba(184,255,61,0.1)',
            borderBottom: '1px solid rgba(184,255,61,0.2)',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: '#B8FF3D',
          }}
        >
          RESUME MODE — EFFECTS REDUCED &nbsp;·&nbsp;
          <button onClick={() => setResumeMode(false)} style={{ background: 'none', border: 'none', color: '#B8FF3D', cursor: 'none', fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', textDecoration: 'underline' }}>
            SWITCH TO CREATIVE
          </button>
        </div>
      )}

      {/* Keyboard shortcuts overlay */}
      {shortcutsOpen && (
        <div
          className="fixed top-20 right-6 z-[900]"
          style={{
            background: 'rgba(5,5,5,0.96)',
            border: '1px solid rgba(184,255,61,0.2)',
            padding: '20px 24px',
            fontFamily: 'IBM Plex Mono, monospace',
            minWidth: '220px',
          }}
        >
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '14px' }}>
            KEYBOARD SHORTCUTS
          </div>
          {[
            ['G', 'GitHub'],
            ['W', 'Work'],
            ['A', 'About'],
            ['R', 'Resume'],
            ['/', 'Search'],
            ['?', 'Shortcuts'],
            ['ESC', 'Close'],
          ].map(([key, label]) => (
            <div key={key} className="flex justify-between gap-8 mb-3">
              <span style={{ fontSize: '10px', color: '#B8FF3D', letterSpacing: '0.1em' }}>{key}</span>
              <span style={{ fontSize: '10px', color: 'rgba(244,241,234,0.55)', letterSpacing: '0.08em' }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[700] bg-[#050505] flex flex-col items-start justify-center pl-12 gap-8 md:hidden">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-left"
            >
              <div className="text-[rgba(244,241,234,0.3)]" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em' }}>
                0{i + 1}
              </div>
              <div className="text-[#F4F1EA] mt-1" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 600 }}>
                {s.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
