"use client";

import { motion } from "framer-motion";

const traits = [
  "SYSTEM THINKING",
  "BACKEND ENGINEERING",
  "AI / ML",
  "PRODUCT DEVELOPMENT",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-[7vw] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6"
            >
              ABOUT
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[var(--text)] mb-8 border-l-2 border-[var(--accent)] pl-5"
            >
              I like building things that have to work outside the demo.
            </motion.blockquote>

            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I'm a Computer Science and AI student at Karunya Institute of
                Technology and Sciences, focused on building systems that work
                in production — not just in development environments.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                I built a production ERP system for Yamini Infotech — handling
                real-time GPS tracking for 247+ field employees, automated
                attendance, and operational dashboards. That's the kind of
                engineering I care about: systems that run reliably for real
                clients, under real conditions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I've interned at Icanio Tech School (AI development) and
                LifeChangers IND (full stack), and I'm currently building
                UZHAVAN AI — a Tamil-first agricultural intelligence platform.
                My focus is AI, backend infrastructure, and the intersection
                between them.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="border border-[var(--border)] rounded-xl p-6 bg-[var(--bg)]">
              <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-5">
                TECHNICAL IDENTITY
              </p>
              <div className="space-y-3">
                {traits.map((trait, i) => (
                  <div
                    key={trait}
                    className="flex items-center gap-3 group"
                  >
                    {i < traits.length - 1 && (
                      <>
                        <div className="h-8 flex items-center">
                          <span className="font-mono text-sm tracking-wide text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                            {trait}
                          </span>
                        </div>
                        <span className="font-mono text-[var(--border)] text-lg">+</span>
                      </>
                    )}
                    {i === traits.length - 1 && (
                      <span className="font-mono text-sm tracking-wide text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                        {trait}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)] space-y-2">
                {[
                  { label: "Education", value: "Karunya Institute · CS + AI" },
                  { label: "Location", value: "Tirunelveli, India" },
                  { label: "Status", value: "Available · 2026" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">{label}</span>
                    <span className="text-[var(--text)] font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
