// Static night-map backdrop: sparse roads, long route traces, distance ticks. No animation, no canvas.
export default function KavyaBackdrop() {
  const roads = [
    'M-20 520 C180 470 260 420 420 430 S700 380 1020 300',
    'M-20 210 C140 240 300 190 460 240 S780 250 1020 150',
    'M260 -20 C300 120 380 200 400 330 S470 520 520 640',
    'M820 -20 C780 120 700 160 690 280 S720 480 760 640',
  ]
  const traces = ['M-20 520 C180 470 260 420 420 430 S700 380 1020 300']
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" role="presentation">
      {roads.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(244,241,234,0.07)" strokeWidth="1" />
      ))}
      {traces.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(77,232,255,0.16)" strokeWidth="1.5" strokeDasharray="2 10" />
      ))}
      {[[420, 430], [460, 240], [400, 330], [690, 280]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(244,241,234,0.2)" />
      ))}
      {Array.from({ length: 21 }).map((_, i) => (
        <line key={i} x1={i * 50} y1="600" x2={i * 50} y2={i % 2 ? 608 : 614} stroke="rgba(244,241,234,0.12)" />
      ))}
    </svg>
  )
}
