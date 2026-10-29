"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PillButtonContent from "@/components/ui/PillButtonContent";
import BookingTabs, { type Tab } from "@/components/ui/BookingTabs";
import HeroBookingPanel from "@/components/booking/HeroBookingPanel";
import { useRouter } from "next/navigation";
import { DRAFT_KEY, type BookingDraft, type ServiceType } from "@/lib/booking";

const TAB_TO_SERVICE: Record<Tab, ServiceType> = {
  "Airport Transfer": "transfer",
  "Day Booking": "day",
  "Hourly Chauffeur": "hourly",
};

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
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [touched, setTouched] = useState(false);
  const [tab, setTab] = useState<Tab>("Airport Transfer");
  const router = useRouter();
  const [passengers, setPassengers] = useState(1);
  const [duration, setDuration] = useState(8);

  // A fresh visit/refresh of the home page always starts with a clean booking panel.
  useEffect(() => {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const updateField = (key: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const required: (keyof BookingForm)[] =
      tab === "Airport Transfer" ? ["pickup", "destination", "date", "time"] : ["pickup", "date", "time"];
    const missing = required.some((k) => !form[k].trim());
    if (missing) return; // required-field styling (below) shows what's missing
    // Hand the trip details to the booking form page, then clear the panel so
    // coming back to the home page shows an empty form.
    const draft: BookingDraft = {
      service: TAB_TO_SERVICE[tab],
      pickup: form.pickup,
      dropoff: tab === "Airport Transfer" ? form.destination : undefined,
      date: form.date,
      time: form.time,
      passengers,
      duration: tab === "Airport Transfer" ? undefined : duration,
    };
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable — the booking page just starts blank */
    }
    setForm(EMPTY_FORM);
    setTouched(false);
    setTab("Airport Transfer");
    setPassengers(1);
    setDuration(8);
    router.push("/book");
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

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
        style={{ paddingTop: "21vh" }}
      >
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-8 sm:w-12 bg-white/50" aria-hidden="true" />
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/70 whitespace-nowrap">
            Executive Chauffeur Services
          </p>
          <span className="h-px w-8 sm:w-12 bg-white/50" aria-hidden="true" />
        </div>

        <h1
          className="font-bold uppercase text-white mb-7"
          style={{
            fontSize: "clamp(1.5rem, 4.5833vw, 88px)",
            lineHeight: "1.04",
            letterSpacing: "-0.04em",
            maxWidth: "95vw",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          Travel London in Timeless Luxury.
        </h1>

        <p
          className="text-white/90 font-medium mb-10 max-w-3xl"
          style={{ fontSize: "clamp(0.75rem, 1.1vw, 17px)", lineHeight: "1.6" }}
        >
          Travel across London in comfort and style with our professional chauffeur service. From
          airport transfers to special occasions, we deliver a seamless, reliable and luxurious
          travel experience tailored to your needs.
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
        {/* Small service-type tabs card */}
        <div className="mx-auto mb-3 flex justify-center" style={{ maxWidth: "91.6667vw" }}>
          <BookingTabs
            value={tab}
            onChange={(t) => {
              setTab(t);
              setDuration(t === "Day Booking" ? 8 : 4);
              setTouched(false);
            }}
          />
        </div>

        <div className="mx-auto" style={{ maxWidth: "78vw" }}>
          <HeroBookingPanel
            tab={tab}
            duration={duration}
            onDuration={(n) => setDuration(n)}
            form={form}
            onField={updateField}
            onValue={(k, v) => setForm((f) => ({ ...f, [k]: v }))}
            passengers={passengers}
            onPassengers={setPassengers}
            touched={touched}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
