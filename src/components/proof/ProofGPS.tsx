'use client'

import { useReducer, useEffect, useRef, useCallback } from 'react'

type Status = 'online' | 'offline' | 'syncing'

interface State {
  status: Status
  queue: { id: number; ts: string }[]
  synced: number
  gpsPoints: number[]
  lastSync: string | null
}

type Action =
  | { type: 'GPS_POINT'; point: number }
  | { type: 'GO_OFFLINE' }
  | { type: 'RESTORE' }
  | { type: 'SYNC_ITEM' }
  | { type: 'SYNC_DONE' }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GPS_POINT':
      return {
        ...state,
        gpsPoints: [...state.gpsPoints.slice(-8), action.point],
        queue: state.status === 'offline'
          ? [...state.queue, { id: state.queue.length + 1, ts: new Date().toISOString().slice(11, 19) }]
          : state.queue,
      }
    case 'GO_OFFLINE':
      return { ...state, status: 'offline' }
    case 'RESTORE':
      return { ...state, status: 'syncing' }
    case 'SYNC_ITEM':
      return {
        ...state,
        queue: state.queue.slice(1),
        synced: state.synced + 1,
      }
    case 'SYNC_DONE':
      return { ...state, status: 'online', lastSync: `${state.synced} pts synced`, queue: [] }
    case 'RESET':
      return { status: 'online', queue: [], synced: 0, gpsPoints: [], lastSync: null }
    default:
      return state
  }
}

const initial: State = { status: 'online', queue: [], synced: 0, gpsPoints: [], lastSync: null }

export default function ProofGPS() {
  const [state, dispatch] = useReducer(reducer, initial)
  const syncingRef = useRef(false)

  // GPS point generator
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'GPS_POINT', point: Math.random() })
    }, 700)
    return () => clearInterval(id)
  }, [])

  // Sync queue when restoring
  useEffect(() => {
    if (state.status !== 'syncing' || syncingRef.current) return
    if (state.queue.length === 0) {
      dispatch({ type: 'SYNC_DONE' })
      syncingRef.current = false
      return
    }
    syncingRef.current = true
    const syncNext = (remaining: number) => {
      if (remaining === 0) {
        setTimeout(() => {
          dispatch({ type: 'SYNC_DONE' })
          syncingRef.current = false
        }, 300)
        return
      }
      setTimeout(() => {
        dispatch({ type: 'SYNC_ITEM' })
        syncNext(remaining - 1)
      }, 150)
    }
    syncNext(state.queue.length)
  }, [state.status, state.queue.length])

  const statusColor = state.status === 'online' ? '#B8FF3D' : state.status === 'syncing' ? '#4DE8FF' : '#FF6B35'
  const statusLabel = state.status === 'online' ? '● ONLINE' : state.status === 'syncing' ? '◈ SYNCING' : '✕ OFFLINE'

  return (
    <div
      className="w-full"
      style={{
        background: 'rgba(244,241,234,0.02)',
        border: '1px solid rgba(244,241,234,0.1)',
        padding: '32px',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8FF3D' }}>YAMINI // GPS ENGINE</div>
          <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)', marginTop: '4px' }}>
            SIMULATION · CONCEPTUAL DEMO
          </div>
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: statusColor }}>
          NETWORK {statusLabel}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Device */}
        <div style={{ border: '1px solid rgba(244,241,234,0.08)', padding: '20px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)', marginBottom: '12px' }}>
            DEVICE 247
          </div>
          <div style={{ fontSize: '10px', color: '#B8FF3D', marginBottom: '14px' }}>● GPS ACTIVE</div>
          {/* GPS stream dots */}
          <div className="flex items-center gap-1 flex-wrap" style={{ minHeight: '20px' }}>
            {state.gpsPoints.map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: '7px',
                  height: '7px',
                  background: state.status === 'offline' ? '#FF6B35' : '#B8FF3D',
                  opacity: 0.4 + (i / state.gpsPoints.length) * 0.6,
                  transition: 'background 0.3s',
                }}
              />
            ))}
            {state.gpsPoints.length > 0 && (
              <div style={{ width: '20px', height: '1px', background: 'rgba(244,241,234,0.2)' }} />
            )}
          </div>
          <div style={{ fontSize: '9px', color: 'rgba(244,241,234,0.3)', marginTop: '8px' }}>
            GPS STREAM
          </div>
        </div>

        {/* Offline queue */}
        <div style={{ border: '1px solid rgba(244,241,234,0.08)', padding: '20px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)', marginBottom: '12px' }}>
            OFFLINE QUEUE
          </div>
          {state.queue.length === 0 ? (
            <div style={{ fontSize: '10px', color: 'rgba(244,241,234,0.2)' }}>EMPTY</div>
          ) : (
            <div className="flex flex-col gap-1" style={{ maxHeight: '100px', overflow: 'hidden' }}>
              {state.queue.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '9px',
                    color: '#FF6B35',
                    animation: 'fadeUp 0.2s ease',
                  }}
                >
                  <span style={{ color: 'rgba(244,241,234,0.3)' }}>[ {String(item.id).padStart(2, '0')} ]</span>
                  <span style={{ color: 'rgba(244,241,234,0.4)' }}>{item.ts}</span>
                </div>
              ))}
              {state.queue.length > 6 && (
                <div style={{ fontSize: '9px', color: 'rgba(244,241,234,0.3)' }}>
                  +{state.queue.length - 6} more
                </div>
              )}
            </div>
          )}
          {state.queue.length > 0 && (
            <div style={{ fontSize: '9px', color: '#FF6B35', marginTop: '8px' }}>
              {state.queue.length} pts queued
            </div>
          )}
        </div>

        {/* Server */}
        <div style={{ border: '1px solid rgba(244,241,234,0.08)', padding: '20px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(244,241,234,0.4)', marginBottom: '12px' }}>
            SERVER
          </div>
          <div style={{ fontSize: '10px', marginBottom: '14px', color: statusColor }}>
            {state.status === 'online' ? '● RECEIVING' : state.status === 'syncing' ? '◈ SYNCING...' : '⚡ WAITING'}
          </div>
          {state.synced > 0 && (
            <div style={{ fontSize: '9px', color: '#4DE8FF' }}>
              {state.synced} pts received
            </div>
          )}
          {state.lastSync && state.status === 'online' && (
            <div style={{ fontSize: '9px', color: '#B8FF3D', marginTop: '8px' }}>
              ✓ {state.lastSync}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        {state.status === 'online' && (
          <button
            onClick={() => dispatch({ type: 'GO_OFFLINE' })}
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: '#050505',
              background: '#FF6B35',
              border: 'none',
              padding: '10px 18px',
              cursor: 'none',
            }}
          >
            SIMULATE NETWORK LOSS
          </button>
        )}
        {state.status === 'offline' && (
          <button
            onClick={() => { syncingRef.current = false; dispatch({ type: 'RESTORE' }) }}
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: '#050505',
              background: '#4DE8FF',
              border: 'none',
              padding: '10px 18px',
              cursor: 'none',
            }}
          >
            RESTORE CONNECTION
          </button>
        )}
        {state.status === 'syncing' && (
          <div style={{ fontSize: '10px', color: '#4DE8FF', letterSpacing: '0.1em', padding: '10px 0' }}>
            ◈ SYNCING OFFLINE QUEUE TO SERVER...
          </div>
        )}
        <button
          onClick={() => { syncingRef.current = false; dispatch({ type: 'RESET' }) }}
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(244,241,234,0.3)',
            background: 'transparent',
            border: '1px solid rgba(244,241,234,0.1)',
            padding: '10px 18px',
            cursor: 'none',
          }}
        >
          RESET
        </button>
      </div>

      {/* Engineering note */}
      <div
        className="mt-6 pt-4"
        style={{ borderTop: '1px solid rgba(244,241,234,0.06)', fontSize: '9px', color: 'rgba(244,241,234,0.3)', lineHeight: 1.8 }}
      >
        WHY OFFLINE QUEUE? Network reliability is not guaranteed in field operations. GPS coordinates are queued locally when offline
        and bulk-synced when connectivity is restored — preventing location data loss in low-signal areas.
      </div>
    </div>
  )
}
