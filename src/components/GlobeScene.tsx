'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import createGlobe, { type Globe } from 'cobe'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReduced } from '@/lib/useReduced'
import { openProject } from '@/lib/system'
import { projects, type ProjectId } from '@/data/content'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

// Tirunelveli (resume location). The marker is the base of operations, not a project site.
const INDIA: [number, number] = [8.7139, 77.7567]

type RGB = [number, number, number]
const ON: RGB = [0.72, 1, 0.24]

// The globe carries exactly one geographic marker. Projects are never placed on the map:
// they appear as an abstract screen-space ring of system links attached to India (see Halo).
const scene = (active: ProjectId | null) => ({
  markers: [{ location: INDIA, size: active ? 0.05 : 0.04, id: 'india' }],
})

const focusAngles = ([lat, lng]: [number, number]) => ({
  phi: Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  theta: (lat * Math.PI) / 180,
})

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))

export default function GlobeScene() {
  const reduced = useReduced()
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const [node, setNode] = useState<ProjectId | null>(null)
  const [leaving, setLeaving] = useState(false)
  const focusRef = useRef(false)
  const nodeRef = useRef<ProjectId | null>(null)
  const kickRef = useRef<() => void>(() => {})
  const haloRef = useRef<HTMLDivElement>(null)
  nodeRef.current = node

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 40%'] })
  const enter = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(enter, [0, 1], [0.88, 1])

  useEffect(() => kickRef.current(), [node])

  useEffect(() => {
    const canvas = canvasRef.current
    const box = boxRef.current
    if (!canvas || !box) return

    const home = focusAngles(INDIA)
    const s = {
      phi: reduced ? home.phi : home.phi + 0.9,
      theta: home.theta + 0.12,
      vel: 0,
      dragging: false,
      lastX: 0,
      idleAt: -1e9,
      sway: 0,
      warm: 3,
    }

    let globe: Globe | null = null
    let size = 0
    let anchor: HTMLElement | null = null

    // COBE appends a 1px anchor div per marker id, positioned in percent of the canvas parent.
    // Read India's position from it so the halo follows the marker in every browser.
    const syncHalo = () => {
      const halo = haloRef.current
      if (!halo) return
      if (!anchor || !anchor.isConnected) {
        anchor = (Array.from(canvas.parentElement?.children ?? []) as HTMLElement[]).find(el => el !== canvas && el.style.cssText.includes('--cobe-india')) ?? null
      }
      if (anchor) {
        halo.style.left = anchor.style.left
        halo.style.top = anchor.style.top
      }
    }
    let raf = 0
    let visible = true
    let last = performance.now()

    const create = () => {
      globe?.destroy()
      const small = window.innerWidth < 768
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2)
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
      try {
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: canvas.width,
          height: canvas.height,
          phi: s.phi,
          theta: s.theta,
          dark: 1,
          diffuse: 0.9,
          scale: 1,
          mapSamples: small ? 9000 : 16000,
          mapBrightness: 4.6,
          mapBaseBrightness: 0.02,
          baseColor: [0.1, 0.1, 0.1],
          markerColor: ON,
          glowColor: [0.05, 0.06, 0.04],
          markerElevation: 0.01,
          ...scene(nodeRef.current),
        })
      } catch {
        setFailed(true)
      }
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden || !globe) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      if (!s.dragging) {
        if (!reduced) {
          s.phi += s.vel
          s.vel *= 0.94
          if (Math.abs(s.vel) < 0.00005) s.vel = 0
        }
        const idle = (!reduced && now - s.idleAt > 4000) || focusRef.current
        if (idle) {
          const k = 1 - Math.exp(-dt * (focusRef.current ? 4 : 0.9))
          s.phi += wrap(home.phi - s.phi) * k
          s.theta += (home.theta + 0.12 - s.theta) * k
        }
      }
      s.sway = reduced ? 0 : Math.sin((now / 1000) * 0.18) * 0.18
      globe.update({ phi: s.phi + s.sway, theta: s.theta, ...scene(nodeRef.current) })
      syncHalo()

      // Reduced motion: a static frame. Keep drawing only while something is changing.
      if (reduced) {
        s.warm = Math.max(0, s.warm - 1)
        if (!s.dragging && !focusRef.current && s.warm === 0) return
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      s.warm = 3
      if (!raf) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    kickRef.current = start

    const ro = new ResizeObserver(([e]) => {
      const next = Math.round(e.contentRect.width)
      if (next > 0 && next !== size) {
        size = next
        haloRef.current?.style.setProperty('--g', `${size}px`)
        create()
        start()
      }
    })
    ro.observe(box)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(box)
    const onVis = () => !document.hidden && start()
    document.addEventListener('visibilitychange', onVis)

    const down = (e: PointerEvent) => {
      s.dragging = true
      s.lastX = e.clientX
      s.vel = 0
      canvas.setPointerCapture(e.pointerId)
      start()
    }
    const move = (e: PointerEvent) => {
      if (!s.dragging) return
      const dx = e.clientX - s.lastX
      s.lastX = e.clientX
      const d = (dx / size) * 2.2
      s.phi += d
      s.vel = reduced ? 0 : d
      s.idleAt = performance.now()
    }
    const up = () => {
      s.dragging = false
      s.idleAt = performance.now()
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    return () => {
      cancelAnimationFrame(raf)
      kickRef.current = () => {}
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      globe?.destroy()
    }
  }, [reduced])

  const select = useCallback(
    (id: ProjectId) => {
      setNode(id)
      if (reduced) {
        openProject(id)
        return
      }
      setLeaving(true)
      openProject(id)
    },
    [reduced],
  )

  const active = node ? projects.find(p => p.id === node) : null
  const hint = (on: boolean) => (on ? 1 : 0.4)

  return (
    <section
      id="globe"
      data-nav="system"
      ref={sectionRef}
      aria-label="Global systems"
      className="relative w-full overflow-hidden px-[6vw] py-[12svh] md:px-[7vw]"
      style={{ minHeight: '100svh', borderTop: '1px solid var(--border)' }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-x-12 gap-y-8 md:grid-cols-[1fr_minmax(0,1.05fr)]">
        <div className="relative z-10 md:col-start-1 md:row-start-1 md:self-end">
          <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.55)' }}>
            02 / GLOBAL SYSTEMS
          </p>
          <h2
            className="m-0 mt-5"
            style={{
              ...sans,
              fontSize: 'clamp(2.6rem, 6.4vw, 6rem)',
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
            }}
          >
            GLOBAL
            <br />
            SYSTEMS
          </h2>

          <button
            type="button"
            data-cursor="globe"
            onMouseEnter={() => (focusRef.current = true)}
            onMouseLeave={() => (focusRef.current = false)}
            onFocus={() => (focusRef.current = true)}
            onBlur={() => (focusRef.current = false)}
            className="mt-8 block bg-transparent p-0 text-left"
            style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', color: '#F4F1EA' }}
          >
            <span style={{ color: '#B8FF3D' }}>●</span> INDIA · SYSTEM BASE
          </button>
          <p className="m-0 mt-2" style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>
            AI · BACKEND · SYSTEMS
          </p>
        </div>

        <motion.div
          ref={boxRef}
          className="relative mx-auto aspect-square w-full max-w-[min(78vw,640px)] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[640px]"
          style={{ scale: reduced ? 1 : scale, opacity: reduced ? 1 : enter }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: leaving ? 'scale(0.82)' : 'scale(1)',
              filter: leaving ? 'blur(8px)' : 'none',
              opacity: leaving ? 0.15 : 1,
              transition: reduced ? 'none' : 'transform 0.7s cubic-bezier(0.65,0,0.35,1), filter 0.7s, opacity 0.7s',
            }}
          >
            {failed ? (
              <div
                role="img"
                aria-label="Globe unavailable. India marked as system base."
                className="absolute inset-[6%] grid place-items-center rounded-full"
                style={{ border: '1px solid var(--border)', ...mono, fontSize: 11, letterSpacing: '0.2em' }}
              >
                <span><span style={{ color: '#B8FF3D' }}>●</span> INDIA</span>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                data-cursor="globe"
                aria-hidden="true"
                className="h-full w-full touch-pan-y"
                style={{ cursor: 'grab', contain: 'layout paint size' }}
              />
            )}
            {!failed && <Halo ref={haloRef} active={node} reduced={reduced} />}
          </div>
        </motion.div>

        <div className="relative z-10 md:col-start-1 md:row-start-2 md:self-start">
          <ul className="m-0 list-none p-0" style={{ borderTop: '1px solid var(--border)' }}>
            {projects.map(p => (
              <li key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <button
                  type="button"
                  data-cursor="project"
                  onMouseEnter={() => setNode(p.id)}
                  onMouseLeave={() => setNode(null)}
                  onFocus={() => setNode(p.id)}
                  onBlur={() => setNode(null)}
                  onClick={() => select(p.id)}
                  className="flex w-full items-baseline justify-between gap-4 bg-transparent py-4 text-left transition-opacity"
                  style={{ color: '#F4F1EA', opacity: node && node !== p.id ? 0.4 : 1, transitionDuration: '300ms' }}
                >
                  <span className="flex items-baseline gap-4">
                    <span style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: node === p.id ? '#B8FF3D' : 'rgba(244,241,234,0.55)' }}>
                      {p.index}
                    </span>
                    <span style={{ ...sans, fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 500 }}>{p.name}</span>
                  </span>
                  <span className="hidden sm:inline" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.55)' }}>
                    {p.tiles.slice(0, 3).join(' / ')}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div aria-live="polite" className="mt-4" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', minHeight: 64, opacity: hint(true) }}>
            {active ? (
              <>
                <div style={{ color: '#B8FF3D' }}>AJAI → {active.title.join(' ')} · ABSTRACT SYSTEM LINK</div>
                <div className="mt-2" style={{ color: '#F4F1EA' }}>
                  {[active.category, active.status, active.period].filter(Boolean).join(' · ')}
                </div>
                <div className="mt-1" style={{ color: 'rgba(244,241,234,0.6)' }}>{active.stack.slice(0, 4).join(' · ')}</div>
              </>
            ) : (
              <div style={{ color: 'rgba(244,241,234,0.55)' }}>
                ABSTRACT SYSTEM LINKS · NODES ARE SYSTEMS, NOT LOCATIONS
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Abstract relationship ring. Everything here is screen-space and attached to India's marker:
// no project has a map coordinate, so nothing can read as a location, office or route.
const NODE_LAYOUT: Record<ProjectId, { angle: number; label: React.CSSProperties }> = {
  yamini: { angle: -90, label: { transform: 'translate(-50%, -165%)' } },
  kavya: { angle: 150, label: { transform: 'translate(-100%, -50%)', marginLeft: -9 } },
  uzhavan: { angle: 30, label: { transform: 'translate(0, -50%)', marginLeft: 9 } },
}

const Halo = forwardRef<HTMLDivElement, { active: ProjectId | null; reduced: boolean }>(function Halo({ active, reduced }, ref) {
  const t = reduced ? 'none' : 'opacity 0.3s, background 0.3s, border-color 0.3s, color 0.3s'
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={
        {
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          ['--R' as string]: 'clamp(46px, calc(var(--g, 520px) * 0.13), 86px)',
          opacity: 'var(--cobe-visible-india, 0)',
          transition: reduced ? 'none' : 'opacity 0.3s',
        } as React.CSSProperties
      }
    >
      <div
        className="absolute rounded-full"
        style={{ left: 0, top: 0, width: 'calc(var(--R) * 2)', height: 'calc(var(--R) * 2)', transform: 'translate(-50%, -50%)', border: '1px dashed rgba(244,241,234,0.2)' }}
      />
      <span
        className="absolute"
        style={{ left: 0, top: 0, transform: 'translate(-50%, 16px)', fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 10, letterSpacing: '0.2em', color: '#F4F1EA' }}
      >
        INDIA
      </span>
      {projects.map(p => {
        const { angle, label } = NODE_LAYOUT[p.id]
        const rad = (angle * Math.PI) / 180
        const on = active === p.id
        const dim = !!active && !on
        const lineColor = on ? '#B8FF3D' : 'rgba(244,241,234,0.42)'
        return (
          <div key={p.id} style={{ opacity: dim ? 0.28 : 1, transition: t }}>
            <span
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: 'calc(var(--R) - 5px)',
                height: 1,
                background: lineColor,
                transformOrigin: '0 50%',
                transform: `rotate(${angle}deg)`,
                transition: t,
              }}
            />
            <span
              className="absolute rounded-full"
              style={{
                left: `calc(var(--R) * ${Math.cos(rad).toFixed(3)})`,
                top: `calc(var(--R) * ${Math.sin(rad).toFixed(3)})`,
                width: on ? 9 : 6,
                height: on ? 9 : 6,
                transform: 'translate(-50%, -50%)',
                background: on ? '#B8FF3D' : '#050505',
                border: `1px solid ${on ? '#B8FF3D' : 'rgba(244,241,234,0.7)'}`,
                transition: t,
              }}
            />
            <span
              className="absolute whitespace-nowrap"
              style={{
                left: `calc(var(--R) * ${Math.cos(rad).toFixed(3)})`,
                top: `calc(var(--R) * ${Math.sin(rad).toFixed(3)})`,
                ...label,
                fontFamily: 'var(--font-ibm-plex-mono), monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: on ? '#B8FF3D' : 'rgba(244,241,234,0.82)',
                transition: t,
              }}
            >
              {p.id.toUpperCase()}
            </span>
          </div>
        )
      })}
    </div>
  )
})
