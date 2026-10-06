import Image from 'next/image'
import type { Screenshot } from '@/data/screenshots'

const mono = { fontFamily: 'var(--font-ibm-plex-mono), monospace' } as const

// A real project screenshot, shown as-is: no fake browser chrome, no restyling, no CONCEPT badge.
// The caption says what the image shows; redacted images say so honestly.
export function EvidenceFigure({
  shot,
  sizes,
  priority = false,
  className = '',
  note,
}: {
  shot: Screenshot
  sizes: string
  priority?: boolean
  className?: string
  note?: string
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="media"
        aria-label={`Open full-size image: ${shot.title}`}
        className="block overflow-hidden"
        style={{ border: '1px solid var(--w-line, rgba(244,241,234,0.2))', background: '#0b0b0b' }}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          quality={85}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="block h-auto w-full"
        />
      </a>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', color: 'rgba(244,241,234,0.72)' }}>
        <span style={{ color: '#F4F1EA' }}>{shot.caption}</span>
        <span>REAL PROJECT SCREENSHOT{shot.redacted ? ' · PERSONAL DATA PIXELATED' : ''}</span>
        {note && <span>{note}</span>}
      </figcaption>
    </figure>
  )
}

// Small light plate: several of the marks have dark outlines or dark text, so they are never shown on the dark page directly.
export function LogoPlate({ src, alt, size = 56, className = '' }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size, background: '#F4F1EA', padding: Math.round(size * 0.12) }}
    >
      <Image src={src} alt={alt} width={size * 2} height={size * 2} sizes={`${size}px`} className="h-full w-full object-contain" />
    </span>
  )
}
