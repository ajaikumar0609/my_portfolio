import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Yamini Infotech ERP — Ajai Kumar",
  description:
    "Enterprise workforce operations platform with real-time GPS tracking, attendance automation, and operational dashboards for 247+ field employees.",
};

const challenges = [
  {
    title: "Background GPS on Android",
    description:
      "Android aggressively kills background processes. Built a foreground service with wake locks and a custom notification to keep GPS alive during full work shifts without excessive battery drain.",
  },
  {
    title: "Authentication Lifecycle",
    description:
      "Managed multi-device sessions with token rotation, session expiry handling, and automatic refresh flows so field staff are never unexpectedly logged out mid-shift.",
  },
  {
    title: "Offline GPS Queue",
    description:
      "Network connectivity in field zones is unreliable. Built a local SQLite queue that stores GPS events when offline and syncs them in order when connectivity is restored.",
  },
  {
    title: "Route Segmentation",
    description:
      "Raw GPS streams are noisy. Implemented Haversine-based distance calculations and time-gap analysis to segment continuous movement into clean, meaningful route segments.",
  },
  {
    title: "Real-time Map Dashboard",
    description:
      "Admin dashboard showing live employee positions updating via WebSocket connections. Built map clustering for 247+ simultaneous dots without UI performance degradation.",
  },
  {
    title: "Mobile Reliability",
    description:
      "Field devices run a wide range of Android versions with inconsistent hardware. Built defensive code paths, graceful degradation, and extensive error logging for production stability.",
  },
];

const stack = [
  "FastAPI",
  "PostgreSQL",
  "Flutter",
  "Python",
  "GPS",
  "Background Services",
  "WebSocket",
  "SQLite",
  "Android",
  "REST APIs",
];

export default function YaminiPage() {
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
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-2.5 py-1 rounded">
                PRODUCTION · LIVE
              </span>
              <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                01 / Enterprise Backend
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text)] mb-4">
              Yamini Infotech ERP
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              Enterprise workforce operations platform with real-time GPS
              tracking, attendance automation, and centralized operational
              dashboards for 247+ field employees.
            </p>
          </div>

          {/* Client identity */}
          <div className="flex items-center gap-4 p-5 border border-[var(--border)] bg-white rounded-xl mb-12">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[var(--border)] bg-white shrink-0">
              <Image
                src="/yamini-logo.png"
                alt="Yamini Infotech"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-semibold text-[var(--text)]">
                Yamini Infotech
              </div>
              <a
                href="https://www.yaminicopier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                yaminicopier.com <ArrowUpRight size={11} />
              </a>
            </div>
            <div className="ml-auto text-right">
              <div className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                Tirunelveli, India
              </div>
              <div className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mt-1">
                2024
              </div>
            </div>
          </div>

          {/* Problem */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-4">
              THE PROBLEM
            </h2>
            <div className="border-l-2 border-[var(--border)] pl-5 space-y-3">
              <p className="text-[var(--muted)] leading-relaxed">
                Yamini Infotech operates a large field workforce across
                Tirunelveli. Before this system, attendance was tracked manually
                with paper registers. Supervisors had no visibility into where
                field employees were during work hours. Route records didn&apos;t
                exist. Operational reporting was done days after the fact from
                scattered records.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                The ask was straightforward: build a system that actually works —
                that field staff will use on low-end Android phones, that
                captures GPS reliably even with spotty connectivity, and that
                gives management a live view of operations.
              </p>
            </div>
          </div>

          {/* Architecture */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              ARCHITECTURE
            </h2>
            <div className="bg-white border border-[var(--border)] rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-[var(--muted)] leading-loose">{`Flutter App
    │
    ▼
FastAPI Backend
    │
    ├── /auth          Authentication + Token lifecycle
    │
    ├── /attendance    Geofence punch-in / punch-out
    │
    ├── /gps           Real-time location stream (WebSocket)
    │
    └── /operations    Reports, dashboards, admin
           │
           ▼
       PostgreSQL
       (positions, users, attendance, operations)

Mobile Offline Layer:
    SQLite queue → Sync on reconnect`}</pre>
            </div>
          </div>

          {/* Engineering Challenges */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              ENGINEERING CHALLENGES
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((c) => (
                <div
                  key={c.title}
                  className="border border-[var(--border)] bg-white rounded-xl p-5 hover:border-[var(--accent)]/30 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-[var(--text)] mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {c.description}
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

          {/* Results */}
          <div className="mb-12">
            <h2 className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
              RESULTS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "247+", label: "Employees tracked" },
                { num: "Real-time", label: "GPS updates" },
                { num: "100%", label: "Automated attendance" },
                { num: "Production", label: "Status" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="border border-[var(--border)] bg-white rounded-xl p-4 text-center"
                >
                  <div className="font-mono text-xl font-semibold text-[var(--text)] mb-1">
                    {num}
                  </div>
                  <div className="font-mono text-[0.5625rem] tracking-widest uppercase text-[var(--muted)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              <ArrowLeft size={15} />
              All Work
            </Link>
            <Link
              href="/work/kavya"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-medium"
            >
              Next: Kavya Transports
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
