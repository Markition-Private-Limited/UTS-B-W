"use client";

import Image from "next/image";

export default function AirportTransfersSection() {
  return (
    <section className="w-full bg-white px-6 md:px-10 py-6">

      {/* Dark card — fixed banner height, not full viewport */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ height: "clamp(500px, 75vh, 860px)" }}
      >

        {/* Background image */}
        <Image
          src="/airport-transfers.jpg"
          alt="Luxury chauffeur service at airport"
          fill
          className="object-cover object-center"
          priority
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
            style={{ width: "740px", maxWidth: "740px", height: "288px", gap: "32px" }}
          >

            <div>
              {/* Eyebrow */}
              <p
                className="text-gray-400 font-semibold uppercase mb-5"
                style={{ fontSize: "0.68rem", letterSpacing: "0.3em" }}
              >
                Arrive with a sense of calm
              </p>

              {/* Headline */}
              <h2
                className="text-white font-bold uppercase whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
                  lineHeight: "1.06",
                  letterSpacing: "-0.04em",
                }}
              >
                Airport Transfers
              </h2>
            </div>

            {/* Body copy */}
            <p
              className="text-gray-300 leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.98rem)", maxWidth: "400px" }}
            >
              Enjoy a smoother airport journey with professional chauffeur service,
              comfortable vehicles, and coordinated pickup arrangements.
            </p>

            {/* CTA pill button */}
            <button
              className="inline-flex items-center gap-3 bg-white text-black font-semibold uppercase rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200 w-fit"
              style={{ fontSize: "0.68rem", letterSpacing: "0.2em", padding: "14px 28px" }}
            >
              Explore Airport Transfers
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>↗</span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
