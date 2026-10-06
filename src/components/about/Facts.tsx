import { education, person } from '@/data/content'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const DISCIPLINES = ['AI', 'BACKEND', 'SYSTEMS', 'PRODUCT']

const row = (label: string, value: string) => (
  <div className="grid gap-1 py-4 md:grid-cols-[130px_1fr] md:gap-6" style={{ borderTop: '1px solid var(--border)' }}>
    <dt style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>{label}</dt>
    <dd className="m-0" style={{ ...sans, fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', color: '#F4F1EA', lineHeight: 1.4 }}>{value}</dd>
  </div>
)

// Quiet hairline-ruled facts. Everything here comes from content.ts (resume).
export default function Facts() {
  return (
    <div className="max-w-[640px]">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Focus areas">
        {DISCIPLINES.map(d => (
          <li key={d} style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: '#F4F1EA', border: '1px solid var(--border)', padding: '6px 10px' }}>
            {d}
          </li>
        ))}
      </ul>

      <p className="m-0 mt-6 max-w-[52ch]" style={{ ...sans, fontSize: 'clamp(1rem, 1.25vw, 1.15rem)', lineHeight: 1.55, color: 'rgba(244,241,234,0.82)' }}>
        Computer Science and Engineering student with hands-on experience building backend systems and REST APIs for
        business clients. Built ERP and fleet management platforms using Java, Spring Boot, Python, FastAPI and PostgreSQL.
      </p>
      <p className="m-0 mt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.45)' }}>
        SOURCE · RESUME
      </p>

      <dl className="m-0 mt-8">
        {row('STUDYING', 'Computer Science + Artificial Intelligence')}
        {row('INSTITUTION', education.school)}
        {row('BASED IN', person.location)}
        {row('PROGRAMME', `Started ${education.started} · expected ${education.expected}`)}
        <div style={{ borderTop: '1px solid var(--border)' }} />
      </dl>
    </div>
  )
}
