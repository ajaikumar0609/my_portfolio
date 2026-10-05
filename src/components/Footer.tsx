import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-[7vw] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-widest text-[var(--text)] uppercase"
        >
          AJAI KUMAR
        </Link>

        <p className="font-mono text-[0.625rem] tracking-widest uppercase text-[var(--muted)]">
          AI · BACKEND · SYSTEMS
        </p>

        <div className="flex items-center gap-6">
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
          <a
            href="mailto:ajaikumar0609@gmail.com"
            className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="font-mono text-[0.5625rem] tracking-widest uppercase text-[var(--border)]">
          © 2026 Ajai Kumar
        </p>
      </div>
    </footer>
  );
}
