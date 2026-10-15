interface ChauffeurPromoHeadlineProps {
  line1: string;
  line2: string;
  highlight: string;
}

export function ChauffeurPromoHeadline({
  line1,
  line2,
  highlight,
}: ChauffeurPromoHeadlineProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.4em] text-blue-600 uppercase sm:text-xs">
        <span className="h-px w-8 bg-blue-600/40" />
        Premium Transport
        <span className="h-px w-8 bg-blue-600/40" />
      </span>
      <h2 className="mt-4 text-center font-[family-name:var(--font-inter)] text-4xl leading-[1.08] font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[64px]">
        <span className="block font-light text-gray-700">{line1}</span>
        <span className="block">
          {line2}{" "}
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        </span>
      </h2>
    </div>
  );
}
