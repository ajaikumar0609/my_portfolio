'use client'

import { useState } from 'react'

interface Skill {
  name: string
  usedIn: string[]
}

const orbits: { radius: number; speed: number; skills: Skill[] }[] = [
  {
    radius: 140,
    speed: 14,
    skills: [
      { name: 'AI', usedIn: ['UZHAVAN AI', 'ML Pipelines'] },
      { name: 'ML', usedIn: ['UZHAVAN AI', 'Dataset Pipelines'] },
      { name: 'CV', usedIn: ['UZHAVAN AI', 'Disease Detection'] },
      { name: 'NLP', usedIn: ['UZHAVAN AI', 'Tamil Language'] },
    ],
  },
  {
    radius: 200,
    speed: 22,
    skills: [
      { name: 'Python', usedIn: ['UZHAVAN AI', 'Yamini ERP', 'ML Pipelines'] },
      { name: 'FastAPI', usedIn: ['Yamini ERP', 'Kavya Fleet'] },
      { name: 'Java', usedIn: ['Spring Boot Projects'] },
      { name: 'JS', usedIn: ['Frontend Systems'] },
      { name: 'Flutter', usedIn: ['Yamini Mobile App'] },
    ],
  },
  {
    radius: 275,
    speed: 34,
    skills: [
      { name: 'PostgreSQL', usedIn: ['Yamini ERP', 'Kavya Fleet'] },
      { name: 'MongoDB', usedIn: ['Backend Services'] },
      { name: 'AWS', usedIn: ['Cloud Infrastructure'] },
      { name: 'GCP', usedIn: ['UZHAVAN AI', 'Vertex AI'] },
      { name: 'Vertex AI', usedIn: ['UZHAVAN AI'] },
      { name: 'NumPy', usedIn: ['ML Pipelines', 'Data Analysis'] },
    ],
  },
]

export default function SkillsOrbit() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
  const [paused, setPaused] = useState(false)

  return (
    <section className="py-32 px-[8vw] relative overflow-hidden" style={{ minHeight: '700px' }}>
      {/* Section label */}
      <div className="mb-16 text-center">
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }} className="mb-3">
          04 / TOOLS &amp; SKILLS
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 1 }}>
          THE STACK
        </div>
      </div>

      {/* Orbit system */}
      <div className="relative flex items-center justify-center" style={{ height: '620px' }}>
        {orbits.map((orbit, oi) => (
          <div
            key={oi}
            className="absolute rounded-full"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              border: '1px solid rgba(244,241,234,0.06)',
              animation: `orbitSpin ${orbit.speed}s linear infinite ${oi % 2 === 1 ? 'reverse' : ''}`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {orbit.skills.map((skill, si) => {
              const angle = (si / orbit.skills.length) * 360
              return (
                <div
                  key={skill.name}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateX(${orbit.radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
                    animation: `orbitSpin ${orbit.speed}s linear infinite ${oi % 2 === 1 ? '' : 'reverse'}`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredSkill(skill)
                    setHoverPos({ x: e.clientX, y: e.clientY })
                    setPaused(true)
                  }}
                  onMouseLeave={() => {
                    setHoveredSkill(null)
                    setPaused(false)
                  }}
                >
                  <span
                    className="cursor-none text-[rgba(244,241,234,0.5)] hover:text-[#B8FF3D] transition-colors whitespace-nowrap px-2 py-1"
                    style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.12em' }}
                  >
                    {skill.name}
                  </span>
                </div>
              )
            })}
          </div>
        ))}

        {/* Center */}
        <div className="absolute z-10 text-center pointer-events-none">
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F4F1EA',
            }}
          >
            AJAI
          </div>
          <div
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: '#B8FF3D',
              marginTop: '4px',
            }}
          >
            SYSTEM
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredSkill && (
        <div
          className="fixed z-[900] pointer-events-none"
          style={{
            left: hoverPos.x + 16,
            top: hoverPos.y - 60,
            background: 'rgba(5,5,5,0.95)',
            border: '1px solid rgba(184,255,61,0.25)',
            padding: '12px 16px',
            minWidth: '160px',
          }}
        >
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: '#B8FF3D', letterSpacing: '0.1em', marginBottom: '8px' }}>
            {hoveredSkill.name}
          </div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: 'rgba(244,241,234,0.4)', letterSpacing: '0.1em', marginBottom: '4px' }}>USED IN:</div>
          {hoveredSkill.usedIn.map(p => (
            <div key={p} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', color: 'rgba(244,241,234,0.6)', letterSpacing: '0.05em' }}>· {p}</div>
          ))}
        </div>
      )}
    </section>
  )
}
