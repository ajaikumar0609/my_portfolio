'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import DepthText from '@/components/ui/DepthText'
import ParticleField from '@/components/hero/ParticleField'
import { useReduced } from '@/lib/useReduced'
import { person } from '@/data/content'
import { ease } from '@/design/tokens'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

const STATEMENT = ['I BUILD INTELLIGENT', 'SYSTEMS THAT OPERATE', 'IN THE REAL WORLD.']

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = useReduced()
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Exit: the name recedes and the field darkens, handing off to the globe.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const nameScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.82])
  const nameY = useTransform(scrollYProgress, [0, 0.8], ['0vh', '-6vh'])
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.75], [1, 0])
  const portraitOpacity = useTransform(scrollYProgress, [0.15, 0.7], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 0.8], ['0vh', '-4vh'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const fieldOpacity = useTransform(scrollYProgress, [0.3, 1], [1, 0.25])

  // Pointer parallax on the portrait: low amplitude, high damping.
  useEffect(() => {
    const el = parallaxRef.current
    if (!el || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06
      cur.y += (target.y - cur.y) * 0.06
      el.style.transform = `translate3d(${(cur.x * 6).toFixed(2)}px, ${(cur.y * 4).toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const rise = (delay: number, y = 24): Variants => ({
    out: { opacity: 0, y: reduced ? 0 : y },
    in: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 1.1, delay: reduced ? 0 : delay, ease: ease.out },
    },
  })
  const state = ready ? 'in' : 'out'

  return (
    <section
      id="hero"
      data-nav="system"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: 620 }}
    >
      {/* Field */}
      <motion.div className="absolute inset-0" style={{ opacity: reduced ? 1 : fieldOpacity }}>
        <ParticleField ready={ready} reduced={reduced} />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 62% 45%, rgba(244,241,234,0.045), transparent 70%), radial-gradient(ellipse at center, transparent 45%, rgba(5,5,5,0.85) 100%)',
        }}
      />

      {/* Layer 1: name, behind the subject */}
      <motion.div
        className="absolute left-[6vw] top-[11svh] z-10 md:left-[7vw]"
        style={{ scale: reduced ? 1 : nameScale, y: reduced ? 0 : nameY, opacity: reduced ? 1 : nameOpacity, transformOrigin: '0% 0%' }}
      >
        <motion.h1
          variants={rise(0.15, 40)}
          initial="out"
          animate={state}
          className="m-0"
          style={sans}
        >
          <span className="block">
            <DepthText
              text="AJAI"
              fontSize="var(--hero-name-size)"
              fontWeight={700}
              layers={22}
              depth={1.5}
              faceColor="#F4F1EA"
              depthColor="#16190c"
              tilt={6}
              autoOrbit={false}
              style={sans}
            />
          </span>
          <span className="block">
            <DepthText
              text="KUMAR"
              fontSize="var(--hero-name-size)"
              fontWeight={700}
              layers={22}
              depth={1.5}
              faceColor="#F4F1EA"
              depthColor="#16190c"
              tilt={6}
              autoOrbit={false}
              style={sans}
            />
          </span>
        </motion.h1>
      </motion.div>

      {/* Layer 2: portrait, integrated into the composition */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[-14vw] z-20 md:right-[8vw] lg:right-[16vw]"
        style={{ opacity: reduced ? 1 : portraitOpacity, y: reduced ? 0 : portraitY }}
      >
        <div ref={parallaxRef} style={{ willChange: 'transform' }}>
          <motion.div variants={rise(0.55, 36)} initial="out" animate={state} className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-[-20%] top-[4%] bottom-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 48% at 50% 30%, rgba(244,241,234,0.13), transparent 72%)',
              }}
            />
            <Image
              src={person.photo}
              alt="Portrait of Ajai Kumar N"
              width={943}
              height={1668}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 60vw, 38vw"
              className="relative block h-[66svh] w-auto md:h-[90svh]"
              style={{
                filter:
                  'brightness(1.14) contrast(1.05) drop-shadow(-1px 0 0 rgba(244,241,234,0.2)) drop-shadow(0 0 36px rgba(244,241,234,0.08))',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Layer 3: positioning and statement */}
      <motion.div
        className="absolute bottom-[calc(max(14px,env(safe-area-inset-bottom))+84px)] left-[6vw] z-30 md:bottom-[7svh] md:left-[7vw]"
        style={{ opacity: reduced ? 1 : textOpacity }}
      >
        <motion.div variants={rise(0.95, 18)} initial="out" animate={state}>
          <p
            className="m-0"
            style={{ ...mono, fontSize: 13, letterSpacing: '0.2em', color: '#F4F1EA' }}
          >
            {person.headline}
          </p>
          <p
            className="m-0 mt-2"
            style={{ ...mono, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.55)' }}
          >
            {person.resumeTitle}
          </p>
        </motion.div>

        <motion.p
          variants={rise(1.15, 18)}
          initial="out"
          animate={state}
          className="m-0 mt-5 md:mt-6"
          style={{
            ...sans,
            fontSize: 'clamp(16px, 2vw, 28px)',
            fontWeight: 400,
            lineHeight: 1.35,
            letterSpacing: '0.01em',
            color: 'rgba(244,241,234,0.88)',
            textShadow: '0 1px 18px rgba(5,5,5,0.9)',
          }}
          aria-label={person.statement}
        >
          {STATEMENT.map(line => (
            <span key={line} aria-hidden="true" className="block">
              {line}
            </span>
          ))}
        </motion.p>
      </motion.div>

      {/* Orientation */}
      <motion.div
        variants={rise(1.5, 0)}
        initial="out"
        animate={state}
        className="absolute left-[6vw] top-[4.5svh] z-30 max-w-[44vw] leading-[1.7] md:left-[7vw] md:max-w-none"
        style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}
      >
        {person.meta}
      </motion.div>
      <motion.div
        variants={rise(1.5, 0)}
        initial="out"
        animate={state}
        className="absolute bottom-[7svh] right-[6vw] z-30 hidden text-right md:block md:right-[7vw]"
        style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.6)' }}
      >
        <div>SCROLL TO EXPLORE ↓</div>
      </motion.div>
    </section>
  )
}
