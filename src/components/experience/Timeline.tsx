'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { experience } from '@/data/content'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const
const N = experience.length

// Horizontal snap timeline. The <ol> is the semantic content; the rail and buttons are controls.
export default function Timeline() {
  const reduced = useReduced()
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [announce, setAnnounce] = useState('')
  const touched = useRef(false)
  const activeRef = useRef(0)
  const drag = useRef<{ x: number; left: number } | null>(null)

  const gutter = () => {
    const ol = trackRef.current?.firstElementChild as HTMLElement | null
    return ol ? parseFloat(getComputedStyle(ol).paddingLeft) || 0 : 0
  }

  const paint = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const ref = track.scrollLeft + gutter()
    let best = 0
    let bestD = Infinity
    itemRefs.current.forEach((li, i) => {
      if (!li) return
      const d = Math.abs(li.offsetLeft - ref) / (li.offsetWidth + 24)
      if (d < bestD) {
        bestD = d
        best = i
      }
      if (reduced) {
        li.style.opacity = ''
        li.style.transform = ''
      } else {
        const k = Math.min(d, 1)
        li.style.opacity = String(1 - 0.62 * k)
        li.style.transform = `scale(${1 - 0.07 * k})`
      }
    })
    if (best !== activeRef.current) {
      activeRef.current = best
      setActive(best)
      if (touched.current) {
        const e = experience[best]
        setAnnounce(`Station ${best + 1} of ${N}: ${e.org}, ${e.role}`)
      }
    }
  }, [reduced])

  useLayoutEffect(() => {
    paint()
  }, [paint])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), paint()))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [paint])

  const go = useCallback(
    (i: number) => {
      const track = trackRef.current
      const li = itemRefs.current[Math.max(0, Math.min(N - 1, i))]
      if (!track || !li) return
      touched.current = true
      track.scrollTo({
        left: li.offsetLeft - gutter(),
        behavior: reduced ? 'auto' : 'smooth',
      })
    },
    [reduced],
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') (e.preventDefault(), go(active + 1))
    else if (e.key === 'ArrowLeft') (e.preventDefault(), go(active - 1))
    else if (e.key === 'Home') (e.preventDefault(), go(0))
    else if (e.key === 'End') (e.preventDefault(), go(N - 1))
  }

  // Mouse drag; touch and trackpad scroll natively.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const track = trackRef.current
    if (!track) return
    drag.current = { x: e.clientX, left: track.scrollLeft }
    track.style.scrollSnapType = 'none'
    track.style.userSelect = 'none'
    track.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const track = trackRef.current
    if (!d || !track) return
    track.scrollLeft = d.left - (e.clientX - d.x)
  }
  const endDrag = () => {
    const track = trackRef.current
    if (!drag.current || !track) return
    drag.current = null
    track.style.scrollSnapType = ''
    track.style.userSelect = ''
    go(activeRef.current)
  }

  const pct = N > 1 ? (active / (N - 1)) * 100 : 0

  return (
    <div className="min-w-0">
      {/* Controls row */}
      <div className="flex items-center justify-between gap-4" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em' }}>
        <span aria-hidden="true" style={{ color: 'rgba(244,241,234,0.7)' }}>
          <span style={{ color: '#B8FF3D' }}>{String(active + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}
        </span>
        <div className="flex gap-2">
          {(['Previous', 'Next'] as const).map(dir => {
            const prev = dir === 'Previous'
            const disabled = prev ? active === 0 : active === N - 1
            return (
              <button
                key={dir}
                type="button"
                onClick={() => go(active + (prev ? -1 : 1))}
                disabled={disabled}
                aria-label={`${dir} station`}
                className="bg-transparent px-4 py-3 transition-opacity disabled:opacity-30 motion-reduce:transition-none"
                style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', color: '#F4F1EA', border: '1px solid var(--border)', minWidth: 48, minHeight: 44 }}
              >
                {prev ? '←' : '→'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Track: scrolls horizontally, bleeds to the viewport edges */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Experience timeline. Use left and right arrow keys, or swipe, to move between stations."
        tabIndex={0}
        data-cursor="media"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative mt-6 -mx-[6vw] snap-x snap-mandatory [--g:6vw] [--w:82vw] [scroll-padding-inline:var(--g)] md:[--g:7vw] md:[--w:min(58vw,720px)] overflow-x-auto overflow-y-hidden focus-visible:outline-offset-[-3px] md:-mx-[7vw]"
        style={{ scrollbarWidth: 'none', overscrollBehaviorX: 'contain', cursor: 'grab' }}
      >
        <ol
          className="m-0 flex w-max min-w-full list-none gap-3 p-0 md:gap-6"
          style={{ paddingInlineStart: 'var(--g)', paddingInlineEnd: 'calc(100vw - var(--w) - var(--g))' }}
        >
          {experience.map((e, i) => {
            const on = i === active
            return (
              <li
                key={e.id}
                ref={el => {
                  itemRefs.current[i] = el
                }}
                aria-current={on ? 'step' : undefined}
                className="shrink-0 snap-start py-2 motion-reduce:transition-none"
                style={{ width: 'var(--w)', transformOrigin: 'center', transition: reduced ? 'none' : 'opacity 0.2s' }}
              >
                <div className="pl-5 md:pl-8" style={{ borderLeft: `1px solid ${on ? 'rgba(184,255,61,0.5)' : 'var(--border)'}` }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em' }}>
                    <span style={{ color: on ? '#B8FF3D' : 'rgba(244,241,234,0.6)' }}>{e.kind}</span>
                    <span style={{ color: 'rgba(244,241,234,0.75)' }}>{e.period}</span>
                  </div>

                  <div
                    aria-hidden="true"
                    style={{
                      ...sans,
                      fontSize: 'clamp(4.5rem, 17vw, 10.5rem)',
                      fontWeight: 700,
                      lineHeight: 0.9,
                      letterSpacing: '-0.05em',
                      marginTop: 14,
                      color: on ? '#B8FF3D' : 'transparent',
                      WebkitTextStroke: on ? '0' : '1px rgba(244,241,234,0.4)',
                    }}
                  >
                    {e.year}
                  </div>

                  <h3 className="m-0 mt-5" style={{ ...mono, fontSize: 12, letterSpacing: '0.22em', fontWeight: 500, color: '#F4F1EA' }}>
                    <span className="sr-only">{e.year}. </span>
                    {e.org}
                  </h3>
                  <p className="m-0 mt-2" style={{ ...sans, fontSize: 'clamp(1.25rem, 2.6vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#F4F1EA' }}>
                    {e.role}
                  </p>

                  <ul className="m-0 mt-5 list-none p-0">
                    {e.bullets.map(b => (
                      <li
                        key={b}
                        className="py-3"
                        style={{ ...sans, fontSize: 15, lineHeight: 1.5, color: 'rgba(244,241,234,0.85)', borderTop: '1px solid var(--border)' }}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Rail: thin progress line with clickable year ticks */}
      <div className="relative mx-auto mt-8 max-w-[760px] px-3">
        <div aria-hidden="true" className="absolute left-3 right-3 top-[7px] h-px" style={{ background: 'var(--border)' }}>
          <div className="h-px motion-reduce:transition-none" style={{ width: `${pct}%`, background: '#B8FF3D', transition: reduced ? 'none' : 'width 0.4s ease' }} />
        </div>
        <div role="group" aria-label="Jump to station" className="relative flex justify-between">
          {experience.map((e, i) => {
            const on = i === active
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to ${e.year}, ${e.org}`}
                aria-current={on ? 'true' : undefined}
                className="flex flex-col items-center gap-2 bg-transparent px-3 pb-1 pt-0"
                style={{ minHeight: 44, minWidth: 44 }}
              >
                <span
                  aria-hidden="true"
                  className="block h-[15px] w-[15px] rounded-full"
                  style={{ background: on ? '#B8FF3D' : '#050505', border: `1px solid ${on ? '#B8FF3D' : 'rgba(244,241,234,0.5)'}` }}
                />
                <span aria-hidden="true" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: on ? '#B8FF3D' : 'rgba(244,241,234,0.7)' }}>
                  {e.year}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  )
}
