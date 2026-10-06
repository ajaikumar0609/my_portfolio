'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { projects, type ProjectId } from '@/data/content'
import { worldTheme } from '@/data/worlds'
import { openProject } from '@/lib/system'
import { screenshots } from '@/data/screenshots'

const DomeGallery = dynamic(() => import('@/components/ui/DomeGallery'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center" style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.5)' }}>
      LOADING ARCHIVE
    </div>
  ),
})

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const tileSrc = (id: ProjectId, tile: string) => `/concept/${id}-${tile.toLowerCase()}.svg`

export default function SelectedSystems({ standalone = false }: { standalone?: boolean }) {
  const [hover, setHover] = useState<ProjectId | null>(null)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const q = window.matchMedia('(min-width: 768px) and (hover: hover)')
    const update = () => setDesktop(q.matches)
    update()
    q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])

  // REAL screenshot -> used directly. No real screenshot -> labelled CONCEPT tile. Never mixed up.
  const images = useMemo(
    () =>
      projects.flatMap(p =>
        screenshots[p.id].length
          ? screenshots[p.id].map(shot => ({ src: shot.tile, alt: shot.alt, project: p.id }))
          : p.tiles.map(t => ({ src: tileSrc(p.id, t), alt: `${p.name}: ${t} (concept visual)`, project: p.id })),
      ),
    [],
  )
  const realCount = projects.filter(p => screenshots[p.id].length).length
  const legend =
    realCount === 0
      ? 'TILES ARE CONCEPT VISUALS · NO REAL SCREENSHOTS'
      : realCount === projects.length
        ? 'REAL PROJECT SCREENSHOTS'
        : 'REAL SCREENSHOTS (PERSONAL DATA PIXELATED) · UZHAVAN TILES ARE LABELLED CONCEPT'

  return (
    <section
      id="work"
      data-nav="work"
      aria-label="Selected systems"
      className="relative w-full px-[6vw] py-[10svh] md:px-[7vw]"
      style={{ borderTop: '1px solid var(--border)', minHeight: standalone ? '100svh' : undefined }}
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.55)' }}>
          03 / WORK
        </p>
        <h2
          className="m-0 mt-5"
          style={{ ...sans, fontSize: 'clamp(2.4rem, 6vw, 5.6rem)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.035em' }}
        >
          SELECTED SYSTEMS
        </h2>
        <p className="m-0 mt-4" style={{ ...mono, fontSize: 12, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.7)' }}>
          SYSTEMS BUILT FOR REAL-WORLD USE.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(300px,0.85fr)_1.5fr] md:items-stretch">
          {/* Real controls: also the keyboard / screen-reader path to every project */}
          <ol className="m-0 flex list-none flex-col p-0" style={{ borderTop: '1px solid var(--border)' }}>
            {projects.map(p => {
              const theme = worldTheme[p.id]
              const on = hover === p.id
              const dim = hover && !on
              return (
                <li key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    type="button"
                    data-cursor="project"
                    onClick={() => openProject(p.id)}
                    onMouseEnter={() => setHover(p.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(p.id)}
                    onBlur={() => setHover(null)}
                    className="block w-full bg-transparent py-6 text-left"
                    style={{ opacity: dim ? 0.35 : 1, transition: 'opacity 0.3s' }}
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: on ? theme.accent : 'rgba(244,241,234,0.55)' }}>
                        {p.index} / 03
                      </span>
                      <span style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: on ? theme.accent : 'rgba(244,241,234,0.55)' }}>
                        {p.status}
                      </span>
                    </span>
                    <span
                      className="mt-3 block"
                      style={{ ...sans, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#F4F1EA' }}
                    >
                      {p.name}
                    </span>
                    <span className="mt-3 block" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.6)' }}>
                      {p.tiles.join(' · ')}
                    </span>
                    <span
                      className="mt-3 block"
                      style={{
                        ...mono,
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        color: theme.accent,
                        opacity: on ? 1 : 0.0,
                        transform: on ? 'none' : 'translateY(4px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                      }}
                    >
                      ENTER {p.title[0]} →
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Desktop: dome archive. Mobile: swipe strip. */}
          {desktop ? (
            <div
              className="relative hidden md:block"
              style={{ height: 'min(78svh, 760px)', border: '1px solid var(--border)', background: '#050505', overflow: 'hidden' }}
            >
              <DomeGallery
                images={images}
                grayscale={false}
                overlayBlurColor="#050505"
                segments={14}
                fit={1.15}
                minRadius={900}
                imageBorderRadius="6px"
                onOpenProject={id => openProject(id)}
                onHoverProject={id => setHover((id as ProjectId) ?? null)}
              />
              <div
                className="pointer-events-none absolute bottom-3 left-4 right-4 flex justify-between"
                style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.7)' }}
              >
                <span>DRAG TO EXPLORE · CLICK A TILE TO ENTER</span>
                <span>{legend}</span>
              </div>
            </div>
          ) : (
            <div
              className="-mx-[6vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[6vw] pb-2 md:hidden"
              style={{ scrollbarWidth: 'none' }}
              aria-label="Project strip, swipe sideways"
            >
              {projects.map(p => {
                const theme = worldTheme[p.id]
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => openProject(p.id)}
                    className="relative w-[78vw] shrink-0 snap-center bg-transparent p-0 text-left"
                    style={{ border: `1px solid ${theme.line}`, background: theme.bg }}
                  >
                    <span className="grid grid-cols-3 gap-px" aria-hidden="true">
                      {(screenshots[p.id].length
                        ? screenshots[p.id].slice(0, 6).map(shot => shot.tile)
                        : p.tiles.slice(0, 6).map(t => tileSrc(p.id, t))
                      ).map(src => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} src={src} alt="" loading="lazy" className="block aspect-square w-full object-cover" />
                      ))}
                    </span>
                    <span className="block p-4">
                      <span style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: theme.accent }}>{p.index} · {p.status}</span>
                      <span className="mt-2 block" style={{ ...sans, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: '#F4F1EA' }}>
                        {p.name}
                      </span>
                      <span className="mt-2 block" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.55)' }}>
                        {screenshots[p.id].length ? 'REAL SCREENSHOTS' : 'CONCEPT VISUALS · NO REAL SCREENSHOTS'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
