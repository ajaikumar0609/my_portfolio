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
            <span style={{ color: active === i ? '#B8FF3D' : 'rgba(244,241,234,0.3)' }}>
              0{i + 1} / {s.label}
            </span>
            {active === i && (
              <span className="text-[#B8FF3D] text-[8px]">●</span>
            )}
          </button>
        ))}
      </nav>

      {/* Top right — AK + Resume */}
      <div className="fixed top-6 right-6 z-[800] flex items-center gap-5">
        <Link
          href="/"
          className="text-[#F4F1EA] tracking-[0.2em]"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}
        >
          AK
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[rgba(244,241,234,0.4)] hover:text-[#B8FF3D] transition-colors"
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
