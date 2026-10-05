"use client";

export default function StatusStrip() {
  const capabilities = ["AI", "BACKEND", "FULL STACK", "SYSTEMS", "ML"];

  return (
    <div className="border-y border-[var(--border)] bg-white/60 backdrop-blur-sm py-4 px-6 md:px-[7vw] overflow-x-auto">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex items-center gap-6 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--accent)]">
              Open to Opportunities
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="font-mono text-[0.625rem] tracking-widest uppercase px-2.5 py-1 border border-[var(--border)] text-[var(--muted)] rounded"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap gap-x-8 gap-y-1">
          {[
            { label: "Currently building", value: "UZHAVAN AI" },
            { label: "Based in", value: "India" },
            { label: "Focus", value: "AI + Systems" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-3">
              <span className="font-mono text-[0.6875rem] tracking-wide text-[var(--muted)]">
                {label}
              </span>
              <span className="font-mono text-[0.6875rem] tracking-wide font-semibold text-[var(--text)]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
