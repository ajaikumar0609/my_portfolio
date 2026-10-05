'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ModeContextType {
  resumeMode: boolean
  toggle: () => void
}

const ModeContext = createContext<ModeContextType>({ resumeMode: false, toggle: () => {} })

export function ModeProvider({ children }: { children: ReactNode }) {
  const [resumeMode, setResumeMode] = useState(false)
  return (
    <ModeContext.Provider value={{ resumeMode, toggle: () => setResumeMode(v => !v) }}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
