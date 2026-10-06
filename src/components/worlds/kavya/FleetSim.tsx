'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Badge from '@/components/ui/Badge'
import { LabFrame, LiveStatus } from '@/components/worlds/ui'
import { kavya } from '@/data/worlds'
import { useReduced } from '@/lib/useReduced'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

type Pt = [number, number]
const W = 800
const H = 480

// All geometry is abstract map units. Nothing here is real geography.
const ROUTES: Record<string, { name: string; pts: Pt[] }> = {
  A: { name: 'ROUTE A', pts: [[40, 380], [180, 340], [300, 360], [430, 280], [560, 250], [760, 120]] },
  B: { name: 'ROUTE B', pts: [[60, 110], [200, 150], [320, 130], [450, 200], [600, 210], [760, 300]] },
  C: { name: 'ROUTE C', pts: [[120, 450], [240, 380], [330, 300], [400, 200], [480, 90], [540, 30]] },
  D: { name: 'ROUTE D', pts: [[30, 250], [160, 260], [300, 230], [420, 330], [580, 380], [770, 420]] },
}
const ROADS: Pt[][] = [
  [[0, 300], [140, 300], [260, 420], [420, 440], [640, 470]],
  [[200, 0], [220, 120], [330, 200], [360, 330], [380, 480]],
  [[640, 0], [620, 140], [680, 250], [800, 330]],
]

const geo = Object.fromEntries(
  Object.entries(ROUTES).map(([k, r]) => {
    const segs: number[] = []
    let total = 0
    for (let i = 1; i < r.pts.length; i++) {
      const l = Math.hypot(r.pts[i][0] - r.pts[i - 1][0], r.pts[i][1] - r.pts[i - 1][1])
      segs.push(l)
      total += l
    }
    return [k, { segs, total }]
  }),
)

function pointAt(route: string, t: number): { x: number; y: number; dx: number; dy: number } {
  const { pts } = ROUTES[route]
  const { segs, total } = geo[route]
  let d = Math.min(Math.max(t, 0), 1) * total
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const f = segs[i] ? Math.min(d / segs[i], 1) : 0
      const [x0, y0] = pts[i]
      const [x1, y1] = pts[i + 1]
      return { x: x0 + (x1 - x0) * f, y: y0 + (y1 - y0) * f, dx: x1 - x0, dy: y1 - y0 }
    }
    d -= segs[i]
  }
  return { x: pts[0][0], y: pts[0][1], dx: 1, dy: 0 }
}

interface Veh {
  id: string
  route: string
  t0: number
  speed: number
  dir: 1 | -1
  status: 'ACTIVE' | 'IDLE'
  driver: string
  trip: string
}
const VEHICLES: Veh[] = [
  { id: '01', route: 'A', t0: 0.12, speed: 0.022, dir: 1, status: 'ACTIVE', driver: 'A', trip: '001' },
  { id: '02', route: 'A', t0: 0.7, speed: 0.018, dir: -1, status: 'ACTIVE', driver: 'B', trip: '002' },
  { id: '03', route: 'B', t0: 0.3, speed: 0.02, dir: 1, status: 'ACTIVE', driver: 'C', trip: '003' },
  { id: '04', route: 'C', t0: 0.5, speed: 0, dir: 1, status: 'IDLE', driver: 'D', trip: '004' },
  { id: '05', route: 'D', t0: 0.2, speed: 0.016, dir: 1, status: 'ACTIVE', driver: 'E', trip: '005' },
  { id: '06', route: 'B', t0: 0.85, speed: 0.024, dir: -1, status: 'ACTIVE', driver: 'F', trip: '006' },
]

const progress = (v: Veh, clock: number) => {
  const p = v.t0 + v.speed * v.dir * clock
  const u = ((p % 2) + 2) % 2
  return u <= 1 ? u : 2 - u
}

const pathD = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')

const DEV_ROUTE = 'D'
const DEV_T = 0.55

export default function FleetSim() {
  const reduced = useReduced()
  const [layers, setLayers] = useState<Record<string, boolean>>({ gps: true })
  const [focus, setFocus] = useState('gps')
  const [sel, setSel] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [tick, setTick] = useState(0)
  const [announce, setAnnounce] = useState('')

  const boxRef = useRef<HTMLDivElement>(null)
  const clockRef = useRef(0)
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const trailEls = useRef<(SVGPolylineElement | null)[]>([])
  const trails = useRef<Pt[][]>(VEHICLES.map(() => []))
  const lastTrail = useRef(0)
  const pos = useRef<{ x: number; y: number; t: number }[]>(VEHICLES.map(() => ({ x: 0, y: 0, t: 0 })))

  const render = (clk: number, sampleTrail: boolean) => {
    VEHICLES.forEach((v, i) => {
      const t = progress(v, clk)
      const p = pointAt(v.route, t)
      pos.current[i] = { x: p.x, y: p.y, t }
      const el = wrapRefs.current[i]
      if (el) {
        el.style.left = `${(p.x / W) * 100}%`
        el.style.top = `${(p.y / H) * 100}%`
      }
      if (sampleTrail) {
        const tr = trails.current[i]
        tr.push([p.x, p.y])
        if (tr.length > 22) tr.shift()
        trailEls.current[i]?.setAttribute('points', tr.map(q => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' '))
      }
    })
  }

  useEffect(() => {
    render(clockRef.current, false)
    if (reduced) {
      setRunning(false)
      return
    }
    let raf = 0
    let last = 0
    let visible = true
    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden) {
        last = 0
        return
      }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      clockRef.current += dt
      const sample = clockRef.current - lastTrail.current > 0.12
      if (sample) lastTrail.current = clockRef.current
      render(clockRef.current, sample)
      raf = requestAnimationFrame(frame)
    }
    const sync = () => {
      const on = visible && !document.hidden
      setRunning(on)
      if (on && !raf) raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    if (boxRef.current) io.observe(boxRef.current)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  // The side panel samples the simulation a few times per second.
  useEffect(() => {
    if (!running || !sel) return
    const id = setInterval(() => setTick(t => t + 1), 300)
    return () => clearInterval(id)
  }, [running, sel])

  const on = (k: string) => !!layers[k]
  const toggle = (k: string) => {
    setLayers(l => ({ ...l, [k]: !l[k] }))
    setFocus(k)
  }
  const claim = kavya.capabilities.find(c => c.id === focus)!
  const selIdx = sel ? VEHICLES.findIndex(v => v.id === sel) : -1
  const selV = selIdx >= 0 ? VEHICLES[selIdx] : null
  const selPos = selIdx >= 0 ? pos.current[selIdx] : null
  void tick

  const select = (v: Veh) => {
    const next = sel === v.id ? null : v.id
    setSel(next)
    setAnnounce(
      next
        ? `Vehicle ${v.id} selected. Simulated data. Status ${v.status.toLowerCase()}. Trip ${v.trip}, ${ROUTES[v.route].name.toLowerCase()}.`
        : 'Vehicle selection cleared.',
    )
  }

  const ticks = useMemo(
    () =>
      Object.keys(ROUTES).flatMap(k => {
        const out: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []
        const n = Math.floor(geo[k].total / 90)
        for (let i = 1; i <= n; i++) {
          const p = pointAt(k, (i * 90) / geo[k].total)
          const len = Math.hypot(p.dx, p.dy) || 1
          const nx = (-p.dy / len) * 6
          const ny = (p.dx / len) * 6
          out.push({ key: `${k}${i}`, x1: p.x - nx, y1: p.y - ny, x2: p.x + nx, y2: p.y + ny })
        }
        return out
      }),
    [],
  )
  const dev = pointAt(DEV_ROUTE, DEV_T)

  const activeCount = VEHICLES.filter(v => v.status === 'ACTIVE').length
  const idleCount = VEHICLES.length - activeCount
  const anim = running ? 'running' : 'paused'

  return (
    <LabFrame
      title="FLEET SIMULATION"
      kind="simulated-data"
      caption="Every vehicle, trip, route and position here is generated in your browser for illustration. None of it comes from Kavya Transports' real fleet or data, and nothing is connected live. Coordinates are abstract map units, not geography."
    >
      <style>{`@keyframes kvPing{0%{transform:scale(.5);opacity:.8}100%{transform:scale(2.4);opacity:0}}`}</style>
      <div className="grid gap-6 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_250px]">
        {/* Capability rail */}
        <div className="min-w-0">
          <p className="m-0 mb-3" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>
            CAPABILITY LAYERS
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
            {kavya.capabilities.map(c => {
              const pressed = on(c.id)
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => toggle(c.id)}
                  className="shrink-0 bg-transparent px-3 py-2.5 text-left"
                  style={{
                    ...mono,
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    color: pressed ? '#050505' : '#F4F1EA',
                    background: pressed ? 'var(--w-accent)' : 'transparent',
                    border: `1px solid ${pressed ? 'var(--w-accent)' : 'var(--w-line)'}`,
                  }}
                >
                  <span aria-hidden="true">{pressed ? '◉' : '○'} </span>
                  {c.label}
                </button>
              )
            })}
          </div>
          <div className="mt-4" style={{ borderTop: '1px solid var(--w-line)', paddingTop: 14 }}>
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: 'var(--w-accent)' }}>{claim.label}</p>
            <p className="m-0 mt-2" style={{ ...sans, fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.88)' }}>{claim.text}</p>
            <p className="m-0 mt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>
              {claim.source === 'resume' ? 'SOURCE · RESUME' : claim.source === 'owner' ? 'SOURCE · OWNER' : 'EXPLANATORY'}
            </p>
          </div>
        </div>

        {/* Map */}
        <div>
          <div
            ref={boxRef}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: `${W} / ${H}`, background: '#03050a', border: '1px solid var(--w-line)' }}
          >
            <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
              {ROADS.map((r, i) => (
                <path key={i} d={pathD(r)} fill="none" stroke="rgba(244,241,234,0.07)" strokeWidth="1" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <g key={i}>
                  <line x1={i * 100} y1={H - 10} x2={i * 100} y2={H - 4} stroke="rgba(244,241,234,0.25)" />
                  <text x={i * 100 + 3} y={H - 12} fontSize="8" fill="rgba(244,241,234,0.35)" fontFamily="monospace">{i * 100}</text>
                </g>
              ))}

              {Object.entries(ROUTES).map(([k, r]) => {
                const hot = on('trips') && selV?.route === k
                return (
                  <path
                    key={k}
                    d={pathD(r.pts)}
                    fill="none"
                    stroke={hot ? '#4DE8FF' : on('routes') ? 'rgba(77,232,255,0.5)' : 'rgba(244,241,234,0.15)'}
                    strokeWidth={hot ? 3 : on('routes') ? 1.5 : 1.2}
                    strokeDasharray={on('routes') && !hot ? '7 6' : undefined}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                )
              })}

              {on('routes') && (
                <g>
                  {ticks.map(t => (
                    <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(77,232,255,0.55)" />
                  ))}
                  {Object.entries(ROUTES).map(([k, r]) => (
                    <text key={k} x={r.pts[0][0] + 6} y={r.pts[0][1] - 8} fontSize="10" fill="rgba(244,241,234,0.75)" fontFamily="monospace" letterSpacing="2">
                      {r.name}
                    </text>
                  ))}
                  <path d={`M${dev.x} ${dev.y} L${dev.x + 26} ${dev.y - 30}`} stroke="#4DE8FF" strokeWidth="1.5" fill="none" />
                  <rect x={dev.x + 23} y={dev.y - 34} width="7" height="7" transform={`rotate(45 ${dev.x + 26.5} ${dev.y - 30.5})`} fill="#4DE8FF" />
                  <text x={dev.x + 36} y={dev.y - 28} fontSize="9" fill="rgba(244,241,234,0.8)" fontFamily="monospace" letterSpacing="1.5">DEVIATION · SIM</text>
                </g>
              )}

              {on('trips') &&
                Object.entries(ROUTES).map(([k, r]) => {
                  const a = r.pts[0]
                  const b = r.pts[r.pts.length - 1]
                  return (
                    <g key={k}>
                      <circle cx={a[0]} cy={a[1]} r="5" fill="#04070d" stroke="#4DE8FF" strokeWidth="1.5" />
                      <rect x={b[0] - 5} y={b[1] - 5} width="10" height="10" fill="#4DE8FF" />
                      <text x={a[0] + 9} y={a[1] + 14} fontSize="8" fill="rgba(244,241,234,0.7)" fontFamily="monospace" letterSpacing="1.5">START {k}</text>
                      <text x={b[0] - 52} y={b[1] + 18} fontSize="8" fill="rgba(244,241,234,0.7)" fontFamily="monospace" letterSpacing="1.5">END {k}</text>
                    </g>
                  )
                })}

              {VEHICLES.map((v, i) => (
                <polyline
                  key={v.id}
                  ref={el => {
                    trailEls.current[i] = el
                  }}
                  fill="none"
                  stroke="rgba(77,232,255,0.45)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ display: on('gps') ? 'block' : 'none' }}
                />
              ))}
            </svg>

            {VEHICLES.map((v, i) => {
              const selected = sel === v.id
              return (
                <div
                  key={v.id}
                  ref={el => {
                    wrapRefs.current[i] = el
                  }}
                  className="absolute"
                  style={{ transform: 'translate(-50%, -50%)', zIndex: selected ? 3 : 2 }}
                >
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Vehicle ${v.id}, simulated data, status ${v.status.toLowerCase()}. ${selected ? 'Selected.' : 'Select for details.'}`}
                    onClick={() => select(v)}
                    data-cursor="media"
                    className="relative grid h-11 w-11 place-items-center rounded-full bg-transparent"
                  >
                    {on('gps') && v.status === 'ACTIVE' && (
                      <span
                        aria-hidden="true"
                        className="absolute h-4 w-4 rounded-full"
                        style={{ border: '1px solid #4DE8FF', animationName: reduced ? 'none' : 'kvPing', animationDuration: '2.2s', animationTimingFunction: 'ease-out', animationIterationCount: 'infinite', animationPlayState: anim }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="block rounded-full"
                      style={{
                        width: selected ? 13 : 9,
                        height: selected ? 13 : 9,
                        background: v.status === 'IDLE' ? 'rgba(244,241,234,0.4)' : selected ? '#4DE8FF' : '#F4F1EA',
                        boxShadow: selected ? '0 0 0 3px rgba(77,232,255,0.35)' : 'none',
                        transition: 'all 0.2s',
                      }}
                    />
                  </button>
                  {on('drivers') && (
                    <span aria-hidden="true" className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap" style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.85)', background: 'rgba(4,7,13,0.8)', padding: '1px 4px' }}>
                      DRIVER {v.driver}
                    </span>
                  )}
                </div>
              )
            })}

            {on('dashboard') && (
              <div className="pointer-events-none absolute left-2 top-2 z-[4] p-2" style={{ background: 'rgba(4,7,13,0.88)', border: '1px solid var(--w-line)', ...mono, fontSize: 10, letterSpacing: '0.14em', color: '#F4F1EA' }}>
                <div style={{ color: 'var(--w-accent)' }}>FLEET DASHBOARD · SIMULATED DATA</div>
                <div className="mt-1">ACTIVE {activeCount} · IDLE {idleCount} · TRIPS {VEHICLES.length}</div>
              </div>
            )}
            <div className="pointer-events-none absolute right-2 top-2 z-[4]">
              <Badge kind="simulated-data" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.5)' }}>
            <span>ABSTRACT MAP UNITS · NOT GEOGRAPHY</span>
            <span>{reduced ? 'STATIC FRAME · REDUCED MOTION' : running ? 'SIMULATION RUNNING' : 'SIMULATION PAUSED'}</span>
          </div>

          <div className="mt-3"><LiveStatus>{announce || 'Select a vehicle on the map to inspect it.'}</LiveStatus></div>

          <div role="group" aria-label="Select a simulated vehicle" className="mt-3 flex flex-wrap gap-2">
            {VEHICLES.map(v => (
              <button
                key={v.id}
                type="button"
                aria-pressed={sel === v.id}
                aria-label={`V${v.id}, select vehicle (simulated data)`}
                onClick={() => select(v)}
                className="bg-transparent px-3 py-2"
                style={{
                  ...mono,
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  minWidth: 44,
                  minHeight: 44,
                  color: sel === v.id ? '#04070d' : '#F4F1EA',
                  background: sel === v.id ? 'var(--w-accent)' : 'transparent',
                  border: '1px solid var(--w-line)',
                }}
              >
                V{v.id}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle panel */}
        <div className="min-w-0 md:col-span-2 lg:col-span-1">
          <div className="p-4" style={{ border: '1px solid var(--w-line)', background: 'rgba(4,7,13,0.7)', minHeight: 190 }}>
            <div className="flex items-center justify-between gap-2">
              <span style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', color: '#F4F1EA' }}>{selV ? `VEHICLE ${selV.id}` : 'NO VEHICLE'}</span>
              <Badge kind="simulated-data" />
            </div>
            {selV && selPos ? (
              <dl className="m-0 mt-4" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em' }}>
                {[
                  ['STATUS', selV.status],
                  ['TRIP', `TRIP ${selV.trip}`],
                  ['ROUTE', ROUTES[selV.route].name],
                  ['POSITION', `X ${Math.round(selPos.x)} · Y ${Math.round(selPos.y)}`],
                  ['PROGRESS', `${Math.round(selPos.t * 100)}%`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 py-1.5" style={{ borderTop: '1px solid var(--w-line)' }}>
                    <dt style={{ color: 'rgba(244,241,234,0.6)' }}>{k}</dt>
                    <dd className="m-0" style={{ color: k === 'STATUS' && v === 'ACTIVE' ? 'var(--w-accent)' : '#F4F1EA' }}>{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="m-0 mt-4" style={{ ...sans, fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.75)' }}>
                Select a vehicle to see its simulated status, trip, route and position.
              </p>
            )}
          </div>

          {on('logistics') && (
            <div className="mt-4 p-3" style={{ border: '1px solid var(--w-line)' }}>
              <div className="mb-2 flex items-center justify-between gap-2" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'var(--w-accent)' }}>
                <span>RECORDS</span>
                <Badge kind="simulated-data" />
              </div>
              <table className="w-full border-collapse" style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: 'rgba(244,241,234,0.85)' }}>
                <caption className="sr-only">Simulated transport records</caption>
                <thead>
                  <tr style={{ color: 'rgba(244,241,234,0.55)', textAlign: 'left' }}>
                    <th scope="col" className="py-1 font-normal">REC</th>
                    <th scope="col" className="py-1 font-normal">TRIP</th>
                    <th scope="col" className="py-1 font-normal">ROUTE</th>
                    <th scope="col" className="py-1 font-normal">STATE</th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICLES.slice(0, 3).map((v, i) => (
                    <tr key={v.id} style={{ borderTop: '1px solid var(--w-line)' }}>
                      <td className="py-1">R{String(i + 1).padStart(2, '0')}</td>
                      <td className="py-1">{v.trip}</td>
                      <td className="py-1">{v.route}</td>
                      <td className="py-1">{i === 0 ? 'OPEN' : i === 1 ? 'DRAFT' : 'CLOSED'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <details className="mt-6">
        <summary style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.75)', cursor: 'pointer' }}>
          VEHICLE LIST AS TEXT · SIMULATED DATA
        </summary>
        <table className="mt-3 w-full border-collapse" style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(244,241,234,0.85)' }}>
          <caption className="sr-only">Simulated vehicles</caption>
          <thead>
            <tr style={{ color: 'rgba(244,241,234,0.55)', textAlign: 'left' }}>
              <th scope="col" className="py-1 font-normal">VEHICLE</th>
              <th scope="col" className="py-1 font-normal">STATUS</th>
              <th scope="col" className="py-1 font-normal">TRIP</th>
              <th scope="col" className="py-1 font-normal">ROUTE</th>
              <th scope="col" className="py-1 font-normal">DRIVER</th>
            </tr>
          </thead>
          <tbody>
            {VEHICLES.map(v => (
              <tr key={v.id} style={{ borderTop: '1px solid var(--w-line)' }}>
                <th scope="row" className="py-1 text-left font-normal">VEHICLE {v.id}</th>
                <td className="py-1">{v.status}</td>
                <td className="py-1">TRIP {v.trip}</td>
                <td className="py-1">{ROUTES[v.route].name}</td>
                <td className="py-1">DRIVER {v.driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </LabFrame>
  )
}
