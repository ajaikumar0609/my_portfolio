'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    // Parallax on text
    if (textRef.current) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 24
      const ny = (e.clientY / window.innerHeight - 0.5) * 16
      textRef.current.style.transform = `translate(${nx}px, ${ny}px)`
    }
    // Store normalized mouse for 3D scene
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* Three.js canvas — full background */}
      {mounted && <HeroScene mouseRef={mouseRef} />}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[8vw] md:px-[12vw]">
        <div ref={textRef} style={{ transition: 'transform 0.1s linear', willChange: 'transform' }}>
          {/* Name */}
          <div
            className="leading-[0.85] font-bold select-none"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(72px, 14vw, 180px)',
              letterSpacing: '-0.03em',
              color: '#F4F1EA',
            }}
          >
            <div>AJAI</div>
            <div>KUMAR</div>
          </div>

          {/* Role */}
          <div
            className="mt-6"
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: '#B8FF3D',
            }}
          >
            AI ENGINEER / SYSTEM BUILDER
          </div>

          {/* Tagline */}
          <div
            className="mt-6 max-w-[420px]"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(15px, 2.2vw, 22px)',
              color: 'rgba(244,241,234,0.6)',
              lineHeight: 1.5,
            }}
          >
            I BUILD INTELLIGENT<br />
            SYSTEMS THAT OPERATE<br />
            IN THE REAL WORLD.
          </div>

          {/* CTAs */}
          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic px-6 py-3 text-[#050505] bg-[#B8FF3D] font-medium tracking-widest hover:bg-[#F4F1EA] transition-colors"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
            >
              VIEW WORK →
            </button>
            <a
              href="https://github.com/ajaikumarN"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic border border-[rgba(244,241,234,0.2)] px-6 py-3 text-[rgba(244,241,234,0.6)] hover:text-[#F4F1EA] hover:border-[#F4F1EA] transition-colors"
              style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
            >
              GITHUB ↗
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-[8vw] md:left-[12vw]"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(244,241,234,0.25)',
          }}
        >
          SCROLL ↓
        </div>
      </div>
    </section>
  )
}
