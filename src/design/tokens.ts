// Single source for design tokens. CSS variables in globals.css mirror these values.

export const color = {
  bg: '#050505',
  surface: '#0d0d0d',
  text: '#F4F1EA',
  textSoft: 'rgba(244,241,234,0.7)',
  muted: 'rgba(244,241,234,0.5)',
  line: 'rgba(244,241,234,0.12)',
  lime: '#B8FF3D', // active / interactive / live only
  cyan: '#4DE8FF', // Kavya world + system state only
  world: {
    yamini: { bg: '#070b06', accent: '#B8FF3D' },
    kavya: { bg: '#05080f', accent: '#4DE8FF' },
    uzhavan: { bg: '#0b0904', accent: '#D8B35A' },
  },
} as const

export const duration = {
  micro: 0.2,
  ui: 0.45,
  scene: 1.0,
  hero: 1.2,
} as const

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: 'spring', stiffness: 120, damping: 26, mass: 0.9 } as const,
}

// Pointer parallax: low amplitude, high damping.
export const parallax = { amplitudePx: 6, lerp: 0.06 } as const

// Max major effects per section (brief section 46).
export const effectBudget = {
  hero: 4,
  globe: 3,
  work: 3,
  caseStudy: 3,
  stack: 2,
  about: 2,
  contact: 2,
} as const

export const cursorLabel = {
  default: '',
  project: 'OPEN',
  architecture: 'TRACE',
  media: 'INSPECT',
  github: 'CODE',
  resume: 'RESUME',
  email: 'CONNECT',
  globe: 'ROTATE',
} as const

export type CursorLabel = keyof typeof cursorLabel
