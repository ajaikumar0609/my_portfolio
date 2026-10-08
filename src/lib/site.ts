// Single source for the canonical origin: the custom domain (DNS, HTTPS and the www redirect are verified).
// NEXT_PUBLIC_SITE_URL can still override it for previews (no trailing slash).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajaikumar0609.tech').replace(/\/$/, '')

export const SITE_NAME = 'Ajai Kumar'
export const SITE_TITLE = 'AJAI KUMAR — BACKEND / SOFTWARE ENGINEER · AI/ML'
export const SITE_DESCRIPTION =
  'Backend / Software Engineer with AI/ML experience, focused on APIs, data systems and real-world software products.'

export const PUBLIC_ROUTES = ['/', '/work', '/work/yamini', '/work/kavya', '/work/uzhavan', '/about', '/contact'] as const
