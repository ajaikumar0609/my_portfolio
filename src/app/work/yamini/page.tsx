import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yamini Infotech ERP — Ajai Kumar',
  description: 'Enterprise workforce operations platform: GPS tracking, attendance automation, and operational dashboards for 247+ field employees.',
}

const challenges = [
  {
    title: 'Background GPS',
    desc: 'Maintaining continuous GPS tracking on Android while the app is backgrounded. Implemented a foreground service with persistent notification to prevent OS from killing the tracking process.',
  },
  {
    title: 'Authentication Lifecycle',
    desc: 'Secure JWT-based authentication with token refresh cycles, device binding, and session invalidation across mobile and web clients.',
  },
  {
    title: 'Offline GPS Queue',
    desc: 'When connectivity drops, GPS coordinates are queued locally and bulk-synced to the server when the connection is restored, preventing data loss in low-signal areas.',
  },
  {
    title: 'Route Segmentation',
    desc: 'Algorithms to intelligently split continuous GPS streams into meaningful route segments, identifying stops, travel periods, and deviations from expected paths.',
  },
  {
    title: 'High-Frequency Writes',
    desc: 'PostgreSQL schema and indexing strategy optimized for continuous high-frequency GPS writes from 247+ concurrent devices without query degradation.',
  },
  {
    title: 'Geofence Attendance',
    desc: 'Automated punch-in/punch-out logic using geofence detection — employees entering designated zones automatically trigger attendance records.',
  },
]

export default function YaminiPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh', padding: '0 0 120px' }}>
      {/* Back */}
      <div className="px-[8vw] pt-10 pb-0">
        <Link
          href="/"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}
          className="hover:text-[#B8FF3D] transition-colors"
        >
          ← BACK
        </Link>
      </div>

      {/* Hero */}
      <div className="px-[8vw] pt-20 pb-24" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>
          01 / ENTERPRISE ERP
        </div>
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(48px, 9vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F4F1EA',
            lineHeight: 0.9,
            marginBottom: '24px',
          }}
        >
          YAMINI<br />INFOTECH<br /><span style={{ color: 'rgba(244,241,234,0.35)' }}>ERP</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.4)', marginBottom: '8px' }}>
          Enterprise Workforce Operations Platform
        </div>
        <div className="flex items-center gap-2" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: '#B8FF3D' }}>
          <span className="w-[6px] h-[6px] rounded-full bg-[#B8FF3D] inline-block" />
          PRODUCTION / LIVE
        </div>
      </div>

      <div className="px-[8vw]">
        {/* Stack */}
        <div className="py-10 flex flex-wrap gap-4" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          {['FASTAPI', 'POSTGRESQL', 'GPS', 'FLUTTER', 'PYTHON', 'BACKGROUND SERVICES', 'ANDROID'].map(t => (
            <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(244,241,234,0.4)', border: '1px solid rgba(244,241,234,0.1)', padding: '5px 12px' }}>{t}</span>
          ))}
        </div>

        {/* Problem */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>PROBLEM</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(244,241,234,0.6)', lineHeight: 1.85, maxWidth: '720px' }}>
            Yamini Infotech operated across a large field workforce with no digital attendance system, manual GPS logging, and zero real-time visibility into employee location or activity. Supervisors had no way to monitor operations, verify attendance, or track field routes &mdash; everything was paper-based or phone-based.
          </div>
        </div>

        {/* Architecture */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>ARCHITECTURE</div>
          <pre
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '12px',
              color: 'rgba(244,241,234,0.5)',
              lineHeight: 2,
              letterSpacing: '0.02em',
            }}
          >{`FLUTTER MOBILE APP
        │
        ▼
FASTAPI BACKEND
        │
        ├── /auth          JWT + device binding
        │
        ├── /attendance    Geofence punch in/out
        │
        ├── /gps           Background location stream
        │
        └── /operations    Dashboard, reports, admin
                 │
                 ▼
          POSTGRESQL
          (GPS · Users · Routes · Attendance)`}</pre>
        </div>

        {/* Engineering Challenges */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '32px' }}>ENGINEERING</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {challenges.map(c => (
              <div key={c.title} className="p-8" style={{ background: '#050505' }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#F4F1EA', marginBottom: '10px' }}>
                  {c.title}
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: 'rgba(244,241,234,0.5)', lineHeight: 1.75 }}>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="py-16">
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '24px' }}>RESULT</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {[
              { num: '247+', label: 'Field Employees' },
              { num: 'Live', label: 'GPS Tracking' },
              { num: 'Auto', label: 'Attendance' },
              { num: '100%', label: 'Digital Ops' },
            ].map(stat => (
              <div key={stat.label} className="p-8 text-center" style={{ background: '#050505' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#B8FF3D', letterSpacing: '-0.02em' }}>{stat.num}</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)', marginTop: '6px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <a
            href="https://www.yaminicopier.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#B8FF3D', textDecoration: 'none' }}
          >
            VIEW CLIENT SITE ↗
          </a>
        </div>
      </div>
    </main>
  )
}
