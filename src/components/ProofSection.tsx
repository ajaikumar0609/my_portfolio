'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ProofGPS = dynamic(() => import('./proof/ProofGPS'), { ssr: false })
const ProofFleet = dynamic(() => import('./proof/ProofFleet'), { ssr: false })
const ProofUzhavan = dynamic(() => import('./proof/ProofUzhavan'), { ssr: false })

const tabs = [
  { id: 'gps', label: 'GPS OFFLINE QUEUE', sub: 'YAMINI · OFFLINE RESILIENCE' },
  { id: 'fleet', label: 'FLEET CONTROL', sub: 'KAVYA · LIVE OPERATIONS' },
  { id: 'uzhavan', label: 'UZHAVAN AI', sub: 'AGRICULTURAL DECISION FLOW' },
] as const

type Tab = typeof tabs[number]['id']

export default function ProofSection() {
  const [active, setActive] = useState<Tab>('gps')

  return (
    <section className="py-32 px-[8vw] md:px-[12vw]" style={{ borderTop: '1px solid rgba(244,241,234,0.08)' }}>
      {/* Header */}
      <div className="mb-12">
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', letterSpacing: '0.2em', color: '#B8FF3D' }} className="mb-4">
          03 / PROOF
        </div>
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F4F1EA',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          TOUCH THE<br />ENGINEERING
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'rgba(244,241,234,0.5)', letterSpacing: '0.05em', maxWidth: '480px', lineHeight: 1.7 }}>
          Don&rsquo;t just read about it. Interact with the actual engineering concepts behind each system.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-0 mb-8" style={{ borderBottom: '1px solid rgba(244,241,234,0.08)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="pb-4 pr-8 text-left"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: active === tab.id ? '2px solid #B8FF3D' : '2px solid transparent',
              marginBottom: '-1px',
              cursor: 'none',
            }}
          >
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: active === tab.id ? '#B8FF3D' : 'rgba(244,241,234,0.4)',
              marginBottom: '3px',
              transition: 'color 0.2s',
            }}>
              {tab.label}
            </div>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.12em',
              color: active === tab.id ? 'rgba(184,255,61,0.5)' : 'rgba(244,241,234,0.2)',
              transition: 'color 0.2s',
            }}>
              {tab.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Active demo */}
      {active === 'gps' && <ProofGPS />}
      {active === 'fleet' && <ProofFleet />}
      {active === 'uzhavan' && <ProofUzhavan />}
    </section>
  )
}
