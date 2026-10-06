'use client'

import { useEffect, useRef, useState } from 'react'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

// Copies the address. If the clipboard API is unavailable or refused, selects the visible address instead.
export default function CopyEmail({ email, targetId }: { email: string; targetId: string }) {
  const [msg, setMsg] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const say = (m: string) => {
    setMsg(m)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 3500)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      say('Email copied')
    } catch {
      const el = document.getElementById(targetId)
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
      say('Copy blocked. Address selected, press Ctrl or Cmd + C')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <button
        type="button"
        onClick={copy}
        className="bg-transparent px-3 py-2"
        style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', color: '#F4F1EA', border: '1px solid var(--border)', minHeight: 44 }}
      >
        COPY EMAIL
      </button>
      <span role="status" aria-live="polite" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: '#B8FF3D' }}>
        {msg}
      </span>
    </div>
  )
}
