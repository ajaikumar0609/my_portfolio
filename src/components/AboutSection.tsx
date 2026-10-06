import Portrait from '@/components/about/Portrait'
import Statement from '@/components/about/Statement'
import Facts from '@/components/about/Facts'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

// WHO IS AJAI? Editorial composition: the statement sits behind the portrait, facts stay quiet.
export default function AboutSection() {
  return (
    <section
      id="about"
      data-nav="about"
      aria-label="About"
      className="relative w-full overflow-x-clip px-[6vw] pb-[12svh] pt-[10svh] md:min-h-[112svh] md:px-[7vw]"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.55)' }}>
        05 / ABOUT
      </p>
      <h2 className="m-0 mt-3" style={{ ...mono, fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)', letterSpacing: '0.24em', color: '#F4F1EA', fontWeight: 500 }}>
        WHO IS AJAI?
      </h2>

      <Portrait />

      <div className="relative mx-auto mt-[44svh] max-w-[1400px] md:mt-[9svh]">
        <Statement />
        <div className="relative z-30 mt-10 md:mt-[9svh] md:max-w-[50%]">
          <Facts />
        </div>
      </div>
    </section>
  )
}
