'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  byCategory,
  categoryOrder,
  getTech,
  internshipIds,
  isProject,
  linkLabel,
  techsOf,
  useCaseOrder,
  useCasesOf,
  type LinkId,
  type Selection,
  type UseCase,
} from '@/data/stack'
import Detail from './Detail'
import { accentOf, mono, sans } from './shared'

type Box = { x: number; y: number; w: number; h: number }

const projectIds = (['yamini', 'kavya', 'uzhavan'] as LinkId[])

const curve = (a: [number, number], b: [number, number]) => {
  const my = (a[1] + b[1]) / 2
  return `M${a[0]} ${a[1]} C${a[0]} ${my} ${b[0]} ${my} ${b[0]} ${b[1]}`
}

// Three tiers: TECHNOLOGY (top), PROJECT, USE CASE. Lines are drawn only for the focused node.
export default function DesktopGraph({
  selection,
  onSelect,
  reduced,
}: {
  selection: Selection
  onSelect: (s: Selection) => void
  reduced: boolean
}) {
  const figRef = useRef<HTMLDivElement>(null)
  const nodes = useRef(new Map<string, HTMLElement>())
  const refCache = useRef(new Map<string, (el: HTMLElement | null) => void>())
  const [geo, setGeo] = useState<Record<string, Box>>({})
  const [hover, setHover] = useState<Selection | null>(null)

  const ref = useCallback((key: string) => {
    let fn = refCache.current.get(key)
    if (!fn) {
      fn = (el: HTMLElement | null) => {
        if (el) nodes.current.set(key, el)
        else nodes.current.delete(key)
      }
      refCache.current.set(key, fn)
    }
    return fn
  }, [])

  const measure = useCallback(() => {
    const fig = figRef.current
    if (!fig) return
    const fr = fig.getBoundingClientRect()
    if (fr.width === 0) return
    const next: Record<string, Box> = {}
    nodes.current.forEach((el, k) => {
      const r = el.getBoundingClientRect()
      next[k] = { x: r.left - fr.left, y: r.top - fr.top, w: r.width, h: r.height }
    })
    setGeo(next)
  }, [])

  useEffect(() => {
    const fig = figRef.current
    if (!fig) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(fig)
    const raf = requestAnimationFrame(measure)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [measure])

  const cur: Selection = hover ?? selection
  const chipAlpha = (related: boolean) => (cur.kind === 'tech' ? (related ? 1 : 0.6) : related ? 1 : 0.28)

  const rel = useMemo(() => {
    if (cur.kind === 'tech') {
      const t = getTech(cur.name)
      return {
        techs: new Set([cur.name]),
        links: new Set<LinkId>(t?.usedIn ?? []),
        cases: new Set<UseCase>(useCasesOf(cur.name)),
      }
    }
    const ts = techsOf(cur.id)
    const cases = new Set<UseCase>()
    ts.forEach(t => useCasesOf(t.name).forEach(c => cases.add(c)))
    return { techs: new Set(ts.map(t => t.name)), links: new Set<LinkId>([cur.id]), cases }
  }, [cur])

  const top = (k: string): [number, number] | null => (geo[k] ? [geo[k].x + geo[k].w / 2, geo[k].y] : null)
  const bottom = (k: string): [number, number] | null => (geo[k] ? [geo[k].x + geo[k].w / 2, geo[k].y + geo[k].h] : null)

  type Line = { d: string; color: string; opacity: number; key: string }
  const lines: Line[] = []
  if (cur.kind === 'tech') {
    const from = bottom(`t:${cur.name}`)
    if (from) {
      rel.links.forEach(id => {
        const to = top(`p:${id}`)
        if (to) lines.push({ d: curve(from, to), color: accentOf(id), opacity: 0.9, key: `${cur.name}-p-${id}` })
      })
      rel.cases.forEach(c => {
        const to = top(`u:${c}`)
        if (to) lines.push({ d: curve(from, to), color: '#F4F1EA', opacity: 0.4, key: `${cur.name}-u-${c}` })
      })
    }
  } else {
    const from = top(`p:${cur.id}`)
    if (from) {
      rel.techs.forEach(n => {
        const to = bottom(`t:${n}`)
        if (to) lines.push({ d: curve(from, to), color: accentOf(cur.id), opacity: 0.7, key: `${String(cur.id)}-t-${n}` })
      })
    }
  }

  const dim = (on: boolean) => ({ opacity: on ? 1 : 0.28, transition: reduced ? 'none' : 'opacity 0.25s, border-color 0.25s, color 0.25s' })

  const selectedTech = selection.kind === 'tech' ? selection.name : null
  const selectedLink = selection.kind === 'project' ? selection.id : null

  const internNodes = internshipIds

  return (
    <div className="hidden md:block">
      <style>{`@keyframes stackDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}`}</style>
      <div
        ref={figRef}
        data-cursor="architecture"
        className="relative grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_320px]"
        style={{ border: '1px solid var(--border)', background: '#050505' }}
      >
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
          {lines.map(l => (
            <path
              key={l.key}
              d={l.d}
              pathLength={1}
              fill="none"
              stroke={l.color}
              strokeOpacity={l.opacity}
              strokeWidth={1.25}
              strokeDasharray={1}
              style={reduced ? { strokeDashoffset: 0 } : { animation: 'stackDraw 0.45s ease-out forwards' }}
            />
          ))}
        </svg>

        <div className="relative z-10 min-w-0">
          <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.6)' }}>01 · TECHNOLOGY</p>
          <div className="mt-4 flex flex-col gap-3">
            {categoryOrder.map(cat => (
              <div key={cat} className="grid grid-cols-[104px_minmax(0,1fr)] items-start gap-3">
                <p className="m-0 pt-2" style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.5)' }}>{cat}</p>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {byCategory(cat).map(t => {
                    const isSel = selectedTech === t.name
                    const related = rel.techs.has(t.name)
                    return (
                      <li key={t.name}>
                        <button
                          ref={ref(`t:${t.name}`)}
                          type="button"
                          aria-pressed={isSel}
                          onClick={() => onSelect({ kind: 'tech', name: t.name })}
                          onMouseEnter={() => setHover({ kind: 'tech', name: t.name })}
                          onMouseLeave={() => setHover(null)}
                          onFocus={() => setHover({ kind: 'tech', name: t.name })}
                          onBlur={() => setHover(null)}
                          className="px-3 py-2"
                          style={{
                            ...mono,
                            fontSize: 11,
                            letterSpacing: '0.08em',
                            minHeight: 36,
                            background: isSel ? 'rgba(184,255,61,0.1)' : '#050505',
                            color: isSel ? '#B8FF3D' : `rgba(244,241,234,${chipAlpha(related)})`,
                            border: `1px solid ${isSel ? '#B8FF3D' : related && cur.kind === 'project' ? 'rgba(244,241,234,0.6)' : `rgba(244,241,234,${(0.2 * chipAlpha(related)).toFixed(3)})`}`,
                            transition: reduced ? 'none' : 'opacity 0.25s, border-color 0.25s, color 0.25s',
                          }}
                        >
                          {t.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.6)' }}>02 · PROJECT</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap items-center gap-3 p-0">
              {projectIds.map(id => {
                const on = rel.links.has(id)
                const isSel = selectedLink === id
                return (
                  <li key={id}>
                    <button
                      ref={ref(`p:${id}`)}
                      type="button"
                      data-cursor="project"
                      aria-pressed={isSel}
                      onClick={() => onSelect({ kind: 'project', id })}
                      onMouseEnter={() => setHover({ kind: 'project', id })}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover({ kind: 'project', id })}
                      onBlur={() => setHover(null)}
                      className="px-4 py-3"
                      style={{
                        ...sans,
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        minHeight: 48,
                        background: isSel ? 'rgba(244,241,234,0.06)' : '#050505',
                        color: accentOf(id),
                        border: `1px solid ${accentOf(id)}`,
                        ...dim(on || cur.kind === 'project' && cur.id === id),
                      }}
                    >
                      {linkLabel(id)}
                    </button>
                  </li>
                )
              })}
              {internNodes.map(id => (
                <li key={id} className="flex items-center gap-3">
                  <span aria-hidden="true" style={{ width: 1, height: 28, background: 'rgba(244,241,234,0.25)' }} />
                  <button
                    ref={ref(`p:${id}`)}
                    type="button"
                    aria-pressed={selectedLink === id}
                    onClick={() => onSelect({ kind: 'project', id })}
                    onMouseEnter={() => setHover({ kind: 'project', id })}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover({ kind: 'project', id })}
                    onBlur={() => setHover(null)}
                    className="px-3 py-2"
                    style={{
                      ...mono,
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      minHeight: 40,
                      background: '#050505',
                      color: '#F4F1EA',
                      border: '1px dashed rgba(244,241,234,0.4)',
                      ...dim(rel.links.has(id)),
                    }}
                  >
                    INTERNSHIP · {linkLabel(id)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.22em', color: 'rgba(244,241,234,0.6)' }}>03 · USE CASE</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {useCaseOrder.map(c => (
                <li key={c}>
                  <div
                    ref={ref(`u:${c}`)}
                    className="px-3 py-2"
                    style={{
                      ...mono,
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      background: '#050505',
                      color: '#F4F1EA',
                      border: `1px solid ${rel.cases.has(c) ? 'rgba(244,241,234,0.7)' : 'rgba(244,241,234,0.2)'}`,
                      ...dim(rel.cases.has(c)),
                    }}
                  >
                    {c}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside
          className="relative z-10 min-w-0 self-start lg:sticky lg:top-[14vh] lg:border-l lg:pl-8"
          style={{ borderColor: 'var(--border)', background: '#050505' }}
          aria-label="Selection details"
        >
          <Detail selection={selection} onSelectTech={name => onSelect({ kind: 'tech', name })} />
        </aside>
      </div>
      <p className="m-0 mt-3" style={{ ...mono, fontSize: 9, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.5)' }}>
        HOVER OR FOCUS TO PREVIEW · CLICK TO PIN · RELATIONSHIPS COME FROM THE RESUME AND OWNER-CONFIRMED FACTS
      </p>
    </div>
  )
}
