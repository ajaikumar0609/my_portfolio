'use client'

import { useState } from 'react'
import { markReady } from '@/lib/system'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import Hero from '@/components/Hero'
import SelectedSystems from '@/components/SelectedSystems'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import ContactSection from '@/components/ContactSection'
import StackGraph from '@/components/StackGraph'

const GlobeScene = dynamic(() => import('@/components/GlobeScene'), { ssr: false })

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
          <SelectedSystems />
          <StackGraph />
          <AboutSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </div>

    </>
  )
}
