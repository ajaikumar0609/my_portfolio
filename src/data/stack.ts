// Stack relationship data. Technologies and project links come ONLY from `stack` in content.ts.
// Use cases here are derived from each technology's category plus resume-explicit facts.
// No proficiency, years or ratings exist anywhere in this file, by design.

import { projects, stack, type ProjectId, type Source, type StackCategory, type Tech } from '@/data/content'

export type UseCase = 'BACKEND' | 'DATA' | 'AI / ML' | 'MOBILE' | 'WEB' | 'REAL-TIME' | 'CLOUD'
export type LinkId = Tech['usedIn'][number]
export type Selection = { kind: 'tech'; name: string } | { kind: 'project'; id: LinkId }

export const useCaseOrder: UseCase[] = ['BACKEND', 'DATA', 'AI / ML', 'MOBILE', 'WEB', 'REAL-TIME', 'CLOUD']

export const categoryOrder: StackCategory[] = ['LANGUAGES', 'BACKEND', 'DATA', 'AI / ML', 'CLOUD', 'MOBILE & WEB', 'TOOLS']

export interface TechMeta {
  useCases: UseCase[]
  detail?: string
}

// Rules: category -> use case (Flutter/Android -> MOBILE, React/JavaScript/TypeScript -> WEB, Python and Java -> BACKEND;
// no DATA link is inferred for Python); WebSockets -> REAL-TIME (resume). CLOUD is a category label, never a project link.
// Git / GitHub and Postman are tools: no use case is invented for them.
export const techMeta: Record<string, TechMeta> = {
  Python: { useCases: ['BACKEND'] },
  Java: { useCases: ['BACKEND'], detail: 'Backend modules for a College ERP (Icanio Tech School internship).' },
  JavaScript: { useCases: ['WEB'] },
  TypeScript: { useCases: ['WEB'], detail: 'Kavya web client (React / TypeScript).' },
  FastAPI: { useCases: ['BACKEND'] },
  'Spring Boot': { useCases: ['BACKEND'], detail: 'Backend modules for a College ERP (Icanio Tech School internship).' },
  SQLAlchemy: { useCases: ['BACKEND'], detail: 'Used in the Kavya fleet platform backend.' },
  'REST APIs': { useCases: ['BACKEND'], detail: 'REST endpoints in Kavya; academic-management APIs during the Icanio internship.' },
  WebSockets: { useCases: ['BACKEND', 'REAL-TIME'], detail: 'Real-time updates in Kavya.' },
  Celery: { useCases: ['BACKEND'], detail: 'Background tasks in the Kavya backend.' },
  APScheduler: { useCases: ['BACKEND'], detail: 'Scheduled jobs in the Kavya backend.' },
  'JWT / RBAC': { useCases: ['BACKEND'], detail: 'JWT auth and role-based access control in Kavya.' },
  'JPA / Hibernate': { useCases: ['BACKEND'], detail: 'Persistence layer in the College ERP (Icanio Tech School internship).' },
  'Spring Security': { useCases: ['BACKEND'], detail: 'Role-based authorization in a Spring Boot training project (ICT-Training repo).' },
  PostgreSQL: {
    useCases: ['DATA'],
    detail: 'Relational data: ERP (Yamini), fleet operations (Kavya), academic management (Icanio internship).',
  },
  MongoDB: { useCases: ['DATA'], detail: 'GPS tracking data (Yamini); GPS and log data (Kavya).' },
  Redis: { useCases: ['DATA'], detail: 'Caching in the Kavya backend.' },
  MySQL: { useCases: ['DATA'] },
  Pandas: { useCases: ['DATA'] },
  NumPy: { useCases: ['DATA'] },
  'Machine Learning': { useCases: ['AI / ML'], detail: 'Crop classification (F1 0.839) and yield prediction (RMSE 749 kg/ha) in UZHAVAN.' },
  'Computer Vision': { useCases: ['AI / ML'], detail: 'Part of the UZHAVAN pipeline.' },
  NLP: { useCases: ['AI / ML'], detail: 'Part of the UZHAVAN pipeline.' },
  'LLM Applications': { useCases: ['AI / ML'], detail: 'Part of the UZHAVAN pipeline.' },
  'Vertex AI': { useCases: ['AI / ML'], detail: 'Listed in the UZHAVAN stack.' },
  'AWS S3': { useCases: ['CLOUD'], detail: 'Document storage in Kavya (S3 via boto3). No broader AWS claim.' },
  'Google Cloud': { useCases: ['CLOUD'] },
  Flutter: { useCases: ['MOBILE'], detail: 'Mobile app in Yamini and Kavya.' },
  Android: { useCases: ['MOBILE'] },
  React: { useCases: ['WEB'], detail: 'Web client in Yamini and Kavya.' },
  'Git / GitHub': { useCases: [] },
  Postman: { useCases: [] },
  pytest: { useCases: [], detail: 'Automated tests for the Kavya backend.' },
}

export const internshipNames: Record<string, string> = {
  icanio: 'ICANIO TECH SCHOOL',
  lifechangers: 'LIFECHANGERSIND',
}

export const sourceTag: Record<Source, string> = {
  resume: 'SOURCE · RESUME',
  owner: 'SOURCE · OWNER',
  doc: 'SOURCE · PROJECT NOTES',
}

export const linkLabel = (id: LinkId): string =>
  internshipNames[id] ?? projects.find(p => p.id === id)?.title[0] ?? String(id).toUpperCase()

export const isProject = (id: LinkId): id is ProjectId => id === 'yamini' || id === 'kavya' || id === 'uzhavan'

export const techs: Tech[] = stack
export const getTech = (name: string) => stack.find(t => t.name === name)
export const useCasesOf = (name: string): UseCase[] => techMeta[name]?.useCases ?? []
export const techsOf = (id: LinkId): Tech[] => stack.filter(t => t.usedIn.includes(id))
export const byCategory = (c: StackCategory): Tech[] => stack.filter(t => t.category === c)

// Internship links that actually appear in the stack data (others are never drawn).
export const internshipIds: LinkId[] = (['icanio', 'lifechangers'] as LinkId[]).filter(id =>
  stack.some(t => t.usedIn.includes(id)),
)

export const DEFAULT_SELECTION: Selection = { kind: 'tech', name: 'FastAPI' }
