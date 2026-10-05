import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "UZHAVAN AI — Ajai Kumar",
  description:
    "Tamil-first agricultural intelligence platform combining crop intelligence, weather analysis, disease detection, yield prediction, and data-driven decision support.",
};

const capabilities = [
  {
    icon: "🌾",
    label: "CROP INTELLIGENCE",
    description:
      "Crop-specific guidance based on season, soil type, and regional agricultural data. Recommendations tailored to Tamil Nadu farming conditions.",
  },
  {
    icon: "☁️",
    label: "WEATHER ANALYSIS",
    description:
      "Hyperlocal weather data integrated with crop growth models to surface actionable insights for planting, irrigation, and harvest decisions.",
  },
  {
    icon: "🧪",
    label: "DISEASE DETECTION",
    description:
      "Computer vision models trained on crop disease datasets. Farmers photograph affected plants for instant identification and treatment guidance.",
  },
  {
    icon: "📈",
    label: "YIELD PREDICTION",
    description:
      "ML models combining crop variety, soil data, weather patterns, and historical yield records to project expected harvest outcomes.",
  },
  {
    icon: "🗣️",
    label: "TAMIL FIRST",
    description:
      "Full Tamil language interface and voice interaction. Designed for farmers who may not be comfortable with English or digital interfaces.",
  },
];

const stack = [
  "Python",
  "Machine Learning",
  "Computer Vision",
  "NLP",
  "Tamil NLP",
  "Agriculture Domain",
  "LLM Integration",
  "FastAPI",
  "PostgreSQL",
  "Google Cloud",
  "Vertex AI",
];

export default function UzhavanPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-[7vw]">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All Work
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-purple-600 border border-purple-600/30 bg-purple-600/8 px-2.5 py-1 rounded">
                IN PROGRESS
              </span>
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                03 / AI & Agriculture
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text)] mb-4">
              UZHAVAN AI
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              AI for the field, not just the lab. A Tamil-first agricultural
              intelligence platform combining crop knowledge, weather
              intelligence, disease detection, and data-driven decision support
              for real farmers.
            </p>
          </div>

          {/* Visual panel */}
          <div className="mb-12">
            <div
              className="border rounded-xl overflow-hidden"
              style={{ borderColor: "rgba(124, 58, 237, 0.2)" }}
            >
              <div className="p-5 border-b" style={{ borderColor: "rgba(124, 58, 237, 0.1)", background: "rgba(124, 58, 237, 0.03)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-purple-600 mb-1">
                      UZHAVAN AI
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      உழவன் — the farmer
                    </p>
                  </div>
                  <span
                    className="font-mono text-[0.5625rem] tracking-widest uppercase px-2.5 py-1 rounded border"
                    style={{ color: "#7C3AED", borderColor: "rgba(124, 58, 237, 0.3)", background: "rgba(124, 58, 237, 0.08)" }}
                  >
                    AI PLATFORM
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0" style={{ borderColor: "rgba(124, 58, 237, 0.1)" }}>
                {capabilities.map((cap) => (
                  <div
                    key={cap.label}
                    className="p-4 flex flex-col items-center text-center gap-2"
                    style={{ borderColor: "rgba(124, 58, 237, 0.1)" }}
                  >
                    <span className="text-2xl">{cap.icon}</span>
                    <span className="font-mono text-[0.5625rem] tracking-widest uppercase text-purple-600">
                      {cap.label.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-4">
              THE PROBLEM
            </h2>
            <div className="border-l-2 border-[var(--border)] pl-5 space-y-3">
              <p className="text-[var(--muted)] leading-relaxed">
                Agricultural AI tools exist, but they&apos;re built for researchers
                and agronomists — not for farmers in Tamil Nadu who speak Tamil,
                farm on small plots, and need answers they can act on today.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                UZHAVAN AI is being built to close that gap: a platform that
                speaks Tamil natively, understands regional crops and conditions,
                and gives practical, specific guidance rather than generic
                agricultural theory.
              </p>
            </div>
          </div>

          {/* Capabilities detail */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              PLATFORM CAPABILITIES
            </h2>
            <div className="space-y-4">
              {capabilities.map((cap) => (
                <div
                  key={cap.label}
                  className="flex gap-5 p-5 border border-[var(--border)] bg-white rounded-xl hover:border-purple-300 transition-colors duration-200"
                >
                  <span className="text-2xl shrink-0">{cap.icon}</span>
                  <div>
                    <h3 className="font-mono text-[0.6875rem] tracking-widest uppercase text-purple-600 mb-2">
                      {cap.label}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering approach */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              ENGINEERING APPROACH
            </h2>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-[var(--muted)] leading-loose">{`Input Layer (Tamil text / image)
    │
    ├── Tamil NLP pipeline
    │       └── Intent classification → query routing
    │
    ├── Computer Vision pipeline
    │       └── Disease detection model (crops)
    │
    └── LLM integration
            └── Agricultural RAG with Tamil corpus
                    │
                    ▼
            Domain Knowledge Layer
            (crops · diseases · weather · yield data)
                    │
                    ▼
            Response in Tamil + actionable guidance`}</pre>
            </div>
          </div>

          {/* Stack */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-4">
              STACK
            </h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs tracking-wide uppercase px-3 py-1.5 border bg-[var(--bg)] rounded-full"
                  style={{ borderColor: "rgba(124, 58, 237, 0.2)", color: "#7C3AED" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
            <Link
              href="/work/kavya"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              <ArrowLeft size={15} />
              Prev: Kavya Transports
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              All Work
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
