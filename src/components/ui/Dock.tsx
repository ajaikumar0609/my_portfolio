'use client'

// Adapted from React Bits Dock (magnification mechanic kept).
// Changes: real <button> items, <nav> landmark, active-section indicator,
// shortcut hints, viewport-based pointer math, no magnification on touch/reduced motion.

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

export type DockItemData = {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
  shortcut?: string
  cursor?: string
  dividerBefore?: boolean
}

export type DockProps = {
  items: DockItemData[]
  magnification?: number
  distance?: number
  baseItemSize?: number
  spring?: SpringOptions
}

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

function DockItem({
  item,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: {
  item: DockItemData
  mouseX: MotionValue<number>
  spring: SpringOptions
  distance: number
  magnification: number
  baseItemSize: number
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const hovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize }
    return val - rect.x - baseItemSize / 2
  })
  const target = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize])
  const size = useSpring(target, spring)

  const [showLabel, setShowLabel] = useState(false)
  useEffect(() => hovered.on('change', v => setShowLabel(v === 1)), [hovered])

  const name = item.shortcut ? `${item.label} (${item.shortcut})` : item.label

  return (
    <>
      {item.dividerBefore && (
        <span aria-hidden="true" className="mx-0.5 h-6 w-px self-center" style={{ background: 'var(--border)' }} />
      )}
      <motion.button
        ref={ref}
        type="button"
        style={{ width: size, height: size }}
        data-cursor={item.cursor}
        aria-label={name}
        aria-current={item.active ? 'location' : undefined}
        onClick={item.onClick}
        onHoverStart={() => hovered.set(1)}
        onHoverEnd={() => hovered.set(0)}
        onFocus={e => e.currentTarget.matches(':focus-visible') && hovered.set(1)}
        onBlur={() => hovered.set(0)}
        className="relative inline-flex shrink-0 items-center justify-center rounded-lg border bg-transparent transition-colors"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg"
          style={{
            background: item.active ? 'rgba(184,255,61,0.08)' : 'rgba(244,241,234,0.03)',
            border: `1px solid ${item.active ? 'rgba(184,255,61,0.45)' : 'rgba(244,241,234,0.12)'}`,
            transition: 'background 0.3s, border-color 0.3s',
          }}
        />
        <span
          className="relative flex items-center justify-center"
          style={{ color: item.active ? '#B8FF3D' : '#F4F1EA', transition: 'color 0.3s' }}
        >
          {item.icon}
        </span>
        {item.active && (
          <span
            aria-hidden="true"
            className="absolute -bottom-[7px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full"
            style={{ background: '#B8FF3D' }}
          />
        )}
        <AnimatePresence>
          {showLabel && (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute -top-7 left-1/2 whitespace-pre rounded px-2 py-1"
              style={{
                x: '-50%',
                ...mono,
                fontSize: 10,
                letterSpacing: '0.16em',
                color: '#F4F1EA',
                background: 'rgba(5,5,5,0.92)',
                border: '1px solid var(--border)',
              }}
            >
              {item.label}
              {item.shortcut ? <span style={{ color: 'rgba(244,241,234,0.55)' }}>{`  ${item.shortcut}`}</span> : null}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

export default function Dock({
  items,
  spring = { mass: 0.1, stiffness: 150, damping: 14 },
  magnification = 58,
  distance = 140,
  baseItemSize = 44,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const fineQ = window.matchMedia('(hover: hover) and (pointer: fine)')
    const redQ = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setFine(fineQ.matches && !redQ.matches)
    update()
    fineQ.addEventListener('change', update)
    redQ.addEventListener('change', update)
    return () => {
      fineQ.removeEventListener('change', update)
      redQ.removeEventListener('change', update)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom))] z-[900] flex justify-center">
      <nav
        aria-label="Primary"
        onMouseMove={e => fine && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-1.5 rounded-xl px-2.5 pb-2 pt-2 backdrop-blur-md md:gap-2"
        style={{
          height: baseItemSize + 20,
          background: 'rgba(5,5,5,0.72)',
          border: '1px solid var(--border)',
        }}
      >
        {items.map(item => (
          <DockItem
            key={item.label}
            item={item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={fine ? magnification : baseItemSize}
            baseItemSize={baseItemSize}
          />
        ))}
      </nav>
    </div>
  )
}
