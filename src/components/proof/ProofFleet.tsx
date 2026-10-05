'use client'

import { useState, useEffect, useRef } from 'react'

interface Vehicle {
  id: string
  status: 'ACTIVE' | 'IDLE'
  trip: string
  speed: number
  route: string
  progress: number
  pathIndex: number
}

// SVG paths: each vehicle follows a path defined by control points
const paths = [
  { x1: 50, y1: 60, x2: 340, y2: 60 },
  { x1: 80, y1: 130, x2: 380, y2: 130 },
  { x1: 120, y1: 40, x2: 420, y2: 200 },
  { x1: 60, y1: 180, x2: 350, y2: 80 },
]

const initialVehicles: Vehicle[] = [
  { id: 'TRK-001', status: 'ACTIVE', trip: '#1082', speed: 47, route: 'TIRUNELVELI → CHENNAI', progress: 0.1, pathIndex: 0 },
  { id: 'TRK-002', status: 'ACTIVE', trip: '#1083', speed: 52, route: 'MADURAI → COIMBATORE', progress: 0.35, pathIndex: 1 },
  { id: 'TRK-003', status: 'ACTIVE', trip: '#1084', speed: 38, route: 'CHENNAI → BANGALORE', progress: 0.6, pathIndex: 2 },
  { id: 'TRK-004', status: 'ACTIVE', trip: '#1085', speed: 61, route: 'TIRUNELVELI → MADURAI', progress: 0.8, pathIndex: 3 },
  { id: 'TRK-005', status: 'IDLE', trip: '—', speed: 0, route: 'DEPOT · TIRUNELVELI', progress: 0, pathIndex: 0 },
  { id: 'TRK-006', status: 'IDLE', trip: '—', speed: 0, route: 'DEPOT · MADURAI', progress: 0, pathIndex: 1 },
]

function getPos(vehicle: Vehicle): { x: number; y: number } {
  if (vehicle.status === 'IDLE') {
    return vehicle.pathIndex === 0 ? { x: 50, y: 220 } : { x: 130, y: 240 }
  }
  const path = paths[vehicle.pathIndex]
  return {
    x: path.x1 + (path.x2 - path.x1) * vehicle.progress,
    y: path.y1 + (path.y2 - path.y1) * vehicle.progress,
  }
}

export default function ProofFleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [selected, setSelected] = useState<string | null>('TRK-001')
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    animRef.current = setInterval(() => {
      setVehicles(vs => vs.map(v => {
        if (v.status !== 'ACTIVE') return v
        const next = v.progress + 0.003
        return { ...v, progress: next > 1 ? 0 : next }
      }))
    }, 100)
    return () => { if (animRef.current) clearInterval(animRef.current) }
  }, [])

  const selectedVehicle = vehicles.find(v => v.id === selected)

  return (
    <div
      className="w-full"
      style={{
        background: 'rgba(77,232,255,0.02)',
        border: '1px solid rgba(77,232,255,0.12)',
        padding: '32px',
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#4DE8FF' }}>KAVYA // FLEET CONTROL</div>
          <div style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)', marginTop: '4px' }}>
            SIMULATION · DEMO DATA
          </div>
        </div>
        <div className="flex gap-6">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#4DE8FF' }}>6</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)' }}>VEHICLES</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#B8FF3D' }}>4</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)' }}>ACTIVE</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(244,241,234,0.4)' }}>0</div>
            <div style={{ fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(244,241,234,0.3)' }}>ALERTS</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SVG Map */}
        <div className="md:col-span-2" style={{ border: '1px solid rgba(77,232,255,0.08)', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
          <svg width="100%" viewBox="0 0 480 260" style={{ display: 'block' }}>
            {/* Road lines */}
            {paths.map((p, i) => (
              <line
                key={i}
                x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                stroke="rgba(77,232,255,0.12)"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
            ))}
            {/* Grid */}
            {[80, 160, 240, 320, 400].map(x => (
              <line key={x} x1={x} y1={0} x2={x} y2={260} stroke="rgba(244,241,234,0.03)" strokeWidth="1" />
            ))}
            {[65, 130, 195].map(y => (
              <line key={y} x1={0} y1={y} x2={480} y2={y} stroke="rgba(244,241,234,0.03)" strokeWidth="1" />
            ))}
            {/* Depot markers */}
            <rect x="35" y="208" width="32" height="18" fill="rgba(244,241,234,0.04)" stroke="rgba(244,241,234,0.1)" strokeWidth="1" rx="2" />
            <text x="51" y="221" fill="rgba(244,241,234,0.3)" fontSize="7" textAnchor="middle" fontFamily="IBM Plex Mono">DEPOT</text>
            <rect x="110" y="228" width="32" height="18" fill="rgba(244,241,234,0.04)" stroke="rgba(244,241,234,0.1)" strokeWidth="1" rx="2" />
            <text x="126" y="241" fill="rgba(244,241,234,0.3)" fontSize="7" textAnchor="middle" fontFamily="IBM Plex Mono">DEPOT</text>
            {/* Vehicles */}
            {vehicles.map(v => {
              const pos = getPos(v)
              const isSelected = v.id === selected
              const color = v.status === 'ACTIVE' ? '#B8FF3D' : 'rgba(244,241,234,0.25)'
              return (
                <g key={v.id} onClick={() => setSelected(v.id)} style={{ cursor: 'none' }}>
                  {isSelected && (
                    <circle cx={pos.x} cy={pos.y} r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
                  )}
                  <circle cx={pos.x} cy={pos.y} r="5" fill={color} opacity={isSelected ? 1 : 0.7} />
                  <text x={pos.x + 8} y={pos.y - 6} fill={color} fontSize="7" fontFamily="IBM Plex Mono" opacity="0.8">
                    {v.id.split('-')[1]}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Selected vehicle panel */}
        <div style={{ border: '1px solid rgba(77,232,255,0.1)', padding: '20px' }}>
          {selectedVehicle ? (
            <>
              <div style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#4DE8FF', marginBottom: '16px' }}>
                {selectedVehicle.id}
              </div>
              {[
                { label: 'STATUS', value: selectedVehicle.status, color: selectedVehicle.status === 'ACTIVE' ? '#B8FF3D' : 'rgba(244,241,234,0.4)' },
                { label: 'TRIP', value: selectedVehicle.trip, color: undefined },
                { label: 'SPEED', value: selectedVehicle.status === 'ACTIVE' ? `${selectedVehicle.speed} km/h` : '0 km/h', color: undefined },
                { label: 'ROUTE', value: selectedVehicle.route, color: undefined },
              ].map(row => (
                <div key={row.label} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid rgba(244,241,234,0.05)', fontSize: '10px' }}>
                  <span style={{ color: 'rgba(244,241,234,0.35)', letterSpacing: '0.1em' }}>{row.label}</span>
                  <span style={{ color: row.color || 'rgba(244,241,234,0.7)', textAlign: 'right' }}>{row.value}</span>
                </div>
              ))}
              {selectedVehicle.status === 'ACTIVE' && (
                <div className="mt-4">
                  <div style={{ fontSize: '8px', color: 'rgba(244,241,234,0.3)', letterSpacing: '0.1em', marginBottom: '6px' }}>ROUTE PROGRESS</div>
                  <div style={{ height: '2px', background: 'rgba(244,241,234,0.08)', position: 'relative' }}>
                    <div style={{ height: '100%', background: '#4DE8FF', width: `${(selectedVehicle.progress * 100).toFixed(0)}%`, transition: 'width 0.1s' }} />
                  </div>
                  <div style={{ fontSize: '8px', color: '#4DE8FF', marginTop: '4px' }}>
                    {(selectedVehicle.progress * 100).toFixed(0)}%
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: '10px', color: 'rgba(244,241,234,0.3)' }}>
              CLICK A VEHICLE
            </div>
          )}
          {/* Vehicle list */}
          <div className="mt-4 flex flex-col gap-1">
            {vehicles.map(v => (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className="flex items-center gap-2 text-left w-full py-1"
                style={{ background: 'transparent', border: 'none', cursor: 'none' }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: v.status === 'ACTIVE' ? '#B8FF3D' : 'rgba(244,241,234,0.2)' }}
                />
                <span style={{
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  color: selected === v.id ? '#4DE8FF' : 'rgba(244,241,234,0.5)',
                  fontFamily: 'IBM Plex Mono, monospace',
                }}>
                  {v.id}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
