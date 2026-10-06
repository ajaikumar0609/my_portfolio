'use client'

import { useActive } from './useActive'

const NODES: [number, number, number][] = [
  [180, 560, 0], [330, 470, 1.1], [520, 500, 2.2], [690, 360, 0.6], [860, 300, 1.7], [1010, 190, 2.8], [420, 250, 3.4],
]

// Operational coordinate grid with route lines and a few GPS nodes. SVG only; the slow pulse pauses off-screen.
export default function Backdrop() {
  const [ref, active] = useActive<HTMLDivElement>()
  return (
    <div ref={ref} className="absolute inset-0">
      <style>{`@keyframes yb-pulse{0%,100%{opacity:.25}50%{opacity:.9}}`}</style>
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={800} stroke="#B8FF3D" strokeOpacity={i % 5 === 0 ? 0.1 : 0.045} />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 60} x2={1200} y2={i * 60} stroke="#B8FF3D" strokeOpacity={i % 5 === 0 ? 0.1 : 0.045} />
        ))}
        <polyline points="120,640 180,560 330,470 520,500 690,360 860,300 1010,190 1120,150" fill="none" stroke="#B8FF3D" strokeOpacity="0.2" strokeWidth="1.5" />
        <polyline points="300,700 420,250 560,200 760,120" fill="none" stroke="#F4F1EA" strokeOpacity="0.08" strokeDasharray="4 8" />
        {NODES.map(([x, y, d], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill="#B8FF3D"
            style={{ animation: active ? `yb-pulse 4.5s ease-in-out ${d}s infinite` : 'none', opacity: 0.45 }}
          />
        ))}
        {[['0', 0], ['600', 600], ['1200', 1200]].map(([l, x]) => (
          <text key={l} x={Number(x) + 6} y={14} fill="#F4F1EA" fillOpacity="0.25" fontSize="10" fontFamily="monospace">{l}</text>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, #060a05, transparent)' }} />
    </div>
  )
}
