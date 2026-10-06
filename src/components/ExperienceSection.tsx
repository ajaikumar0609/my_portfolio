import Timeline from '@/components/experience/Timeline'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      data-nav="about"
      aria-label="Experience"
      className="relative w-full overflow-x-clip px-[6vw] py-[10svh] md:px-[7vw]"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="mx-auto min-w-0 max-w-[1400px]">
        <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.55)' }}>
          06 / EXPERIENCE
        </p>
        <h2
          className="m-0 mt-5"
          style={{ ...sans, fontSize: 'clamp(2.4rem, 6vw, 5.6rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.035em' }}
        >
          EXPERIENCE
        </h2>
        <p className="m-0 mt-4" style={{ ...mono, fontSize: 12, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.7)' }}>
          EDUCATION · INTERNSHIPS · INDEPENDENT WORK · FROM THE RESUME
        </p>

        <div className="mt-10">
          <Timeline />
        </div>
      </div>
    </section>
  )
}
