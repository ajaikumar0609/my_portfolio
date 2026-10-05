import Link from 'next/link'
import type { Metadata } from 'next'
import ProofUzhavanSection from '@/components/proof/ProofUzhavanSection'

export const metadata: Metadata = {
  title: 'UZHAVAN AI — Ajai Kumar',
  description: 'Tamil-first agricultural intelligence platform: crop advisory, weather analysis, disease detection, and yield prediction using ML and computer vision.',
}

const modules = [
  { icon: '☁', name: 'Weather Intelligence', desc: 'Real-time weather data integration with agricultural context: rain probability, temperature trends, irrigation recommendations.' },
  { icon: '🌾', name: 'Crop Advisory', desc: 'Crop-specific guidance based on season, soil type, and location. Variety selection, planting calendars, and care schedules.' },
  { icon: '🔬', name: 'Disease Detection', desc: 'Computer vision model trained on agricultural disease datasets. Farmers photograph leaves to identify disease, severity, and treatment.' },
  { icon: '📈', name: 'Yield Prediction', desc: 'ML models estimating yield based on crop variety, weather patterns, soil data, and historical performance in the region.' },
  { icon: '🗣', name: 'Tamil First', desc: 'All interfaces, advice, and outputs delivered in Tamil. Voice input support for farmers who prefer speaking over typing.' },
  { icon: '🤖', name: 'LLM Integration', desc: 'Large language model integration for natural conversation about agricultural problems. Context-aware, domain-grounded responses.' },
]

export default function UzhavanPage() {
  return (
    <main style={{ background: '#050505', color: '#F4F1EA', minHeight: '100vh', padding: '0 0 120px' }}>
      <div className="px-[8vw] pt-10">
        <Link href="/" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.35)', textDecoration: 'none' }}
          className="hover:text-[#B8FF3D] transition-colors">
          ← BACK
        </Link>
      </div>

      {/* Hero */}
      <div className="px-[8vw] pt-20 pb-24" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '8px' }}>
          03 / AI PLATFORM
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '20px', color: '#B8FF3D', marginBottom: '16px', letterSpacing: '0.1em' }}>
          உழவன்
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 9vw, 120px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F4F1EA', lineHeight: 0.9, marginBottom: '24px' }}>
          UZHAVAN<br /><span style={{ color: 'rgba(244,241,234,0.35)' }}>AI</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.4)', marginBottom: '8px' }}>
          Intelligence for the Field, Not Just the Lab
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'rgba(184,255,61,0.5)', letterSpacing: '0.1em' }}>
          ● IN DEVELOPMENT
        </div>
      </div>

      <div className="px-[8vw]">
        {/* Stack */}
        <div className="py-10 flex flex-wrap gap-4" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          {['PYTHON', 'ML', 'NLP', 'COMPUTER VISION', 'TAMIL', 'LLM', 'FASTAPI', 'VERTEX AI'].map(t => (
            <span key={t} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(244,241,234,0.4)', border: '1px solid rgba(244,241,234,0.1)', padding: '5px 12px' }}>{t}</span>
          ))}
        </div>

        {/* Problem */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>THE PROBLEM</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'rgba(244,241,234,0.6)', lineHeight: 1.85, maxWidth: '720px' }}>
            Most agricultural AI tools are built in English, tested in lab environments, and assume
            internet-connected smartphones with technical literacy. Tamil Nadu&rsquo;s farmers speak Tamil,
            work in fields with intermittent connectivity, and need advice that reflects their actual
            crops, soils, and climate &mdash; not generic guides.
            <br /><br />
            UZHAVAN AI is built to work in the real conditions of Tamil Nadu agriculture.
          </div>
        </div>

        {/* Data flow */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>DATA FLOW</div>
          <div className="flex items-center gap-0 flex-wrap">
            {['WEATHER', 'CROP DATA', 'DISEASE IMAGE', 'SOIL', 'LOCATION'].map((n, i) => (
              <div key={n} className="flex items-center gap-0">
                {i > 0 && <div style={{ width: '32px', height: '1px', background: 'rgba(184,255,61,0.3)' }} />}
                <div style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: '#B8FF3D',
                  border: '1px solid rgba(184,255,61,0.2)',
                  padding: '6px 10px',
                  background: 'rgba(184,255,61,0.04)',
                }}>
                  {n}
                </div>
              </div>
            ))}
            <div style={{ width: '32px', height: '1px', background: 'rgba(184,255,61,0.3)' }} />
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: '#050505',
              background: '#B8FF3D',
              padding: '6px 12px',
            }}>
              ML + LLM
            </div>
            <div style={{ width: '32px', height: '1px', background: 'rgba(184,255,61,0.3)' }} />
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: '#B8FF3D',
              border: '1px solid rgba(184,255,61,0.4)',
              padding: '6px 10px',
            }}>
              TAMIL ADVICE
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="py-16" style={{ borderBottom: '1px solid rgba(244,241,234,0.06)' }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '32px' }}>MODULES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(244,241,234,0.06)' }}>
            {modules.map(m => (
              <div key={m.name} className="p-8" style={{ background: '#050505' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{m.icon}</div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#F4F1EA', marginBottom: '10px' }}>{m.name}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', color: 'rgba(244,241,234,0.5)', lineHeight: 1.75 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="py-16">
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '16px' }}>ARCHITECTURE</div>
          <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'rgba(244,241,234,0.5)', lineHeight: 2, letterSpacing: '0.02em' }}>{`FARMER INPUT (Tamil voice / text / image)
        │
        ▼
FASTAPI BACKEND
        │
        ├── Vision Pipeline     Disease detection (CV model)
        │
        ├── NLP Pipeline        Tamil language understanding
        │
        ├── Weather Engine      Real-time + forecast data
        │
        ├── Crop Knowledge      Domain-specific database
        │
        └── LLM Layer          Grounded response generation
                 │
                 ▼
        TAMIL LANGUAGE RESPONSE
        (Text + Voice output)`}</pre>
        </div>
      </div>
      <ProofUzhavanSection />
    </main>
  )
}
