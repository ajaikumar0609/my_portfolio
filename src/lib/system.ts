import type Lenis from 'lenis'
import { person } from '@/data/content'

export type SectionKey = 'system' | 'work' | 'about' | 'stack' | 'contact'

export const sections: { key: SectionKey; label: string; id: string; shortcut?: string }[] = [
  { key: 'system', label: 'SYSTEM', id: 'hero' },
  { key: 'work', label: 'WORK', id: 'work', shortcut: 'W' },
  { key: 'about', label: 'ABOUT', id: 'about', shortcut: 'A' },
  { key: 'stack', label: 'STACK', id: 'stack', shortcut: 'S' },
  { key: 'contact', label: 'CONTACT', id: 'contact', shortcut: 'C' },
]

export const external = {
  resume: person.resume,
  github: person.github,
  linkedin: person.linkedin,
}

// Lenis is created once by Chrome; everything else scrolls through here.
let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => {
  lenis = l
}
export const getLenis = () => lenis

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis && !prefersReducedMotion()) lenis.scrollTo(el, { duration: 1.2 })
  else el.scrollIntoView({ behavior: 'auto', block: 'start' })
  try {
    history.replaceState(null, '', id === 'hero' ? window.location.pathname : `#${id}`)
  } catch {}
  return true
}

// "Boot finished" flag, so global chrome appears after the loader, on any route.
let ready = false
const subs = new Set<() => void>()
export const markReady = () => {
  if (ready) return
  ready = true
  subs.forEach(f => f())
}
export const subscribeReady = (f: () => void) => {
  subs.add(f)
  return () => {
    subs.delete(f)
  }
}
export const getReady = () => ready

export function isTypingTarget(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false
  return t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)
}

// Project transitions: anything can ask to enter a project world; Chrome plays the curtain and routes.
export const PROJECT_EVENT = 'ajai:project'
export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: { id } }))
}
