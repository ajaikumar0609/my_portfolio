import { person } from '@/data/content'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

// Verified facts only. No employer, address, awards, or software-product schema for the projects.
export default function JsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: person.name,
        url: SITE_URL,
        image: `${SITE_URL}/ajai-kumar.jpg`,
        jobTitle: 'Software Engineer',
        description: SITE_DESCRIPTION,
        sameAs: [person.github, person.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }
  // "<" is escaped so the payload can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
}
