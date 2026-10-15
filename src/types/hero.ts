export interface HeroCTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline: string;
  description: string;
  cta: HeroCTAButton[];
  image?: {
    src: string;
    alt: string;
  };
}
