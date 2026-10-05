"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Line {
  command?: string;
  output: string;
  delay: number;
}

const lines: Line[] = [
  { command: "whoami", output: "ajai@portfolio", delay: 300 },
  { command: "focus", output: "AI · backend · systems · data", delay: 900 },
  { command: "current", output: "uzhavan-ai · yamini-erp · kavya-fleet", delay: 1600 },
  { command: "status", output: "building...", delay: 2400 },
];

function useTypewriter(text: string, startDelay: number, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return displayed;
}

function TerminalLine({ line, index }: { line: Line; index: number }) {
  const [showOutput, setShowOutput] = useState(false);
  const cmdText = useTypewriter(line.command ?? "", line.delay, 60);
  const outText = useTypewriter(line.output, line.delay + (line.command?.length ?? 0) * 60 + 150);

  useEffect(() => {
    const t = setTimeout(
      () => setShowOutput(true),
      line.delay + (line.command?.length ?? 0) * 60 + 100
    );
    return () => clearTimeout(t);
  }, [line.delay, line.command]);

  return (
    <div className="mb-3">
      {line.command && (
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)]">$</span>
          <span className="text-[var(--text)]">{cmdText}</span>
          {cmdText.length < (line.command?.length ?? 0) && (
            <span className="w-px h-4 bg-[var(--text)] animate-blink inline-block" />
          )}
        </div>
      )}
      {showOutput && (
        <div className="text-[var(--muted)] pl-4">{outText}</div>
      )}
    </div>
  );
}

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          setKey((k) => k + 1);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <section className="py-24 px-6 md:px-[7vw]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-4">
              ENGINEERING
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-[var(--text)] mb-4">
              Built / Shipped / Tested
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-8 max-w-sm">
              Real systems for real clients. Not demo projects — production
              infrastructure that runs every day.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "247+", label: "Employees tracked" },
                { num: "3", label: "Major systems" },
                { num: "178+", label: "Tests written" },
                { num: "4+", label: "Yr project timeline" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="border border-[var(--border)] rounded-xl p-4 bg-white"
                >
                  <div className="font-mono text-2xl font-semibold text-[var(--text)] mb-1">
                    {num}
                  </div>
                  <div className="font-mono text-[0.625rem] tracking-wide uppercase text-[var(--muted)]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[var(--text)] rounded-xl overflow-hidden border border-[var(--border)]">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-[0.625rem] text-white/30 tracking-widest">
                  ajai@portfolio — terminal
                </span>
              </div>

              {/* Terminal body */}
              <div className="px-5 py-5 font-mono text-sm min-h-[16rem]" key={key}>
                {inView && lines.map((line, i) => (
                  <TerminalLine key={`${key}-${i}`} line={line} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
