"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-[7vw] bg-white border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6"
        >
          CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text)] mb-10"
        >
          Have something worth building?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href="mailto:ajaikumar0609@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-dark)] transition-colors duration-200"
          >
            <Mail size={15} />
            Email me
            <ArrowRight size={15} />
          </a>
          <a
            href="https://linkedin.com/in/ajaikumarn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-full hover:border-[var(--text)] transition-colors duration-200"
          >
            <Linkedin size={15} />
            LinkedIn
            <ArrowUpRight size={15} />
          </a>
          <a
            href="https://github.com/ajaikumarN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border)] text-[var(--text)] text-sm font-medium rounded-full hover:border-[var(--text)] transition-colors duration-200"
          >
            <Github size={15} />
            GitHub
            <ArrowUpRight size={15} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-mono text-xs tracking-wide text-[var(--muted)]"
        >
          India · Available for internships / opportunities
        </motion.p>
      </div>
    </section>
  );
}
