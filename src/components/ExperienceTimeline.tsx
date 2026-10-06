'use client'

import { useEffect, useRef } from 'react'
import { experience } from '@/data/content'

const experiences = experience.map(e => ({
  year: e.year,
  company: e.org,
  role: e.role,
  type: e.kind,
  bullets: e.bullets,
}))

export default function ExperienceTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  return (
    <section data-nav="about" className="py-32" style={{ overflow: 'hidden' }}>
      {/* Section header */}
      <div className="px-[8vw] md:px-[12vw] mb-16">
        <div style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }} className="mb-3">
          05 / EXPERIENCE
        </div>
        <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 1 }}>
          TIMELINE
        </div>
        <div style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.25)', marginTop: '8px' }}>
          ← SCROLL / SWIPE →
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '8vw',
          paddingRight: '8vw',
        }}
      >
        {/* Horizontal line */}
        <div
          className="absolute"
          style={{ top: '50%', left: '8vw', right: '8vw', height: '1px', background: 'rgba(244,241,234,0.06)', pointerEvents: 'none' }}
        />

        {experiences.map((exp, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              scrollSnapAlign: 'start',
              width: 'clamp(280px, 40vw, 380px)',
              marginRight: '2px',
              padding: '40px 32px',
              background: 'rgba(244,241,234,0.02)',
              border: '1px solid rgba(244,241,234,0.06)',
              position: 'relative',
            }}
          >
            {/* Index */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: 'rgba(244,241,234,0.2)',
              }}
            >
              0{i + 1}
            </div>

            {/* Year */}
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: 'clamp(48px, 8vw, 72px)',
                fontWeight: 600,
                color: 'rgba(244,241,234,0.08)',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {exp.year}
            </div>

            {/* Type badge */}
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: exp.type === 'EDUCATION' ? '#4DE8FF' : '#B8FF3D',
                marginBottom: '8px',
              }}
            >
              {exp.type}
            </div>

            {/* Company */}
            <div
              style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                fontWeight: 600,
                color: '#F4F1EA',
                letterSpacing: '-0.01em',
                marginBottom: '4px',
              }}
            >
              {exp.company}
            </div>

            {/* Role */}
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: '11px',
                color: 'rgba(244,241,234,0.4)',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              {exp.role}
            </div>

            {/* Bullets */}
            <div className="flex flex-col gap-2">
              {exp.bullets.map((b, bi) => (
                <div
                  key={bi}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '13px',
                    color: 'rgba(244,241,234,0.45)',
                    lineHeight: 1.6,
                    paddingLeft: '12px',
                    borderLeft: '1px solid rgba(244,241,234,0.08)',
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
