'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { BookingState, Vehicle, VehicleTier } from '@/types/booking';
import { VehicleSelector } from '@/components/booking/VehicleSelector';
import { ShowcaseCarousel } from '@/components/booking/ShowcaseCarousel';
import { WhatsIncluded } from '@/components/booking/WhatsIncluded';
import { CapacityLuggage } from '@/components/booking/CapacityLuggage';
import { PriceBreakdown } from '@/components/booking/PriceBreakdown';

interface HourlyChauffeurPageProps {
  state: BookingState;
  fleet: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (id: VehicleTier) => void;
  onUpdateState: (updates: Partial<BookingState>) => void;
}

export const HourlyChauffeurPage: React.FC<HourlyChauffeurPageProps> = ({
  state, fleet, selectedVehicle, onSelectVehicle, onUpdateState,
}) => {
  const [stopInput, setStopInput] = useState('');

  const handleAddStop = () => {
    if (!stopInput.trim()) return;
    onUpdateState({ stops: [...state.stops, { id: `hourly-stop-${Date.now()}`, address: stopInput.trim() }] });
    setStopInput('');
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
          <span>UTS Flexible Hire</span><span>·</span><span>By The Hour</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-zinc-950 leading-tight mb-3">
          Your Chauffeur, On Your Schedule.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
          Book a private chauffeur by the hour and travel across London with the flexibility, comfort, and professionalism your day deserves.
        </p>
      </div>

      <VehicleSelector vehicles={fleet} selectedVehicleId={state.selectedVehicleId} onSelectVehicle={onSelectVehicle}
        serviceType="hourly-chauffeur" distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />

      <section className="mb-12 bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Hourly Service & Flexible Itinerary</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Enjoy complete freedom without fixed drop-offs. Your chauffeur remains on standby.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 rounded-full text-zinc-700">{state.durationHours} Hours Reserved</span>
        </div>

        <div className="mb-4">
          <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Chauffeur Meet / Pickup Location</label>
          <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <MapPin className="w-4 h-4 text-zinc-700 shrink-0" />
            <input type="text" value={state.pickupAddress} onChange={(e) => onUpdateState({ pickupAddress: e.target.value })}
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-zinc-900 font-medium"
              placeholder="e.g. Claridge's, Brook Street, Mayfair, London" />
          </div>
        </div>

        <div className="space-y-2.5 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase font-bold text-zinc-500 block">Optional Destinations or Planned Stops</label>
            <span className="text-[10px] text-zinc-400 font-normal">Not required — flexible as you go</span>
          </div>
          {state.stops.length === 0 ? (
            <div className="p-4 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 text-center text-xs text-zinc-500">
              No predetermined stops required. You may direct your chauffeur in real time.
            </div>
          ) : (
            state.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs sm:text-sm">
                <div className="flex items-center gap-3 truncate">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold shrink-0">{index + 1}</span>
                  <span className="font-medium text-zinc-900 truncate">{stop.address}</span>
                </div>
                <button onClick={() => onUpdateState({ stops: state.stops.filter((s) => s.id !== stop.id) })}
                  className="text-zinc-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))
          )}
          <div className="flex gap-2 pt-2">
            <input type="text" placeholder="Add planned stop (e.g. Bond Street Boutiques, Scott's Restaurant)" value={stopInput}
              onChange={(e) => setStopInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddStop(); } }}
              className="flex-1 text-xs sm:text-sm border border-zinc-200 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950" />
            <button type="button" onClick={handleAddStop}
              className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors">
              <Plus className="w-3.5 h-3.5" /><span>Add Stop</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 text-xs">
          <div>
            <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Commencement Date & Time</label>
            <div className="flex items-center gap-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-200">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <input type="text" value={state.pickupDate} onChange={(e) => onUpdateState({ pickupDate: e.target.value })}
                className="w-full bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none" />
              <Clock className="w-4 h-4 text-zinc-500 ml-2" />
              <input type="text" value={state.pickupTime} onChange={(e) => onUpdateState({ pickupTime: e.target.value })}
                className="w-20 bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[11px] uppercase font-bold text-zinc-500 block mb-1">Hourly Duration (4 Hours Minimum)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={4} max={12} step={1} value={state.durationHours}
                onChange={(e) => onUpdateState({ durationHours: Number(e.target.value) })}
                className="flex-1 accent-zinc-950 cursor-pointer" />
              <span className="font-bold text-sm text-zinc-950 w-16 text-right">{state.durationHours} hrs</span>
            </div>
          </div>
        </div>
      </section>

      <ShowcaseCarousel serviceType="hourly-chauffeur" selectedVehicle={selectedVehicle} />
      <WhatsIncluded serviceType="hourly-chauffeur" />
      <CapacityLuggage selectedVehicle={selectedVehicle} currentLuggageType={state.luggageType}
        onLuggageTypeChange={(t) => onUpdateState({ luggageType: t })} />
      <PriceBreakdown serviceType="hourly-chauffeur" selectedVehicle={selectedVehicle}
        distanceKm={state.sampleDistanceKm} durationHours={state.durationHours} />
    </div>
  );
};
