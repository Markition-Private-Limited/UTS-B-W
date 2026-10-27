'use client';

import React, { useState } from 'react';
import {
  MapPin, Plane, User, Briefcase, Plus, Trash2, Bookmark, ArrowRight, AlertCircle,
} from 'lucide-react';
import { BookingState, Vehicle } from '@/types/booking';
import { calculatePrice } from '@/data/fleet';

interface BookingSidebarProps {
  state: BookingState;
  selectedVehicle: Vehicle;
  onUpdateState: (updates: Partial<BookingState>) => void;
  onContinue: () => void;
  onSave: () => void;
}

export const BookingSidebar: React.FC<BookingSidebarProps> = ({
  state,
  selectedVehicle,
  onUpdateState,
  onContinue,
  onSave,
}) => {
  const [editingPickup, setEditingPickup] = useState(false);
  const [editingDestination, setEditingDestination] = useState(false);
  const [newStopAddress, setNewStopAddress] = useState('');
  const [showAddStopInput, setShowAddStopInput] = useState(false);

  const priceCalc = calculatePrice(state.serviceType, selectedVehicle, {
    distanceKm: state.sampleDistanceKm,
    durationHours: state.durationHours,
  });

  const isMinHoursValid = state.serviceType === 'airport-transfer' || state.durationHours >= 4;

  const handleAddStop = () => {
    if (!newStopAddress.trim()) return;
    onUpdateState({ stops: [...state.stops, { id: `stop-${Date.now()}`, address: newStopAddress.trim() }] });
    setNewStopAddress('');
    setShowAddStopInput(false);
  };

  const handleRemoveStop = (stopId: string) => {
    onUpdateState({ stops: state.stops.filter((s) => s.id !== stopId) });
  };

  return (
    <aside className="w-full lg:w-[360px] xl:w-[390px] shrink-0">
      <div className="sticky top-[100px] max-h-[calc(100vh-108px)] overflow-y-auto bg-white border border-zinc-200/90 rounded-2xl shadow-sm divide-y divide-zinc-100">
        {/* Route Graphic */}
        <div className="relative bg-[#f4f4f7] p-4 border-b border-zinc-200/70">
          <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300/60 p-3 flex flex-col justify-between">
            <svg className="absolute inset-0 w-full h-full text-zinc-300/60" viewBox="0 0 300 180" fill="currentColor" preserveAspectRatio="none">
              <polygon points="20,40 80,20 160,25 240,15 280,60 260,130 190,165 110,160 40,120" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round">
              <path d="M 10 110 Q 70 80, 140 100 T 290 85" />
            </svg>
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 300 180" fill="none" stroke="#090a0c" strokeWidth="3.5" strokeDasharray={state.serviceType === 'airport-transfer' ? 'none' : '4 3'} strokeLinecap="round">
              {state.serviceType === 'airport-transfer' ? (
                <path d="M 210 35 C 190 70, 160 90, 140 145" />
              ) : (
                <path d="M 180 50 C 220 80, 130 110, 160 140" />
              )}
            </svg>
            <div className="relative z-20 flex justify-between items-start">
              <div className="bg-white/95 backdrop-blur-xs border border-zinc-300 shadow-sm rounded-lg p-1.5 text-[10px] max-w-[130px]">
                <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">
                  {state.serviceType === 'airport-transfer' ? 'Drop-off' : 'Destination'}
                </span>
                <span className="font-semibold text-zinc-900 truncate block">
                  {state.serviceType === 'airport-transfer' ? 'Heathrow - T5' : 'London Standby'}
                </span>
              </div>
              <div className="bg-zinc-950 text-white border border-zinc-800 shadow-sm rounded-lg p-1.5 text-[10px] max-w-[130px] text-right">
                <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">Pickup</span>
                <span className="font-semibold text-white truncate block">The Langham, W1</span>
              </div>
            </div>
            {state.serviceType === 'airport-transfer' && (
              <div className="relative z-20 self-center bg-zinc-950 text-white px-3 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                <Plane className="w-3 h-3 text-zinc-300" />
                <span>LHR Terminal 5</span>
              </div>
            )}
            <div className="relative z-20 flex items-center justify-between text-[9px] text-zinc-500 font-medium">
              <span>Route overview · Not to scale</span>
              <span>Indicative only</span>
            </div>
          </div>
        </div>

        {/* Service Summary */}
        <div className="p-4 sm:p-5">
          {state.serviceType === 'airport-transfer' ? (
            <>
              <div className="grid grid-cols-2 gap-1.5 bg-zinc-100 p-1 rounded-xl mb-4 text-xs font-semibold">
                <button
                  onClick={() => onUpdateState({ transferDirection: 'departure' })}
                  className={`py-2 px-3 rounded-lg transition-all ${state.transferDirection === 'departure' ? 'bg-zinc-950 text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
                >
                  Airport Departure
                </button>
                <button
                  onClick={() => onUpdateState({ transferDirection: 'arrival' })}
                  className={`py-2 px-3 rounded-lg transition-all ${state.transferDirection === 'arrival' ? 'bg-zinc-950 text-white shadow-sm font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
                >
                  Airport Arrival
                </button>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    Airport {state.transferDirection === 'departure' ? 'Departure Drop-Off' : 'Arrival Pickup'}
                  </span>
                  <h4 className="text-base font-bold text-zinc-950 capitalize">{state.transferDirection}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{selectedVehicle.name} · One-way · Illustrative price</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block">Illustrative est.</span>
                  <span className="text-xl font-extrabold text-zinc-950">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                {state.serviceType === 'day-booking' ? 'Chauffeur Day Service' : 'Hourly Chauffeur Service'}
              </span>
              <div className="flex items-start justify-between mt-1">
                <div>
                  <h4 className="text-base font-bold text-zinc-950">{state.durationHours} Hours Dedicated Chauffeur</h4>
                  <p className="text-[11px] text-zinc-500">{selectedVehicle.name} · London Standby</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block">Illustrative est.</span>
                  <span className="text-xl font-extrabold text-zinc-950">
                    {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)}` : 'To be confirmed'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Duration Selector */}
        {state.serviceType !== 'airport-transfer' && (
          <div className="p-4 sm:p-5 bg-zinc-50/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-800">Booking Duration (Hours)</label>
              <span className="text-[11px] text-zinc-500">Minimum: 4 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => onUpdateState({ durationHours: Math.max(1, state.durationHours - 1) })}
                className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm">-</button>
              <div className="flex-1 text-center py-1.5 px-3 bg-white border border-zinc-200 rounded-lg">
                <span className="text-base font-bold text-zinc-950">{state.durationHours} Hours</span>
              </div>
              <button type="button" onClick={() => onUpdateState({ durationHours: Math.min(16, state.durationHours + 1) })}
                className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center font-bold text-sm">+</button>
            </div>
            {!isMinHoursValid && (
              <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>UTS policy enforces a strict <strong>4-hour minimum</strong> for {state.serviceType === 'day-booking' ? 'Day Booking' : 'Hourly Chauffeur'}.</span>
              </div>
            )}
          </div>
        )}

        {/* Pickup & Destination */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-zinc-950" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Pickup address</span>
              {editingPickup ? (
                <div className="mt-1 flex gap-2">
                  <input type="text" value={state.pickupAddress} onChange={(e) => onUpdateState({ pickupAddress: e.target.value })}
                    className="flex-1 text-xs border border-zinc-300 rounded px-2 py-1" />
                  <button onClick={() => setEditingPickup(false)} className="text-[11px] bg-zinc-950 text-white px-2 py-1 rounded">Done</button>
                </div>
              ) : (
                <p onClick={() => setEditingPickup(true)} className="text-xs font-medium text-zinc-900 truncate hover:underline cursor-pointer">{state.pickupAddress}</p>
              )}
            </div>
          </div>

          {state.serviceType === 'airport-transfer' ? (
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-700" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Airport & terminal</span>
                {editingDestination ? (
                  <div className="mt-1 flex gap-2">
                    <input type="text" value={state.destinationAddress} onChange={(e) => onUpdateState({ destinationAddress: e.target.value })}
                      className="flex-1 text-xs border border-zinc-300 rounded px-2 py-1" />
                    <button onClick={() => setEditingDestination(false)} className="text-[11px] bg-zinc-950 text-white px-2 py-1 rounded">Done</button>
                  </div>
                ) : (
                  <p onClick={() => setEditingDestination(true)} className="text-xs font-medium text-zinc-900 truncate hover:underline cursor-pointer">{state.destinationAddress}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-zinc-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Planned Stops ({state.stops.length})</span>
                <button type="button" onClick={() => setShowAddStopInput(true)} className="text-xs text-zinc-900 font-semibold inline-flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" /><span>Add Stop</span>
                </button>
              </div>
              {state.stops.length === 0 ? (
                <p className="text-xs text-zinc-400 italic">No intermediate stops specified. Flexible itinerary.</p>
              ) : (
                <div className="space-y-2 mb-2">
                  {state.stops.map((stop, idx) => (
                    <div key={stop.id} className="flex items-center justify-between text-xs bg-zinc-50 p-2 rounded-lg border border-zinc-200/80">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-4 h-4 rounded-full bg-zinc-200 text-zinc-700 text-[10px] flex items-center justify-center font-bold">{idx + 1}</span>
                        <span className="truncate font-medium text-zinc-800">{stop.address}</span>
                      </div>
                      <button onClick={() => handleRemoveStop(stop.id)} className="text-zinc-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              )}
              {showAddStopInput && (
                <div className="mt-2 flex gap-1.5">
                  <input type="text" placeholder="Enter stop address" value={newStopAddress} onChange={(e) => setNewStopAddress(e.target.value)}
                    className="flex-1 text-xs border border-zinc-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-950" />
                  <button onClick={handleAddStop} className="bg-zinc-950 text-white text-xs px-3 py-1.5 rounded font-medium">Save</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date & Time */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Date & Pickup Time</span>
              <p className="font-semibold text-zinc-900 mt-0.5">{state.pickupDate} · {state.pickupTime}</p>
            </div>
          </div>
          {state.serviceType === 'airport-transfer' && (
            <div className="flex items-center gap-2.5 pt-1 text-xs text-zinc-600">
              <Plane className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] text-zinc-400 block">Flight number — optional</span>
                <input type="text" placeholder="e.g. BA 142 / VS 004" value={state.flightNumber}
                  onChange={(e) => onUpdateState({ flightNumber: e.target.value })}
                  className="w-full text-xs text-zinc-900 border-b border-zinc-200 py-0.5 focus:outline-none focus:border-zinc-900 placeholder:text-zinc-400" />
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Preview */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Selected Vehicle</span>
            <span className="text-xs font-bold text-zinc-950">
              {priceCalc.total !== null ? `£${priceCalc.total.toFixed(2)} est.` : 'Price to be confirmed'}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-16 h-12 rounded-lg object-cover border border-zinc-200 shrink-0" />
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-xs text-zinc-950 truncate">{selectedVehicle.name}</h5>
              <p className="text-[11px] text-zinc-500 truncate">{selectedVehicle.modelExample}</p>
            </div>
          </div>
        </div>

        {/* Passengers & Luggage */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Passengers & Luggage</span>
            <span className="text-[10px] text-zinc-400 block leading-tight mt-0.5">Requested values. Actual capacity subject to confirmation.</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between bg-zinc-50 p-2 rounded-lg border border-zinc-200/70">
              <div className="flex items-center gap-1.5 text-zinc-600">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[11px]">Passengers</span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onUpdateState({ passengers: Math.max(1, state.passengers - 1) })}
                  className="w-5 h-5 rounded bg-white border border-zinc-200 flex items-center justify-center font-bold">-</button>
                <span className="font-bold w-4 text-center">{state.passengers}</span>
                <button type="button" onClick={() => onUpdateState({ passengers: Math.min(selectedVehicle.passengers + 2, state.passengers + 1) })}
                  className="w-5 h-5 rounded bg-white border border-zinc-200 flex items-center justify-center font-bold">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-zinc-50 p-2 rounded-lg border border-zinc-200/70">
              <div className="flex items-center gap-1.5 text-zinc-600">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[11px]">Luggage</span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => onUpdateState({ luggageCount: Math.max(0, state.luggageCount - 1) })}
                  className="w-5 h-5 rounded bg-white border border-zinc-200 flex items-center justify-center font-bold">-</button>
                <span className="font-bold w-4 text-center">{state.luggageCount}</span>
                <button type="button" onClick={() => onUpdateState({ luggageCount: Math.min(selectedVehicle.luggage + 3, state.luggageCount + 1) })}
                  className="w-5 h-5 rounded bg-white border border-zinc-200 flex items-center justify-center font-bold">+</button>
              </div>
            </div>
          </div>
          {state.passengers > selectedVehicle.passengers && (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
              Note: Requested {state.passengers} passengers exceeds standard {selectedVehicle.name} seating ({selectedVehicle.passengers}).
            </p>
          )}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">Additional pickup instructions (optional)</label>
            <input type="text" placeholder="e.g. entrance, terminal door, child seat" value={state.specialInstructions}
              onChange={(e) => onUpdateState({ specialInstructions: e.target.value })}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 placeholder:text-zinc-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-5 space-y-2.5 bg-zinc-50/50">
          <button type="button" disabled={!isMinHoursValid} onClick={onContinue}
            className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
              isMinHoursValid ? 'bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer' : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
            }`}>
            <span>Continue to Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button type="button" onClick={onSave}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-200/70 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Journey Details</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
