"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Day Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm"
          : "backdrop-blur-sm bg-white/5 border-b border-white/10",
      ].join(" ")}
    >
      <nav className="max-w-screen-xl mx-auto px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span
            className="text-[10px] font-semibold tracking-[0.25em] text-white/80 uppercase"
            style={{ letterSpacing: "0.28em" }}
          >
            United Travel Services
          </span>
          <span
            className="text-[8px] font-light tracking-[0.22em] text-white/50 uppercase"
            style={{ letterSpacing: "0.25em" }}
          >
            The Art of a Better Journey
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-[11px] font-light tracking-[0.12em] text-white/60 uppercase hover:text-white/90 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#booking"
          className="hidden md:inline-flex items-center gap-6 text-[10px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full transition-opacity duration-200 hover:opacity-80"
          style={{ background: "#F9F9F9", color: "#1a1a1a", minWidth: "262px", justifyContent: "center" }}
        >
          Book Your Chauffeur
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>

        {/* Mobile hamburger placeholder */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="block w-5 h-px bg-white/60" />
          <span className="block w-5 h-px bg-white/60" />
          <span className="block w-3 h-px bg-white/60" />
        </button>
      </nav>
    </header>
  );
}
