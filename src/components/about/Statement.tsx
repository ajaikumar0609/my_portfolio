'use client'

import { useRef } from 'react'
import VariableProximity from '@/components/ui/VariableProximity'
import { person } from '@/data/content'

// The section's one big typography moment. The sentence lives in a real <h3>.
export default function Statement() {
  const ref = useRef<HTMLHeadingElement | null>(null)
  return (
    <h3
      ref={ref}
      className="relative z-30 m-0 max-w-[16ch] md:z-10 text-[clamp(2.1rem,9.2vw,3.1rem)] md:max-w-[15ch] md:text-[clamp(3.4rem,6.6vw,7rem)]"
      style={{
        fontFamily: 'var(--font-space-grotesk), sans-serif',
        fontWeight: 600,
        lineHeight: 0.98,
        letterSpacing: '-0.04em',
        color: '#F4F1EA',
        textTransform: 'uppercase',
        textShadow: '0 2px 24px rgba(5,5,5,0.85)',
      }}
    >
      <VariableProximity
        label={person.philosophy.toUpperCase()}
        containerRef={ref}
        radius={120}
        falloff="linear"
        fromFontVariationSettings="'wght' 500"
        toFontVariationSettings="'wght' 700"
      />
    </h3>
  )
}
