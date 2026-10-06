// Static crop-row perspective + contour curves + soil grain. No animation, no WebGL.
const VX = 1010
const VY = -140

export default function Backdrop() {
  const rows = Array.from({ length: 30 }, (_, i) => -900 + i * 120)
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ maskImage: 'linear-gradient(to bottom, #000 35%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 35%, transparent 100%)' }}
    >
      <defs>
        <filter id="uz-soil" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.7  0 0 0 0 0.35  0 0 0 0.55 0" />
        </filter>
        <radialGradient id="uz-glow" cx="70%" cy="10%" r="70%">
          <stop offset="0" stopColor="#D8B35A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#D8B35A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#uz-glow)" />
      <rect width="1440" height="900" filter="url(#uz-soil)" opacity="0.07" />
      <g stroke="#D8B35A" strokeWidth="1" fill="none">
        {rows.map(x => (
          <line key={x} x1={VX} y1={VY} x2={x} y2={940} strokeOpacity="0.14" />
        ))}
      </g>
      <g stroke="#D8B35A" strokeWidth="1" fill="none" strokeOpacity="0.1">
        <path d="M-40 640 C 260 560, 520 700, 800 620 S 1250 560, 1500 640" />
        <path d="M-40 700 C 300 630, 560 760, 860 690 S 1280 640, 1500 710" />
        <path d="M-40 770 C 320 700, 600 820, 900 760 S 1300 720, 1500 780" />
      </g>
    </svg>
  )
}
