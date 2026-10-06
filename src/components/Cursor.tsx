'use client'

import { useEffect, useRef } from 'react'
import { cursorLabel, type CursorLabel } from '@/design/tokens'

// Resolve what the pointer is over. Explicit data-cursor wins; common targets are inferred.
const SELECTOR =
  '[data-cursor], a[href^="mailto:"], a[href*="github.com"], a[href$=".pdf"], a[href^="/work/"], a[href="#work"], a[href*="linkedin.com"]'

function resolve(el: Element | null): CursorLabel | null {
  const hit = el?.closest(SELECTOR)
  if (!hit) return null
  const explicit = hit.getAttribute('data-cursor')
  if (explicit && explicit in cursorLabel) return explicit as CursorLabel
  const href = hit.getAttribute('href') ?? ''
  if (href.startsWith('mailto:') || href.includes('linkedin.com')) return 'email'
  if (href.includes('github.com')) return 'github'
  if (href.endsWith('.pdf')) return 'resume'
  return 'project'
}

// Dot plus a small label chip. Disabled on touch; native cursor returns if this fails to mount.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const chipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const chip = chipRef.current
    if (!dot || !chip) return

    document.documentElement.classList.add('has-custom-cursor')
    let current: CursorLabel | null = null
    let raf = 0
    let x = -100
    let y = -100

    const paint = () => {
      raf = 0
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${current ? 1.8 : 1})`
      chip.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    const apply = (el: Element | null) => {
      const next = resolve(el)
      if (next !== current) {
        current = next
        const text = next ? cursorLabel[next] : ''
        chip.textContent = text
        chip.style.opacity = text ? '1' : '0'
        dot.style.background = next ? '#B8FF3D' : '#F4F1EA'
      }
      queue()
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      x = e.clientX
      y = e.clientY
      dot.style.opacity = '1'
      apply(e.target as Element)
    }
    // Content moves under a still pointer (scroll, route change): re-resolve from the point.
    const recheck = () => {
      if (x < 0) return
      apply(document.elementFromPoint(x, y))
    }
    let rc = 0
    const queueRecheck = () => {
      if (!rc) rc = requestAnimationFrame(() => ((rc = 0), recheck()))
    }
    const afterClick = () => setTimeout(recheck, 900)
    const leave = () => {
      dot.style.opacity = '0'
      chip.style.opacity = '0'
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', queueRecheck, { passive: true })
    window.addEventListener('click', afterClick)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', queueRecheck)
      window.removeEventListener('click', afterClick)
      cancelAnimationFrame(rc)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-[6px] w-[6px] rounded-full"
        style={{ background: '#F4F1EA', opacity: 0, transition: 'background 0.15s, opacity 0.2s' }}
      />
      <div
        ref={chipRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10001] rounded px-2 py-1"
        style={{
          opacity: 0,
          transition: 'opacity 0.15s',
          fontFamily: 'var(--font-ibm-plex-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#F4F1EA',
          background: 'rgba(5,5,5,0.88)',
          border: '1px solid rgba(184,255,61,0.35)',
        }}
      />
    </>
  )
}
