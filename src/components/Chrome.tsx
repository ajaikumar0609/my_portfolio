'use client'

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FileText, Github, Globe, Layers, Mail, Cpu, User } from 'lucide-react'
import Dock, { type DockItemData } from '@/components/ui/Dock'
import Cursor from '@/components/Cursor'
import dynamic from 'next/dynamic'
import { projectKeywords, stackKeywords, type Command } from '@/lib/palette'
import ShortcutsDialog from '@/components/ShortcutsDialog'
import { AnimatePresence, motion } from 'motion/react'
import { projects, type ProjectId } from '@/data/content'
import { worldTheme } from '@/data/worlds'
import {
  external,
  getReady,
  PROJECT_EVENT,
  prefersReducedMotion,
  isTypingTarget,
  scrollToId,
  sections,
  setLenis,
  getLenis,
  subscribeReady,
  type SectionKey,
} from '@/lib/system'

const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false })

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const
const ICONS: Record<SectionKey, React.ReactNode> = {
  system: <Globe size={18} strokeWidth={1.6} />,
  work: <Layers size={18} strokeWidth={1.6} />,
  about: <User size={18} strokeWidth={1.6} />,
  stack: <Cpu size={18} strokeWidth={1.6} />,
  contact: <Mail size={18} strokeWidth={1.6} />,
}

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

// The one global navigation system: Dock, search, cursor, shortcuts, palette, scroll.
export default function Chrome() {
  const router = useRouter()
  const pathname = usePathname()
  const ready = useSyncExternalStore(subscribeReady, getReady, () => false)
  const [palette, setPalette] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  const [help, setHelp] = useState(false)
  const [spot, setSpot] = useState<SectionKey | null>(null)
  const [mac, setMac] = useState(true)
  const [curtain, setCurtain] = useState<{ id: ProjectId; phase: 'in' | 'out' } | null>(null)

  useEffect(() => {
    if (palette) setPaletteLoaded(true)
  }, [palette])

  // Preload the palette chunk once the page is idle so the first ⌘K is instant and no keystrokes are lost.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setPaletteLoaded(true), { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setPaletteLoaded(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const home = pathname === '/'
  const visible = ready || !home

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  // Smooth scroll for every route.
  useEffect(() => {
    let raf = 0
    let alive = true
    ;(async () => {
      const { default: Lenis } = await import('lenis')
      if (!alive) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const l = new Lenis({ duration: 1.1, smoothWheel: true })
      setLenis(l)
      const tick = (t: number) => {
        l.raf(t)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })()
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      getLenis()?.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const l = getLenis()
    if (palette || help) l?.stop()
    else l?.start()
  }, [palette, help])

  // Arriving at /#section from another route.
  useEffect(() => {
    if (!home || !window.location.hash) return
    const id = window.location.hash.slice(1)
    const t = setTimeout(() => scrollToId(id), 250)
    return () => clearTimeout(t)
  }, [home, pathname])

  // Which section is the viewer in?
  useEffect(() => {
    if (!home) {
      setSpot(pathname.startsWith('/work') ? 'work' : pathname === '/about' ? 'about' : pathname === '/contact' ? 'contact' : null)
      return
    }
    let raf = 0
    const compute = () => {
      raf = 0
      const mid = window.innerHeight * 0.4
      let found: SectionKey = 'system'
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) found = el.dataset.nav as SectionKey
      })
      setSpot(found)
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [home, pathname])

  const go = useCallback(
    (key: SectionKey) => {
      const s = sections.find(x => x.key === key)!
      if (home) scrollToId(s.id)
      else router.push(key === 'system' ? '/' : `/#${s.id}`)
    },
    [home, router],
  )

  const commands = useMemo<Command[]>(() => {
    const project = (id: 'yamini' | 'kavya' | 'uzhavan'): Command => {
      const p = projects.find(x => x.id === id)!
      return {
        id,
        label: id.toUpperCase(),
        hint: p.category,
        group: 'PROJECTS',
        keywords: projectKeywords(id),
        run: () => router.push(`/work/${id}`),
      }
    }
    return [
      { id: 'work', label: 'View Work', hint: 'W', group: 'NAVIGATE', keywords: ['projects', 'systems', 'selected'], run: () => go('work') },
      project('yamini'),
      project('kavya'),
      project('uzhavan'),
      { id: 'about', label: 'About', hint: 'A', group: 'NAVIGATE', keywords: ['who', 'ajai', 'experience', 'internship', 'education'], run: () => go('about') },
      { id: 'stack', label: 'Stack', hint: 'S', group: 'NAVIGATE', keywords: ['skills', 'technology', 'tools', ...stackKeywords()], run: () => go('stack') },
      { id: 'contact', label: 'Contact', hint: 'C', group: 'NAVIGATE', keywords: ['email', 'hire', 'message'], run: () => go('contact') },
      { id: 'resume', label: 'Resume', hint: 'R · PDF', group: 'LINKS', keywords: ['cv', 'download'], run: () => openExternal(external.resume) },
      { id: 'github', label: 'GitHub', hint: 'G ↗', group: 'LINKS', keywords: ['code', 'repo', 'source'], run: () => openExternal(external.github) },
      { id: 'linkedin', label: 'LinkedIn', hint: '↗', group: 'LINKS', keywords: ['profile', 'social'], run: () => openExternal(external.linkedin) },
    ]
  }, [go, router])

  // Project transition: curtain in, route, curtain out. Reduced motion routes directly.
  useEffect(() => {
    const onProject = (e: Event) => {
      const id = (e as CustomEvent<{ id: ProjectId }>).detail.id
      if (pathname === `/work/${id}`) return
      if (prefersReducedMotion()) {
        router.push(`/work/${id}`)
        return
      }
      setCurtain({ id, phase: 'in' })
      setTimeout(() => router.push(`/work/${id}`), 520)
      setTimeout(() => setCurtain(c => (c && c.phase === 'in' ? null : c)), 6000)
    }
    window.addEventListener(PROJECT_EVENT, onProject)
    return () => window.removeEventListener(PROJECT_EVENT, onProject)
  }, [pathname, router])

  useEffect(() => {
    if (!curtain || curtain.phase !== 'in' || pathname !== `/work/${curtain.id}`) return
    const t1 = setTimeout(() => setCurtain(c => (c ? { ...c, phase: 'out' } : c)), 350)
    const t2 = setTimeout(() => setCurtain(null), 1100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, curtain])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (palette) setPalette(false)
        if (help) setHelp(false)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setHelp(false)
        setPalette(p => !p)
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || isTypingTarget(e.target)) return
      if (palette) return
      if (help) {
        if (e.key === '?') setHelp(false)
        return
      }
      switch (e.key.toLowerCase()) {
        case '/':
          e.preventDefault()
          setPalette(true)
          break
        case '?':
          setHelp(true)
          break
        case 'w': go('work'); break
        case 'a': go('about'); break
        case 's': go('stack'); break
        case 'c': go('contact'); break
        case 'r': openExternal(external.resume); break
        case 'g': openExternal(external.github); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [palette, help, go])

  const items: DockItemData[] = [
    ...sections.map(s => ({
      icon: ICONS[s.key],
      label: s.label,
      shortcut: s.shortcut,
      active: spot === s.key,
      onClick: () => go(s.key),
    })),
    {
      icon: <FileText size={18} strokeWidth={1.6} />,
      label: 'RESUME',
      shortcut: 'R',
      cursor: 'resume',
      dividerBefore: true,
      onClick: () => openExternal(external.resume),
    },
  ]

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[11000] focus:px-4 focus:py-3"
        style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', background: '#050505', color: '#F4F1EA', border: '1px solid #B8FF3D' }}
      >
        SKIP TO CONTENT
      </a>
      <Cursor />
      <div
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? 'visible' : 'hidden',
          transition: 'opacity 0.6s ease 0.2s',
        }}
      >
        <button
          type="button"
          onClick={() => setPalette(true)}
          aria-keyshortcuts="Control+K Meta+K"
          className="fixed right-[6vw] top-[3.5svh] z-[900] rounded px-3 py-2 backdrop-blur-sm md:right-[7vw]"
          style={{
            ...mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'rgba(244,241,234,0.8)',
            background: 'rgba(5,5,5,0.55)',
            border: '1px solid var(--border)',
          }}
        >
          SEARCH <span style={{ color: '#B8FF3D' }}>{mac ? '⌘K' : 'CTRL K'}</span>
        </button>
        <Dock
          items={items}
          secondary={{ href: external.github, label: 'GITHUB', icon: <Github size={18} strokeWidth={1.8} />, cursor: 'github', shortcut: 'G' }}
        />
      </div>
      <AnimatePresence>
        {curtain && (
          <motion.div
            key="curtain"
            aria-hidden="true"
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center"
            style={{ background: worldTheme[curtain.id].bg, pointerEvents: curtain.phase === 'in' ? 'auto' : 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: curtain.phase === 'in' ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: curtain.phase === 'in' ? 0.5 : 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, filter: 'blur(10px)', opacity: 0 }}
              animate={{ scale: curtain.phase === 'in' ? 1 : 1.08, filter: 'blur(0px)', opacity: curtain.phase === 'in' ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div style={{ ...mono, fontSize: 10, letterSpacing: '0.3em', color: worldTheme[curtain.id].accent }}>
                ENTERING · {worldTheme[curtain.id].label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 'clamp(2.4rem, 9vw, 7rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#F4F1EA',
                  marginTop: 12,
                }}
              >
                {curtain.id.toUpperCase()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {paletteLoaded && <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} />}
      <ShortcutsDialog open={help} onClose={() => setHelp(false)} />
    </>
  )
}
