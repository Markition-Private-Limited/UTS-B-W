'use client';

import React, { useState } from 'react';
import { ServiceType } from '@/types/booking';
import PillButtonContent from '@/components/ui/PillButtonContent';

interface BookingFooterProps {
  onSelectService?: (service: ServiceType) => void;
}

export const BookingFooter: React.FC<BookingFooterProps> = ({ onSelectService }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#0b0c0f] text-zinc-400 border-t border-[#1d1f27] pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#1c1e26]">
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <h3 className="font-extrabold text-white text-base tracking-wider uppercase mb-4">
              UNITED TRAVEL SERVICES
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              United Travel Services provides professional chauffeur and private transportation
              services for business and leisure travel across London and the United Kingdom. With a
              focus on comfort, punctuality and customer care, we make every journey an elevated
              experience.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="/#fleet" className="hover:text-white transition-colors">Our Fleet</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-4">Chauffeur Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectService?.('airport-transfer')} className="hover:text-white transition-colors text-left">
                  Airport Transfers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectService?.('day-booking')} className="hover:text-white transition-colors text-left">
                  Executive Chauffeur Day
                </button>
              </li>
              <li>
                <button onClick={() => onSelectService?.('hourly-chauffeur')} className="hover:text-white transition-colors text-left">
                  Hourly Chauffeur
                </button>
              </li>
              <li><span className="text-zinc-600">Private Jet Chauffeur</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Newsletter</h4>
            <p className="text-xs text-white font-medium mb-3">A little inspiration for your next journey.</p>
            <form onSubmit={handleSubscribe} className="relative mb-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#181a22] border border-[#2b2d38] text-white text-xs rounded-lg px-3 py-2.5 pr-24 focus:outline-none focus:border-zinc-500 placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="group overflow-hidden absolute right-1 top-1 bottom-1 bg-white text-zinc-950 px-3 rounded-md text-[11px] font-bold tracking-wider border-[1.5px] border-transparent transition-all duration-500 hover:border-black/15 inline-flex items-center"
              >
                <PillButtonContent fill="black">{subscribed ? 'JOINED' : 'SUBSCRIBE'}</PillButtonContent>
              </button>
            </form>
            <p className="text-[10px] text-zinc-400">Receive occasional travel inspiration and UTS updates.</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© 2026 United Travel Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <div className="max-w-[1520px] mx-auto px-4 mt-12 text-center pointer-events-none select-none">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-[#14161f] opacity-80 uppercase leading-none">
          UNITED TRAVEL SERVICES
        </h2>
      </div>
    </footer>
  );
};
