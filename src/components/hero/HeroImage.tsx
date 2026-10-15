import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      {/* Swap out for a real <Image> once you have an actual asset */}
      <div className="flex aspect-video items-center justify-center">
        <span className="text-sm text-gray-400">[ hero image — {alt} ]</span>
      </div>
      {/* Uncomment below when src is a real path:
      <Image src={src} alt={alt} fill className="object-cover" priority />
      */}
    </div>
  );
}
