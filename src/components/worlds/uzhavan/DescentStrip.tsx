import { MONO_FONT, TAMIL_FONT } from './tamil'

const steps = [
  { n: '01', en: 'FIELD', ta: 'வயல்', glyph: 'field' },
  { n: '02', en: 'CROP', ta: 'பயிர்', glyph: 'crop' },
  { n: '03', en: 'LEAF', ta: 'இலை', glyph: 'leaf' },
  { n: '04', en: 'AI', ta: 'செயற்கை நுண்ணறிவு', glyph: 'ai' },
] as const

function Glyph({ kind }: { kind: (typeof steps)[number]['glyph'] }) {
  const c = '#D8B35A'
  return (
    <svg aria-hidden="true" focusable="false" width="120" height="56" viewBox="0 0 120 56" fill="none" stroke={c} strokeWidth="1.2">
      {kind === 'field' && [8, 24, 40, 56, 72, 88, 104].map(x => <line key={x} x1="60" y1="2" x2={x} y2="54" strokeOpacity="0.7" />)}
      {kind === 'crop' && [14, 32, 50, 68, 86, 104].map((x, i) => <line key={x} x1={x} y1="54" x2={x} y2={14 + (i % 3) * 9} strokeOpacity="0.8" />)}
      {kind === 'leaf' && (
        <g strokeOpacity="0.8">
          <line x1="60" y1="52" x2="60" y2="6" />
          {[14, 24, 34, 44].map(y => (
            <g key={y}>
              <line x1="60" y1={y + 6} x2="40" y2={y - 4} />
              <line x1="60" y1={y + 6} x2="80" y2={y - 4} />
            </g>
          ))}
        </g>
      )}
      {kind === 'ai' && (
        <g>
          {[[20, 40, 60, 14], [60, 14, 100, 40], [20, 40, 100, 40], [60, 14, 60, 48], [20, 40, 60, 48], [60, 48, 100, 40]].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} strokeOpacity="0.45" />
          ))}
          {[[20, 40], [60, 14], [100, 40], [60, 48]].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={c} stroke="none" />
          ))}
        </g>
      )}
    </svg>
  )
}

export default function DescentStrip() {
  return (
    <ol className="m-0 grid list-none grid-cols-2 gap-px p-0 md:grid-cols-4" style={{ background: 'var(--w-line)' }}>
      {steps.map(s => (
        <li key={s.n} className="p-5" style={{ background: '#0a0803' }}>
          <span style={{ fontFamily: MONO_FONT, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.6)' }}>
            {s.n} · {s.en}
          </span>
          <div className="mt-4">
            <Glyph kind={s.glyph} />
          </div>
          <span lang="ta" className="mt-4 block" style={{ fontFamily: TAMIL_FONT, fontSize: 18, lineHeight: 1.7, color: '#F4F1EA' }}>
            {s.ta}
          </span>
        </li>
      ))}
    </ol>
  )
}
