import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kavya Transports Fleet — Ajai Kumar',
  description: 'Fleet intelligence platform: real-time GPS tracking, trip management, and logistics operations for transport fleet.',
}

export default function KavyaPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh', padding: '0 0 120px' }}>
      <div className="px-[8vw] pt-10">
        <Link href="/" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}
          className="hover:text-[#4DE8FF] transition-colors">
          ← BACK
        </Link>
      </div>

      {/* Hero */}
      <div className="px-[8vw] pt-20 pb-24" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF', marginBottom: '16px' }}>
          02 / FLEET INTELLIGENCE
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 9vw, 120px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 0.9, marginBottom: '24px' }}>
          KAVYA<br />TRANSPORTS<br /><span style={{ color: 'rgba(244,241,234,0.35)' }}>FLEET</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.4)' }}>
          Fleet Intelligence for Real-World Operations
        </div>
      </div>

      <div className="px-[8vw]">
        {/* Stack */}
        <div className="py-10 flex flex-wrap gap-4" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          {['GPS TRACKING', 'MAPS', 'FLEET MANAGEMENT', 'REAL-TIME', 'TRIP MANAGEMENT', 'LOGISTICS'].map(t => (
            <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(244,241,234,0.4)', border: '1px solid rgba(244,241,234,0.1)', padding: '5px 12px' }}>{t}</span>
          ))}
        </div>

        {/* Overview */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF', marginBottom: '16px' }}>OVERVIEW</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(244,241,234,0.6)', lineHeight: 1.85, maxWidth: '720px' }}>
            Kavya Transports required a complete fleet management system to provide real-time visibility
            into vehicle locations, streamline trip assignment and management, and give operations teams
            a live dashboard for the entire fleet. The system handles GPS data streams, trip lifecycle
            management, and logistics coordination.
          </div>
        </div>

        {/* Architecture */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF', marginBottom: '16px' }}>SYSTEM DESIGN</div>
          <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'rgba(244,241,234,0.5)', lineHeight: 2, letterSpacing: '0.02em' }}>{`VEHICLE TRACKER (GPS Device)
        │
        ▼
BACKEND API
        │
        ├── /vehicles      Real-time GPS ingest
        │
        ├── /trips         Trip assignment, status
        │
        ├── /routes        Route history, replay
        │
        └── /dashboard     Live fleet overview
                 │
                 ▼
          DATABASE
          (Vehicles · Trips · GPS History · Routes)`}</pre>
        </div>

        {/* Features */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF', marginBottom: '32px' }}>CAPABILITIES</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {[
              { title: 'Real-Time GPS', desc: 'Live position tracking for every vehicle in the fleet. Sub-second updates on active trips.' },
              { title: 'Trip Management', desc: 'Full trip lifecycle: assignment, active tracking, completion, history and reporting.' },
              { title: 'Route Intelligence', desc: 'Route recording, replay, and analysis. Identify deviations and optimize recurring routes.' },
              { title: 'Fleet Dashboard', desc: 'Operations overview: vehicle status, active trips, alerts, and daily summaries.' },
              { title: 'Driver Operations', desc: 'Driver assignment, trip acceptance, status updates and real-time communication.' },
              { title: 'Logistics Data', desc: 'Historical trip data for analysis, fuel tracking, and operational efficiency reporting.' },
            ].map(f => (
              <div key={f.title} className="p-8" style={{ background: '#050505' }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#F4F1EA', marginBottom: '10px' }}>{f.title}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: 'rgba(244,241,234,0.5)', lineHeight: 1.75 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet visualization */}
        <div className="py-16">
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#4DE8FF', marginBottom: '24px' }}>FLEET NETWORK</div>
          <div className="relative overflow-hidden p-10" style={{ background: 'rgba(77,232,255,0.02)', border: '1px solid rgba(77,232,255,0.08)', minHeight: '200px' }}>
            <svg className="w-full" style={{ height: '160px', opacity: 0.5 }}>
              {/* Route nodes */}
              {[[10,50],[30,20],[50,70],[70,30],[90,55]].map(([x,y], i) => (
                <circle key={i} cx={`${x}%`} cy={`${y}%`} r="6" fill="#4DE8FF" opacity="0.7" />
              ))}
              {/* Route lines */}
              <line x1="10%" y1="50%" x2="30%" y2="20%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
              <line x1="30%" y1="20%" x2="50%" y2="70%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
              <line x1="50%" y1="70%" x2="70%" y2="30%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
              <line x1="70%" y1="30%" x2="90%" y2="55%" stroke="#4DE8FF" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
            </svg>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(77,232,255,0.4)', textAlign: 'center' }}>
              CONCEPTUAL ROUTE VISUALIZATION · FLEET NETWORK
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
