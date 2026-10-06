import type { Metadata } from 'next'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'

export const metadata: Metadata = {
  title: 'About — Ajai Kumar',
  description:
    'Ajai Kumar: Computer Science and Artificial Intelligence at Karunya Institute of Technology and Sciences, building backend systems and intelligent applications.',
}

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
      <ExperienceSection />
    </main>
  )
}
