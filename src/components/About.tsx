'use client'

import Image from 'next/image'

const traits = ['SYSTEM THINKING', 'BACKEND ENGINEERING', 'AI / ML', 'PRODUCT DEV']

export default function About() {
  return (
    <section id="about" className="py-32 px-[8vw] md:px-[12vw]">
      {/* Opening statement */}
      <div className="mb-24 max-w-[900px]">
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#F4F1EA',
            lineHeight: 1.2,
          }}
        >
          "I LIKE BUILDING THINGS THAT HAVE TO WORK OUTSIDE THE DEMO."
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20">
        {/* Text */}
        <div>
          <div
            className="mb-3"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }}
          >
            03 / ABOUT
          </div>
          <div
            className="mb-5"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', color: 'rgba(244,241,234,0.65)', lineHeight: 1.85 }}
          >
            I&rsquo;m a Computer Science + AI student at Karunya Institute of Technology and Sciences,
            building production systems that operate in real operational environments &mdash; not just in
            controlled demos.
          </div>
          <div
            className="mb-5"
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', color: 'rgba(244,241,234,0.65)', lineHeight: 1.85 }}
          >
            At Yamini Infotech, I engineered a full ERP platform with real-time GPS tracking,
            automated attendance, and operations management for 247+ field employees &mdash; a system
            that runs continuously in production.
          </div>
          <div
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', color: 'rgba(244,241,234,0.65)', lineHeight: 1.85 }}
          >
            UZHAVAN AI is my current focus: a Tamil-first agricultural intelligence platform
            combining ML, computer vision, and domain knowledge to give real advice to real farmers.
            AI built for the field, not for the lab.
          </div>
        </div>

        {/* Photo with holographic treatment */}
        <div className="relative">
          <div
            className="relative overflow-hidden"
            style={{ border: '1px solid rgba(244,241,234,0.08)' }}
          >
            <Image
              src="/mypic.png"
              alt="Ajai Kumar N"
              width={500}
              height={650}
              className="w-full object-cover"
              style={{ filter: 'contrast(1.05) brightness(0.9)', display: 'block' }}
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(77,232,255,0.025) 2px, rgba(77,232,255,0.025) 4px)',
              }}
            />
            {/* Edge glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 60px rgba(184,255,61,0.05)' }}
            />
          </div>
          {/* Tag */}
          <div
            className="mt-4"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)' }}
          >
            AJAI KUMAR N · TIRUNELVELI, INDIA
          </div>
        </div>
      </div>

      {/* Trait blocks */}
      <div className="flex items-center flex-wrap gap-4 pt-8" style={{ borderTop: '1px solid rgba(244,241,234,0.06)' }}>
        {traits.map((trait, i) => (
          <div key={trait} className="flex items-center gap-4">
            {i > 0 && (
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', color: 'rgba(244,241,234,0.15)', fontWeight: 300 }}>+</span>
            )}
            <span
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: 'rgba(244,241,234,0.5)',
              }}
            >
              {trait}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
