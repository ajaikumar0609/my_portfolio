'use client'

import { useState } from 'react'
import { markReady } from '@/lib/system'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import Hero from '@/components/Hero'
import StatusStrip from '@/components/StatusStrip'
import SelectedSystems from '@/components/SelectedSystems'
import About from '@/components/About'
import Contact from '@/components/Contact'

const GlobeScene = dynamic(() => import('@/components/GlobeScene'), { ssr: false })
const SkillsOrbit = dynamic(() => import('@/components/SkillsOrbit'), { ssr: false })
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loader onComplete={() => { setLoaded(true); markReady() }} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <main>
          <Hero ready={loaded} />
          <GlobeScene />
          <StatusStrip />
          <SelectedSystems />
          <SkillsOrbit />
          <About />
          <ExperienceTimeline />
          <Contact />
        </main>
      </div>

    </>
  )
}
