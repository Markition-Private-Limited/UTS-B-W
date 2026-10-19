"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Day Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // "dark" = the content behind the navbar is dark, so nav text renders white.
  // "light" = the content behind is light, so nav text renders black.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const sampleTheme = () => {
      raf = 0;
      const headerEl = headerRef.current;
      if (!headerEl) return;

      const sampleY = headerEl.getBoundingClientRect().height / 2;
      const sampleX = window.innerWidth / 2;

      // Walk the full element stack at that point (z-order) and use the
      // first one that isn't the header itself — avoids mutating the
      // header's styles (which, combined with `transition-all`, would have
      // its visibility change deferred by the CSS transition instead of
      // applying immediately).
      const stack = document.elementsFromPoint(sampleX, sampleY);
      const behind = stack.find((el) => !headerEl.contains(el));

      const themed = behind?.closest<HTMLElement>("[data-navbar-theme]");
      const next = themed?.dataset.navbarTheme === "light" ? "light" : "dark";
      setTheme((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!raf) raf = requestAnimationFrame(sampleTheme);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      ref={headerRef}
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isDark
          ? scrolled
            ? "backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm"
            : "backdrop-blur-sm bg-white/5 border-b border-white/10"
          : scrolled
            ? "backdrop-blur-md bg-white/60 border-b border-black/10 shadow-sm"
            : "backdrop-blur-sm bg-white/30 border-b border-black/5",
      ].join(" ")}
    >
      <nav className="max-w-screen-xl mx-auto px-8 py-[5px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center leading-tight group">
          <Image
            src="/logo/UTS-logo.png"
            alt="United Travel Services"
            width={1072}
            height={328}
            className={`h-14 w-auto object-contain transition-[filter] duration-300 ${
              isDark ? "" : "invert"
            }`}
          />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`text-[11px] font-light tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isDark ? "text-white/85 hover:text-white" : "text-black/85 hover:text-black"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#booking"
          className={[
            "group relative overflow-hidden hidden md:inline-flex items-center gap-6 text-[10px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-full border-[1.5px] border-transparent transition-all duration-500",
            isDark
              ? "hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
              : "hover:border-black/30 hover:shadow-[0_0_16px_rgba(0,0,0,0.15)]",
          ].join(" ")}
          style={{
            background: isDark ? "#F9F9F9" : "#1a1a1a",
            color: isDark ? "#1a1a1a" : "#F9F9F9",
            minWidth: "262px",
            justifyContent: "center",
            transition: "background 500ms, color 500ms",
          }}
        >
          <PillButtonContent fill={isDark ? "black" : "white"}>Book Your Chauffeur</PillButtonContent>
        </a>

        {/* Mobile hamburger placeholder */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-3 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
        </button>
      </nav>
    </header>
  );
}
