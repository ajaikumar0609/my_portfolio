'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { projects, type ProjectId } from '@/data/content'
import { worldTheme } from '@/data/worlds'
import { openProject } from '@/lib/system'
import { logos } from '@/data/screenshots'
import { LogoPlate } from '@/components/worlds/Evidence'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

// Common frame for every project world: project switcher, hero, children, next-system strip.
// Each world supplies its own backdrop and sections, so they do not look alike.
export default function WorldShell({
  id,
  backdrop,
  heroExtra,
  anchor,
  children,
}: {
  id: ProjectId
  backdrop?: ReactNode
  heroExtra?: ReactNode
  /** The strongest real screenshot: the opening visual evidence for the project. */
  anchor?: ReactNode
  children: ReactNode
}) {
  const p = projects.find(x => x.id === id)!
  const theme = worldTheme[id]
  const idx = projects.findIndex(x => x.id === id)
  const next = projects[(idx + 1) % projects.length]

  return (
    <main
      id="main"
      data-world={id}
      className="relative min-h-screen w-full overflow-x-clip"
      style={{ background: theme.bg, ['--w-accent' as string]: theme.accent, ['--w-line' as string]: theme.line } as CSSProperties}
    >
      <header className="relative min-h-[92svh] px-[6vw] pb-[16svh] pt-[3.5svh] md:px-[7vw]" style={{ borderBottom: `1px solid ${theme.line}` }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{backdrop}</div>

        <nav aria-label="Projects" className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em' }}>
          <Link href="/#work" data-cursor="project" className="inline-block py-2" style={{ color: 'rgba(244,241,234,0.75)' }}>
            ← ALL WORK
          </Link>
          {projects.map(q => (
            <button
              key={q.id}
              type="button"
              onClick={() => (q.id === id ? undefined : openProject(q.id))}
              aria-current={q.id === id ? 'page' : undefined}
              data-cursor={q.id === id ? undefined : 'project'}
              className="bg-transparent px-0 py-2"
              style={{ color: q.id === id ? theme.accent : 'rgba(244,241,234,0.6)', letterSpacing: '0.2em', ...mono, fontSize: 10 }}
            >
              {q.index} {q.id.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className={`relative z-10 mt-[12svh] ${anchor ? 'lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12' : ''}`}>
          <div className="min-w-0">
          <div className="flex items-center gap-3">
            <LogoPlate src={logos[id].src} alt={logos[id].alt} size={52} />
            <p className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', color: theme.accent }}>
              {p.index} / 03 · {p.category}
            </p>
          </div>
          {heroExtra}
          <h1
            className="m-0 mt-4"
            style={{ ...sans, fontSize: anchor ? 'clamp(2.9rem, 6.4vw, 6.2rem)' : 'clamp(3.2rem, 11vw, 10rem)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.05em', color: '#F4F1EA' }}
          >
            {p.title[0]}
            <br />
            <span style={{ color: 'rgba(244,241,234,0.55)' }}>{p.title[1]}</span>
          </h1>
          <p className="m-0 mt-6 max-w-[34ch]" style={{ ...sans, fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)', fontWeight: 400, color: 'rgba(244,241,234,0.85)', lineHeight: 1.35 }}>
            {p.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ ...mono, fontSize: 11, letterSpacing: '0.18em' }}>
            <span style={{ color: theme.accent }}>● {p.status}</span>
            {p.period && <span style={{ color: 'rgba(244,241,234,0.65)' }}>{p.period}</span>}
          </div>
          <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
            {p.stack.map(t => (
              <li key={t} style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.8)', border: `1px solid ${theme.line}`, padding: '5px 9px' }}>
                {t.toUpperCase()}
              </li>
            ))}
          </ul>
          </div>
          {anchor && <div className="relative mt-10 min-w-0 lg:mt-2">{anchor}</div>}
        </div>
      </header>

      {children}

      <footer className="px-[6vw] py-[12svh] md:px-[7vw]" style={{ borderTop: `1px solid ${theme.line}` }}>
        <button
          type="button"
          onClick={() => openProject(next.id)}
          data-cursor="project"
          className="block w-full bg-transparent p-0 text-left"
        >
          <span style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.6)' }}>NEXT SYSTEM</span>
          <span className="mt-3 block" style={{ ...sans, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#F4F1EA' }}>
            {next.index} {next.name} →
          </span>
        </button>
      </footer>
    </main>
  )
}
