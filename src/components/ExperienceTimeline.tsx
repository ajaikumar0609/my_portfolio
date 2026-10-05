'use client'

import { useEffect, useRef } from 'react'

const experiences = [
  {
    year: '2023',
    company: 'KARUNYA INSTITUTE',
    role: 'B.Tech CSE (AI)',
    type: 'EDUCATION',
    bullets: [
      'Computer Science & Engineering with specialization in Artificial Intelligence',
      'Core focus: ML, Data Structures, Backend Systems, Mobile Dev',
      'Tirunelveli, Tamil Nadu',
    ],
  },
  {
    year: '2024',
    company: 'LIFECHANGERS IND',
    role: 'Web Development Intern',
    type: 'INTERNSHIP',
    bullets: [
      'Built and deployed web interfaces for client projects',
      'Frontend development with modern JavaScript frameworks',
      'Collaborated with cross-functional team on product delivery',
    ],
  },
  {
    year: '2024',
    company: 'LIFECHANGERS IND',
    role: 'Full Stack Development Intern',
    type: 'INTERNSHIP',
    bullets: [
      'Full-stack development: frontend, backend, database integration',
      'Built REST APIs and integrated third-party services',
      'Deployed production applications to cloud infrastructure',
    ],
  },
  {
    year: '2025',
    company: 'ICANIO TECH SCHOOL',
    role: 'AI Development Intern',
    type: 'INTERNSHIP',
    bullets: [
      'Worked on AI/ML model development and deployment pipelines',
      'Built intelligent applications integrating LLM capabilities',
      'Contributed to production AI infrastructure',
    ],
  },
]

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
    <section className="py-32" style={{ overflow: 'hidden' }}>
      {/* Section header */}
      <div className="px-[8vw] md:px-[12vw] mb-16">
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }} className="mb-3">
          05 / EXPERIENCE
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 1 }}>
          TIMELINE
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.25)', marginTop: '8px' }}>
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
                fontFamily: 'IBM Plex Mono, monospace',
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
                fontFamily: 'IBM Plex Mono, monospace',
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
                fontFamily: 'IBM Plex Mono, monospace',
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
                fontFamily: 'Space Grotesk, sans-serif',
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
                fontFamily: 'IBM Plex Mono, monospace',
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
                    fontFamily: 'Space Grotesk, sans-serif',
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
