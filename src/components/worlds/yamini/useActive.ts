'use client'

import { useEffect, useRef, useState } from 'react'

// True only while the element is on screen and the tab is visible.
export function useActive<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let inView = false
    const update = () => setActive(inView && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      update()
    }, { rootMargin })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [rootMargin])
  return [ref, active] as const
}
