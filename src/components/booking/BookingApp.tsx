'use client';

import React, { useState, useEffect } from 'react';
import { BookmarkCheck } from 'lucide-react';
import { FLEET } from '@/data/fleet';
import { DRAFT_KEY, type BookingDraft } from '@/lib/booking';
import { BookingState, ServiceType, VehicleTier } from '@/types/booking';
import { BookingHeader } from '@/components/booking/BookingHeader';
import { BookingSidebar } from '@/components/booking/BookingSidebar';
import Footer from '@/components/layout/Footer';
import { BookingReviewModal } from '@/components/booking/BookingReviewModal';
import { AirportTransferPage } from '@/components/booking/pages/AirportTransferPage';
import { DayBookingPage } from '@/components/booking/pages/DayBookingPage';
import { HourlyChauffeurPage } from '@/components/booking/pages/HourlyChauffeurPage';

const STORAGE_KEY = 'uts_chauffeur_booking_data';

export default function BookingApp() {
  const [currentService, setCurrentService] = useState<ServiceType>('airport-transfer');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash === 'day-booking' || hash === 'hourly-chauffeur' || hash === 'airport-transfer') {
        setCurrentService(hash as ServiceType);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleServiceChange = (service: ServiceType) => {
    setCurrentService(service);
    window.location.hash = `#/${service}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: 'airport-transfer',
    selectedVehicleId: 'business',
    transferDirection: 'departure',
    sampleDistanceKm: 28,
    flightNumber: '',
    airportTerminal: 'Terminal 5 (LHR)',
    pickupAddress: 'The Langham, 1c Portland Place, London W1B 1JA',
    destinationAddress: 'Heathrow Airport · Terminal 5 (LHR)',
    pickupDate: '18 November 2026',
    pickupTime: '06:00',
    durationHours: 6,
    stops: [
      { id: 'stop-1', address: '1 Canada Square, Canary Wharf, London' },
      { id: 'stop-2', address: 'The Ned, 27 Poultry, London EC2R 8AJ' },
    ],
    passengers: 2,
    luggageCount: 2,
    luggageType: 'carry-on',
    specialInstructions: '',
  });

  useEffect(() => {
    setBookingState((prev) => ({ ...prev, serviceType: currentService }));
  }, [currentService]);

  // Details entered in the homepage hero panel arrive here pre-filled.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      sessionStorage.removeItem(DRAFT_KEY);
      const d = JSON.parse(raw) as BookingDraft;
      const service: ServiceType | null =
        d.service === 'day' ? 'day-booking' : d.service === 'hourly' ? 'hourly-chauffeur' : d.service === 'transfer' ? 'airport-transfer' : null;
      if (service) {
        setCurrentService(service);
        window.location.hash = `#/${service}`;
      }
      const date = d.date ? new Date(d.date + 'T00:00:00') : null;
      setBookingState((prev) => ({
        ...prev,
        pickupAddress: d.pickup || prev.pickupAddress,
        destinationAddress: d.dropoff || prev.destinationAddress,
        pickupDate: date && !isNaN(date.getTime()) ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : prev.pickupDate,
        pickupTime: d.time || prev.pickupTime,
        passengers: d.passengers || prev.passengers,
        durationHours: d.duration || prev.durationHours,
      }));
    } catch {
      /* storage unavailable — keep defaults */
    }
  }, []);

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const selectedVehicle = FLEET.find((v) => v.id === bookingState.selectedVehicleId) || FLEET[0];

  const handleSelectVehicle = (id: VehicleTier) => {
    updateBookingState({ selectedVehicleId: id });
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveJourney = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingState));
      showToast('Journey details saved to browser storage.');
    } catch {
      showToast('Details saved for this session.');
    }
  };

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleContinueToBooking = () => {
    if (currentService !== 'airport-transfer' && bookingState.durationHours < 4) {
      showToast('Minimum booking duration of 4 hours is required.');
      return;
    }
    setReviewModalOpen(true);
  };

  const short = (v: string, n = 28) => (v.length > n ? v.slice(0, n - 1).trimEnd() + '…' : v);
  const shortDate = bookingState.pickupDate.replace(/^(\d+)\s+(\w{3})\w*.*$/, '$1 $2');
  const destinationSummary = currentService === 'airport-transfer' ? short(bookingState.destinationAddress) : undefined;
  const dateTimeSummary =
    currentService === 'airport-transfer'
      ? `${shortDate} · ${bookingState.pickupTime} · Departure`
      : currentService === 'day-booking'
      ? `${shortDate} · ${bookingState.pickupTime} · ${bookingState.durationHours} Hours Day`
      : `${shortDate} · ${bookingState.pickupTime} · ${bookingState.durationHours} Hours Hourly`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#111113]">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-zinc-950 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-zinc-800">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <BookingHeader
        currentService={currentService}
        onServiceChange={handleServiceChange}
        pickupSummary={short(bookingState.pickupAddress)}
        destinationSummary={destinationSummary}
        dateTimeSummary={dateTimeSummary}
      />

      <main className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
          {currentService === 'airport-transfer' && (
            <AirportTransferPage state={bookingState} fleet={FLEET} selectedVehicle={selectedVehicle}
              onSelectVehicle={handleSelectVehicle} onUpdateState={updateBookingState} />
          )}
          {currentService === 'day-booking' && (
            <DayBookingPage state={bookingState} fleet={FLEET} selectedVehicle={selectedVehicle}
              onSelectVehicle={handleSelectVehicle} onUpdateState={updateBookingState} />
          )}
          {currentService === 'hourly-chauffeur' && (
            <HourlyChauffeurPage state={bookingState} fleet={FLEET} selectedVehicle={selectedVehicle}
              onSelectVehicle={handleSelectVehicle} onUpdateState={updateBookingState} />
          )}

          <BookingSidebar state={bookingState} selectedVehicle={selectedVehicle}
            onUpdateState={updateBookingState} onContinue={handleContinueToBooking} onSave={handleSaveJourney} />
        </div>
      </main>

      <Footer />

      <BookingReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)}
        state={bookingState} vehicle={selectedVehicle} />
    </div>
  );
}
