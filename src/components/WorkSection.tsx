'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

// GPS dot component for Yamini
function GpsDot({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y }}
    >
      <div
        className="w-[8px] h-[8px] rounded-full bg-[#B8FF3D] relative"
        style={{ animation: `glowPulse 2s ease-in-out ${delay}s infinite` }}
      >
        <div
          className="absolute rounded-full border border-[#B8FF3D]"
          style={{
            inset: '-6px',
            animation: `gpsPulse 2s ease-out ${delay}s infinite`,
          }}
        />
      </div>
    </div>
  )
}

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger for hero→work transition
    let ctx: { revert?: () => void } | null = null
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero text fades/scales as this section enters viewport
        gsap.fromTo(
          '.hero-text-wrap',
          { scale: 1, opacity: 1 },
          {
            scale: 0.6,
            opacity: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1.5,
            },
          }
        )

        // Each project panel fades in
        gsap.utils.toArray('.project-env').forEach((panel, i) => {
          gsap.fromTo(
            panel as Element,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: panel as Element,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      })
    })()

    return () => { if (ctx?.revert) ctx.revert() }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="py-32 px-[8vw] md:px-[12vw]">
      {/* Section header */}
      <div className="mb-20">
        <div
          className="mb-3"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }}
        >
          02 / SELECTED WORK
        </div>
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F4F1EA',
            lineHeight: 1,
          }}
        >
          SYSTEMS<br />BUILT
        </div>
      </div>

      {/* 01 — YAMINI */}
      <div className="project-env mb-2" style={{ opacity: 0 }}>
        <div
          className="relative overflow-hidden min-h-[520px] flex flex-col justify-end p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #050505 0%, #0a0f08 100%)',
            border: '1px solid rgba(244,241,234,0.06)',
          }}
        >
          {/* Map grid lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[20, 40, 60, 80].map(p => (
              <div key={p} className="absolute" style={{ top: `${p}%`, left: 0, right: 0, height: '1px', background: 'rgba(244,241,234,0.035)' }} />
            ))}
            {[20, 40, 60, 80].map(p => (
              <div key={p} className="absolute" style={{ left: `${p}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(244,241,234,0.035)' }} />
            ))}
          </div>

          {/* GPS dots */}
          <GpsDot x="25%" y="35%" delay={0} />
          <GpsDot x="55%" y="25%" delay={0.5} />
          <GpsDot x="40%" y="60%" delay={1} />
          <GpsDot x="70%" y="45%" delay={1.5} />
          <GpsDot x="30%" y="70%" delay={0.8} />

          {/* System network */}
          <div
            className="absolute top-8 right-10 hidden md:block"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: 'rgba(244,241,234,0.25)', lineHeight: 1.8 }}
          >
            GPS ──── ATTENDANCE<br />
            {'  '}|{'            '}|<br />
            {'  '}└── API ─────┘<br />
            {'        '}|<br />
            {'    '}POSTGRESQL
          </div>

          {/* Number */}
          <div
            className="absolute top-8 left-10"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.2)' }}
          >
            01 / PRODUCTION
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div
              className="mb-2"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)' }}
            >
              ENTERPRISE ERP
            </div>
            <div
              className="mb-1"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F4F1EA', lineHeight: 1 }}
            >
              YAMINI INFOTECH
            </div>
            <div
              className="mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 300, color: 'rgba(244,241,234,0.4)', lineHeight: 1 }}
            >
              ERP
            </div>
            <div className="flex items-center gap-4 flex-wrap mb-6">
              {['FASTAPI', 'POSTGRESQL', 'GPS', 'FLUTTER', 'PYTHON'].map(t => (
                <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(244,241,234,0.3)', borderBottom: '1px solid rgba(244,241,234,0.1)', paddingBottom: '2px' }}>{t}</span>
              ))}
            </div>
            <Link
              href="/work/yamini"
              className="magnetic inline-flex items-center gap-3 text-[#B8FF3D] hover:gap-5 transition-all"
              data-cursor="explore"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
            >
              EXPLORE CASE STUDY →
            </Link>
          </div>
        </div>
      </div>

      {/* 02 — KAVYA */}
      <div className="project-env mb-2" style={{ opacity: 0 }}>
        <div
          className="relative overflow-hidden min-h-[520px] flex flex-col justify-end p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #050505 0%, #080a10 100%)',
            border: '1px solid rgba(244,241,234,0.06)',
          }}
        >
          {/* Route network SVG */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(77,232,255,0.6)" />
              </marker>
            </defs>
            {/* Route lines */}
            <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="10%" y1="55%" x2="90%" y2="55%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="30%" y1="15%" x2="30%" y2="70%" stroke="#4DE8FF" strokeWidth="0.5" strokeDasharray="6 3" />
            <line x1="60%" y1="20%" x2="60%" y2="75%" stroke="#4DE8FF" strokeWidth="0.5" strokeDasharray="6 3" />
            {/* Nodes */}
            {[[10,30],[30,30],[60,30],[90,30],[10,55],[30,55],[60,55],[90,55]].map(([x,y], i) => (
              <circle key={i} cx={`${x}%`} cy={`${y}%`} r="5" fill="#4DE8FF" opacity="0.5" />
            ))}
          </svg>

          <div className="absolute top-8 left-10" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.2)' }}>
            02 / FLEET INTELLIGENCE
          </div>

          <div className="relative z-10">
            <div className="mb-2" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)' }}>
              LOGISTICS & FLEET
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F4F1EA', lineHeight: 1 }}>
              KAVYA TRANSPORTS
            </div>
            <div className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 300, color: 'rgba(244,241,234,0.4)', lineHeight: 1 }}>
              FLEET INTELLIGENCE
            </div>
            <div className="mb-6 mt-4" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: '#4DE8FF' }}>
              12 VEHICLES · REAL-TIME GPS · TRIP MANAGEMENT
            </div>
            <div className="flex items-center gap-4 flex-wrap mb-6">
              {['GPS', 'MAPS', 'FLEET', 'REALTIME'].map(t => (
                <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(244,241,234,0.3)', borderBottom: '1px solid rgba(244,241,234,0.1)', paddingBottom: '2px' }}>{t}</span>
              ))}
            </div>
            <Link
              href="/work/kavya"
              className="magnetic inline-flex items-center gap-3 text-[#4DE8FF] hover:gap-5 transition-all"
              data-cursor="explore"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
            >
              EXPLORE CASE STUDY →
            </Link>
          </div>
        </div>
      </div>

      {/* 03 — UZHAVAN */}
      <div className="project-env" style={{ opacity: 0 }}>
        <div
          className="relative overflow-hidden min-h-[520px] flex flex-col justify-end p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #050505 0%, #060f06 100%)',
            border: '1px solid rgba(244,241,234,0.06)',
          }}
        >
          {/* Crop rows */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${i * 9 + 2}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: `rgba(184,255,61,${0.02 + i * 0.003})`,
                }}
              />
            ))}
          </div>

          {/* Data flow */}
          <div
            className="absolute top-10 right-10 hidden md:flex items-center gap-2"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: 'rgba(244,241,234,0.2)', letterSpacing: '0.1em' }}
          >
            {['WEATHER', 'CROP', 'DISEASE', 'ML', 'RESULT'].map((n, i) => (
              <span key={n} className="flex items-center gap-2">
                {i > 0 && <span>→</span>}
                {n}
              </span>
            ))}
          </div>

          <div className="absolute top-8 left-10" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.2)' }}>
            03 / AI PLATFORM
          </div>

          <div className="relative z-10">
            <div className="mb-1" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '14px', color: '#B8FF3D', letterSpacing: '0.15em' }}>
              உழவன்
            </div>
            <div className="mb-2" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)' }}>
              AGRICULTURAL AI
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F4F1EA', lineHeight: 1 }}>
              UZHAVAN AI
            </div>
            <div className="mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 300, color: 'rgba(244,241,234,0.4)', lineHeight: 1 }}>
              INTELLIGENCE FOR THE FIELD
            </div>
            <div className="mt-4 mb-6" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(184,255,61,0.5)', maxWidth: '480px', lineHeight: 1.8 }}>
              Tamil-first agricultural intelligence: crop advisory, weather analysis,<br />
              disease detection, yield prediction. AI in the field, not just the lab.
            </div>
            <div className="flex items-center gap-4 flex-wrap mb-6">
              {['PYTHON', 'ML', 'NLP', 'COMPUTER VISION', 'TAMIL'].map(t => (
                <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(244,241,234,0.3)', borderBottom: '1px solid rgba(244,241,234,0.1)', paddingBottom: '2px' }}>{t}</span>
              ))}
            </div>
            <Link
              href="/work/uzhavan"
              className="magnetic inline-flex items-center gap-3 text-[#B8FF3D] hover:gap-5 transition-all"
              data-cursor="explore"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
            >
              EXPLORE CASE STUDY →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
