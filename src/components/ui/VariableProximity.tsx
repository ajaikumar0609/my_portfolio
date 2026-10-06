'use client'

// Adapted from React Bits VariableProximity.
// Changes: interactive only on fine pointers without reduced motion (static text otherwise),
// rAF + listeners only run while on screen and the tab is visible, per-letter spans are
// aria-hidden with one sr-only copy of the label, default font follows the site's variable font.

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type MutableRefObject,
} from 'react'

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: MutableRefObject<HTMLElement | null>
  radius?: number
  falloff?: 'linear' | 'exponential' | 'gaussian'
  className?: string
  style?: CSSProperties
}

const parseSettings = (settingsStr: string) =>
  new Map(
    settingsStr
      .split(',')
      .map(s => s.trim())
      .map(s => {
        const [name, value] = s.split(' ')
        return [name.replace(/['"]/g, ''), parseFloat(value)] as [string, number]
      }),
  )

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    style,
    ...restProps
  } = props

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const last = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const [interactive, setInteractive] = useState(false)

  const parsed = useMemo(() => {
    const from = parseSettings(fromFontVariationSettings)
    const to = parseSettings(toFontVariationSettings)
    return Array.from(from.entries()).map(([axis, fromValue]) => ({ axis, fromValue, toValue: to.get(axis) ?? fromValue }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  // Fine pointer and no reduced motion; follows live changes. Server and first render are static.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setInteractive(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!interactive || !container) return

    let raf = 0
    let onScreen = false
    const falloffAt = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
      if (falloff === 'exponential') return norm ** 2
      if (falloff === 'gaussian') return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
      return norm
    }

    const frame = () => {
      raf = 0
      if (!onScreen || document.hidden) return
      const { x, y } = mouse.current
      if (last.current.x !== x || last.current.y !== y) {
        last.current = { x, y }
        const cr = container.getBoundingClientRect()
        letterRefs.current.forEach(el => {
          if (!el) return
          const r = el.getBoundingClientRect()
          const d = Math.hypot(x - (r.left + r.width / 2 - cr.left), y - (r.top + r.height / 2 - cr.top))
          if (d >= radius) {
            el.style.fontVariationSettings = fromFontVariationSettings
            return
          }
          const f = falloffAt(d)
          el.style.fontVariationSettings = parsed
            .map(({ axis, fromValue, toValue }) => `'${axis}' ${fromValue + (toValue - fromValue) * f}`)
            .join(', ')
        })
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => {
      const cr = container.getBoundingClientRect()
      mouse.current = { x: e.clientX - cr.left, y: e.clientY - cr.top }
      start()
    }
    const onVis = () => !document.hidden && start()

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
    })
    io.observe(container)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      letterRefs.current.forEach(el => {
        if (el) el.style.fontVariationSettings = fromFontVariationSettings
      })
    }
  }, [interactive, containerRef, radius, falloff, parsed, fromFontVariationSettings])

  const base: CSSProperties = {
    display: 'inline',
    fontFamily: 'var(--font-space-grotesk), sans-serif',
    ...style,
  }

  if (!interactive) {
    return (
      <span ref={ref} style={base} className={className} {...restProps}>
        {label}
      </span>
    )
  }

  const words = label.split(' ')
  let letterIndex = 0

  return (
    <span ref={ref} style={base} className={className} {...restProps}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const i = letterIndex++
            return (
              <span
                key={i}
                ref={el => {
                  letterRefs.current[i] = el
                }}
                style={{ display: 'inline-block', fontVariationSettings: fromFontVariationSettings }}
              >
                {letter}
              </span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
