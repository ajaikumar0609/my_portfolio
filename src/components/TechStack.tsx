"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechItem {
  name: string;
  usedIn: string[];
}

interface TechCategory {
  label: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    label: "LANGUAGES",
    items: [
      { name: "Python", usedIn: ["UZHAVAN AI", "Yamini ERP", "Dataset pipelines", "ML experiments"] },
      { name: "Java", usedIn: ["Backend services", "Spring Boot projects"] },
      { name: "JavaScript", usedIn: ["Web frontends", "API integrations"] },
    ],
  },
  {
    label: "BACKEND",
    items: [
      { name: "FastAPI", usedIn: ["Yamini ERP", "Kavya Transports"] },
      { name: "Spring Boot", usedIn: ["Java backend services"] },
      { name: "REST APIs", usedIn: ["All backend projects"] },
    ],
  },
  {
    label: "DATA",
    items: [
      { name: "PostgreSQL", usedIn: ["Yamini ERP", "Kavya Transports"] },
      { name: "MongoDB", usedIn: ["UZHAVAN AI", "Prototype apps"] },
      { name: "Pandas", usedIn: ["UZHAVAN AI", "Data analysis"] },
      { name: "NumPy", usedIn: ["ML experiments", "UZHAVAN AI"] },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "Machine Learning", usedIn: ["UZHAVAN AI", "Classification models"] },
      { name: "Computer Vision", usedIn: ["Disease detection", "Image analysis"] },
      { name: "NLP", usedIn: ["UZHAVAN AI", "Tamil language processing"] },
      { name: "LLM Applications", usedIn: ["AI assistants", "UZHAVAN AI"] },
    ],
  },
  {
    label: "CLOUD",
    items: [
      { name: "AWS", usedIn: ["Deployment", "Cloud infrastructure"] },
      { name: "Google Cloud", usedIn: ["UZHAVAN AI", "Vertex AI"] },
      { name: "Vertex AI", usedIn: ["UZHAVAN AI", "ML training"] },
    ],
  },
  {
    label: "MOBILE",
    items: [
      { name: "Flutter", usedIn: ["Yamini ERP mobile app", "Kavya Transports app"] },
      { name: "Android", usedIn: ["Yamini ERP", "Field staff app"] },
    ],
  },
];

function TechBadge({ item }: { item: TechItem }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="font-mono text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200 cursor-default"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-describedby={show ? `popover-${item.name}` : undefined}
      >
        {item.name}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            id={`popover-${item.name}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 z-30 w-44 bg-white border border-[var(--border)] rounded-lg p-3 shadow-lg pointer-events-none"
          >
            <p className="font-mono text-[0.5625rem] tracking-widest uppercase text-[var(--muted)] mb-1.5">
              Used in
            </p>
            <ul className="space-y-1">
              {item.usedIn.map((proj) => (
                <li key={proj} className="text-xs text-[var(--text)]">
                  {proj}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 md:px-[7vw] bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-3">
            TOOLS I WORK WITH
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-[var(--text)]">
            System inventory.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {techCategories.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 sm:gap-8 py-4 border-b border-[var(--border)] items-baseline"
            >
              <span className="font-mono text-[0.625rem] tracking-widest uppercase text-[var(--muted)] pt-0.5">
                {category.label}
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {category.items.map((item, j) => (
                  <span key={item.name}>
                    <TechBadge item={item} />
                    {j < category.items.length - 1 && (
                      <span className="text-[var(--border)] ml-5">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
