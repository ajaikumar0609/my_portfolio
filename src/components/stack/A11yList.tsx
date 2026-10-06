import { stack } from '@/data/content'
import { internshipNames, isProject, linkLabel, useCasesOf } from '@/data/stack'

// Always-present semantic equivalent of the graph.
export default function A11yList() {
  return (
    <ul className="sr-only" aria-label="Technology to projects to use cases">
      {stack.map(t => (
        <li key={t.name}>
          {t.name}
          <ul>
            <li>
              Projects:{' '}
              {t.usedIn.length
                ? t.usedIn.map(id => (isProject(id) ? linkLabel(id) : `internship at ${internshipNames[id]}`)).join(', ')
                : 'no documented project link yet'}
            </li>
            <li>Use cases: {useCasesOf(t.name).length ? useCasesOf(t.name).join(', ') : 'none mapped'}</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
