"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/#stack", label: "Stack" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100%-2rem)] max-w-4xl ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border border-[var(--border)] shadow-sm"
            : "bg-white/60 backdrop-blur-md border border-[var(--border)]/60"
        } rounded-full px-6 py-3`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-widest text-[var(--text)] uppercase"
          >
            AJAI
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Resume
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-light text-[var(--text)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-2xl font-light text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Resume <ArrowUpRight size={20} />
          </a>
        </div>
      )}
    </>
  );
}
