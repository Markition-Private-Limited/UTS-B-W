import Link from "next/link";
import type { FooterSocialLink } from "@/types/footer";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

interface FooterBottomProps {
  copyright: string;
  socials: FooterSocialLink[];
}

export function FooterBottom({ copyright, socials }: FooterBottomProps) {
  return (
    <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
      <p className="font-[family-name:var(--font-arimo)] text-[14px] text-white/60">
        {copyright}
      </p>
      <div className="flex items-center gap-3">
        {socials.map((social) => {
          const Icon = SOCIAL_ICONS[social.name];
          return (
            <Link
              key={social.name}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-500"
            >
              <Icon className="h-4 w-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
