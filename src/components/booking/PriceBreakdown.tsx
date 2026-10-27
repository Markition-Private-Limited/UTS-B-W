'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { Vehicle, ServiceType } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

interface PriceBreakdownProps {
  serviceType: ServiceType;
  selectedVehicle: Vehicle;
  distanceKm: number;
  durationHours: number;
  onDistanceChange?: (newDist: number) => void;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  serviceType,
  selectedVehicle,
  distanceKm,
  durationHours,
  onDistanceChange,
}) => {
  const calculation = calculatePrice(serviceType, selectedVehicle, { distanceKm, durationHours });

  return (
    <section className="mb-14 border-t border-zinc-200/80 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">Price Breakdown</h2>
        <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md">
          Illustrative prototype values — not official UTS quote
        </span>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 divide-y divide-zinc-100">
        {serviceType === 'airport-transfer' && (
          <>
            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">{selectedVehicle.name} base tariff rate</span>
              <span className="font-semibold text-zinc-900">
                {selectedVehicle.airportRateKm !== null ? `£${selectedVehicle.airportRateKm.toFixed(2)} / km` : 'To be confirmed'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 font-normal">Sample journey distance</span>
                {onDistanceChange && <span className="text-[11px] text-zinc-400">(configurable)</span>}
              </div>
              <div className="flex items-center gap-2">
                {onDistanceChange ? (
                  <select
                    value={distanceKm}
                    onChange={(e) => onDistanceChange(Number(e.target.value))}
                    className="text-xs bg-zinc-50 border border-zinc-200 rounded px-2 py-1 font-semibold text-zinc-800"
                  >
                    <option value={20}>20 km (Inner London)</option>
                    <option value={28}>28 km (Central London → Heathrow T5)</option>
                    <option value={45}>45 km (Mayfair → Gatwick)</option>
                    <option value={60}>60 km (London → Stansted)</option>
                    <option value={75}>75 km (London → Luton / Outlying)</option>
                  </select>
                ) : (
                  <span className="font-semibold text-zinc-900">{distanceKm} km</span>
                )}
              </div>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Calculated illustrative base fare ({distanceKm} km)</span>
              <span className="font-semibold text-zinc-900">
                {calculation.baseFare !== null ? `£${calculation.baseFare.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Booking & administration fee</span>
              <span className="text-zinc-400 font-normal italic">Not configured (omitted per UTS schedule)</span>
            </div>

            <div className="pt-4 pb-1 flex items-baseline justify-between">
              <div>
                <span className="text-base font-bold text-zinc-950 block">Illustrative estimated total</span>
                <span className="text-[11px] text-zinc-400">Per-km distance tariff estimate</span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                {calculation.total !== null ? `£${calculation.total.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>
          </>
        )}

        {(serviceType === 'day-booking' || serviceType === 'hourly-chauffeur') && (
          <>
            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">{selectedVehicle.name} hourly rate</span>
              <span className="font-semibold text-zinc-900">
                {serviceType === 'day-booking'
                  ? selectedVehicle.dayRateHour !== null ? `£${selectedVehicle.dayRateHour.toFixed(2)} / hr` : 'To be confirmed'
                  : selectedVehicle.hourlyRateHour !== null ? `£${selectedVehicle.hourlyRateHour.toFixed(2)} / hr` : 'To be confirmed'}
              </span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Booked duration</span>
              <span className="font-semibold text-zinc-900">{durationHours} hours</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Minimum booking requirement</span>
              <span className="font-medium text-zinc-700">4 hours (enforced)</span>
            </div>

            <div className="py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-600 font-normal">Additional configured surcharges</span>
              <span className="text-zinc-400 font-normal italic">None configured (omitted per UTS schedule)</span>
            </div>

            <div className="pt-4 pb-1 flex items-baseline justify-between">
              <div>
                <span className="text-base font-bold text-zinc-950 block">Illustrative estimated total</span>
                <span className="text-[11px] text-zinc-400">
                  {serviceType === 'day-booking' ? 'Day Booking' : 'Hourly Chauffeur'} ({durationHours} hrs)
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
                {calculation.total !== null ? `£${calculation.total.toFixed(2)}` : 'Price to be confirmed'}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="text-xs text-zinc-500 space-y-2 bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/70">
        <p className="font-semibold text-zinc-700 text-xs">Please note:</p>
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
          <p>All prices shown are illustrative prototype values only and do not represent confirmed UTS fares, rates or fleet. Route details, vehicle models, fees and service inclusions are examples for demonstration purposes.</p>
        </div>
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
          <p>Please confirm route, airport, terminal, passenger and luggage details with UTS before completing your booking. Actual fare will be confirmed by UTS directly.</p>
        </div>
      </div>
    </section>
  );
};
