'use client'

import { useState } from 'react'

export default function SystemHealth() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="fixed bottom-6 left-6 z-[700]"
      style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '9px',
        letterSpacing: '0.12em',
      }}
    >
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          background: 'rgba(5,5,5,0.92)',
          border: '1px solid rgba(244,241,234,0.1)',
          padding: expanded ? '14px 16px' : '8px 12px',
          cursor: 'none',
          display: 'block',
          textAlign: 'left',
          transition: 'padding 0.2s',
        }}
      >
        {expanded ? (
          <div>
            <div style={{ color: '#B8FF3D', marginBottom: '10px', letterSpacing: '0.2em' }}>AJAI.SYSTEM</div>
            <div style={{ height: '1px', background: 'rgba(244,241,234,0.06)', marginBottom: '10px' }} />
            {[
              { label: 'PORTFOLIO', value: '● ONLINE', color: '#B8FF3D' },
              { label: 'PROJECTS', value: '● 03', color: '#B8FF3D' },
              { label: 'UPDATED', value: 'OCT 2026', color: 'rgba(244,241,234,0.5)' },
            ].map(row => (
              <div key={row.label} className="flex justify-between gap-6 mb-2">
                <span style={{ color: 'rgba(244,241,234,0.3)' }}>{row.label}</span>
                <span style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: 'rgba(244,241,234,0.06)', marginTop: '8px', marginBottom: '8px' }} />
            <div style={{ color: 'rgba(244,241,234,0.25)' }}>⌘K SEARCH</div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#B8FF3D] inline-block" />
            <span style={{ color: 'rgba(244,241,234,0.4)' }}>AJAI.SYSTEM</span>
          </div>
        )}
      </button>
    </div>
  )
}
