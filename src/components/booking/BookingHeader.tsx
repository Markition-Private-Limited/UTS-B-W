'use client';

import React, { useState } from 'react';
import { MapPin, Menu, X, Check } from 'lucide-react';
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

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentService,
  onServiceChange,
  pickupSummary,
  destinationSummary,
  dateTimeSummary,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0e0f12] text-white border-b border-[#22242a] shadow-md">
      {/* Single row */}
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 h-[64px] flex items-center gap-5">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
        </a>

        {/* Divider */}
        <span className="text-zinc-700 text-lg font-thin select-none hidden sm:block">|</span>

        {/* Service badge — clickable dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-1.5 border border-white/30 hover:border-white/60 text-white text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-colors"
          >
            {SERVICE_LABELS[currentService]}
          </button>

          {dropdownOpen && (
            <div
              className="absolute left-0 top-full mt-2 w-56 bg-[#14161d] border border-zinc-700 rounded-xl shadow-2xl py-1.5 z-50"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {(['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).map((st) => (
                <button
                  key={st}
                  onClick={() => { onServiceChange(st); setDropdownOpen(false); }}
                  className={`w-full px-4 py-2.5 text-xs flex items-center justify-between text-left transition-colors ${
                    currentService === st
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="tracking-wide uppercase text-[11px]">{SERVICE_LABELS[st]}</span>
                  {currentService === st && <Check className="w-3.5 h-3.5 text-white/70" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <span className="text-zinc-700 text-lg font-thin select-none hidden md:block">|</span>

        {/* Route */}
        <div className="hidden md:flex items-center gap-2 text-[13px] text-zinc-300 min-w-0 flex-1">
          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span className="truncate">
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
        <span className="text-zinc-700 text-lg font-thin select-none hidden lg:block">|</span>

        {/* Date / time */}
        <span className="hidden lg:block text-[13px] text-zinc-300 whitespace-nowrap shrink-0">
          {dateTimeSummary}
        </span>

        {/* Spacer */}
        <div className="flex-1 md:hidden" />

        {/* Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-[13px] text-zinc-300 hover:text-white transition-colors shrink-0 ml-auto"
          aria-label="Navigation menu"
        >
          <span className="font-medium">Menu</span>
          {menuOpen ? <X className="w-4 h-4" /> : (
            <svg viewBox="0 0 20 14" className="w-4 h-[11px] fill-current">
              <rect y="0" width="20" height="2" rx="1"/>
              <rect y="6" width="20" height="2" rx="1"/>
              <rect y="12" width="20" height="2" rx="1"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      {menuOpen && (
        <div className="bg-[#121318] border-t border-zinc-800 px-5 py-5">
          <div className="mb-4 text-xs text-zinc-400">
            <p className="font-semibold text-white text-sm mb-1">{pickupSummary}{destinationSummary ? ` → ${destinationSummary}` : ''}</p>
            <p>{dateTimeSummary}</p>
          </div>
          <div className="border-t border-zinc-800 pt-4 space-y-1">
            {(['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).map((st) => (
              <button
                key={st}
                onClick={() => { onServiceChange(st); setMenuOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold transition-colors ${
                  currentService === st
                    ? 'bg-white text-zinc-950'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {SERVICE_LABELS[st]}
              </button>
            ))}
          </div>
          <div className="border-t border-zinc-800 mt-4 pt-4">
            <a href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">← Back to main site</a>
          </div>
        </div>
      )}
    </header>
  );
};
