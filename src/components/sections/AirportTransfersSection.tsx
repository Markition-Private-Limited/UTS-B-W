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
          <div className="px-10 md:px-16 lg:px-24" style={{ maxWidth: "560px" }}>

            {/* Eyebrow */}
            <p
              className="text-gray-400 font-semibold uppercase mb-5"
              style={{ fontSize: "0.68rem", letterSpacing: "0.3em" }}
            >
              Arrive with a sense of calm
            </p>

            {/* Headline */}
            <h2
              className="text-white font-extrabold uppercase mb-5"
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 4rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.02em",
              }}
            >
              Airport<br />Transfers
            </h2>

            {/* Body copy */}
            <p
              className="text-gray-300 mb-8 leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.98rem)", maxWidth: "400px" }}
            >
              Enjoy a smoother airport journey with professional chauffeur service,
              comfortable vehicles, and coordinated pickup arrangements.
            </p>

            {/* CTA pill button */}
            <button
              className="inline-flex items-center gap-3 bg-white text-black font-semibold uppercase rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
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
