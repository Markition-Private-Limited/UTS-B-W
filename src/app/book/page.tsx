import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DifferenceSection from "@/components/sections/DifferenceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import SlidingBackdrop from "@/components/booking/SlidingBackdrop";
import { BookingWidget } from "@/components/booking/BookingWidget";

export const metadata: Metadata = {
  title: "Book Your Chauffeur — United Travel Services",
  description: "Bespoke chauffeur reservations with United Travel Services.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />

      <div data-navbar-theme="dark" className="relative min-h-screen bg-black">
        <SlidingBackdrop />
        <main className="relative z-10 flex flex-col items-center px-4 pb-12 pt-28 md:pb-16 md:pt-32">
          <header className="mb-6 text-center md:mb-8">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              Bespoke Chauffeur Reservations
            </p>
            <h1
              className="font-bold uppercase text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
              }}
            >
              Your Journey, Perfectly Arranged.
            </h1>
          </header>

          <BookingWidget />
        </main>
      </div>

      <div className="bg-white pt-[4vw]">
        <DifferenceSection />
      </div>
      <TestimonialsSection />
      <FinalCtaSection />

      <Footer />
    </>
  );
}
