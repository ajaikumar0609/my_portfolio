'use client'

import { useState } from 'react'
import { markReady } from '@/lib/system'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import Hero from '@/components/Hero'
import SelectedSystems from '@/components/SelectedSystems'

const GlobeScene = dynamic(() => import('@/components/GlobeScene'))
const StackGraph = dynamic(() => import('@/components/StackGraph'))
const AboutSection = dynamic(() => import('@/components/AboutSection'))
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))

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
        <main id="main">
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
