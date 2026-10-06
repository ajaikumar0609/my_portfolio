'use client'

import ContactBackdrop from '@/components/contact/ContactBackdrop'
import ContactLink from '@/components/contact/ContactLink'
import CopyEmail from '@/components/contact/CopyEmail'
import { person } from '@/data/content'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const EMAIL_ID = 'contact-email-text'

export default function ContactSection() {
  const reduced = useReduced()

  return (
    <section
      id="contact"
      data-nav="contact"
      aria-label="Contact"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-[6vw] pb-[112px] pt-[8svh] md:px-[7vw]"
      style={{ background: '#050505', borderTop: '1px solid var(--border)' }}
    >
      <ContactBackdrop reduced={reduced} />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-8 md:grid-cols-[1.05fr_1fr] md:items-end md:gap-14">
        <div className="min-w-0">
          <h2
            className="m-0 text-[22vw] md:text-[clamp(3.4rem,11.5vw,11rem)]"
            style={{ ...sans, fontWeight: 700, lineHeight: 0.86, letterSpacing: '-0.05em', color: '#F4F1EA' }}
          >
            <span className="block">LET&apos;S</span>
            <span className="block">BUILD.</span>
          </h2>
          <p className="m-0 mt-5" style={{ ...mono, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.85)' }}>
            AJAI KUMAR / AI ENGINEER / BACKEND / SYSTEMS
          </p>
          <p className="m-0 mt-2" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>
            {person.meta}
          </p>
        </div>

        <div className="min-w-0">
          <nav aria-label="Contact links">
            <ContactLink index="01" label="EMAIL" hint={person.email} hintId={EMAIL_ID} href={`mailto:${person.email}`} cursor="email" reduced={reduced} />
            <ContactLink index="02" label="LINKEDIN" hint="LINKEDIN.COM/IN/AJAIKUMARN" href={person.linkedin} cursor="email" reduced={reduced} external />
            <ContactLink index="03" label="GITHUB" hint="GITHUB.COM/AJAIKUMARN" href={person.github} cursor="github" reduced={reduced} external />
            <ContactLink index="04" label="RESUME" hint="PDF" href={person.resume} cursor="resume" reduced={reduced} external download />
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </nav>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <CopyEmail email={person.email} targetId={EMAIL_ID} />
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}>
              © 2026 AJAI KUMAR
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
