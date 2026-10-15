import { HeroBadge } from "./HeroBadge";
import { HeroCTA } from "./HeroCTA";
import { HeroHeadline } from "./HeroHeadline";
import { HeroImage } from "./HeroImage";
import { heroContent } from "@/content/hero.content";

// ─── LAYOUT OWNER: this file controls the overall hero layout ─────────────────
// Sub-components live next to this file — each one is independently editable.
// Content (copy/text) lives in src/content/hero.content.ts.

export function HeroSection() {
  const { badge, headline, subheadline, description, cta, image } = heroContent;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* Left column — text */}
          <div className="flex flex-1 flex-col gap-8">
            {badge && <HeroBadge text={badge} />}
            <HeroHeadline
              headline={headline}
              subheadline={subheadline}
              description={description}
            />
            <HeroCTA buttons={cta} />
          </div>

          {/* Right column — visual */}
          {image && (
            <div className="w-full flex-1">
              <HeroImage src={image.src} alt={image.alt} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
