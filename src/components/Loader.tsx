'use client'

import { useEffect, useState } from 'react'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'ready' | 'done'>('loading')

  useEffect(() => {
    // Check if already loaded this session
    const alreadyLoaded = sessionStorage.getItem('ajai_loaded')
    if (alreadyLoaded) {
      setPhase('done')
      onComplete()
      return
    }

    // Animate progress
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => {
          setPhase('ready')
          setTimeout(() => {
            setPhase('done')
            sessionStorage.setItem('ajai_loaded', '1')
            onComplete()
          }, 600)
        }, 200)
      } else {
        setProgress(Math.floor(p))
      }
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: '#050505',
        opacity: phase === 'ready' ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: phase === 'ready' ? 'none' : 'all',
      }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-[#B8FF3D]"
            style={{
              left: `${(i % 10) * 10 + 5}%`,
              top: `${Math.floor(i / 10) * 12.5 + 6}%`,
              opacity: progress / 100,
              transition: 'opacity 0.3s',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div
          className="text-[#F4F1EA] mb-3 tracking-[0.3em]"
          style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px' }}
        >
          AJAI.SYSTEM
        </div>
        <div
          className="mb-8 tracking-[0.2em]"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            color: 'rgba(244,241,234,0.4)',
          }}
        >
          {phase === 'ready' ? 'SYSTEM READY' : 'INITIALIZING...'}
        </div>

        {/* Progress bar */}
        <div className="w-[240px] h-[1px] bg-[rgba(244,241,234,0.1)] mb-4 overflow-hidden">
          <div
            className="h-full bg-[#B8FF3D] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '10px',
            color: 'rgba(244,241,234,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          {progress.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  )
}
