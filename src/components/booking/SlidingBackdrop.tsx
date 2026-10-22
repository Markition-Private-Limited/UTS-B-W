"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  { src: "/hero_img.png", alt: "Executive chauffeur service" },
  { src: "/hero_img_2.webp", alt: "Chauffeur in central London" },
  { src: "/hero_img_3.webp", alt: "Chauffeur loading luggage at the airport" },
];

export default function SlidingBackdrop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black" aria-hidden>
      {IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover object-top"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 2200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
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
  );
}
