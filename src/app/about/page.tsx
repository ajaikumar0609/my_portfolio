import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About — Ajai Kumar",
  description:
    "Ajai Kumar N — Computer Science and AI student, builder of backend systems and intelligent applications.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0 px-6 md:px-[7vw]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_320px] gap-16 mb-24">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-widest uppercase text-[var(--muted)] mb-6">
                ABOUT
              </p>

              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--text)] mb-8">
                I like building things that have to work outside the demo.
              </h1>

              <div className="space-y-5 text-[var(--muted)] leading-relaxed max-w-xl">
                <p>
                  I&apos;m a Computer Science and AI student at Karunya Institute
                  of Technology and Sciences, studying how to build systems
                  that actually work — not just pass tests in development
                  environments.
                </p>
                <p>
                  My biggest project so far has been building a production ERP
                  system for Yamini Infotech — a platform handling real-time
                  GPS tracking for 247+ field employees, automated attendance
                  with geofencing, and centralized operational dashboards. It
                  runs every day for real people. That&apos;s the kind of
                  engineering I care about.
                </p>
                <p>
                  I&apos;ve interned at Icanio Tech School working on AI
                  development, and at LifeChangers IND on full stack
                  engineering. I&apos;m currently building UZHAVAN AI — a
                  Tamil-first agricultural intelligence platform that combines
                  ML, computer vision, and domain knowledge to help farmers
                  make better decisions.
                </p>
                <p>
                  My focus is on the space where AI and backend systems meet:
                  building intelligent applications that are actually deployed,
                  that handle real data from real users, and that still work
                  when something goes wrong.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-[var(--border)]">
                  <Image
                    src="/mypic.png"
                    alt="Ajai Kumar N"
                    width={320}
                    height={400}
                    className="w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-[var(--border)] rounded-xl px-4 py-3">
                  <p className="font-semibold text-sm text-[var(--text)]">
                    Ajai Kumar N
                  </p>
                  <p className="font-mono text-[0.625rem] tracking-widest uppercase text-[var(--accent)] mt-0.5">
                    AI Engineer · Backend Builder
                  </p>
                </div>
              </div>

              <div className="border border-[var(--border)] bg-white rounded-xl p-5 space-y-3">
                {[
                  { label: "Education", value: "Karunya Institute" },
                  { label: "Degree", value: "B.Tech CS + AI" },
                  { label: "Location", value: "Tirunelveli, India" },
                  { label: "Status", value: "Available · 2026" },
                  { label: "Email", value: "ajaikumar0609@gmail.com" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between text-sm border-b border-[var(--border)] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[var(--muted)]">{label}</span>
                    <span className="text-[var(--text)] font-medium text-right max-w-[60%] break-all">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
    </>
  );
}
