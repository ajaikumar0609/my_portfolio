'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatusStrip from '@/components/StatusStrip'
import WorkSection from '@/components/WorkSection'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SystemHealth from '@/components/SystemHealth'

const SkillsOrbit = dynamic(() => import('@/components/SkillsOrbit'), { ssr: false })
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false })
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false })
const ProofSection = dynamic(() => import('@/components/ProofSection'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let rafId: number

    ;(async () => {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })()

    return () => {
      cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <CommandPalette />
      <Cursor />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Navbar />
        <SystemHealth />
        <main>
          <Hero />
          <StatusStrip />
          <WorkSection />
          <ProofSection />
          <SkillsOrbit />
          <About />
          <ExperienceTimeline />
          <Contact />
        </main>
      </div>

      {/* ⌘K hint */}
      {loaded && (
        <div
          className="fixed bottom-6 right-6 z-[700]"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: 'rgba(244,241,234,0.2)',
            background: 'rgba(244,241,234,0.03)',
            border: '1px solid rgba(244,241,234,0.07)',
            padding: '6px 10px',
          }}
        >
          ⌘K SEARCH · ? SHORTCUTS
        </div>
      )}
    </>
  )
}
