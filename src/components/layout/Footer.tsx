"use client";

import { useState } from "react";

const quickLinks = [
  { label: "Home",         href: "#hero" },
  { label: "About Us",    href: "#about" },
  { label: "Our Services", href: "#features" },
  { label: "Our Fleet",   href: "#fleet" },
  { label: "Contact Us",  href: "#contact" },
];

const chauffeurServices = [
  { label: "Airport Transfers",   href: "#airport-transfers" },
  { label: "Executive Chauffeur", href: "#fleet" },
  { label: "Business Travel",     href: "#fleet" },
  { label: "Private Chauffeur",   href: "#fleet" },
];

const waysToTravel = [
  { label: "City to City",     href: "#fleet" },
  { label: "Hourly Chauffeur", href: "#fleet" },
  { label: "City Trip",        href: "#fleet" },
  { label: "Day Service",      href: "#fleet" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#0d0d0d] text-white overflow-hidden">

      {/* ── Main Grid ── */}
      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_1.5fr_2fr] gap-10 pb-12">

          {/* Col 1 — Brand */}
          <div>
            <h2 className="text-2xl font-black uppercase leading-tight mb-5 tracking-tight">
              United Travel<br />Services
            </h2>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              United Travel Services provides professional chauffeur and private transportation
              services for business and leisure travel. With a focus on comfort, punctuality and
              customer care, we make every journey a more comfortable experience.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Chauffeur Services */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
              Chauffeur Services
            </h4>
            <ul className="space-y-3">
              {chauffeurServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Ways to Travel */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
              Ways to Travel
            </h4>
            <ul className="space-y-3">
              {waysToTravel.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Newsletter */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-5">
              Newsletter
            </h4>
            <p className="text-[22px] font-bold leading-snug mb-5">
              A little inspiration for your next journey.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex items-center border border-white/30 rounded-full overflow-hidden mb-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 px-5 py-3 outline-none min-w-0"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest px-5 py-3 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors shrink-0"
              >
                Subscribe
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Receive occasional travel inspiration and United Travel Services updates.
            </p>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10" />

        {/* ── Contact + Social bar ── */}
        <div className="py-6 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Contact · Editable Placeholders
            </p>
            <div className="flex flex-wrap gap-6 text-[12px] text-gray-400">
              <span>Phone · To be confirmed</span>
              <span>Email · To be confirmed</span>
              <span>Address · To be confirmed</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Social
            </p>
            <p className="text-[12px] text-gray-400">Company profiles pending confirmation</p>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10" />

        {/* ── Copyright bar ── */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] text-gray-500">
          <p>© 2026 United Travel Services. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>

      </div>

      {/* ── Watermark ── */}
      <div className="w-full overflow-hidden pointer-events-none select-none">
        <p
          className="text-center font-black uppercase whitespace-nowrap text-white/[0.04] leading-none"
          style={{ fontSize: "clamp(60px, 12vw, 180px)" }}
        >
          United Travel Services
        </p>
      </div>

    </footer>
  );
}
