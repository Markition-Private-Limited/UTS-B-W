'use client';

import React from 'react';
import { Vehicle, ServiceType } from '@/types/booking';

interface ShowcaseCarouselProps {
  serviceType: ServiceType;
  selectedVehicle: Vehicle;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ serviceType, selectedVehicle }) => {
  const slidesByService: Record<ServiceType, Array<{ image: string; caption: string; subtext: string }>> = {
    'airport-transfer': [
      {
        image: '/booking/images/uts_airport_hero_v3.webp',
        caption: 'A composed, private journey from door to terminal.',
        subtext: `Refined executive travel for every airport journey. ${selectedVehicle.name} provides a composed, private environment with a professional chauffeur and full luggage assistance across London airports.`,
      },
      {
        image: selectedVehicle.image2,
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
        image: selectedVehicle.image2,
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
        image: selectedVehicle.image2,
        caption: `Flawless presentation and quiet elegance.`,
        subtext: `Your personal chauffeur ensures punctuality, discretion, and courteous British hospitality for every stop on your itinerary.`,
      },
    ],
  };

  // Only the selected vehicle's own photo is shown.
  const activeSlide = slidesByService[serviceType][1];

  return (
    <section className="mb-14">
      <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 shadow-md group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activeSlide.image} alt={activeSlide.caption} className="w-full h-full object-cover transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute top-4 right-5 text-white/70 font-black tracking-widest text-sm uppercase">UTS</div>

        <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-7">
          <p className="text-white font-medium text-base sm:text-xl lg:text-2xl tracking-tight drop-shadow-sm max-w-2xl">
            {activeSlide.caption}
          </p>
        </div>
      </div>
      <div className="mt-5 max-w-3xl">
        <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">{activeSlide.subtext}</p>
      </div>
    </section>
  );
};
