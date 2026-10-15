import Link from "next/link";
import type { HeroCTAButton } from "@/types/hero";

interface HeroCTAProps {
  buttons: HeroCTAButton[];
}

export function HeroCTA({ buttons }: HeroCTAProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {buttons.map((btn) => (
        <Link
          key={btn.label}
          href={btn.href}
          className={
            btn.variant === "primary"
              ? "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              : "rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-800"
          }
        >
          {btn.label}
        </Link>
      ))}
    </div>
  );
}
