"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useInView } from "@/hooks/useInView";
import PillButtonContent from "@/components/ui/PillButtonContent";

// All px values below are converted to vw against the 1920px Figma frame
// (vw = px / 1920 * 100) so the footer scales proportionally at any window
// width instead of only matching the design at exactly 1920px.

const quickLinks = [
  { label: "Home",          href: "#hero" },
  { label: "About Us",     href: "#about" },
  { label: "Our Services",  href: "#features" },
  { label: "Our Fleet",    href: "#fleet" },
  { label: "Contact Us",   href: "#contact" },
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
  const { ref, isInView } = useInView<HTMLElement>();
  const pathname = usePathname();
  const onHome = pathname === "/";
  // Off the homepage, hash links must point back to it (same pattern as Navbar).
  const resolveHref = (href: string) => (onHome || !href.startsWith("#") ? href : `/${href}`);

  return (
    <footer
      ref={ref}
      data-navbar-theme="dark"
      className={`bg-[#0d0d0d] text-[#E3E3E3] overflow-hidden leading-[1.7] tracking-normal transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
    >

      {/* ── Main Grid ── */}
      <div className="w-full max-w-[1920px] mx-auto pt-[4.6875vw] pr-[4.1667vw] pb-[1.25vw] pl-[4.1667vw]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_1.5fr_2fr] gap-[3.3333vw] pb-[2.5vw]">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/logo/UTS-logo.png"
              alt="United Travel Services"
              width={1072}
              height={328}
              className="h-[3.5vw] w-auto object-contain mb-[1.25vw]"
            />
            {/* Body: normal */}
            <p className="leading-[1.7] text-[#E3E3E3]/70" style={{ fontWeight: 400, fontSize: "0.8854vw" }}>
              United Travel Services provides professional chauffeur and private transportation
              services for business and leisure travel. With a focus on comfort, punctuality and
              customer care, we make every journey a more comfortable experience.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="leading-[1.4] mb-[1.25vw]" style={{ fontWeight: 400, fontSize: "0.9896vw" }}>
              Quick Links
            </h4>
            <ul className="space-y-[0.8333vw]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveHref(link.href)}
                    className="leading-[1.23] tracking-normal text-[#E3E3E3]/70 hover:text-white transition-colors duration-200"
                    style={{ fontWeight: 400, fontSize: "0.8854vw" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Chauffeur Services */}
          <div>
            <h4 className="leading-[1.4] mb-[1.25vw]" style={{ fontWeight: 400, fontSize: "0.9896vw" }}>
              Chauffeur Services
            </h4>
            <ul className="space-y-[0.8333vw]">
              {chauffeurServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveHref(link.href)}
                    className="leading-[1.23] tracking-normal text-[#E3E3E3]/70 hover:text-white transition-colors duration-200"
                    style={{ fontWeight: 400, fontSize: "0.8854vw" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Ways to Travel */}
          <div>
            <h4 className="leading-[1.4] mb-[1.25vw]" style={{ fontWeight: 400, fontSize: "0.9896vw" }}>
              Ways to Travel
            </h4>
            <ul className="space-y-[0.8333vw]">
              {waysToTravel.map((link) => (
                <li key={link.label}>
                  <a
                    href={resolveHref(link.href)}
                    className="leading-[1.23] tracking-normal text-[#E3E3E3]/70 hover:text-white transition-colors duration-200"
                    style={{ fontWeight: 400, fontSize: "0.8854vw" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Newsletter */}
          <div>
            <h4 className="leading-[1.4] mb-[1.25vw]" style={{ fontWeight: 400, fontSize: "0.9896vw" }}>
              Newsletter
            </h4>
            {/* Newsletter headline: slightly weighted */}
            <p
              className="leading-[1.25] tracking-[-0.02em] mb-[1.0417vw]"
              style={{ fontWeight: 500, fontSize: "1.5104vw" }}
            >
              A little inspiration for your next journey.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex items-center border border-white/30 rounded-full overflow-hidden mb-[0.625vw]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent placeholder-[#E3E3E3]/50 px-[1.0417vw] py-[0.625vw] outline-none min-w-0"
                style={{ fontWeight: 400, fontSize: "0.9375vw" }}
              />
              <button
                type="submit"
                className="group relative overflow-hidden flex items-center gap-[0.3125vw] bg-white text-black uppercase tracking-widest px-[1.0417vw] py-[0.625vw] rounded-full whitespace-nowrap border-[1.5px] border-transparent transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)] shrink-0"
                style={{ fontWeight: 700, fontSize: "0.7813vw" }}
              >
                <PillButtonContent fill="black">Subscribe</PillButtonContent>
              </button>
            </form>
            {/* Subtext: normal */}
            <p className="leading-[1.6] tracking-normal text-[#E3E3E3]/70" style={{ fontWeight: 400, fontSize: "0.9375vw" }}>
              Receive occasional travel inspiration and United Travel Services updates.
            </p>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-[#E3E3E3]/10" />

        {/* ── Contact + Social bar ── */}
        <div className="py-[1.25vw] flex flex-col md:flex-row justify-between gap-[1.25vw]">
          <div className="flex flex-col gap-[0.4167vw]">
            <p className="uppercase tracking-[0.2em]" style={{ fontWeight: 500, fontSize: "0.7292vw" }}>
              Contact · Editable Placeholders
            </p>
            <div className="flex flex-wrap gap-[1.25vw] text-[#E3E3E3]/70" style={{ fontWeight: 400, fontSize: "0.8333vw" }}>
              <span>Phone · To be confirmed</span>
              <span>Email · To be confirmed</span>
              <span>Address · To be confirmed</span>
            </div>
          </div>
          <div className="flex flex-col gap-[0.4167vw] md:text-right">
            <p className="uppercase tracking-[0.2em]" style={{ fontWeight: 500, fontSize: "0.7292vw" }}>
              Social
            </p>
            <p className="text-[#E3E3E3]/70" style={{ fontWeight: 400, fontSize: "0.8333vw" }}>Company profiles pending confirmation</p>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div className="pt-[1.0417vw] flex flex-col md:flex-row justify-between items-center gap-[0.625vw] text-[#E3E3E3]/70" style={{ fontWeight: 400, fontSize: "0.8333vw" }}>
          <p>© 2026 United Travel Services. All rights reserved.</p>
          <div className="flex gap-[1.25vw]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>

      </div>

      {/* ── Watermark ── */}
      {/* Padding matches the main grid (4.1667vw each side); with vw padding the
          content width stays a constant 91.667vw ratio at any viewport, so the
          font can use a flat vw value (134/1920) instead of a calc() hack. */}
      <div className="w-full px-[4.1667vw] pointer-events-none select-none" style={{ opacity: 0.14 }}>
        <p
          className="text-center uppercase whitespace-nowrap text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "6.9792vw",
            lineHeight: "1",
            letterSpacing: "-0.06em",
          }}
        >
          United Travel Services
        </p>
      </div>

    </footer>
  );
}
