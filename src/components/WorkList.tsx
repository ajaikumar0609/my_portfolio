"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    number: "01",
    name: "Yamini Infotech ERP",
    category: "Enterprise / Backend",
    description:
      "Real-time employee GPS tracking, attendance automation, and centralized operational dashboards for 247+ field staff across Tirunelveli zone.",
    stack: ["FastAPI", "PostgreSQL", "Flutter", "GPS", "Python"],
    href: "/work/yamini",
    accentColor: "#15B87A",
  },
  {
    number: "02",
    name: "Kavya Transports",
    category: "Fleet / Logistics",
    description:
      "Fleet intelligence platform for real-world logistics operations — GPS tracking, vehicle monitoring, trip management, and live map dashboards.",
    stack: ["GPS", "Maps", "Fleet Management", "Real-time"],
    href: "/work/kavya",
    accentColor: "#2563EB",
  },
  {
    number: "03",
    name: "UZHAVAN AI",
    category: "AI / Agriculture",
    description:
      "Tamil-first agricultural intelligence platform combining crop intelligence, weather analysis, disease detection, and yield prediction.",
    stack: ["Python", "ML", "NLP", "Agriculture", "Tamil"],
    href: "/work/uzhavan",
    accentColor: "#7C3AED",
  },
];

export default function WorkList() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 px-6 md:px-[7vw]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-3">
            SELECTED WORK
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Systems built, shipped, tested.
          </h2>
        </motion.div>

        <div className="relative">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={project.href}
                className="group block relative"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`flex items-center gap-6 py-6 border-b border-[var(--border)] transition-all duration-300 ${
                    hovered === i ? "pl-3" : "pl-0"
                  }`}
                >
                  {/* Accent line on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 rounded-full"
                    style={{
                      backgroundColor: project.accentColor,
                      opacity: hovered === i ? 1 : 0,
                    }}
                  />

                  <span className="font-mono text-xs text-[var(--muted)] tracking-widest w-6 shrink-0">
                    {project.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.015em] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {project.name}
                    </h3>
                  </div>

                  <span className="hidden sm:block font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] shrink-0">
                    {project.category}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </div>

                {/* Hover preview panel */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-1 w-72 bg-white border border-[var(--border)] rounded-xl p-4 shadow-lg z-20 pointer-events-none"
                    >
                      <div
                        className="w-full h-24 rounded-lg mb-3 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}08)`,
                          border: `1px solid ${project.accentColor}25`,
                        }}
                      >
                        <span
                          className="font-mono text-xs tracking-widest uppercase"
                          style={{ color: project.accentColor }}
                        >
                          {project.number} / {project.category.split("/")[0].trim()}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[0.5625rem] tracking-wide uppercase px-2 py-0.5 border border-[var(--border)] text-[var(--muted)] rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 font-medium"
          >
            View all work <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
