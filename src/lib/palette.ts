import { projects, stack } from '@/data/content'

export interface Command {
  id: string
  label: string
  hint: string
  group: 'NAVIGATE' | 'PROJECTS' | 'LINKS'
  keywords: string[]
  run: () => void
}

// Keywords come from the verified content plus the requested semantic aliases.
const ALIASES: Record<string, string[]> = {
  yamini: ['gps', 'erp', 'attendance', 'geofence', 'workforce', 'enterprise', 'tracking'],
  kavya: ['fleet', 'transport', 'transports', 'logistics', 'vehicle', 'trips', 'routes'],
  uzhavan: ['agriculture', 'agricultural', 'tamil', 'vision', 'farm', 'crop', 'weather', 'ai'],
}

export function projectKeywords(id: 'yamini' | 'kavya' | 'uzhavan'): string[] {
  const p = projects.find(x => x.id === id)!
  return [
    ...ALIASES[id],
    ...p.tiles.map(t => t.toLowerCase()),
    ...p.stack.map(t => t.toLowerCase()),
    p.category.toLowerCase(),
  ]
}

export function stackKeywords(): string[] {
  return stack.map(t => t.name.toLowerCase())
}

export function search(commands: Command[], query: string): { cmd: Command; match?: string }[] {
  const q = query.trim().toLowerCase()
  if (!q) return commands.map(cmd => ({ cmd }))
  const tokens = q.split(/\s+/)
  const out: { cmd: Command; match?: string; score: number; i: number }[] = []
  commands.forEach((cmd, i) => {
    const label = cmd.label.toLowerCase()
    let score = 0
    let match: string | undefined
    if (label === q) score = 100
    else if (label.startsWith(q)) score = 80
    else if (label.includes(q)) score = 60
    const kwExact = cmd.keywords.find(k => k === q)
    const kwStart = cmd.keywords.find(k => k.startsWith(q))
    const kwIn = cmd.keywords.find(k => k.includes(q))
    if (kwExact && score < 70) (score = 70), (match = kwExact)
    else if (kwStart && score < 50) (score = 50), (match = kwStart)
    else if (kwIn && score < 30) (score = 30), (match = kwIn)
    if (!score && tokens.length > 1) {
      const hay = `${label} ${cmd.keywords.join(' ')}`
      if (tokens.every(t => hay.includes(t))) score = 20
    }
    if (score) out.push({ cmd, match, score, i })
  })
  return out.sort((a, b) => b.score - a.score || a.i - b.i)
}

