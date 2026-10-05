"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 3;
      const y = (e.clientY / window.innerHeight - 0.5) * 3;
      gridRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-[7vw] overflow-hidden"
    >
      {/* Engineering grid background */}
      <div
        ref={gridRef}
        className="engineering-grid absolute inset-[-10%] pointer-events-none transition-transform duration-75 ease-out"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Hero text */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-dot" />
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--muted)]">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text)] mb-6"
          >
            I build software systems that solve real problems.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-[1.0625rem] text-[var(--muted)] leading-relaxed mb-10 max-w-md"
          >
            Computer Science + AI engineer building backend platforms,
            intelligent applications and production-oriented systems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-dark)] transition-colors duration-200"
            >
              View my work
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://github.com/ajaikumarN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-full hover:border-[var(--text)] transition-colors duration-200"
            >
              GitHub
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>

        {/* Right: System status panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="hidden md:block"
        >
          <div className="border border-[var(--border)] bg-[var(--surface)] p-6 rounded-2xl font-mono text-sm max-w-sm ml-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
              <span className="text-xs tracking-widest uppercase text-[var(--muted)]">
                AJAI.SYSTEM
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--accent)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
                ONLINE
              </span>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs tracking-widest uppercase text-[var(--accent)] font-semibold">
                  AVAILABLE
                </span>
              </div>
              <div className="space-y-1.5 pl-4">
                {["AI ENGINEERING", "BACKEND SYSTEMS", "PRODUCT DEVELOPMENT"].map(
                  (item) => (
                    <div
                      key={item}
                      className="text-xs tracking-wider text-[var(--muted)]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 mb-5">
              <div className="text-xs text-[var(--muted)] tracking-wide">
                India / 2026
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/mypic.png"
                alt="Ajai Kumar N"
                width={48}
                height={48}
                className="rounded-full object-cover border border-[var(--border)]"
              />
              <div className="flex gap-3">
                <a
                  href="https://github.com/ajaikumarN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/ajaikumarn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
