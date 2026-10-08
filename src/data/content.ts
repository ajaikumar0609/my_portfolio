// Single source of truth for every factual claim on the site.
// Sources: Resume.pdf (resume), case-study docs (doc), owner statement (owner).
// Anything not backed by one of these must not be rendered.

export type Source = 'resume' | 'doc' | 'owner'

export const person = {
  name: 'Ajai Kumar N',
  short: 'AJAI KUMAR',
  headline: 'BACKEND / SOFTWARE ENGINEER · AI/ML',
  resumeTitle: 'JAVA · SPRING BOOT · PYTHON · FASTAPI · POSTGRESQL',
  statement: 'I build backend systems that operate in the real world.',
  philosophy: 'I like building things that have to work outside the demo.',
  meta: 'INDIA · 2026 · SOFTWARE ENGINEERING',
  location: 'Tirunelveli, India',
  email: 'ajaikumar0609@gmail.com',
  github: 'https://github.com/ajaikumar0609',
  linkedin: 'https://www.linkedin.com/in/ajaikumar06',
  resume: '/Ajai-Kumar-N-Resume.pdf',
  photo: '/portrait/ajai-kumar.png',
} as const

export const education = {
  degree: 'B.Tech Computer Science & Engineering (AI)',
  school: 'Karunya Institute of Technology and Sciences',
  started: 'June 2023',
  expected: 'May 2027',
  source: 'resume' as Source,
}

export type ProjectId = 'yamini' | 'kavya' | 'uzhavan'

export interface Metric {
  value: string
  label: string
  note?: string
  source: Source
}

export interface Project {
  id: ProjectId
  index: string
  name: string
  title: [string, string]
  tagline: string
  category: string
  status: string
  period: string
  stack: string[]
  tiles: string[]
  summary: string
  metrics: Metric[]
  hasRealScreenshots: boolean
  source: Source[]
}

export const projects: Project[] = [
  {
    id: 'yamini',
    index: '01',
    name: 'Yamini Infotech ERP',
    title: ['YAMINI', 'INFOTECH ERP'],
    tagline: 'Enterprise workforce operations platform',
    category: 'ENTERPRISE ERP',
    status: 'PRODUCTION / LIVE',
    period: 'Dec 2025 – Jan 2026',
    stack: ['Python', 'FastAPI', 'React', 'Flutter', 'PostgreSQL', 'MongoDB'],
    tiles: ['GPS', 'ERP', 'ATTENDANCE', 'OPERATIONS', 'MOBILE', 'MAP'],
    summary:
      'ERP for a business client covering workforce management, service operations and CRM, with GPS live tracking and attendance. MongoDB holds the GPS tracking data.',
    metrics: [
      { value: '247+', label: 'FIELD EMPLOYEES', note: 'GPS tracking and attendance', source: 'owner' },
      {
        value: '178+',
        label: 'AUTOMATED TESTS',
        note: '13 route-segmentation unit tests + 165 regression tests',
        source: 'owner',
      },
    ],
    hasRealScreenshots: true,
    source: ['resume', 'doc', 'owner'],
  },
  {
    id: 'kavya',
    index: '02',
    name: 'Kavya Transports',
    title: ['KAVYA', 'TRANSPORTS'],
    tagline: 'Fleet intelligence for real-world operations',
    category: 'FLEET PLATFORM',
    status: 'BUILT · 2026',
    period: 'Jan 2026 – May 2026',
    stack: [
      'Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'MongoDB', 'Redis', 'Celery', 'APScheduler',
      'WebSockets', 'JWT / RBAC', 'AWS S3', 'pytest', 'React', 'TypeScript', 'Flutter',
    ],
    tiles: ['FLEET', 'VEHICLES', 'TRIPS', 'ROUTES', 'MAP'],
    summary:
      'Fleet management platform covering vehicle tracking, trip monitoring, billing and transport operations. FastAPI backend with async SQLAlchemy: PostgreSQL for fleet data, MongoDB for GPS and logs, Redis for caching, Celery and APScheduler for background jobs, WebSockets for real-time updates, JWT auth with role-based access control, AWS S3 for documents, and a pytest suite.',
    metrics: [],
    hasRealScreenshots: true,
    source: ['resume', 'doc'],
  },
  {
    id: 'uzhavan',
    index: '03',
    name: 'UZHAVAN AI',
    title: ['UZHAVAN', 'AI'],
    tagline: 'Intelligence for the field, not just the lab',
    category: 'AGRICULTURAL AI',
    status: 'IN DEVELOPMENT',
    period: '',
    stack: ['Python', 'FastAPI', 'ML', 'NLP', 'Computer Vision', 'LLM', 'Vertex AI'],
    tiles: ['FIELD', 'CROP', 'AI', 'VISION', 'TAMIL', 'WEATHER'],
    summary:
      'Tamil-first agricultural decision-support system: TNAU-grounded knowledge, weather-aware recommendations, crop and disease intelligence, and agricultural scheme retrieval.',
    metrics: [
      { value: '0.839', label: 'F1 · CROP CLASSIFICATION', source: 'resume' },
      { value: '749', label: 'RMSE · KG/HA YIELD PREDICTION', source: 'resume' },
    ],
    hasRealScreenshots: false,
    source: ['resume', 'doc'],
  },
]

export const headlineMetrics: Metric[] = [
  { value: '247+', label: 'FIELD EMPLOYEES', note: 'Yamini Infotech ERP', source: 'owner' },
  { value: '3', label: 'MAJOR SYSTEMS', note: 'Yamini · Kavya · UZHAVAN', source: 'resume' },
  { value: '178+', label: 'AUTOMATED TESTS', note: 'Yamini: 13 unit + 165 regression', source: 'owner' },
]

export interface Experience {
  id: string
  year: string
  period: string
  org: string
  role: string
  kind: 'EDUCATION' | 'INTERNSHIP' | 'INDEPENDENT'
  bullets: string[]
  source: Source
}

export const experience: Experience[] = [
  {
    id: 'karunya',
    year: '2023',
    period: 'Jun 2023 – May 2027 (expected)',
    org: 'KARUNYA INSTITUTE',
    role: 'B.Tech Computer Science & Engineering (AI)',
    kind: 'EDUCATION',
    bullets: ['Karunya Institute of Technology and Sciences', 'Expected graduation May 2027'],
    source: 'resume',
  },
  {
    id: 'lifechangers',
    year: '2024',
    period: 'Jun – Jul 2024',
    org: 'LIFECHANGERSIND',
    role: 'Web Development Intern',
    kind: 'INTERNSHIP',
    bullets: [
      'Built attendance tracking and academic record modules for a School ERP system',
      'Implemented role-based access control for three roles: administrators, teachers, students',
    ],
    source: 'resume',
  },
  {
    id: 'icanio',
    year: '2025',
    period: 'May – Jun 2025',
    org: 'ICANIO TECH SCHOOL',
    role: 'Spring Boot Backend Intern',
    kind: 'INTERNSHIP',
    bullets: [
      'Built backend modules for a College ERP using Java and Spring Boot',
      'Developed RESTful APIs for academic management on PostgreSQL',
      'Implemented database modules and CRUD operations for academic records',
    ],
    source: 'resume',
  },
  {
    id: 'independent',
    year: 'NOW',
    period: 'Jan 2024 – Present',
    org: 'SELECTED ENGINEERING PROJECTS',
    role: 'Independent Software Developer',
    kind: 'INDEPENDENT',
    bullets: [
      'Yamini Infotech ERP · Dec 2025 – Jan 2026',
      'Kavya Transports ERP · Jan 2026 – May 2026',
      'UZHAVAN AI — Agricultural Decision-Support System',
    ],
    source: 'resume',
  },
]

export type StackCategory = 'LANGUAGES' | 'BACKEND' | 'DATA' | 'AI / ML' | 'CLOUD' | 'MOBILE & WEB' | 'TOOLS'

export interface Tech {
  name: string
  category: StackCategory
  usedIn: (ProjectId | 'icanio' | 'lifechangers')[]
  source: Source
}

// Only technologies backed by the resume, case-study docs, or owner confirmation.
// No proficiency levels: do not invent them. Empty usedIn = no documented project link.
export const stack: Tech[] = [
  { name: 'Python', category: 'LANGUAGES', usedIn: ['yamini', 'kavya', 'uzhavan'], source: 'resume' },
  { name: 'Java', category: 'LANGUAGES', usedIn: ['icanio'], source: 'resume' },
  { name: 'JavaScript', category: 'LANGUAGES', usedIn: [], source: 'owner' },
  { name: 'TypeScript', category: 'LANGUAGES', usedIn: ['kavya'], source: 'resume' },
  { name: 'FastAPI', category: 'BACKEND', usedIn: ['yamini', 'kavya', 'uzhavan'], source: 'resume' },
  { name: 'Spring Boot', category: 'BACKEND', usedIn: ['icanio'], source: 'resume' },
  { name: 'SQLAlchemy', category: 'BACKEND', usedIn: ['kavya'], source: 'resume' },
  { name: 'REST APIs', category: 'BACKEND', usedIn: ['kavya', 'icanio'], source: 'resume' },
  { name: 'WebSockets', category: 'BACKEND', usedIn: ['kavya'], source: 'resume' },
  { name: 'Celery', category: 'BACKEND', usedIn: ['kavya'], source: 'doc' },
  { name: 'APScheduler', category: 'BACKEND', usedIn: ['kavya'], source: 'doc' },
  { name: 'JWT / RBAC', category: 'BACKEND', usedIn: ['kavya'], source: 'doc' },
  { name: 'JPA / Hibernate', category: 'BACKEND', usedIn: ['icanio'], source: 'owner' },
  { name: 'Spring Security', category: 'BACKEND', usedIn: [], source: 'doc' },
  { name: 'PostgreSQL', category: 'DATA', usedIn: ['yamini', 'kavya', 'icanio'], source: 'resume' },
  { name: 'MongoDB', category: 'DATA', usedIn: ['yamini', 'kavya'], source: 'resume' },
  { name: 'Redis', category: 'DATA', usedIn: ['kavya'], source: 'resume' },
  { name: 'MySQL', category: 'DATA', usedIn: [], source: 'resume' },
  { name: 'Pandas', category: 'DATA', usedIn: [], source: 'owner' },
  { name: 'NumPy', category: 'DATA', usedIn: [], source: 'owner' },
  { name: 'Machine Learning', category: 'AI / ML', usedIn: ['uzhavan'], source: 'resume' },
  { name: 'Computer Vision', category: 'AI / ML', usedIn: ['uzhavan'], source: 'owner' },
  { name: 'NLP', category: 'AI / ML', usedIn: ['uzhavan'], source: 'owner' },
  { name: 'LLM Applications', category: 'AI / ML', usedIn: ['uzhavan'], source: 'owner' },
  { name: 'Vertex AI', category: 'AI / ML', usedIn: ['uzhavan'], source: 'owner' },
  { name: 'AWS S3', category: 'CLOUD', usedIn: ['kavya'], source: 'doc' },
  { name: 'Google Cloud', category: 'CLOUD', usedIn: [], source: 'owner' },
  { name: 'Flutter', category: 'MOBILE & WEB', usedIn: ['yamini', 'kavya'], source: 'resume' },
  { name: 'Android', category: 'MOBILE & WEB', usedIn: [], source: 'owner' },
  { name: 'React', category: 'MOBILE & WEB', usedIn: ['yamini', 'kavya'], source: 'resume' },
  { name: 'Git / GitHub', category: 'TOOLS', usedIn: [], source: 'resume' },
  { name: 'Postman', category: 'TOOLS', usedIn: [], source: 'resume' },
  { name: 'pytest', category: 'TOOLS', usedIn: ['kavya'], source: 'doc' },
]

// Engineering topics for the Yamini case study (from the case-study doc).
export const yaminiEngineering = [
  'BACKGROUND GPS',
  'AUTHENTICATION LIFECYCLE',
  'OFFLINE GPS QUEUE',
  'ROUTE SEGMENTATION',
  'HIGH-FREQUENCY WRITES',
  'GEOFENCE ATTENDANCE',
] as const
