import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work — Ajai Kumar',
  description: 'Selected engineering work: Yamini Infotech ERP, Kavya Transports Fleet Intelligence, UZHAVAN AI.',
}

const works = [
  {
    num: '01',
    href: '/work/yamini',
    name: 'YAMINI INFOTECH ERP',
    type: 'ENTERPRISE ERP',
    desc: 'GPS tracking, automated attendance, and operations management for 247+ field employees.',
    stack: ['FASTAPI', 'POSTGRESQL', 'GPS', 'FLUTTER'],
    status: 'PRODUCTION',
    accent: '#B8FF3D',
  },
  {
    num: '02',
    href: '/work/kavya',
    name: 'KAVYA TRANSPORTS',
    type: 'FLEET INTELLIGENCE',
    desc: 'Real-time fleet tracking, trip management, and logistics operations platform.',
    stack: ['GPS', 'MAPS', 'FLEET', 'REALTIME'],
    status: 'PRODUCTION',
    accent: '#4DE8FF',
  },
  {
    num: '03',
    href: '/work/uzhavan',
    name: 'UZHAVAN AI',
    type: 'AGRICULTURAL AI',
    desc: 'Tamil-first intelligent platform: crop advisory, disease detection, yield prediction.',
    stack: ['PYTHON', 'ML', 'NLP', 'CV', 'TAMIL'],
    status: 'IN DEVELOPMENT',
    accent: '#B8FF3D',
  },
]

export default function WorkPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh', padding: '0 0 120px' }}>
      <div className="px-[8vw] pt-10">
        <Link href="/" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}>
          ← HOME
        </Link>
      </div>

      <div className="px-[8vw] pt-20 pb-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>
          SELECTED WORK
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 0.9 }}>
          SYSTEMS<br />BUILT
        </div>
      </div>

      <div className="px-[8vw]">
        {works.map((work, i) => (
          <Link
            key={work.num}
            href={work.href}
            className="block group"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="py-12 flex flex-col md:flex-row md:items-center gap-8 transition-all"
              style={{
                borderBottom: '1px solid rgba(244,241,234,0.06)',
                paddingLeft: '0',
              }}
            >
              {/* Number */}
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.2)', flexShrink: 0, width: '40px' }}>
                {work.num}
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: work.accent, opacity: 0.6, marginBottom: '6px' }}>
                  {work.type}
                </div>
                <div
                  className="group-hover:text-[#B8FF3D] transition-colors"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#F4F1EA', marginBottom: '8px' }}
                >
                  {work.name}
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', color: 'rgba(244,241,234,0.4)', lineHeight: 1.6 }}>
                  {work.desc}
                </div>
              </div>

              {/* Stack + status */}
              <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: work.status === 'PRODUCTION' ? '#B8FF3D' : 'rgba(244,241,234,0.3)' }}>
                  {work.status === 'PRODUCTION' && <span className="mr-2">●</span>}{work.status}
                </div>
                <div className="flex flex-wrap gap-2">
                  {work.stack.map(t => (
                    <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(244,241,234,0.25)', border: '1px solid rgba(244,241,234,0.08)', padding: '3px 8px' }}>{t}</span>
                  ))}
                </div>
                <div
                  className="group-hover:gap-3 transition-all"
                  style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.25)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  VIEW →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
