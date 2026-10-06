import type { Metadata } from 'next'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
  description:
    'Ajai Kumar: Computer Science and Artificial Intelligence at Karunya Institute of Technology and Sciences, building backend systems and intelligent applications.',
}

export default function AboutPage() {
  return (
    <main id="main">
      <h1 className="sr-only">About Ajai Kumar</h1>
      <AboutSection />
      <ExperienceSection />
    </main>
  )
}
