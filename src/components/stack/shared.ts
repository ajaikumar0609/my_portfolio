import { worldTheme } from '@/data/worlds'
import { isProject, type LinkId } from '@/data/stack'

export const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
export const sans = { fontFamily: 'var(--font-space-grotesk), sans-serif' } as const

export const accentOf = (id: LinkId): string => (isProject(id) ? worldTheme[id].accent : '#F4F1EA')
