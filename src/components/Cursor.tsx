'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('a, button, .magnetic, [data-cursor]') as HTMLElement | null
      if (!el) {
        ring.style.width = '40px'
        ring.style.height = '40px'
        label.textContent = ''
        return
      }
      const cursor = el.dataset.cursor
      if (cursor === 'explore') {
        ring.style.width = '80px'
        ring.style.height = '80px'
        label.textContent = 'EXPLORE'
      } else {
        ring.style.width = '60px'
        ring.style.height = '60px'
        label.textContent = '↗'
      }
    }

    const tick = () => {
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      const w = parseInt(ring.style.width || '40')
      ring.style.transform = `translate(${ringX - w / 2}px, ${ringY - w / 2}px)`
      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#B8FF3D] pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#B8FF3D] pointer-events-none z-[9998] flex items-center justify-center transition-[width,height] duration-200"
        style={{ width: 40, height: 40, willChange: 'transform' }}
      >
        <div
          ref={labelRef}
          className="text-[#B8FF3D] text-[9px] font-mono tracking-widest"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        />
      </div>
    </>
  )
}
