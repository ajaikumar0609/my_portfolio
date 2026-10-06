import Image from 'next/image'
import { person } from '@/data/content'

// The canonical portrait (new_pic.png) is a full-length transparent cutout, 1086x1448. It is never edited:
// this component only chooses which window of the frame is visible (head to hips) and fades the cut edge.
const SRC_W = 1086
const SRC_H = 1448
const WIN_X = 263
const WIN_W = 560
const WIN_H = 900

export default function PortraitImage({
  className = '',
  sizes,
  eager = false,
}: {
  className?: string
  sizes: string
  eager?: boolean
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${WIN_W} / ${WIN_H}` }}>
      <Image
        src={person.photo}
        alt="Portrait of Ajai Kumar N"
        width={SRC_W}
        height={SRC_H}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        className="absolute top-0 h-auto max-w-none"
        style={{
          width: `${(SRC_W / WIN_W) * 100}%`,
          left: `${-(WIN_X / WIN_W) * 100}%`,
          filter:
            'brightness(1.08) contrast(1.04) drop-shadow(-1px 0 0 rgba(244,241,234,0.2)) drop-shadow(0 0 36px rgba(244,241,234,0.08))',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)',
        }}
      />
    </div>
  )
}
