'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, PlaneTakeoff, Sun, Clock, ChevronDown, ChevronLeft } from 'lucide-react';
import { ServiceType } from '@/types/booking';

interface BookingHeaderProps {
  currentService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  pickupSummary: string;
  destinationSummary?: string;
  dateTimeSummary: string;
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  'airport-transfer': 'AIRPORT TRANSFER',
  'day-booking': 'DAY BOOKING',
  'hourly-chauffeur': 'HOURLY CHAUFFEUR',
};

const SERVICE_ICONS = {
  'airport-transfer': PlaneTakeoff,
  'day-booking': Sun,
  'hourly-chauffeur': Clock,
} as const;

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentService,
  onServiceChange,
  pickupSummary,
  destinationSummary,
  dateTimeSummary,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = { icon: SERVICE_ICONS[currentService] };
  const others = (['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).filter((st) => st !== currentService);

  return (
    <header className="sticky top-0 z-50 bg-[#0e0f12] text-white border-b border-[#22242a] shadow-md">
      {/* Single row: logo (left) | centered cluster | Menu (right) */}
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 h-[64px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">

        {/* Logo — same as the homepage navbar */}
        <div className="flex items-center gap-1 justify-self-start">
        <a
          href="/"
          aria-label="Back to homepage"
          className="flex h-7 w-5 shrink-0 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </a>
        <a href="/" className="flex items-center shrink-0 group">
          <Image
            src="/logo/UTS-logo.png"
            alt="United Travel Services"
            width={1072}
            height={328}
            className="h-14 w-auto object-contain"
            priority
          />
        </a>
        </div>

        {/* Centered cluster: pill | route | datetime */}
        <div className="contents">
          {/* Service badge — hover dropdown with the other two services */}
          <div
            className="flex h-full shrink-0 items-center justify-self-center self-stretch leading-none"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 leading-none hover:bg-white/10 text-white text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-2 rounded-full transition-colors"
            >
              <active.icon className="hidden h-3.5 w-3.5 text-zinc-400 sm:inline" />
              {SERVICE_LABELS[currentService]}
              <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Expands straight out of the bar: same surface, no gap, no separate box */}
            <div
              role="menu"
              className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 overflow-hidden rounded-b-2xl bg-gradient-to-b from-[#0e0f12]/85 via-[#0e0f12]/65 to-black/50 backdrop-blur-lg transition-[max-height,opacity] duration-300 ease-out ${
                dropdownOpen ? 'max-h-40 opacity-100' : 'pointer-events-none max-h-0 opacity-0'
              }`}
            >
              <div className="p-1.5">
                {others.map((st) => {
                  const Icon = SERVICE_ICONS[st];
                  return (
                    <button
                      key={st}
                      type="button"
                      role="menuitem"
                      onClick={() => { onServiceChange(st); setDropdownOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/80 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {SERVICE_LABELS[st]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 max-w-full items-center gap-4 justify-self-end overflow-hidden whitespace-nowrap">
          {/* Divider */}
          <span className="text-zinc-700 text-base leading-none font-thin select-none hidden md:block">|</span>

          {/* Route */}
          <div className="hidden md:flex items-center gap-2 leading-none text-[13px] text-zinc-300 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate leading-none">
              <span className="text-white font-medium">{pickupSummary}</span>
              {destinationSummary && (
                <>
                  <span className="text-zinc-600 mx-1.5">→</span>
                  <span className="text-zinc-300">{destinationSummary}</span>
                </>
              )}
            </span>
          </div>

          {/* Divider */}
          <span className="text-zinc-700 text-base leading-none font-thin select-none hidden lg:block">|</span>

          {/* Date / time */}
          <span className="hidden lg:flex items-center leading-none text-[13px] text-zinc-300 whitespace-nowrap shrink-0">
            {dateTimeSummary}
          </span>
          </div>
        </div>
      </div>

    </header>
  );
};
