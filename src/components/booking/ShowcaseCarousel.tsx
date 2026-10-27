'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Vehicle, ServiceType } from '@/types/booking';

interface ShowcaseCarouselProps {
  serviceType: ServiceType;
  selectedVehicle: Vehicle;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ serviceType, selectedVehicle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesByService: Record<ServiceType, Array<{ image: string; caption: string; subtext: string }>> = {
    'airport-transfer': [
      {
        image: '/booking/images/uts_airport_hero_v3.webp',
        caption: 'A composed, private journey from door to terminal.',
        subtext: `Refined executive travel for every airport journey. ${selectedVehicle.name} provides a composed, private environment with a professional chauffeur and full luggage assistance across London airports.`,
      },
      {
        image: selectedVehicle.image,
        caption: `Exemplary ${selectedVehicle.name} craftsmanship and comfort.`,
        subtext: `Every ${selectedVehicle.modelExample} in the UTS fleet is meticulously sanitised, climate-regulated, and inspected before pickup.`,
      },
    ],
    'day-booking': [
      {
        image: '/booking/images/uts_city_day_hero_1793099459902.jpg',
        caption: "Effortless corporate mobility through London's financial heart.",
        subtext: `Your dedicated executive chauffeur is on standby throughout your day in Mayfair, Canary Wharf, or the City. Step out between meetings with zero parking or transit friction.`,
      },
      {
        image: selectedVehicle.image,
        caption: `Mobile sanctuary for your full working day.`,
        subtext: `Conduct conference calls, review documents, or relax between appointments in the private cabin of your ${selectedVehicle.modelExample}.`,
      },
    ],
    'hourly-chauffeur': [
      {
        image: '/booking/images/uts_hourly_hero_1793099460597.jpg',
        caption: 'Bespoke chauffeur travel, precisely on your personal schedule.',
        subtext: `From private boutique shopping on Bond Street to fine dining in Mayfair, experience seamless hourly chauffeur freedom with wait-and-return flexibility.`,
      },
      {
        image: selectedVehicle.image,
        caption: `Flawless presentation and quiet elegance.`,
        subtext: `Your personal chauffeur ensures punctuality, discretion, and courteous British hospitality for every stop on your itinerary.`,
      },
    ],
  };

  const slides = slidesByService[serviceType];
  const activeSlide = slides[currentSlide % slides.length];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="mb-14">
      <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 shadow-md group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activeSlide.image} alt={activeSlide.caption} className="w-full h-full object-cover transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute top-4 right-5 text-white/70 font-black tracking-widest text-sm uppercase">UTS</div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-900 flex items-center justify-center transition-all shadow-md opacity-90 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-900 flex items-center justify-center transition-all shadow-md opacity-90 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-7">
          <p className="text-white font-medium text-base sm:text-xl lg:text-2xl tracking-tight drop-shadow-sm max-w-2xl">
            {activeSlide.caption}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide % slides.length ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-3xl">
        <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">{activeSlide.subtext}</p>
      </div>
    </section>
  );
};
