'use client';

import React, { useState } from 'react';
import { MapPin, Menu, X, ChevronDown, Check } from 'lucide-react';
import { ServiceType } from '@/types/booking';

interface BookingHeaderProps {
  currentService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  pickupSummary: string;
  destinationSummary?: string;
  dateTimeSummary: string;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  currentService,
  onServiceChange,
  pickupSummary,
  destinationSummary,
  dateTimeSummary,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const serviceLabels: Record<ServiceType, string> = {
    'airport-transfer': 'AIRPORT TRANSFER',
    'day-booking': 'DAY BOOKING',
    'hourly-chauffeur': 'HOURLY CHAUFFEUR',
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0e0f12] text-white border-b border-[#22242a] shadow-md">
      {/* Service Switcher Bar */}
      <div className="bg-[#17191f] border-b border-[#282a32] px-4 py-1.5 text-xs text-zinc-300 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 hidden sm:block">Service:</span>
          <div className="flex items-center gap-1 bg-[#0b0c0f] p-0.5 rounded border border-zinc-800">
            {(['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).map((st, i) => (
              <button
                key={st}
                onClick={() => onServiceChange(st)}
                className={`px-3 py-1 rounded text-[11px] font-medium transition-all ${
                  currentService === st
                    ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {['Airport Transfer', 'Day Booking', 'Hourly Chauffeur'][i]}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-zinc-400">
          <span>London Executive Chauffeur Service</span>
          <span className="text-zinc-600">·</span>
          <span>United Travel Services</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Service Dropdown */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-white text-zinc-950 flex items-center justify-center font-black text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-serif italic font-bold text-base leading-none">U</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold tracking-wider text-xs block text-white leading-none">UNITED TRAVEL</span>
              <span className="font-light tracking-[0.22em] text-[9px] block text-zinc-400 leading-tight">SERVICES</span>
            </div>
          </a>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 bg-[#1b1d24] hover:bg-[#252833] text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-700/80 transition-colors"
            >
              <span className="tracking-wide text-[11px] uppercase font-bold text-zinc-100">
                {serviceLabels[currentService]}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#14161d] border border-zinc-700 rounded-lg shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-zinc-400">
                  Switch Chauffeur Service
                </div>
                {(['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => { onServiceChange(st); setDropdownOpen(false); }}
                    className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors ${
                      currentService === st
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{serviceLabels[st]}</span>
                    {currentService === st && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Journey summary */}
        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300 truncate font-normal">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">
            <strong className="font-medium text-white">{pickupSummary}</strong>
            {destinationSummary && (
              <>
                <span className="text-zinc-500 mx-1.5">→</span>
                <span>{destinationSummary}</span>
              </>
            )}
          </span>
          <span className="text-zinc-600 mx-1">|</span>
          <span className="text-zinc-300 whitespace-nowrap">{dateTimeSummary}</span>
        </div>

        {/* Right: Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded hover:bg-white/5 transition-colors"
          aria-label="Navigation menu"
        >
          <span className="font-medium">Menu</span>
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="bg-[#121318] border-b border-zinc-800 px-6 py-6 md:hidden">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Selected Journey</div>
            <p className="text-sm font-medium text-white">{pickupSummary}</p>
            {destinationSummary && <p className="text-xs text-zinc-400 mt-0.5">To: {destinationSummary}</p>}
            <p className="text-xs text-zinc-400 mt-1">{dateTimeSummary}</p>
          </div>
          <div className="border-t border-zinc-800 pt-4">
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Available Services</div>
            <div className="space-y-1">
              {(['airport-transfer', 'day-booking', 'hourly-chauffeur'] as ServiceType[]).map((st) => (
                <button
                  key={st}
                  onClick={() => { onServiceChange(st); setMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    currentService === st
                      ? 'bg-white text-zinc-950 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {serviceLabels[st]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
