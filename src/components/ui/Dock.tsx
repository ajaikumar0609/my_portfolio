'use client'

// Adapted from React Bits Dock (magnification mechanic kept).
// Changes: real <button> items inside a <nav>, always-visible labels, high-contrast surface,
// bottom scrim, safe-area spacing, active-section state, and a separate secondary external link.

import { motion, MotionValue, useMotionValue, useSpring, useTransform, type SpringOptions } from 'motion/react'
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

export type DockSecondary = {
  href: string
  label: string
  icon: React.ReactNode
  cursor?: string
  shortcut?: string
}

export type DockProps = {
  items: DockItemData[]
  secondary?: DockSecondary
  magnification?: number
  distance?: number
  baseItemSize?: number
  spring?: SpringOptions
}

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

const SURFACE = {
  background: 'rgba(10,10,10,0.9)',
  border: '1px solid rgba(244,241,234,0.24)',
  boxShadow: '0 10px 36px rgba(0,0,0,0.55)',
} as const

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

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize }
    return val - rect.x - baseItemSize / 2
  })
  const target = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize])
  const size = useSpring(target, spring)

  const name = item.shortcut ? `${item.label} (${item.shortcut})` : item.label

  return (
    <>
      {item.dividerBefore && (
        <span aria-hidden="true" className="mx-0.5 h-9 w-px self-start" style={{ background: 'rgba(244,241,234,0.22)', marginTop: 4 }} />
      )}
      <div className="flex min-w-[44px] flex-col items-center md:min-w-[58px]">
        <motion.button
          ref={ref}
          type="button"
          style={{ width: size, height: size }}
          data-cursor={item.cursor}
          title={name}
          aria-label={name}
          aria-current={item.active ? 'location' : undefined}
          onClick={item.onClick}
          className="relative inline-flex shrink-0 items-center justify-center rounded-lg bg-transparent"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-lg"
            style={{
              background: item.active ? 'rgba(184,255,61,0.16)' : 'rgba(244,241,234,0.07)',
              border: `1px solid ${item.active ? 'rgba(184,255,61,0.75)' : 'rgba(244,241,234,0.28)'}`,
              transition: 'background 0.25s, border-color 0.25s',
            }}
          />
          <span
            className="relative flex items-center justify-center"
            style={{ color: item.active ? '#B8FF3D' : '#F4F1EA', transition: 'color 0.25s' }}
          >
            {item.icon}
          </span>
        </motion.button>
        <span
          aria-hidden="true"
          className="mt-1 select-none text-[8.5px] tracking-[0.04em] md:text-[9.5px] md:tracking-[0.12em]"
          style={{ ...mono, color: item.active ? '#B8FF3D' : 'rgba(244,241,234,0.86)', fontWeight: item.active ? 500 : 400 }}
        >
          {item.label}
        </span>
      </div>
    </>
  )
}

export default function Dock({
  items,
  secondary,
  spring = { mass: 0.1, stiffness: 150, damping: 14 },
  magnification = 56,
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

  const ghName = secondary ? (secondary.shortcut ? `${secondary.label} (${secondary.shortcut}), opens in a new tab` : `${secondary.label}, opens in a new tab`) : ''

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[900]">
      {/* Scrim: page content fades out behind the control surface instead of crossing it */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[150px]"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.78) 42%, rgba(5,5,5,0) 100%)' }}
      />
      <div className="relative flex items-end justify-center gap-3 px-3 pb-[max(18px,calc(env(safe-area-inset-bottom)+10px))]">
        <nav
          aria-label="Primary"
          onMouseMove={e => fine && mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="pointer-events-auto flex items-start gap-px rounded-xl px-1 pb-1.5 pt-2 backdrop-blur-md min-[380px]:gap-[3px] min-[380px]:px-2 md:gap-2 md:px-3 md:pb-2"
          style={SURFACE}
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

          {/* Mobile: GitHub lives in the same control surface, after a divider */}
          {secondary && (
            <>
              <span aria-hidden="true" className="mx-0.5 mt-1 h-9 w-px self-start md:hidden" style={{ background: 'rgba(244,241,234,0.22)' }} />
              <div className="flex min-w-[44px] flex-col items-center md:hidden">
                <a
                  href={secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={secondary.cursor}
                  title={ghName}
                  aria-label={ghName}
                  className="relative inline-flex items-center justify-center rounded-lg"
                  style={{ width: baseItemSize, height: baseItemSize, color: '#F4F1EA', background: 'rgba(244,241,234,0.07)', border: '1px solid rgba(244,241,234,0.28)' }}
                >
                  {secondary.icon}
                </a>
                <span aria-hidden="true" className="mt-1 text-[8.5px] tracking-[0.04em]" style={{ ...mono, color: 'rgba(244,241,234,0.86)' }}>
                  {secondary.label}
                </span>
              </div>
            </>
          )}
        </nav>

        {/* Desktop: distinct secondary external action beside the dock */}
        {secondary && (
          <a
            href={secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={secondary.cursor}
            title={ghName}
            aria-label={ghName}
            className="pointer-events-auto hidden items-center gap-2.5 self-end rounded-xl px-4 backdrop-blur-md transition-colors hover:border-[rgba(184,255,61,0.7)] hover:text-[#B8FF3D] md:flex"
            style={{ ...SURFACE, ...mono, height: baseItemSize + 24, color: '#F4F1EA', fontSize: 11, letterSpacing: '0.16em' }}
          >
            {secondary.icon}
            <span>{secondary.label}</span>
            <span aria-hidden="true" style={{ opacity: 0.7 }}>↗</span>
          </a>
        )}
      </div>
    </div>
  )
}
