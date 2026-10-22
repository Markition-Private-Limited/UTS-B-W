"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";
import BookingTabs from "@/components/ui/BookingTabs";

const HERO_IMAGES = [
  { src: "/hero_img.png", alt: "Executive chauffeur service" },
  { src: "/hero_img_2.webp", alt: "Chauffeur in central London" },
  { src: "/hero_img_3.webp", alt: "Chauffeur loading luggage at the airport" },
];

const SLIDE_MS = 4000;

type BookingForm = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
};

const EMPTY_FORM: BookingForm = { pickup: "", destination: "", date: "", time: "" };

export default function HeroSection() {
  const imgDivRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelTilt, setPanelTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  const updateField = (key: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const missing = Object.values(form).some((v) => !v.trim());
    if (missing) return; // required-field styling (below) shows what's missing
    // No live booking backend on this marketing site yet — take the user to
    // the fleet so they can pick a vehicle for the trip they just described.
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const handlePanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const maxTilt = 4;
    const ry = (px - 0.5) * 2 * maxTilt;
    const rx = (0.5 - py) * 2 * maxTilt;
    setPanelTilt({ rx, ry, mx: px * 100, my: py * 100 });
  };

  const handlePanelMouseLeave = () => {
    setPanelTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  useEffect(() => {
    const applyClip = () => {
      const el = imgDivRef.current;
      if (!el) return;
      const W = el.offsetWidth;
      const H = el.offsetHeight;
      const d = [`M 0,0`, `L ${W},0`, `L ${W},${H}`, `L 0,${H}`, `Z`].join(" ");
      el.style.clipPath = `path('${d}')`;
    };

    applyClip();
    window.addEventListener("resize", applyClip);
    return () => window.removeEventListener("resize", applyClip);
  }, []);

  return (
    <section
      id="hero"
      data-navbar-theme="dark"
      className="relative w-full bg-white flex flex-col overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Hero photo */}
      <div ref={imgDivRef} className="absolute inset-0 z-0 bg-black">
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover object-top"
            style={{
              opacity: i === activeImage ? 1 : 0,
              transition: "opacity 2200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            sizes="100vw"
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* Hero text content */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center text-white px-6"
        style={{ paddingTop: "14vh" }}
      >
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/70 mb-8">
          Executive Chauffeur Services
        </p>

        <h1
          className="font-bold uppercase text-white mb-7"
          style={{
            fontSize: "clamp(1.75rem, 4.5833vw, 88px)",
            lineHeight: "1.04",
            letterSpacing: "-0.04em",
            maxWidth: "83.3333vw",
            textAlign: "center",
          }}
        >
          Your Journey Deserves<br />More Than a Ride.
        </h1>

        <p
          className="text-white/90 font-medium mb-10 whitespace-nowrap"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 17px)", lineHeight: "1.5" }}
        >
          Premium Chauffeur Services for Business, Airport Transfers &amp; Luxury Travel.
        </p>

        <a
          href="#fleet"
          className="group inline-flex items-center gap-[0.4em] text-[11px] font-medium tracking-[0.2em] uppercase text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors duration-200"
        >
          Explore Our Fleet
          <svg
            width="9"
            height="9"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Booking area */}
      <div className="relative z-10 w-full px-4 md:px-10 pb-8 mt-auto flex-shrink-0">
        {/* "PLAN YOUR NEXT JOURNEY" label */}
        <div className="mx-auto mb-3" style={{ maxWidth: "91.6667vw", paddingLeft: "1.4583vw" }}>
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60">
            Plan Your Next Journey
          </span>
        </div>

        {/* Small service-type tabs card */}
        <div className="mx-auto mb-3 flex justify-center" style={{ maxWidth: "91.6667vw" }}>
          <BookingTabs />
        </div>

        {/* Main booking bar */}
        <div
          ref={panelRef}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          className="relative mx-auto flex flex-col md:flex-row items-start md:items-center gap-[1.1458vw] overflow-hidden"
          style={{
            maxWidth: "91.6667vw",
            minHeight: "5.2083vw",
            borderRadius: "1.25vw",
            padding: "0.9375vw 1.4583vw",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 40px rgba(255,255,255,0.05)",
            transform: `perspective(1000px) rotateX(${panelTilt.rx}deg) rotateY(${panelTilt.ry}deg)`,
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle 280px at ${panelTilt.mx}% ${panelTilt.my}%, rgba(255,255,255,0.18), transparent 70%)`,
              transition: "background 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Fields row */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full flex flex-col md:flex-row md:items-center md:divide-x divide-white/20 gap-4 md:gap-0"
            style={{
              transform: `translate3d(${panelTilt.ry * 0.8}px, ${-panelTilt.rx * 0.8}px, 0)`,
              transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <BookingField
              label="Pickup Location"
              placeholder="Enter pickup location"
              value={form.pickup}
              onChange={updateField("pickup")}
              showError={touched && !form.pickup.trim()}
              className="md:pl-0 md:pr-8"
            />
            <BookingField
              label="Destination"
              placeholder="Where would you like to go?"
              value={form.destination}
              onChange={updateField("destination")}
              showError={touched && !form.destination.trim()}
              className="md:px-8"
            />
            <BookingField
              label="Pickup Date"
              type="date"
              value={form.date}
              onChange={updateField("date")}
              showError={touched && !form.date.trim()}
              className="md:px-8"
            />
            <BookingField
              label="Pickup Time"
              type="time"
              value={form.time}
              onChange={updateField("time")}
              showError={touched && !form.time.trim()}
              className="md:px-8"
            />

            {/* Find Your Ride CTA */}
            <div className="md:pl-6 flex-shrink-0">
              <button
                type="submit"
                className="group relative overflow-hidden inline-flex items-center gap-2 text-black text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-4 rounded-full whitespace-nowrap border-[1.5px] border-transparent transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
                style={{ background: "#ffffff", minWidth: "168px" }}
              >
                <PillButtonContent fill="black">Find Your Ride</PillButtonContent>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function BookingField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  showError = false,
  className = "",
}: {
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "time";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col flex-1 min-w-0 ${className}`}>
      <span
        className={`text-[10px] font-semibold tracking-wide mb-0.5 ${
          showError ? "text-red-400" : "text-white/60"
        }`}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ colorScheme: "dark" }}
        className="w-full bg-transparent text-[13px] font-medium text-white placeholder:text-white/40 truncate outline-none"
      />
    </div>
  );
}
