import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kavya Transports — Ajai Kumar",
  description:
    "Fleet intelligence platform for real-world logistics operations — GPS tracking, vehicle monitoring, trip management, and live map dashboards.",
};

const features = [
  {
    label: "GPS TRACKING",
    description:
      "Continuous vehicle location tracking with real-time position updates. Each vehicle maintains an active GPS stream to the backend.",
  },
  {
    label: "VEHICLE OPERATIONS",
    description:
      "Centralized vehicle management: status monitoring, fuel records, maintenance schedules, and operational metrics per vehicle.",
  },
  {
    label: "TRIP MANAGEMENT",
    description:
      "Full trip lifecycle — route planning, live progress tracking, delivery confirmation, and historical trip records.",
  },
  {
    label: "LIVE MAP",
    description:
      "Dashboard with live fleet positions overlaid on a map. Dispatch and operations staff see the full fleet state at a glance.",
  },
  {
    label: "LOGISTICS REPORTING",
    description:
      "Trip reports, route efficiency analysis, on-time metrics, and fleet utilization data for management decisions.",
  },
];

const stack = [
  "FastAPI",
  "PostgreSQL",
  "GPS Integration",
  "Maps API",
  "Python",
  "WebSocket",
  "Fleet Management",
  "Real-time Systems",
];

export default function KavyaPage() {
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
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-blue-600 border border-blue-600/30 bg-blue-600/8 px-2.5 py-1 rounded">
                PRODUCTION
              </span>
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                02 / Fleet & Logistics
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text)] mb-4">
              Kavya Transports
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              Fleet intelligence platform for real-world logistics operations.
              GPS tracking, vehicle monitoring, trip management, and live
              operational dashboards.
            </p>
          </div>

          {/* Client identity */}
          <div className="flex items-center gap-4 p-5 border border-[var(--border)] bg-white rounded-xl mb-12">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[var(--border)] bg-white shrink-0">
              <Image
                src="/kavyalogo.png"
                alt="Kavya Transports"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-semibold text-[var(--text)]">
                Kavya Transports
              </div>
              <div className="font-mono text-xs text-[var(--muted)]">
                Fleet & Logistics · India
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                India
              </div>
              <div className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mt-1">
                2024
              </div>
            </div>
          </div>

          {/* Map visual */}
          <div className="mb-12">
            <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="font-mono text-xs tracking-widest uppercase text-[var(--muted)]">
                    FLEET DASHBOARD · LIVE
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[0.5625rem] tracking-widest uppercase border border-[var(--border)] text-[var(--muted)] px-2 py-0.5 rounded">
                    ALL VEHICLES
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-widest uppercase border border-blue-600/30 text-blue-600 bg-blue-600/8 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Mock map area */}
              <div className="relative h-48 overflow-hidden bg-[var(--bg)]">
                {/* Grid lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Road lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200">
                  <path d="M 50 100 L 550 100" stroke="#D9D9D4" strokeWidth="2" fill="none" />
                  <path d="M 200 20 L 200 180" stroke="#D9D9D4" strokeWidth="1.5" fill="none" />
                  <path d="M 400 20 L 400 180" stroke="#D9D9D4" strokeWidth="1.5" fill="none" />
                  <path d="M 50 50 L 250 50 L 350 130 L 550 130" stroke="#D9D9D4" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  {/* Vehicle dots */}
                  <circle cx="180" cy="100" r="6" fill="#2563EB" opacity="0.9" />
                  <circle cx="180" cy="100" r="12" fill="#2563EB" opacity="0.2" />
                  <circle cx="320" cy="100" r="6" fill="#15B87A" opacity="0.9" />
                  <circle cx="320" cy="100" r="12" fill="#15B87A" opacity="0.2" />
                  <circle cx="460" cy="100" r="6" fill="#2563EB" opacity="0.9" />
                  <circle cx="460" cy="100" r="12" fill="#2563EB" opacity="0.2" />
                  <circle cx="250" cy="50" r="5" fill="#F59E0B" opacity="0.9" />
                  <circle cx="250" cy="50" r="10" fill="#F59E0B" opacity="0.2" />
                </svg>
                {/* Status overlay */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className="font-mono text-[0.5625rem] tracking-wide uppercase bg-white/90 border border-[var(--border)] text-[var(--text)] px-2 py-1 rounded">
                    4 ACTIVE
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-wide uppercase bg-white/90 border border-[var(--border)] text-[var(--muted)] px-2 py-1 rounded">
                    2 IDLE
                  </span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-4 divide-x divide-[var(--border)] border-t border-[var(--border)]">
                {[
                  { num: "6", label: "Vehicles" },
                  { num: "4", label: "Active" },
                  { num: "12", label: "Trips today" },
                  { num: "98%", label: "On-time" },
                ].map(({ num, label }) => (
                  <div key={label} className="p-3 text-center">
                    <div className="font-mono text-base font-semibold text-[var(--text)]">
                      {num}
                    </div>
                    <div className="font-mono text-[0.5625rem] tracking-widest uppercase text-[var(--muted)]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              PLATFORM CAPABILITIES
            </h2>
            <div className="space-y-px">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex gap-6 py-4 border-b border-[var(--border)]"
                >
                  <span className="font-mono text-[0.5625rem] tracking-widest uppercase text-blue-600 w-28 shrink-0 pt-0.5">
                    {f.label}
                  </span>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
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
                  className="font-mono text-xs tracking-wide uppercase px-3 py-1.5 border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
            <Link
              href="/work/yamini"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              <ArrowLeft size={15} />
              Prev: Yamini ERP
            </Link>
            <Link
              href="/work/uzhavan"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              Next: UZHAVAN AI
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
