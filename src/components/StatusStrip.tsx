'use client'

export default function StatusStrip() {
  return (
    <div
      className="w-full flex items-center justify-between flex-wrap gap-4 px-[8vw] py-4"
      style={{
        background: 'rgba(244,241,234,0.02)',
        borderTop: '1px solid rgba(244,241,234,0.07)',
        borderBottom: '1px solid rgba(244,241,234,0.07)',
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '10px',
        letterSpacing: '0.12em',
      }}
    >
      {/* Status */}
      <div className="flex items-center gap-2">
        <span
          className="w-[6px] h-[6px] rounded-full bg-[#B8FF3D] inline-block"
          style={{ animation: 'glowPulse 2s ease-in-out infinite' }}
        />
        <span style={{ color: '#B8FF3D' }}>SYSTEM ONLINE</span>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-3 flex-wrap">
        {['AI', 'BACKEND', 'FULL STACK', 'SYSTEMS', 'ML'].map(tag => (
          <span
            key={tag}
            style={{ color: 'rgba(244,241,234,0.35)' }}
          >
            [{tag}]
          </span>
        ))}
      </div>

      {/* Location */}
      <div style={{ color: 'rgba(244,241,234,0.3)' }}>
        INDIA / 2026 / AVAILABLE
      </div>
    </div>
  )
}
