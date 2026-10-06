'use client'

import { useState } from 'react'
import { openProject } from '@/lib/system'
import {
  byCategory,
  categoryOrder,
  getTech,
  internshipNames,
  isProject,
  linkLabel,
  sourceTag,
  techMeta,
  useCasesOf,
  type Selection,
} from '@/data/stack'
import type { StackCategory } from '@/data/content'
import { accentOf, mono, sans } from './shared'

const label = { ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' } as const

// Phones: no graph. Pick a category, tap a technology, read its relationships inline.
export default function MobileStack({
  selection,
  onSelect,
}: {
  selection: Selection
  onSelect: (s: Selection) => void
}) {
  const selName = selection.kind === 'tech' ? selection.name : null
  const [cat, setCat] = useState<StackCategory>(() => getTech(selName ?? 'FastAPI')?.category ?? 'BACKEND')

  return (
    <div className="min-w-0 md:hidden">
      <div
        role="group"
        aria-label="Filter technologies by category"
        className="-mx-[6vw] flex gap-2 overflow-x-auto px-[6vw] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categoryOrder.map(c => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className="shrink-0 bg-transparent px-4 py-3"
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              minHeight: 44,
              color: cat === c ? '#050505' : '#F4F1EA',
              background: cat === c ? '#B8FF3D' : 'transparent',
              border: `1px solid ${cat === c ? '#B8FF3D' : 'rgba(244,241,234,0.25)'}`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="m-0 mt-3 list-none p-0" style={{ borderTop: '1px solid var(--border)' }}>
        {byCategory(cat).map(t => {
          const open = selName === t.name
          const meta = techMeta[t.name]
          const cases = useCasesOf(t.name)
          return (
            <li key={t.name} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onSelect({ kind: 'tech', name: t.name })}
                className="flex w-full items-center justify-between gap-4 bg-transparent py-4 text-left"
                style={{ minHeight: 56 }}
              >
                <span style={{ ...sans, fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: open ? '#B8FF3D' : '#F4F1EA' }}>
                  {t.name}
                </span>
                <span aria-hidden="true" className="flex items-center gap-1.5">
                  {t.usedIn.filter(isProject).map(id => (
                    <span key={id} style={{ width: 8, height: 8, borderRadius: 8, background: accentOf(id) }} />
                  ))}
                </span>
              </button>

              {open && (
                <div className="pb-5" role="status" aria-live="polite">
                  <p className="m-0" style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.5)' }}>
                    {sourceTag[t.source]}
                  </p>

                  <p className="m-0 mt-4" style={label}>PROJECTS</p>
                  {t.usedIn.length === 0 ? (
                    <p className="m-0 mt-2" style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(244,241,234,0.75)' }}>
                      NO DOCUMENTED PROJECT LINK YET
                    </p>
                  ) : (
                    <ul className="m-0 mt-2 list-none p-0">
                      {t.usedIn.map(id =>
                        isProject(id) ? (
                          <li key={id}>
                            <button
                              type="button"
                              data-cursor="project"
                              onClick={() => openProject(id)}
                              className="flex w-full items-center justify-between bg-transparent py-3 text-left"
                              style={{ ...mono, fontSize: 12, letterSpacing: '0.14em', color: accentOf(id), borderTop: '1px solid var(--border)', minHeight: 48 }}
                            >
                              <span>{linkLabel(id)}</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          </li>
                        ) : (
                          <li
                            key={id}
                            className="py-3"
                            style={{ ...mono, fontSize: 12, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.8)', borderTop: '1px solid var(--border)' }}
                          >
                            INTERNSHIP · {internshipNames[id]}
                          </li>
                        ),
                      )}
                    </ul>
                  )}

                  <p className="m-0 mt-4" style={label}>USE CASES</p>
                  <p className="m-0 mt-2" style={{ ...mono, fontSize: 12, letterSpacing: '0.12em', color: cases.length ? '#F4F1EA' : 'rgba(244,241,234,0.6)' }}>
                    {cases.length ? cases.join(' · ') : 'NONE MAPPED (TOOLING)'}
                  </p>

                  {meta?.detail && (
                    <p className="m-0 mt-4" style={{ ...sans, fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.8)' }}>
                      {meta.detail}
                    </p>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
