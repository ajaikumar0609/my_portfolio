'use client'

import { useMemo, useState } from 'react'
import { LabFrame, RangeField, LiveStatus } from '@/components/worlds/ui'

type Label = 'TRAVEL' | 'STOP' | 'DEVIATION'
interface Pt { t: number; x: number; y: number }

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

// Hand-authored sample route: planned path A -> B, points given as [progress along path, offset from path].
const A: [number, number] = [8, 82]
const B: [number, number] = [92, 22]
const DX = B[0] - A[0]
const DY = B[1] - A[1]
const LEN = Math.hypot(DX, DY)
const UX = DX / LEN
const UY = DY / LEN
const NX = -UY
const NY = UX

const SPEC: [number, number][] = [
  // travel
  [0, 0.4], [0.05, -0.5], [0.1, 0.6], [0.15, -0.3], [0.2, 0.5], [0.25, -0.4], [0.3, 0.3], [0.35, -0.2],
  // short pause (3 points, 60 s)
  [0.38, 0.5], [0.381, -0.3], [0.382, 0.2],
  // travel
  [0.43, 0.2], [0.48, -0.5], [0.53, 0.4], [0.58, -0.3], [0.63, 0.1],
  // long stop (11 points, 300 s)
  [0.66, 0.5], [0.661, -0.4], [0.66, 0.2], [0.662, -0.6], [0.66, 0.3], [0.661, -0.2], [0.66, 0.6], [0.662, -0.5], [0.66, 0.1], [0.661, 0.4], [0.66, -0.3],
  // travel
  [0.71, 0.3], [0.76, -0.4], [0.8, 0.5],
  // detour away from the planned path
  [0.82, 11], [0.83, 17], [0.85, 20], [0.88, 20], [0.9, 15], [0.92, 10.5],
  // back on path
  [0.935, 3.5], [0.96, 1.5], [0.985, 0.5], [1.03, 0],
]

const STEP_S = 30
const POINTS: Pt[] = SPEC.map(([u, off], i) => ({
  t: i * STEP_S,
  x: A[0] + UX * u * LEN + NX * off,
  y: A[1] + UY * u * LEN + NY * off,
}))

const STOP_RADIUS = 2.5
const DEVIATION_DIST = 9

function distToPath(p: Pt) {
  const u = Math.max(0, Math.min(1, ((p.x - A[0]) * DX + (p.y - A[1]) * DY) / (LEN * LEN)))
  return Math.hypot(p.x - (A[0] + DX * u), p.y - (A[1] + DY * u))
}

// STOP: a run that stays within STOP_RADIUS of its first point for >= threshold seconds.
// Everything else: DEVIATION if far from the planned path, otherwise TRAVEL.
function classify(threshold: number): Label[] {
  const n = POINTS.length
  const out: Label[] = new Array(n).fill('TRAVEL')
  const isStop = new Array(n).fill(false)
  let i = 0
  while (i < n) {
    let j = i
    while (j + 1 < n && Math.hypot(POINTS[j + 1].x - POINTS[i].x, POINTS[j + 1].y - POINTS[i].y) <= STOP_RADIUS) j++
    if (j > i && POINTS[j].t - POINTS[i].t >= threshold) {
      for (let k = i; k <= j; k++) isStop[k] = true
      i = j + 1
    } else i++
  }
  for (let k = 0; k < n; k++) out[k] = isStop[k] ? 'STOP' : distToPath(POINTS[k]) > DEVIATION_DIST ? 'DEVIATION' : 'TRAVEL'
  return out
}

const COLOR: Record<Label, string> = { TRAVEL: '#F4F1EA', STOP: '#B8FF3D', DEVIATION: '#FFB454' }

export default function SegmentationLab() {
  const [threshold, setThreshold] = useState(150)
  const labels = useMemo(() => classify(threshold), [threshold])

  const { segments, table } = useMemo(() => {
    const segs: { label: Label; points: number; start: number; end: number }[] = []
    labels.forEach((l, i) => {
      const last = segs[segs.length - 1]
      if (last && last.label === l) {
        last.points++
        last.end = POINTS[i].t
      } else segs.push({ label: l, points: 1, start: POINTS[i].t, end: POINTS[i].t })
    })
    const tb: Record<Label, { segments: number; points: number }> = {
      TRAVEL: { segments: 0, points: 0 },
      STOP: { segments: 0, points: 0 },
      DEVIATION: { segments: 0, points: 0 },
    }
    segs.forEach(s => {
      tb[s.label].segments++
      tb[s.label].points += s.points
    })
    return { segments: segs, table: tb }
  }, [labels])

  const sequence = segments.map(s => s.label).join(' → ')

  return (
    <LabFrame
      title="ROUTE SEGMENTATION · INTERACTIVE EXPLANATION · SIMULATION"
      kind="simulation"
      caption="INTERACTIVE EXPLANATION · SIMULATION. A fixed set of 40 sample GPS points (one every 30 s) shows how a continuous stream can be split into travel, stop and deviation segments. This explains the idea with sample data; it is not the production algorithm. Route segmentation in the project is covered by 13 unit tests."
    >
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div style={{ border: '1px solid var(--w-line)', background: '#050805' }}>
          <svg viewBox="0 0 100 100" className="block h-auto w-full" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <line x1={(i + 1) * 10} y1={0} x2={(i + 1) * 10} y2={100} stroke="#B8FF3D" strokeOpacity="0.06" strokeWidth="0.3" />
                <line x1={0} y1={(i + 1) * 10} x2={100} y2={(i + 1) * 10} stroke="#B8FF3D" strokeOpacity="0.06" strokeWidth="0.3" />
              </g>
            ))}
            <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="#F4F1EA" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
            {POINTS.slice(1).map((p, i) => {
              const q = POINTS[i]
              const l = labels[i + 1]
              return (
                <line key={i} x1={q.x} y1={q.y} x2={p.x} y2={p.y} stroke={COLOR[l]} strokeOpacity={l === 'STOP' ? 0.3 : 0.75} strokeWidth="0.6" strokeDasharray={l === 'DEVIATION' ? '1.2 0.8' : undefined} />
              )
            })}
            {POINTS.map((p, i) => {
              const l = labels[i]
              if (l === 'STOP') return <rect key={i} x={p.x - 1.1} y={p.y - 1.1} width="2.2" height="2.2" fill={COLOR.STOP} />
              if (l === 'DEVIATION') return <rect key={i} x={p.x - 0.9} y={p.y - 0.9} width="1.8" height="1.8" fill={COLOR.DEVIATION} transform={`rotate(45 ${p.x} ${p.y})`} />
              return <circle key={i} cx={p.x} cy={p.y} r="0.9" fill={COLOR.TRAVEL} />
            })}
            <text x={A[0] - 2} y={A[1] + 7} fontSize="3.4" fill="#F4F1EA" fillOpacity="0.7" fontFamily="monospace">START</text>
            <text x={B[0] - 8} y={B[1] - 3} fontSize="3.4" fill="#F4F1EA" fillOpacity="0.7" fontFamily="monospace">END</text>
          </svg>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-3" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.8)', borderTop: '1px solid var(--w-line)' }}>
            <li><span aria-hidden="true" style={{ color: COLOR.TRAVEL }}>● </span>TRAVEL</li>
            <li><span aria-hidden="true" style={{ color: COLOR.STOP }}>■ </span>STOP</li>
            <li><span aria-hidden="true" style={{ color: COLOR.DEVIATION }}>◆ </span>DEVIATION</li>
            <li><span aria-hidden="true">╌ </span>PLANNED PATH</li>
          </ul>
        </div>

        <div>
          <RangeField
            label="DWELL THRESHOLD"
            value={threshold}
            min={30}
            max={420}
            step={30}
            unit="s"
            onChange={setThreshold}
            describe={v => `${v} seconds`}
          />
          <p className="m-0 mt-3" style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(244,241,234,0.75)' }}>
            A run of points that stays inside a small radius for at least the threshold becomes a STOP. Remaining points far from the planned path are a DEVIATION; the rest are TRAVEL.
          </p>

          <p className="m-0 mt-6" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>RESULTING SEQUENCE</p>
          <p className="m-0 mt-2" style={{ ...mono, fontSize: 12, letterSpacing: '0.1em', lineHeight: 1.7, color: '#F4F1EA' }}>{sequence}</p>

          <table className="mt-5 w-full border-collapse" style={{ ...mono, fontSize: 11, letterSpacing: '0.1em' }}>
            <caption className="sr-only">Segments and points by type</caption>
            <thead>
              <tr style={{ color: 'rgba(244,241,234,0.6)', textAlign: 'left' }}>
                <th scope="col" className="py-2 font-normal">TYPE</th>
                <th scope="col" className="py-2 font-normal">SEGMENTS</th>
                <th scope="col" className="py-2 font-normal">POINTS</th>
              </tr>
            </thead>
            <tbody>
              {(['TRAVEL', 'STOP', 'DEVIATION'] as Label[]).map(l => (
                <tr key={l} style={{ borderTop: '1px solid var(--w-line)', color: '#F4F1EA' }}>
                  <th scope="row" className="py-2 text-left font-normal" style={{ color: COLOR[l] }}>{l}</th>
                  <td className="py-2">{table[l].segments}</td>
                  <td className="py-2">{table[l].points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5">
            <LiveStatus>
              Threshold {threshold} seconds. {segments.length} {segments.length === 1 ? 'segment' : 'segments'}: {sequence}.
            </LiveStatus>
          </div>
        </div>
      </div>
    </LabFrame>
  )
}
