import { uzhavan } from '@/data/worlds'
import { MONO_FONT } from './tamil'

export default function Metrics() {
  return (
    <dl className="m-0 grid gap-0 md:grid-cols-2">
      {uzhavan.metrics.map(m => (
        <div key={m.label} className="py-6 md:pr-8" style={{ borderTop: '1px solid var(--w-line)' }}>
          <dd
            className="m-0"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--w-accent)' }}
          >
            {m.value}
          </dd>
          <dt className="mt-3" style={{ fontFamily: MONO_FONT, fontSize: 11, letterSpacing: '0.18em', color: '#F4F1EA' }}>{m.label}</dt>
          <p className="m-0 mt-2" style={{ fontFamily: MONO_FONT, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}>SOURCE · RESUME</p>
        </div>
      ))}
    </dl>
  )
}
