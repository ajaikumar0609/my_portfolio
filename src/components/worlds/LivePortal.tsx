'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { liveSites, type LiveId } from '@/data/live'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox'
const LOAD_TIMEOUT_MS = 15000

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

// The company's real public website, embedded as a window into the project world.
// The iframe is only mounted when the portal approaches the viewport, nothing sits on top of it,
// and the pointer effects live on the frame around it: the site itself is never tilted or intercepted.
export default function LivePortal({ id }: { id: LiveId }) {
  const site = liveSites[id]
  const reduced = useReduced()
  const uid = useId()

  const stageRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const moveRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  const [armed, setArmed] = useState(false)
  const [entered, setEntered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [full, setFull] = useState(false)

  // Mount the iframe late, play the entrance once.
  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    const near = new IntersectionObserver(
      es => es.some(e => e.isIntersecting) && (setArmed(true), near.disconnect()),
      { rootMargin: '320px 0px' },
    )
    const inView = new IntersectionObserver(
      es => es.some(e => e.isIntersecting) && (setEntered(true), inView.disconnect()),
      { threshold: 0.3 },
    )
    near.observe(el)
    inView.observe(el)
    return () => {
      near.disconnect()
      inView.disconnect()
    }
  }, [])

  // If the site has not signalled load in time, say so and keep the real link prominent.
  useEffect(() => {
    if (!armed || loaded) return
    const t = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [armed, loaded])

  // Pointer depth: the frame leans a few pixels toward the pointer; an edge highlight follows it.
  useEffect(() => {
    const stage = stageRef.current
    const move = moveRef.current
    const frame = frameRef.current
    if (!stage || !move || !frame || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    let px = 0
    let py = 0
    let on = false

    const paint = () => {
      raf = 0
      const r = frame.getBoundingClientRect()
      const nx = clamp((px - (r.left + r.width / 2)) / (r.width / 2), -1.2, 1.2)
      const ny = clamp((py - (r.top + r.height / 2)) / (r.height / 2), -1.2, 1.2)
      const dx = Math.max(r.left - px, 0, px - r.right)
      const dy = Math.max(r.top - py, 0, py - r.bottom)
      const near = clamp(1 - Math.hypot(dx, dy) / 180, 0, 1)
      move.style.transform = on
        ? `perspective(1400px) translate3d(${(nx * 6).toFixed(2)}px, ${(ny * 4).toFixed(2)}px, 0) rotateY(${(nx * 1.1).toFixed(3)}deg) rotateX(${(-ny * 0.8).toFixed(3)}deg)`
        : 'none'
      frame.style.setProperty('--gx', `${px - r.left}px`)
      frame.style.setProperty('--gy', `${py - r.top}px`)
      frame.style.setProperty('--glow', on ? near.toFixed(3) : '0')
    }
    const queue = () => !raf && (raf = requestAnimationFrame(paint))
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      px = e.clientX
      py = e.clientY
      on = true
      queue()
    }
    const onLeave = () => {
      on = false
      queue()
    }
    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      move.style.transform = 'none'
    }
  }, [reduced])

  // Scroll-driven arrival and departure: opacity, scale, slight Y and a short blur that clears early.
  const { scrollYProgress } = useScroll({ target: shellRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.93, 1, 1, 0.965])
  const y = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [48, 0, 0, -24])
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0.82])
  const blurPx = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, 1.5])
  const filter = useTransform(blurPx, b => (b < 0.25 ? 'none' : `blur(${b.toFixed(1)}px)`))

  // Fullscreen overlay: Escape closes, focus returns to the opener, page scroll is locked meanwhile.
  const closeFull = useCallback(() => setFull(false), [])
  useEffect(() => {
    if (!full) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeFull()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const opener = openerRef.current
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [full, closeFull])

  // The custom cursor lives in this document; hide it while the pointer is inside the site.
  const hideCursor = () => document.documentElement.dispatchEvent(new Event('pointerleave'))

  const headingId = `${uid}-h`
  const descId = `${uid}-d`
  const frameH = 'h-[62svh] md:h-[clamp(520px,72svh,820px)]'
  const play = entered && !reduced

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={descId}
      className="relative px-[4vw] py-[11svh]"
      style={{ borderBottom: '1px solid var(--w-line)' }}
    >
      <style>{`
        @keyframes portalScan{0%{top:-2px;opacity:0}12%{opacity:1}88%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes portalDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
        @keyframes portalTravel{0%{transform:translateY(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(64px);opacity:0}}
        @keyframes portalRail{from{transform:scaleX(0);opacity:0}to{transform:scaleX(1);opacity:1}}
        @keyframes portalFocus{from{filter:blur(7px);opacity:.35}to{filter:blur(0);opacity:1}}
      `}</style>

      <div ref={stageRef} className="mx-auto w-full max-w-[1500px] py-6 md:px-[3vw]">
        <div className="mx-auto md:w-[min(85vw,1400px)]" style={{ maxWidth: '100%' }}>
          <h2 id={headingId} className="m-0" style={{ ...mono, fontSize: 11, letterSpacing: '0.24em', color: 'var(--w-accent)', fontWeight: 500 }}>
            LIVE SYSTEM / PUBLIC WEB EXPERIENCE
          </h2>
          <p className="m-0 mt-3" style={{ ...sans, fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 600, letterSpacing: '-0.01em', color: '#F4F1EA' }}>
            {site.caption}
          </p>
          <p id={descId} className="m-0 mt-3 max-w-[64ch]" style={{ ...sans, fontSize: 15, lineHeight: 1.55, color: 'rgba(244,241,234,0.78)' }}>
            The real public website at {site.domain}, loaded from its own address. It is the company&apos;s public web presence, separate from the engineering case study above, and you can scroll and use it directly.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="project"
              className="inline-flex items-center gap-2 px-4"
              style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', minHeight: 44, color: '#050505', background: 'var(--w-accent)', border: '1px solid var(--w-accent)' }}
            >
              OPEN LIVE WEBSITE <span aria-hidden="true">↗</span>
              <span className="sr-only">({site.domain}, opens in a new tab)</span>
            </a>
            <button
              ref={openerRef}
              type="button"
              onClick={() => setFull(true)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 bg-transparent px-4"
              style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', minHeight: 44, color: '#F4F1EA', border: '1px solid rgba(244,241,234,0.4)' }}
            >
              ENTER EXPERIENCE <span aria-hidden="true">⤢</span>
            </button>
          </div>
        </div>

        {/* Signal: one thin line travels from the case study above toward the portal, once. */}
        <div aria-hidden="true" className="relative mx-auto h-16 w-px md:mt-2">
          <svg width="1" height="64" viewBox="0 0 1 64" className="absolute inset-0 overflow-visible">
            <path d="M0.5 0 V64" pathLength={1} stroke="var(--w-accent)" strokeOpacity={0.7} strokeWidth={1} fill="none" strokeDasharray={1} style={play ? { strokeDashoffset: 1, animation: 'portalDraw 0.9s ease-out 0.1s forwards' } : { strokeDashoffset: reduced ? 0 : 1 }} />
          </svg>
          {play && <span className="absolute -left-[2px] top-0 h-1 w-1 rounded-full" style={{ background: 'var(--w-accent)', boxShadow: '0 0 8px var(--w-accent)', animation: 'portalTravel 0.9s ease-out 0.1s both' }} />}
        </div>

        <div ref={shellRef} className="relative mx-auto md:w-[min(85vw,1400px)]" style={{ maxWidth: '100%' }}>
          {/* World lines reconnect to the frame's top bar */}
          <span aria-hidden="true" className="pointer-events-none absolute right-full top-[22px] hidden h-px w-[7vw] origin-right md:block" style={{ background: 'linear-gradient(to left, var(--w-accent), transparent)', opacity: play || reduced ? 1 : 0, animation: play ? 'portalRail 0.8s ease-out 0.5s both' : undefined }} />
          <span aria-hidden="true" className="pointer-events-none absolute left-full top-[22px] hidden h-px w-[7vw] origin-left md:block" style={{ background: 'linear-gradient(to right, var(--w-accent), transparent)', opacity: play || reduced ? 1 : 0, animation: play ? 'portalRail 0.8s ease-out 0.5s both' : undefined }} />

          <motion.div style={reduced ? undefined : { scale, y, opacity, filter, transformOrigin: '50% 0%' }}>
            <div ref={moveRef} style={{ willChange: 'auto', transition: 'transform 0.35s cubic-bezier(.2,.7,.2,1)' }}>
              <div
                ref={frameRef}
                className="relative flex flex-col overflow-hidden rounded-[10px]"
                style={{
                  background: '#0a0a0a',
                  border: '1px solid var(--w-line)',
                  boxShadow: '0 30px 90px -30px rgba(0,0,0,0.9), 0 0 70px -24px var(--w-accent)',
                  ['--glow' as string]: 0,
                }}
              >
                {/* Minimal browser bar */}
                <div className="flex h-11 shrink-0 items-center gap-3 px-3" style={{ background: 'rgba(14,14,14,0.96)', borderBottom: '1px solid var(--w-line)' }}>
                  <span aria-hidden="true" className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="block h-2.5 w-2.5 rounded-full" style={{ background: 'rgba(244,241,234,0.16)' }} />
                    ))}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-center gap-2" style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(244,241,234,0.85)' }}>
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#B8FF3D', boxShadow: '0 0 8px #B8FF3D' }} />
                    <span style={{ color: '#B8FF3D' }}>LIVE</span>
                    <span className="truncate">{site.domain}</span>
                  </span>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="project"
                    className="inline-flex shrink-0 items-center px-2"
                    style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', minHeight: 32, color: 'var(--w-accent)' }}
                  >
                    OPEN <span aria-hidden="true">&nbsp;↗</span>
                    <span className="sr-only"> {site.domain} in a new tab</span>
                  </a>
                </div>

                {/* The window itself */}
                <div className={`relative w-full ${frameH}`} onMouseEnter={hideCursor} style={play ? { animation: 'portalFocus 1s ease-out 0.35s both' } : undefined}>
                  {!loaded && (
                    <div className="absolute inset-0">
                      <Image src={site.preview.src} alt={site.preview.alt} width={site.preview.width} height={site.preview.height} sizes="(max-width: 768px) 92vw, 85vw" className="h-full w-full object-cover object-top" />
                      <span className="absolute bottom-3 left-3 px-2 py-1" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: '#F4F1EA', background: 'rgba(5,5,5,0.82)', border: '1px solid var(--w-line)' }}>
                        {failed ? 'LIVE WEBSITE PREVIEW · COULD NOT LOAD IN THIS WINDOW' : armed ? 'CONNECTING TO LIVE WEBSITE…' : 'LIVE WEBSITE PREVIEW'}
                      </span>
                    </div>
                  )}
                  {armed && !failed && (
                    <iframe
                      src={site.url}
                      title={site.title}
                      loading="lazy"
                      sandbox={SANDBOX}
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={() => setLoaded(true)}
                      className="absolute inset-0 h-full w-full border-0"
                      style={{ background: '#fff', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                    />
                  )}
                  {failed && !loaded && (
                    <div className="absolute inset-0 grid place-items-center p-6 text-center" style={{ background: 'rgba(5,5,5,0.55)' }}>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5" style={{ ...mono, fontSize: 12, letterSpacing: '0.18em', minHeight: 48, color: '#050505', background: 'var(--w-accent)' }}>
                        OPEN LIVE WEBSITE <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* One scan pass on arrival. Never over the site's pointer events. */}
                {play && (
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 z-10 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--w-accent), transparent)', boxShadow: '0 0 16px 2px var(--w-accent)', animation: 'portalScan 1.3s ease-in-out 0.25s both' }} />
                )}

                {/* Edge light that follows the pointer (desktop, fine pointers only) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 rounded-[10px]"
                  style={{
                    padding: 1,
                    background: 'radial-gradient(260px circle at var(--gx, 50%) var(--gy, 0px), var(--w-accent), transparent 70%)',
                    opacity: 'var(--glow)' as unknown as number,
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {full && (
        <div role="dialog" aria-modal="true" aria-label={`${site.title}, full window`} data-lenis-prevent className="fixed inset-0 z-[10020] flex flex-col" style={{ background: '#050505' }}>
          <div className="flex h-12 shrink-0 items-center gap-3 px-3" style={{ borderBottom: '1px solid var(--w-line)', ...mono, fontSize: 11, letterSpacing: '0.14em', color: '#F4F1EA' }}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: '#B8FF3D', boxShadow: '0 0 8px #B8FF3D' }} />
            <span style={{ color: '#B8FF3D' }}>LIVE</span>
            <span className="min-w-0 flex-1 truncate">{site.domain}</span>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2" style={{ minHeight: 44, color: 'var(--w-accent)' }}>
              OPEN LIVE WEBSITE ↗
            </a>
            <button type="button" autoFocus onClick={closeFull} className="inline-flex items-center bg-transparent px-3" style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', minHeight: 44, color: '#F4F1EA', border: '1px solid rgba(244,241,234,0.4)' }}>
              CLOSE <span aria-hidden="true">&nbsp;✕</span>
            </button>
          </div>
          <iframe src={site.url} title={`${site.title} (full window)`} sandbox={SANDBOX} referrerPolicy="strict-origin-when-cross-origin" className="min-h-0 w-full flex-1 border-0" style={{ background: '#fff' }} />
        </div>
      )}
    </section>
  )
}
