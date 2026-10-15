import { chauffeurPromoContent } from "@/content/chauffeur-promo.content";
import { ChauffeurPromoHeadline } from "./ChauffeurPromoHeadline";
import { ChauffeurPromoCar } from "./ChauffeurPromoCar";
import { ChauffeurPromoCTA } from "./ChauffeurPromoCTA";

// ─── LAYOUT OWNER: this file controls the overall chauffeur promo layout ──────
// Sub-components live next to this file — each one is independently editable.
// Content (copy/text/image paths) lives in src/content/chauffeur-promo.content.ts.

export function ChauffeurPromoSection() {
  const { headline, car, cta, background } = chauffeurPromoContent;

  return (
    <section
      className="relative overflow-hidden bg-top bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundColor: "#e9edf2",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-950/70 via-blue-700/30 to-transparent sm:h-80 lg:h-96"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-10 pb-6 sm:pt-12 sm:pb-8 lg:px-8 lg:pt-14 lg:pb-10">
        <ChauffeurPromoHeadline
          line1={headline.line1}
          line2={headline.line2}
          highlight={headline.highlight}
        />
        <ChauffeurPromoCar src={car.src} alt={car.alt} />
        <ChauffeurPromoCTA label={cta.label} href={cta.href} />
      </div>
    </section>
  );
}
