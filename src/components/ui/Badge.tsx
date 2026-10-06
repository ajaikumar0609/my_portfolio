type Kind = 'concept' | 'simulation' | 'simulated-data' | 'live'

const copy: Record<Kind, { text: string; hint: string }> = {
  concept: { text: 'CONCEPT', hint: 'Conceptual visualization, not a real screenshot' },
  simulation: { text: 'SIMULATION', hint: 'Interactive explanation, not connected to a live backend' },
  'simulated-data': { text: 'SIMULATED DATA', hint: 'Illustrative data, not from a real system' },
  live: { text: 'LIVE', hint: 'Documented as running in production' },
}

export default function Badge({ kind, className = '' }: { kind: Kind; className?: string }) {
  const { text, hint } = copy[kind]
  const active = kind === 'live'
  return (
    <span
      title={hint}
      aria-label={`${text}: ${hint}`}
      className={`inline-flex items-center gap-2 font-mono ${className}`}
      style={{
        fontSize: 10,
        letterSpacing: '0.18em',
        padding: '4px 8px',
        border: `1px solid ${active ? 'rgba(184,255,61,0.4)' : 'rgba(244,241,234,0.25)'}`,
        color: active ? '#B8FF3D' : 'rgba(244,241,234,0.7)',
        background: 'rgba(5,5,5,0.7)',
      }}
    >
      {text}
    </span>
  )
}
