import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work — Ajai Kumar",
  description: "Projects and systems built by Ajai Kumar — backend platforms, AI applications, and real-world engineering.",
};

const projects = [
  {
    number: "01",
    name: "Yamini Infotech ERP",
    category: "Enterprise / Backend",
    year: "2024",
    description:
      "Real-time employee GPS tracking, attendance automation, and centralized operational dashboards for 247+ field staff. Full-stack platform with FastAPI backend and Flutter mobile app.",
    stack: ["FastAPI", "PostgreSQL", "Flutter", "GPS", "Python", "Background Services"],
    status: "Production · Live",
    href: "/work/yamini",
    accentColor: "#15B87A",
  },
  {
    number: "02",
    name: "Kavya Transports",
    category: "Fleet / Logistics",
    year: "2024",
    description:
      "Fleet intelligence platform for real-world logistics operations. GPS vehicle tracking, trip management, route monitoring, and live operational dashboards.",
    stack: ["GPS", "Maps", "Fleet Management", "Real-time", "FastAPI"],
    status: "Production",
    href: "/work/kavya",
    accentColor: "#2563EB",
  },
  {
    number: "03",
    name: "UZHAVAN AI",
    category: "AI / Agriculture",
    year: "2025",
    description:
      "Tamil-first agricultural intelligence platform combining crop intelligence, weather analysis, disease detection, yield prediction, and data-driven decision support for farmers.",
    stack: ["Python", "ML", "NLP", "Agriculture", "Tamil", "LLM", "Computer Vision"],
    status: "In Progress",
    href: "/work/uzhavan",
    accentColor: "#7C3AED",
  },
];

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-[7vw] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-3">
              SELECTED WORK
            </p>
            <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.02em] text-[var(--text)]">
              Systems built, shipped, tested.
            </h1>
          </div>

          <div className="space-y-px">
            {projects.map((project) => (
              <Link
                key={project.number}
                href={project.href}
                className="group block border border-[var(--border)] bg-white rounded-xl p-7 hover:border-[var(--text)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs text-[var(--muted)] tracking-widest w-5 shrink-0 mt-1">
                    {project.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-xl font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-1">
                          {project.name}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                            {project.category}
                          </span>
                          <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                            ·
                          </span>
                          <span className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)]">
                            {project.year}
                          </span>
                          <span
                            className="font-mono text-[0.5625rem] tracking-widest uppercase px-2 py-0.5 rounded border"
                            style={{
                              color: project.accentColor,
                              borderColor: `${project.accentColor}40`,
                              backgroundColor: `${project.accentColor}10`,
                            }}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-0.5"
                      />
                    </div>

                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[0.5625rem] tracking-wide uppercase px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
