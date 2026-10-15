"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    icon: "/icons/car-front.svg",
    step: "01",
    title: "Choose Your Car",
    desc: "Select a suitable vehicle for your journey.",
  },
  {
    icon: "/icons/map-pin.svg",
    step: "02",
    title: "Set Your Details",
    desc: "Enter your pickup location, destination, date, and preferred time.",
  },
  {
    icon: "/icons/clipboard-check.svg",
    step: "03",
    title: "Confirm Your Ride",
    desc: "Review your journey details before proceeding with your reservation.",
  },
  {
    icon: "/icons/route.svg",
    step: "04",
    title: "Enjoy the Journey",
    desc: "Travel comfortably with professional chauffeur service.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="features" className="w-full bg-white py-24 px-6 md:px-10">
      <div ref={ref} className="mx-auto" style={{ maxWidth: "1280px" }}>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-gray-400 font-semibold uppercase mb-5"
            style={{ fontSize: "0.68rem", letterSpacing: "0.3em" }}
          >
            A simple path to a better journey
          </p>
          <h2
            className="text-black font-extrabold uppercase mb-5"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.6rem)",
              lineHeight: "1.0",
              letterSpacing: "-0.03em",
            }}
          >
            Luxury, Made Effortless.
          </h2>
          <p className="text-gray-500 mx-auto" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", maxWidth: "520px", lineHeight: "1.7" }}>
            A straightforward booking experience designed to make premium travel feel simple.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-7 flex flex-col"
              style={{ backgroundColor: "#f0f0f0" }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeUp}
              transition={{
                duration: 0.55,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.15 + i * 0.1,
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <Image
                  src={s.icon}
                  alt={s.title}
                  width={28}
                  height={28}
                  className="opacity-70"
                />
              </div>

              {/* Step + title */}
              <p
                className="text-black font-bold uppercase mb-3"
                style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}
              >
                {s.step} — {s.title}
              </p>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed" style={{ fontSize: "0.9rem" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
        >
          <button
            className="inline-flex items-center gap-3 bg-black text-white font-semibold uppercase rounded-full transition-colors hover:bg-gray-900 active:bg-gray-800"
            style={{ fontSize: "0.68rem", letterSpacing: "0.2em", padding: "16px 32px" }}
          >
            Explore Our Fleet
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>↗</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
