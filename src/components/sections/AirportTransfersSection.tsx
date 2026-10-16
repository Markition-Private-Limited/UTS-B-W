"use client";

import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import PillButtonContent from "@/components/ui/PillButtonContent";

const CARDS = [
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Airport Transfers",
    desc: "Enjoy a smoother airport journey with professional chauffeur service, comfortable vehicles, and coordinated pickup arrangements.",
    cta: "Explore Airport Transfers",
    image: "/airport-transfers.jpg",
  },
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Corporate Chauffeur",
    desc: "Make every business journey count with discreet, professional chauffeur services designed around your schedule, meetings and business commitments.",
    cta: "Explore Service",
    image: "/corporate-chauffeur.webp",
  },
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Intercity Travel",
    desc: "Travel between cities without the hassle of driving, parking or navigating unfamiliar routes. Sit back and enjoy a comfortable journey from door to door.",
    cta: "Explore Service",
    image: "/intercity-travel.webp",
  },
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Special Events and Private Travel",
    desc: "Arrive in style for celebrations, important occasions and private engagements with a chauffeur service tailored to your plans.",
    cta: "Explore Service",
    image: "/special-events-private-travel.webp",
  },
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Cruise and Seaport Transfers",
    desc: "Travel to your cruise terminal in comfort with a private chauffeur service that takes the stress out of getting to your departure point.",
    cta: "Explore Service",
    image: "/cruise-seaport-transfers.webp",
  },
  {
    eyebrow: "Arrive with a sense of calm",
    title: "Sightseeing Chauffeur",
    desc: "Discover the city's famous landmarks and the surrounding areas at your own pace, with the comfort of a private vehicle and a professional driver.",
    cta: "Explore Service",
    image: "/sightseeing-chauffeur.webp",
  },
];

export default function AirportTransfersSection() {
  return (
    <section data-navbar-theme="light" className="w-full bg-white px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
      <ScrollStack
        useWindowScroll
        itemDistance={120}
        itemStackDistance={6}
        stackPosition="100px"
        itemScale={0.035}
        baseScale={0.8}
        dimAmount={0.45}
        blurAmount={1.2}
        rotationAmount={0}
        tiltAmount={0}
        holdDistance={200}
      >
        {CARDS.map((card, i) => (
          <ScrollStackItem
            key={i}
            style={{
              height: "clamp(500px, 75vh, 860px)",
              padding: 0,
              borderRadius: "1.5rem",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <div data-navbar-theme="dark" className="relative w-full h-full">
              {/* Background image */}
              <Image
                src={card.image}
                alt="Luxury chauffeur service at airport"
                fill
                className="object-cover object-center"
                priority={i === 0}
              />

              {/* Left-to-right gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.90) 32%, rgba(8,8,8,0.55) 58%, rgba(8,8,8,0.06) 100%)",
                }}
              />

              {/* Text — absolutely centred vertically on the left */}
              <div className="absolute inset-0 flex items-center">
                <div
                  className="flex flex-col justify-center pl-6 pr-10 md:pl-10 md:pr-16 lg:pl-12 lg:pr-20"
                  style={{ width: "740px", maxWidth: "740px", gap: "32px" }}
                >

                  <div>
                    {/* Eyebrow */}
                    <p
                      className="text-gray-400 font-semibold uppercase mb-5"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.3em" }}
                    >
                      {card.eyebrow}
                    </p>

                    {/* Headline */}
                    <h2
                      className="text-white font-bold uppercase"
                      style={{
                        fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
                        lineHeight: "1.06",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {card.title}
                    </h2>
                  </div>

                  {/* Body copy */}
                  <p
                    className="text-gray-300 leading-relaxed"
                    style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.98rem)", maxWidth: "400px" }}
                  >
                    {card.desc}
                  </p>

                  {/* CTA pill button */}
                  <button
                    className="group relative overflow-hidden inline-flex items-center gap-3 bg-white text-black font-semibold uppercase rounded-full border-[1.5px] border-transparent transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_16px_rgba(255,255,255,0.25)] active:bg-gray-200 w-fit"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.2em", padding: "14px 28px" }}
                  >
                    <PillButtonContent fill="black">{card.cta}</PillButtonContent>
                  </button>

                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
