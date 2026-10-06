'use client'

import { useEffect, useState } from 'react'
import { LabFrame, LabButton, LiveStatus } from '@/components/worlds/ui'
import { useReduced } from '@/lib/useReduced'
import { useActive } from './useActive'

type Mode = 'online' | 'offline' | 'syncing' | 'synced'
const CAP = 8
const STAGES = ['GPS POINT', 'LOCAL QUEUE', 'NETWORK RESTORED', 'SYNC', 'SERVER']
const pad = (n: number) => String(n).padStart(2, '0')
const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

export default function OfflineQueueLab() {
  const reduced = useReduced()
  const [ref, active] = useActive<HTMLDivElement>()
  const [mode, setMode] = useState<Mode>('online')
  const [queue, setQueue] = useState<number[]>([])
  const [server, setServer] = useState<number[]>([])
  const [total, setTotal] = useState(0)
  const [flying, setFlying] = useState<number | null>(null)

  // Simulated GPS points are captured locally while the network is down.
  useEffect(() => {
    if (mode !== 'offline' || !active) return
    const t = setInterval(() => setQueue(q => (q.length >= CAP ? q : [...q, q.length + 1])), 900)
    return () => clearInterval(t)
  }, [mode, active])

  // Sync: hand points to the server one at a time (all at once under reduced motion).
  useEffect(() => {
    if (mode !== 'syncing') return
    if (queue.length === 0) {
      setMode('synced')
      return
    }
    if (reduced) {
      setServer(s => [...s, ...queue])
      setQueue([])
      return
    }
    const head = queue[0]
    const t1 = setTimeout(() => setFlying(head), 200)
    const t2 = setTimeout(() => {
      setQueue(q => q.slice(1))
      setServer(s => [...s, head])
      setFlying(null)
    }, 650)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [mode, queue, reduced])

  const lose = () => {
    setQueue([])
    setServer([])
    setTotal(0)
    setFlying(null)
    setMode('offline')
  }
  const restore = () => {
    setTotal(queue.length)
    setMode('syncing')
  }

  const stage =
    mode === 'online' ? -1 : mode === 'offline' ? (queue.length ? 1 : 0) : mode === 'syncing' ? (server.length === 0 && flying === null ? 2 : 3) : 4

  const done = Math.min(server.length + 1, total)
  const status =
    mode === 'online'
      ? 'Online. Press SIMULATE NETWORK LOSS to start.'
      : mode === 'offline'
        ? queue.length >= CAP
          ? `Offline. Queue holding ${CAP} points (simulation limit).`
          : `Offline. ${queue.length} ${queue.length === 1 ? 'point' : 'points'} queued.`
        : mode === 'syncing'
          ? `Network restored. Syncing ${done} of ${total}.`
          : total === 0
            ? 'Synced. Nothing was queued.'
            : `Synced. Queue empty. ${server.length} ${server.length === 1 ? 'point' : 'points'} on the server.`

  const chip = (n: number, extra?: React.CSSProperties) => (
    <li
      key={n}
      className="inline-flex h-9 w-12 items-center justify-center"
      style={{ ...mono, fontSize: 12, letterSpacing: '0.1em', color: '#F4F1EA', border: '1px solid var(--w-line)', ...extra }}
    >
      {pad(n)}
    </li>
  )

  return (
    <LabFrame
      title="OFFLINE GPS QUEUE"
      kind="simulation"
      caption="Simulated points only, generated in your browser. Cut the network, watch GPS points collect in a local queue, then restore the connection and watch them sync to the server."
    >
      <div ref={ref}>
        <ol className="m-0 mb-6 flex list-none flex-wrap gap-x-2 gap-y-2 p-0" aria-label="Stages">
          {STAGES.map((s, i) => (
            <li
              key={s}
              aria-current={stage === i ? 'step' : undefined}
              style={{
                ...mono,
                fontSize: 10,
                letterSpacing: '0.16em',
                padding: '5px 9px',
                color: stage === i ? '#050505' : 'rgba(244,241,234,0.7)',
                background: stage === i ? 'var(--w-accent)' : 'transparent',
                border: `1px solid ${stage === i ? 'var(--w-accent)' : 'var(--w-line)'}`,
              }}
            >
              {i + 1} {s}
            </li>
          ))}
        </ol>

        <div className="grid gap-5 md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-stretch">
          <div className="p-4" style={{ border: '1px solid var(--w-line)' }}>
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>DEVICE · GPS POINT</p>
            <p className="m-0 mt-4" style={{ ...mono, fontSize: 12, letterSpacing: '0.16em', color: '#F4F1EA' }}>
              NETWORK:{' '}
              <span style={{ color: mode === 'offline' ? '#FFB454' : 'var(--w-accent)' }}>{mode === 'offline' ? 'OFFLINE' : 'ONLINE'}</span>
            </p>
            <p className="m-0 mt-3" style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.65)' }}>
              {mode === 'offline' ? 'CAPTURING LOCALLY' : 'IDLE'}
            </p>
          </div>
          <span aria-hidden="true" className="self-center text-center" style={{ ...mono, color: 'rgba(244,241,234,0.5)' }}>→</span>
          <div className="p-4" style={{ border: '1px solid var(--w-line)', minHeight: 120 }}>
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>LOCAL QUEUE · {queue.length}</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Local queue">
              {queue.length === 0 && <li style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.5)' }}>EMPTY</li>}
              {queue.map(n =>
                chip(n, {
                  borderColor: flying === n ? 'var(--w-accent)' : 'var(--w-line)',
                  transform: flying === n && !reduced ? 'translateX(36px)' : 'none',
                  opacity: flying === n && !reduced ? 0 : 1,
                  transition: reduced ? 'none' : 'transform 0.45s ease, opacity 0.45s ease',
                }),
              )}
            </ul>
          </div>
          <span aria-hidden="true" className="self-center text-center" style={{ ...mono, color: 'rgba(244,241,234,0.5)' }}>→</span>
          <div className="p-4" style={{ border: '1px solid var(--w-line)' }}>
            <p className="m-0" style={{ ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.6)' }}>SERVER · RECEIVED {server.length}</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Received by server">
              {server.length === 0 && <li style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', color: 'rgba(244,241,234,0.5)' }}>NONE</li>}
              {server.map(n => chip(n, { borderColor: 'rgba(184,255,61,0.45)', color: 'var(--w-accent)' }))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <LabButton onClick={lose} disabled={mode === 'offline' || mode === 'syncing'}>SIMULATE NETWORK LOSS</LabButton>
          <LabButton onClick={restore} tone="accent" disabled={mode !== 'offline'}>RESTORE CONNECTION</LabButton>
        </div>
        <div className="mt-5">
          <LiveStatus>{status}</LiveStatus>
        </div>
      </div>
    </LabFrame>
  )
}
