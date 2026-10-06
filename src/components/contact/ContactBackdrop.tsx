'use client'

import { useEffect, useRef, useState } from 'react'

const W = 1000
const H = 700
const CX = 680
const CY = 330

// Deterministic contour rings: same output on server and client.
const PATHS: string[] = Array.from({ length: 14 }, (_, k) => {
  const r = 44 + k * 30
  const pts: string[] = []
  for (let i = 0; i <= 72; i++) {
    const t = (i / 72) * Math.PI * 2
    const rr = r + 11 * Math.sin(3 * t + k * 0.6) + 6 * Math.sin(5 * t - k * 0.3)
    const x = CX + rr * Math.cos(t) * 1.25
    const y = CY + rr * Math.sin(t)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ') + 'Z'
})

// One faint contour field. Drifts slowly; paused offscreen, when the tab is hidden, and under reduced motion.
export default function ContactBackdrop({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting))
    io.observe(el)
    const onVis = () => setTabVisible(!document.hidden)
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const playing = onScreen && tabVisible && !reduced

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`@keyframes ctDrift{0%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(-14px,8px,0) rotate(1.2deg)}100%{transform:translate3d(0,0,0) rotate(0deg)}}`}</style>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <g
          fill="none"
          stroke="#F4F1EA"
          strokeWidth="1"
          strokeOpacity="0.07"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animationName: reduced ? 'none' : 'ctDrift',
            animationDuration: '70s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationPlayState: playing ? 'running' : 'paused',
          }}
        >
          {PATHS.map((d, i) => (
            <path key={i} d={d} strokeOpacity={i % 5 === 0 ? 0.1 : 0.06} />
          ))}
        </g>
      </svg>
    </div>
  )
}
