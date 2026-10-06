'use client'

import { openProject } from '@/lib/system'
import { stack } from '@/data/content'
import {
  getTech,
  internshipNames,
  isProject,
  linkLabel,
  sourceTag,
  techsOf,
  techMeta,
  useCasesOf,
  type LinkId,
  type Selection,
} from '@/data/stack'
import { accentOf, mono, sans } from './shared'

const rowLabel = { ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' } as const
const pill = { ...mono, fontSize: 11, letterSpacing: '0.12em' } as const

// Detail readout for the current selection. Shared by the desktop graph and the mobile list.
export default function Detail({
  selection,
  onSelectTech,
}: {
  selection: Selection
  onSelectTech: (name: string) => void
}) {
  if (selection.kind === 'project') {
    const id = selection.id
    const list = techsOf(id)
    return (
      <div role="status" aria-live="polite" aria-atomic="true">
        <p className="m-0" style={rowLabel}>{isProject(id) ? 'PROJECT' : 'INTERNSHIP'}</p>
        <p className="m-0 mt-2" style={{ ...sans, fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', color: accentOf(id) }}>
          {linkLabel(id)}
        </p>
        <p className="m-0 mt-5" style={rowLabel}>TECHNOLOGIES · {list.length}</p>
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {list.map(t => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => onSelectTech(t.name)}
                className="bg-transparent px-3 py-2"
                style={{ ...pill, color: '#F4F1EA', border: '1px solid rgba(244,241,234,0.2)', minHeight: 40 }}
              >
                {t.name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
        {isProject(id) && (
          <button
            type="button"
            data-cursor="project"
            onClick={() => openProject(id)}
            className="mt-6 bg-transparent px-4 py-3"
            style={{ ...pill, color: accentOf(id), border: `1px solid ${accentOf(id)}`, minHeight: 44 }}
          >
            ENTER {linkLabel(id)} →
          </button>
        )}
      </div>
    )
  }

  const tech = getTech(selection.name) ?? stack[0]
  const meta = techMeta[tech.name]
  const projects = tech.usedIn.filter(isProject)
  const interns = tech.usedIn.filter(id => !isProject(id))
  const cases = useCasesOf(tech.name)

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <p className="m-0" style={rowLabel}>TECHNOLOGY</p>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="m-0" style={{ ...sans, fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#B8FF3D' }}>
          {tech.name}
        </p>
        <p className="m-0" style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(244,241,234,0.5)' }}>
          {sourceTag[tech.source]}
        </p>
      </div>

      <p className="m-0 mt-5" style={rowLabel}>PROJECTS</p>
      {tech.usedIn.length === 0 ? (
        <p className="m-0 mt-2" style={{ ...pill, color: 'rgba(244,241,234,0.75)' }}>NO DOCUMENTED PROJECT LINK YET</p>
      ) : (
        <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
          {projects.map(id => (
            <li key={id}>
              <button
                type="button"
                data-cursor="project"
                onClick={() => openProject(id)}
                className="bg-transparent px-3 py-2"
                style={{ ...pill, color: accentOf(id), border: `1px solid ${accentOf(id)}`, minHeight: 40 }}
              >
                {linkLabel(id)} →
              </button>
            </li>
          ))}
          {interns.map(id => (
            <li
              key={id}
              className="px-3 py-2"
              style={{ ...pill, color: 'rgba(244,241,234,0.8)', border: '1px dashed rgba(244,241,234,0.3)', minHeight: 40 }}
            >
              INTERNSHIP · {internshipNames[id]}
            </li>
          ))}
        </ul>
      )}

      <p className="m-0 mt-5" style={rowLabel}>USE CASES</p>
      <p className="m-0 mt-2" style={{ ...pill, color: cases.length ? '#F4F1EA' : 'rgba(244,241,234,0.6)' }}>
        {cases.length ? cases.join(' · ') : 'NONE MAPPED (TOOLING)'}
      </p>

      {meta?.detail && (
        <>
          <p className="m-0 mt-5" style={rowLabel}>DETAIL</p>
          <p className="m-0 mt-2" style={{ ...sans, fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.8)', maxWidth: '46ch' }}>
            {meta.detail}
          </p>
        </>
      )}
    </div>
  )
}

export type { LinkId }
