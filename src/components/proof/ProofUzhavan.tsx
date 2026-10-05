'use client'

import { useState, useEffect } from 'react'

type InputType = 'crop' | 'leaf' | 'weather' | 'ask'

interface Response {
  tamil: string
  english: string
  confidence: string
  stage: string
}

const responses: Record<InputType, Response> = {
  crop: {
    tamil: 'நெல் சாகுபடிக்கு இந்த காலம் ஏற்றது. மண் pH 6.5-7.0 இருக்க வேண்டும். விதைப்பு இடைவெளி 20×15 செ.மீ.',
    english: 'This season is suitable for paddy cultivation. Soil pH should be 6.5-7.0. Planting spacing: 20×15 cm.',
    confidence: '94%',
    stage: 'CROP DATABASE → LLM → TAMIL',
  },
  leaf: {
    tamil: 'தென்னை மரத்தில் வளைய புள்ளி நோய் கண்டறியப்பட்டது. தீர்வு: கோபர் சல்பர் (2.5 கி/லி) தெளிக்கவும்.',
    english: 'Ring spot disease detected in coconut tree. Treatment: Apply copper sulfate (2.5 g/L).',
    confidence: '87%',
    stage: 'VISION MODEL → DISEASE DB → LLM → TAMIL',
  },
  weather: {
    tamil: 'அடுத்த 3 நாட்களில் மழை வாய்ப்பு உள்ளது (70%). நீர்ப்பாசனம் குறைக்கவும். அறுவடை தள்ளிவைக்கவும்.',
    english: 'Rain expected in next 3 days (70%). Reduce irrigation. Delay harvest.',
    confidence: '91%',
    stage: 'WEATHER ENGINE → CROP CONTEXT → LLM → TAMIL',
  },
  ask: {
    tamil: 'நெல் விதைக்க சரியான நேரம் ஜூன்-ஜூலை மாதங்கள். வடகிழக்கு பருவமழைக்கு முன்பு விதைக்கவும்.',
    english: 'June-July are the right months for paddy sowing. Sow before the northeast monsoon.',
    confidence: '89%',
    stage: 'NLP PIPELINE → KNOWLEDGE BASE → LLM → TAMIL',
  },
}

const pipeline: Record<InputType, string[]> = {
  crop: ['FASTAPI BACKEND', 'CROP DATABASE', 'CONTEXT ENGINE', 'LLM LAYER', 'TAMIL OUTPUT'],
  leaf: ['FASTAPI BACKEND', 'VISION MODEL', 'DISEASE CLASSIFIER', 'LLM LAYER', 'TAMIL OUTPUT'],
  weather: ['FASTAPI BACKEND', 'WEATHER ENGINE', 'CROP CONTEXT', 'LLM LAYER', 'TAMIL OUTPUT'],
  ask: ['FASTAPI BACKEND', 'NLP PIPELINE', 'KNOWLEDGE BASE', 'LLM LAYER', 'TAMIL OUTPUT'],
}

const inputLabels: { type: InputType; icon: string; label: string }[] = [
  { type: 'crop', icon: '🌾', label: 'CROP ADVISORY' },
  { type: 'leaf', icon: '🍃', label: 'LEAF / DISEASE' },
  { type: 'weather', icon: '☁', label: 'WEATHER INTEL' },
  { type: 'ask', icon: '🗣', label: 'ASK IN TAMIL' },
]

export default function ProofUzhavan() {
  const [selected, setSelected] = useState<InputType | null>(null)
  const [activeStage, setActiveStage] = useState(-1)
  const [done, setDone] = useState(false)

  const runPipeline = (type: InputType) => {
    setSelected(type)
    setActiveStage(-1)
    setDone(false)
    const stages = pipeline[type]
    stages.forEach((_, i) => {
      setTimeout(() => {
        setActiveStage(i)
        if (i === stages.length - 1) {
          setTimeout(() => setDone(true), 500)
        }
      }, i * 500 + 100)
    })
  }

  return (
    <div
      className="w-full"
      style={{
        background: 'rgba(184,255,61,0.02)',
        border: '1px solid rgba(184,255,61,0.1)',
        padding: '32px',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#B8FF3D', marginBottom: '2px' }}>உழவன்</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8FF3D' }}>UZHAVAN // AI DECISION FLOW</div>
          <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)', marginTop: '4px' }}>
            ● DEMO · NOT CONNECTED TO PRODUCTION
          </div>
        </div>
      </div>

      {/* Input selection */}
      <div className="mb-8">
        <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.35)', marginBottom: '12px' }}>
          SELECT INPUT TYPE:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {inputLabels.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => runPipeline(type)}
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.1em',
                padding: '12px 8px',
                background: selected === type ? 'rgba(184,255,61,0.12)' : 'rgba(244,241,234,0.03)',
                border: `1px solid ${selected === type ? 'rgba(184,255,61,0.4)' : 'rgba(244,241,234,0.1)'}`,
                color: selected === type ? '#B8FF3D' : 'rgba(244,241,234,0.55)',
                cursor: 'none',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>{icon}</div>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline visualization */}
      {selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pipeline stages */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.35)', marginBottom: '12px' }}>
              PROCESSING PIPELINE:
            </div>
            <div className="flex flex-col">
              {pipeline[selected].map((stage, i) => (
                <div key={stage} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: '10px',
                        height: '10px',
                        background: i <= activeStage ? '#B8FF3D' : 'rgba(244,241,234,0.1)',
                        boxShadow: i === activeStage ? '0 0 12px #B8FF3D' : 'none',
                      }}
                    />
                    {i < pipeline[selected].length - 1 && (
                      <div
                        style={{
                          width: '1px',
                          height: '28px',
                          background: i < activeStage ? '#B8FF3D' : 'rgba(244,241,234,0.08)',
                          transition: 'background 0.3s',
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: i <= activeStage ? (i === pipeline[selected].length - 1 ? '#B8FF3D' : 'rgba(244,241,234,0.8)') : 'rgba(244,241,234,0.25)',
                      transition: 'color 0.3s',
                      fontWeight: i === activeStage ? 600 : 400,
                    }}
                  >
                    {stage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div>
            {done && selected ? (
              <div>
                <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#B8FF3D', marginBottom: '12px' }}>
                  RESPONSE:
                </div>
                {/* Tamil output */}
                <div
                  style={{
                    background: 'rgba(184,255,61,0.05)',
                    border: '1px solid rgba(184,255,61,0.15)',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(184,255,61,0.6)', marginBottom: '8px' }}>
                    தமிழில் பதில் (TAMIL):
                  </div>
                  <div style={{ fontSize: '13px', color: '#F4F1EA', lineHeight: 1.8, letterSpacing: '0.01em' }}>
                    {responses[selected].tamil}
                  </div>
                </div>
                {/* English */}
                <div style={{ fontSize: '11px', color: 'rgba(244,241,234,0.5)', lineHeight: 1.7, marginBottom: '12px' }}>
                  {responses[selected].english}
                </div>
                {/* Meta */}
                <div className="flex gap-6">
                  <div>
                    <div style={{ fontSize: '8px', color: 'rgba(244,241,234,0.3)', letterSpacing: '0.1em' }}>CONFIDENCE</div>
                    <div style={{ fontSize: '14px', color: '#B8FF3D', fontWeight: 600 }}>{responses[selected].confidence}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '8px', color: 'rgba(244,241,234,0.3)', letterSpacing: '0.1em' }}>PATH</div>
                    <div style={{ fontSize: '9px', color: 'rgba(244,241,234,0.5)' }}>{responses[selected].stage}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ paddingTop: '40px' }}>
                {activeStage >= 0 && (
                  <div style={{ fontSize: '10px', color: 'rgba(244,241,234,0.4)', letterSpacing: '0.1em' }}>
                    Processing{'.'.repeat((activeStage % 3) + 1)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!selected && (
        <div style={{ fontSize: '10px', color: 'rgba(244,241,234,0.3)', letterSpacing: '0.1em', padding: '20px 0' }}>
          SELECT AN INPUT TYPE ABOVE TO RUN THE AI PIPELINE →
        </div>
      )}
    </div>
  )
}
