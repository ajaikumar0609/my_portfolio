'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LabButton, LabFrame, LiveStatus } from '@/components/worlds/ui'
import { uzhavan } from '@/data/worlds'
import { useReduced } from '@/lib/useReduced'
import { MONO_FONT, TAMIL_FONT } from './tamil'

type Mode = 'crop' | 'leaf' | 'weather' | 'ask'

// Pipeline stages each mode passes through (order follows the pipeline).
const LIT: Record<Mode, string[]> = {
  crop: ['weather', 'knowledge'],
  leaf: ['vision', 'knowledge'],
  weather: ['weather', 'knowledge'],
  ask: ['nlp', 'knowledge', 'llm'],
}
const MIDS = ['vision', 'nlp', 'weather', 'knowledge', 'llm']

interface Sample { ta: string; en: string }

// Canned, generic sample outputs. Nothing here comes from a model.
const SAMPLES: Record<Exclude<Mode, 'ask'>, Sample> = {
  crop: {
    ta: 'பயிருக்கு நீர் பாய்ச்சும் முன் மண்ணின் ஈரப்பதத்தைப் பாருங்கள்.',
    en: 'Check the soil moisture before irrigating the crop.',
  },
  leaf: {
    ta: 'இலைகளைக் கவனமாகப் பாருங்கள்; மாற்றம் தெரிந்தால் வேளாண் அலுவலரிடம் கேளுங்கள்.',
    en: 'Look at the leaves carefully; if you notice changes, ask an agricultural officer.',
  },
  weather: {
    ta: 'மழை வருமா என்று வானிலை அறிவிப்பைப் பார்த்து வேலையைத் திட்டமிடுங்கள்.',
    en: 'Check the weather forecast for rain and plan your field work.',
  },
}

const PRESETS = [
  {
    id: 'q1',
    q: 'நீர் பாய்ச்சுவது எப்போது?',
    qEn: 'When should I irrigate?',
    ta: 'மண் காய்ந்திருந்தால் நீர் பாய்ச்சுங்கள்; ஈரமாக இருந்தால் காத்திருங்கள்.',
    en: 'Irrigate if the soil is dry; wait if it is moist.',
  },
  {
    id: 'q2',
    q: 'இலையில் புள்ளிகள் தெரிகின்றன, என்ன செய்வது?',
    qEn: 'I can see spots on the leaf. What should I do?',
    ta: 'இலையின் படத்தை எடுத்து வேளாண் அலுவலரிடம் காட்டுங்கள்.',
    en: 'Take a photo of the leaf and show it to an agricultural officer.',
  },
  {
    id: 'q3',
    q: 'மழை வருமா?',
    qEn: 'Will it rain?',
    ta: 'இன்றைய வானிலை அறிவிப்பைப் பார்த்து முடிவு செய்யுங்கள்.',
    en: "Check today's weather forecast and decide.",
  },
]

const graphemes = (s: string): string[] => {
  const Seg = (Intl as unknown as { Segmenter?: new (l: string, o: { granularity: string }) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter
  if (Seg) return Array.from(new Seg('ta', { granularity: 'grapheme' }).segment(s), x => x.segment)
  return Array.from(s)
}

const STAGE_TICKS = 10 // 60ms ticks per stage
const TICK_MS = 60

export default function Demo() {
  const reduced = useReduced()
  const rootRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(true)
  const [mode, setMode] = useState<Mode | null>(null)
  const [preset, setPreset] = useState<string | null>(null)
  const [runKey, setRunKey] = useState(0)
  const [step, setStep] = useState(0)
  const [chars, setChars] = useState(0)

  const sample: Sample | null = useMemo(() => {
    if (!mode) return null
    if (mode === 'ask') {
      const p = PRESETS.find(x => x.id === preset)
      return p ? { ta: p.ta, en: p.en } : null
    }
    return SAMPLES[mode]
  }, [mode, preset])

  const seq = useMemo(() => {
    if (!mode || !sample) return []
    return ['input', 'api', ...MIDS.filter(id => LIT[mode].includes(id)), 'out']
  }, [mode, sample])

  const units = useMemo(() => (sample ? graphemes(sample.ta) : []), [sample])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (visibleRef.current = e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seq.length) {
      setStep(0)
      setChars(0)
      return
    }
    if (reduced) {
      setStep(seq.length)
      setChars(units.length)
      return
    }
    setStep(0)
    setChars(0)
    let ticks = 0
    const total = seq.length * STAGE_TICKS
    const id = setInterval(() => {
      if (!visibleRef.current || document.hidden) return
      ticks++
      if (ticks <= total) {
        if (ticks % STAGE_TICKS === 1) setStep(Math.ceil(ticks / STAGE_TICKS))
      } else {
        const c = Math.min(ticks - total, units.length)
        setChars(c)
        if (c >= units.length) clearInterval(id)
      }
    }, TICK_MS)
    return () => clearInterval(id)
  }, [runKey, seq, units, reduced])

  const choose = (m: Mode) => {
    setMode(m)
    setPreset(null)
    if (m !== 'ask') setRunKey(k => k + 1)
  }
  const pickPreset = (id: string) => {
    setMode('ask')
    setPreset(id)
    setRunKey(k => k + 1)
  }

  const done = !!sample && step >= seq.length && chars >= units.length
  const reached = (id: string) => {
    const i = seq.indexOf(id)
    return i !== -1 && i < step
  }
  const relevant = (id: string) => seq.includes(id)
  const label = (id: string) => uzhavan.pipeline.find(p => p.id === id)!.label

  const status = !mode
    ? 'Choose an input to run the portfolio simulation.'
    : !sample
      ? 'Choose a sample question.'
      : done
        ? `Portfolio simulation sample output: ${sample.en}`
        : `Portfolio simulation running for ${uzhavan.inputs.find(i => i.id === mode)!.label}.`

  const renderNode = (id: string) => {
    const on = reached(id)
    return (
      <div
        key={id}
        data-lit={on}
        className="flex items-center gap-2 px-3 py-2"
        style={{
          fontFamily: MONO_FONT,
          fontSize: 10,
          letterSpacing: '0.16em',
          color: on ? '#F4F1EA' : 'rgba(244,241,234,0.6)',
          border: `1px ${relevant(id) || !mode ? 'solid' : 'dashed'} ${on ? '#9DBF6A' : 'var(--w-line)'}`,
          background: on ? 'rgba(157,191,106,0.1)' : 'transparent',
          transition: reduced ? 'none' : 'all 0.35s',
        }}
      >
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 6, background: on ? '#9DBF6A' : 'rgba(244,241,234,0.25)' }} />
        <span>{label(id)}</span>
        {on && <span className="sr-only"> reached</span>}
      </div>
    )
  }
  const arrow = (k: string) => (
    <span key={k} aria-hidden="true" className="self-center rotate-90 md:rotate-0" style={{ fontFamily: MONO_FONT, fontSize: 12, color: 'rgba(244,241,234,0.5)' }}>
      →
    </span>
  )

  return (
    <div ref={rootRef}>
      <LabFrame
        title="TRY THE SYSTEM"
        kind="simulation"
        caption="Pick an input and watch the pipeline stages light up in order. The Tamil response is a pre-written sample, not model output."
      >
        <div
          className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-3"
          style={{ border: '1px solid var(--w-accent)', background: 'rgba(216,179,90,0.08)' }}
        >
          <strong style={{ fontFamily: MONO_FONT, fontSize: 12, letterSpacing: '0.24em', color: 'var(--w-accent)' }}>PORTFOLIO SIMULATION</strong>
          <span style={{ fontSize: 13, color: 'rgba(244,241,234,0.85)' }}>Canned sample outputs. No model is running and nothing is sent anywhere.</span>
        </div>

        <div role="group" aria-label="Choose an input" className="flex flex-wrap gap-3">
          {uzhavan.inputs.map(i => (
            <LabButton key={i.id} pressed={mode === i.id} onClick={() => choose(i.id as Mode)}>
              <span>{i.label}</span>{' '}
              <span lang="ta" style={{ fontFamily: TAMIL_FONT, letterSpacing: 0, fontSize: 14, marginLeft: 6, color: 'rgba(244,241,234,0.85)' }}>
                {i.ta}
              </span>
            </LabButton>
          ))}
        </div>

        {mode === 'ask' && (
          <div role="group" aria-label="Sample questions" className="mt-4 flex flex-col gap-2 md:flex-row md:flex-wrap">
            {PRESETS.map(p => (
              <LabButton key={p.id} pressed={preset === p.id} onClick={() => pickPreset(p.id)}>
                <span lang="ta" className="block text-left" style={{ fontFamily: TAMIL_FONT, letterSpacing: 0, fontSize: 15, lineHeight: 1.7 }}>
                  {p.q}
                </span>
                <span className="block text-left" style={{ fontSize: 10, color: 'rgba(244,241,234,0.65)' }}>{p.qEn}</span>
              </LabButton>
            ))}
          </div>
        )}

        <div
          role="group"
          aria-label="Pipeline: farmer input, FastAPI, then vision, NLP, weather, crop knowledge and LLM, then Tamil response"
          className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch"
        >
          <div className="md:self-center">{renderNode('input')}</div>
          {arrow('a1')}
          <div className="md:self-center">{renderNode('api')}</div>
          {arrow('a2')}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
            {MIDS.map(id => renderNode(id))}
          </div>
          {arrow('a3')}
          <div className="md:self-center">{renderNode('out')}</div>
        </div>

        <div className="mt-8 min-h-[150px] p-5" style={{ border: '1px solid var(--w-line)', background: 'rgba(10,8,3,0.6)' }}>
          <p className="m-0" style={{ fontFamily: MONO_FONT, fontSize: 10, letterSpacing: '0.22em', color: 'var(--w-accent)' }}>
            PORTFOLIO SIMULATION · SAMPLE OUTPUT
          </p>
          {mode === 'ask' && preset && (
            <p className="m-0 mt-3" style={{ fontSize: 13, color: 'rgba(244,241,234,0.75)' }}>
              Sample question: <span lang="ta" style={{ fontFamily: TAMIL_FONT, lineHeight: 1.7 }}>{PRESETS.find(x => x.id === preset)!.q}</span>
            </p>
          )}
          {sample ? (
            <>
              <p aria-hidden="true" lang="ta" className="m-0 mt-4" style={{ fontFamily: TAMIL_FONT, fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)', lineHeight: 1.7, color: '#F4F1EA', minHeight: '3.4em' }}>
                {units.slice(0, chars).join('')}
                {!done && !reduced && <span style={{ color: 'var(--w-accent)' }}>▍</span>}
              </p>
              {done && (
                <>
                  <p lang="ta" className="sr-only">{sample.ta}</p>
                  <p className="m-0 mt-3" style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(244,241,234,0.8)' }}>
                    <span style={{ fontFamily: MONO_FONT, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(244,241,234,0.55)' }}>ENGLISH GLOSS · </span>
                    {sample.en}
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="m-0 mt-4" style={{ fontSize: 14, color: 'rgba(244,241,234,0.7)' }}>
              {mode === 'ask' ? 'Choose a sample question above.' : 'No input chosen yet.'}
            </p>
          )}
        </div>

        <div className="mt-4">
          <LiveStatus>{status}</LiveStatus>
        </div>
      </LabFrame>
    </div>
  )
}
