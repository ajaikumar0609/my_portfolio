"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Experience {
  year: string;
  role: string;
  company: string;
  type: string;
  duration: string;
  description: string;
  logo: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    year: "2025",
    role: "AI / Development Intern",
    company: "Icanio Tech School",
    type: "Internship",
    duration: "2025",
    description:
      "Worked on AI development projects, building intelligent applications and exploring machine learning pipelines in a fast-paced startup environment.",
    logo: "/icanio.jpeg",
    skills: ["Python", "Machine Learning", "AI Development"],
  },
  {
    year: "2024",
    role: "Full Stack Development Intern",
    company: "LifeChangers IND",
    type: "Internship",
    duration: "2024",
    description:
      "Built full stack web applications using modern frameworks, implementing backend APIs and frontend interfaces for client-facing products.",
    logo: "/life_changers_ind.jpeg",
    skills: ["Full Stack", "Web APIs", "Frontend"],
  },
  {
    year: "2024",
    role: "Web Development Intern",
    company: "LifeChangers IND",
    type: "Internship",
    duration: "2024",
    description:
      "Developed responsive web interfaces and contributed to production web projects.",
    logo: "/life_changers_ind.jpeg",
    skills: ["HTML/CSS", "JavaScript", "Responsive Design"],
  },
  {
    year: "2023",
    role: "B.Tech Computer Science + AI",
    company: "Karunya Institute",
    type: "Education",
    duration: "2023 – Present",
    description:
      "Studying Computer Science with specialization in Artificial Intelligence. Focus on systems programming, machine learning, and software engineering.",
    logo: "/karunya.png",
    skills: ["Computer Science", "AI/ML", "Software Engineering"],
  },
];

export default function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-6 md:px-[7vw]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-3">
            EXPERIENCE
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-[var(--text)]">
            Where I&apos;ve worked and learned.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-[var(--border)] hidden sm:block" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  className="w-full text-left group"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  aria-expanded={expanded === i}
                >
                  <div className="flex items-start gap-4 sm:gap-8 py-5 border-b border-[var(--border)] hover:border-[var(--text)]/20 transition-colors duration-200">
                    {/* Year */}
                    <div className="w-10 shrink-0 text-right">
                      <span className="font-mono text-xs text-[var(--muted)] tracking-wide">
                        {exp.year}
                      </span>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative shrink-0 hidden sm:block">
                      <div
                        className={`w-2 h-2 rounded-full border transition-all duration-200 mt-2 ${
                          expanded === i
                            ? "bg-[var(--accent)] border-[var(--accent)]"
                            : "bg-white border-[var(--border)] group-hover:border-[var(--accent)]"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-[var(--muted)] mt-0.5">
                            {exp.company}{" "}
                            <span className="font-mono text-[0.625rem] tracking-widest uppercase ml-2 border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--muted)]">
                              {exp.type}
                            </span>
                          </p>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-[var(--muted)] shrink-0 mt-1 transition-transform duration-200 ${
                            expanded === i ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[4.5rem] pb-5 pt-3 flex gap-4">
                        <div className="shrink-0">
                          <div className="w-9 h-9 rounded-lg overflow-hidden border border-[var(--border)] bg-white">
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              width={36}
                              height={36}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="font-mono text-[0.5625rem] tracking-wide uppercase px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
