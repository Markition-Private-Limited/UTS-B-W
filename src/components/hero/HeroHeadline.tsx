interface HeroHeadlineProps {
  headline: string;
  subheadline: string;
  description: string;
}

export function HeroHeadline({ headline, subheadline, description }: HeroHeadlineProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {subheadline}
      </p>
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
        {headline.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="max-w-xl text-lg text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
