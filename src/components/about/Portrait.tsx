'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { person } from '@/data/content'

// Editorial portrait: no box. Mask fade at the waist, warm key light behind, thin rim light.
// Pointer parallax is <= 6px, fine pointers only, off under reduced motion, paused offscreen.
export default function Portrait() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const moveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const el = moveRef.current
    if (!wrap || !el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    let onScreen = false
    const tick = () => {
      raf = 0
      if (!onScreen || document.hidden) return
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      el.style.transform = `translate3d(${(cur.x * 6).toFixed(2)}px, ${(cur.y * 4).toFixed(2)}px, 0)`
      if (Math.abs(target.x - cur.x) > 0.001 || Math.abs(target.y - cur.y) > 0.001) raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
      start()
    }
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) start()
    })
    io.observe(wrap)
    window.addEventListener('pointermove', onMove, { passive: true })
    const onVis = () => !document.hidden && start()
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute right-[-16vw] top-[11svh] z-20 h-[62svh] md:right-[4vw] md:top-auto md:bottom-0 md:h-[min(88svh,940px)]"
    >
      <div ref={moveRef} className="relative h-full" style={{ willChange: 'transform' }}>
        <div
          aria-hidden="true"
          className="absolute inset-x-[-25%] top-[2%] bottom-0"
          style={{ background: 'radial-gradient(ellipse 52% 46% at 50% 28%, rgba(244,241,234,0.14), transparent 72%)' }}
        />
        <Image
          src={person.photo}
          alt="Portrait of Ajai Kumar N"
          width={943}
          height={1668}
          loading="lazy"
          sizes="(max-width: 768px) 70vw, 40vw"
          className="relative block h-full w-auto"
          style={{
            filter: 'brightness(1.12) contrast(1.05) drop-shadow(-1px 0 0 rgba(244,241,234,0.2)) drop-shadow(0 0 32px rgba(244,241,234,0.07))',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, #000 70%, transparent 100%)',
          }}
        />
      </div>
    </div>
  )
}
