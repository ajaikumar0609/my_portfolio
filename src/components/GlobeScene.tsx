'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import createGlobe, { type Globe } from 'cobe'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReduced } from '@/lib/useReduced'
import { openProject } from '@/lib/system'
import { projects, type ProjectId } from '@/data/content'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

// Tirunelveli (resume location). The marker is the base of operations, not a project site.
const INDIA: [number, number] = [8.7139, 77.7567]

// ABSTRACT system nodes. These sit in open ocean on purpose and mean nothing geographically:
// they only give the AJAI -> project relationship lines something to connect to.
const NODES: Record<ProjectId, [number, number]> = {
  yamini: [-6, 64],
  kavya: [-13, 80],
  uzhavan: [-4, 94],
}

type RGB = [number, number, number]
const ON: RGB = [0.72, 1, 0.24]
const BASE: RGB = [0.3, 0.4, 0.16]
const DIM: RGB = [0.14, 0.18, 0.09]

const scene = (active: ProjectId | null) => ({
  markers: [
    { location: INDIA, size: active ? 0.05 : 0.04, id: 'india' },
    ...projects.map(p => ({
      location: NODES[p.id],
      size: active === p.id ? 0.045 : 0.02,
      color: (active === p.id ? ON : active ? DIM : BASE) as RGB,
      id: `node-${p.id}`,
    })),
  ],
  arcs: projects.map(p => ({
    from: INDIA,
    to: NODES[p.id],
    color: (active === p.id ? ON : active ? DIM : BASE) as RGB,
    id: p.id,
  })),
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
  const [anchors, setAnchors] = useState(false)
  const focusRef = useRef(false)
  const nodeRef = useRef<ProjectId | null>(null)
  const kickRef = useRef<() => void>(() => {})
  nodeRef.current = node

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 40%'] })
  const enter = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(enter, [0, 1], [0.88, 1])

  useEffect(() => {
    setAnchors(typeof CSS !== 'undefined' && CSS.supports?.('position-anchor', '--a'))
  }, [])

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
          arcColor: BASE,
          arcWidth: 0.35,
          arcHeight: 0.18,
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
            {anchors && !failed && (
              <>
                <GlobeLabel anchor="--cobe-india" visible="--cobe-visible-india" text="INDIA" strong />
                {projects.map(p => (
                  <GlobeLabel
                    key={p.id}
                    anchor={`--cobe-node-${p.id}`}
                    visible={`--cobe-visible-node-${p.id}`}
                    text={p.id.toUpperCase()}
                    strong={node === p.id}
                    dim={!!node && node !== p.id}
                  />
                ))}
              </>
            )}
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
                  aria-label={`Open ${p.name}. ${p.category}. ${p.status}.`}
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

function GlobeLabel({
  anchor,
  visible,
  text,
  strong,
  dim,
}: {
  anchor: string
  visible: string
  text: string
  strong?: boolean
  dim?: boolean
}) {
  return (
    <span
      aria-hidden="true"
      style={
        {
          position: 'absolute',
          positionAnchor: anchor,
          bottom: 'anchor(top)',
          left: 'anchor(center)',
          transform: 'translate(-50%, -8px)',
          opacity: `calc(var(${visible}, 0) * ${dim ? 0.25 : strong ? 1 : 0.7})`,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: strong ? '#B8FF3D' : '#F4F1EA',
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  )
}
