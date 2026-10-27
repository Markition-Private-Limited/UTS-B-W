'use client';

import React from 'react';
import { UserCheck, Clock, ShieldCheck, MapPin, Briefcase, Navigation, CalendarCheck, Compass, Sparkles, Building2 } from 'lucide-react';
import { ServiceType } from '@/types/booking';

interface WhatsIncludedProps {
  serviceType: ServiceType;
}

export const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ serviceType }) => {
  const airportItems = [
    { title: 'Professional chauffeur service', icon: UserCheck },
    { title: 'Airport pickup coordination', icon: Clock },
    { title: 'Comfortable travel to and from the airport', icon: ShieldCheck },
    { title: 'All major London airports covered', icon: Navigation },
    { title: 'Luggage assistance at pickup and drop-off', icon: Briefcase },
    { title: 'Direct routing to your terminal or destination', icon: MapPin },
  ];

  const dayBookingItems = [
    { title: 'Dedicated chauffeur for the booked period', icon: UserCheck },
    { title: 'Flexible itinerary planning across London', icon: Compass },
    { title: 'Business and personal travel support', icon: Building2 },
    { title: 'Multiple-stop planning with wait-time', icon: CalendarCheck },
    { title: 'Professional door-to-door service', icon: MapPin },
    { title: 'Comfortable travel between appointments', icon: ShieldCheck },
  ];

  const hourlyItems = [
    { title: 'Private chauffeur for the booked period', icon: UserCheck },
    { title: 'Flexible journey planning on your schedule', icon: Clock },
    { title: 'Multiple-stop coordination and standby', icon: MapPin },
    { title: 'Executive travel convenience and privacy', icon: Sparkles },
    { title: 'Professional certified chauffeur standards', icon: ShieldCheck },
    { title: 'Comfortable luxury travel across London', icon: Navigation },
  ];

  const items =
    serviceType === 'airport-transfer'
      ? airportItems
      : serviceType === 'day-booking'
      ? dayBookingItems
      : hourlyItems;

  return (
    <section className="mb-14 border-t border-zinc-200/80 pt-10">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-8">What's Included</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700">
                <Icon className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-zinc-800 leading-snug pt-1">{item.title}</p>
            </div>
          );
        })}
      </div>
      {serviceType !== 'airport-transfer' && (
        <p className="text-[11px] text-zinc-500 mt-6 bg-zinc-50 p-3 rounded-lg border border-zinc-200/60">
          <strong>Please note:</strong> No specific unlimited mileage allowance is included in the base rates. Any applicable journey mileage boundaries outside Greater London must be confirmed directly with UTS.
        </p>
      )}
    </section>
  );
};
