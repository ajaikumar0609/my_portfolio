'use client'

import { useEffect, useRef } from 'react'

interface P {
  hx: number
  hy: number
  sx: number
  sy: number
  phase: number
  r: number
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

// 2D canvas on purpose: the hero's only WebGL budget belongs to the globe.
export default function ParticleField({ ready, reduced }: { ready: boolean; reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const readyRef = useRef(ready)
  readyRef.current = ready

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let particles: P[] = []
    let raf = 0
    let visible = true
    let readyAt = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const small = w < 768
      const cols = small ? 9 : 20
      const rows = small ? 14 : 11
      particles = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const hx = ((i + 0.5 + (Math.random() - 0.5) * 0.7) / cols) * w
          const hy = ((j + 0.5 + (Math.random() - 0.5) * 0.7) / rows) * h
          const dx = hx - w / 2
          const dy = hy - h / 2
          const k = 1.5 + Math.random() * 0.8
          particles.push({
            hx,
            hy,
            sx: w / 2 + dx * k,
            sy: h / 2 + dy * k,
            phase: Math.random() * Math.PI * 2,
            r: Math.random() < 0.08 ? 1.6 : 1,
          })
        }
      }
    }

    const draw = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return

      let t = 0
      if (reduced) t = 1
      else if (readyRef.current) {
        if (!readyAt) readyAt = now
        t = Math.min(1, (now - readyAt) / 1400)
      }
      const e = easeOut(t)
      const drift = reduced ? 0 : t >= 1 ? 1 : 0
      const time = now / 1000

      ctx.clearRect(0, 0, w, h)
      const pts: [number, number][] = []
      for (const p of particles) {
        const ox = drift * Math.sin(time * 0.4 + p.phase) * 5
        const oy = drift * Math.cos(time * 0.33 + p.phase) * 5
        const x = p.sx + (p.hx - p.sx) * e + ox
        const y = p.sy + (p.hy - p.sy) * e + oy
        pts.push([x, y])
        ctx.fillStyle = `rgba(244,241,234,${(0.1 + 0.3 * e).toFixed(3)})`
        ctx.fillRect(x, y, p.r, p.r)
      }

      if (w >= 768 && e > 0.6) {
        ctx.lineWidth = 0.5
        const a = ((e - 0.6) / 0.4) * 0.07
        ctx.strokeStyle = `rgba(244,241,234,${a.toFixed(3)})`
        ctx.beginPath()
        const max = 130 * 130
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i][0] - pts[j][0]
            const dy = pts[i][1] - pts[j][1]
            if (dx * dx + dy * dy < max) {
              ctx.moveTo(pts[i][0], pts[i][1])
              ctx.lineTo(pts[j][0], pts[j][1])
            }
          }
        }
        ctx.stroke()
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    build()
    start()

    const ro = new ResizeObserver(() => {
      build()
      readyAt = readyRef.current ? performance.now() - 1400 : 0
      start()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)

    const onVis = () => {
      if (!document.hidden) start()
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
