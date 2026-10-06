'use client'

export default function Contact() {
  return (
    <section
      id="contact"
      data-nav="contact"
      className="relative flex flex-col items-center justify-center text-center"
      style={{ minHeight: '100svh', padding: '80px 8vw' }}
    >
      {/* Huge headline */}
      <div
        style={{
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontSize: 'clamp(52px, 10vw, 130px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#F4F1EA',
          lineHeight: 0.9,
          marginBottom: '48px',
        }}
      >
        LET&rsquo;S<br />BUILD.
      </div>

      {/* Sub */}
      <div
        className="mb-16"
        style={{
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: 'rgba(244,241,234,0.35)',
        }}
      >
        AJAI KUMAR / AI ENGINEER / BACKEND / SYSTEMS
      </div>

      {/* Contact links — scattered */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
        <a
          href="mailto:ajaikumar0609@gmail.com"
          className="magnetic group"
          data-cursor="explore"
          style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: 'rgba(244,241,234,0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            borderBottom: '1px solid transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#B8FF3D'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = '#B8FF3D'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(244,241,234,0.5)'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'
          }}
        >
          EMAIL ME →
        </a>
        <a
          href="https://linkedin.com/in/ajaikumarn"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic group"
          style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: 'rgba(244,241,234,0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            borderBottom: '1px solid transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#4DE8FF'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = '#4DE8FF'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(244,241,234,0.5)'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'
          }}
        >
          LINKEDIN ↗
        </a>
        <a
          href="https://github.com/ajaikumarN"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic group"
          style={{
            fontFamily: 'var(--font-ibm-plex-mono), monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: 'rgba(244,241,234,0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            borderBottom: '1px solid transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#F4F1EA'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(244,241,234,0.3)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(244,241,234,0.5)'
            ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'
          }}
        >
          GITHUB ↗
        </a>
      </div>

      {/* Location / availability */}
      <div
        className="mt-16"
        style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.2)' }}
      >
        INDIA · 2026 · SOFTWARE ENGINEERING
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-8"
        style={{
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'rgba(244,241,234,0.15)',
        }}
      >
        © 2026 AJAI KUMAR
      </div>
    </section>
  )
}
