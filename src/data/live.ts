// Public web experiences. These are the companies' real public websites, not the engineering projects themselves:
// the ERP (Yamini) and the fleet platform (Kavya) are the case studies; these sites are the public-facing layer.
export type LiveId = 'yamini' | 'kavya'

export interface LiveSite {
  url: string
  domain: string
  /** Accessible iframe title. */
  title: string
  caption: string
  preview: { src: string; width: number; height: number; alt: string }
}

export const liveSites: Record<LiveId, LiveSite> = {
  yamini: {
    url: 'https://yaminicopier.com/',
    domain: 'yaminicopier.com',
    title: 'Yamini Infotech public website',
    caption: 'YAMINI INFOTECH — PUBLIC WEB EXPERIENCE',
    preview: { src: '/projects/yamini/yamini-live-site-preview.webp', width: 1600, height: 1000, alt: 'Preview of the Yamini Infotech public website home page' },
  },
  kavya: {
    url: 'https://www.kavyatransports.com/',
    domain: 'www.kavyatransports.com',
    title: 'Kavya Transports public website',
    caption: 'KAVYA TRANSPORTS — PUBLIC WEB EXPERIENCE',
    preview: { src: '/projects/kavya/kavya-live-site-preview.webp', width: 1600, height: 1000, alt: 'Preview of the Kavya Transports public website home page' },
  },
}
