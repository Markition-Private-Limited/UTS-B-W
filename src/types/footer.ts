export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  name: "facebook" | "linkedin" | "twitter" | "instagram";
  href: string;
}

export interface FooterContent {
  logo: string;
  description: string;
  quickLinksHeading: string;
  quickLinks: FooterLink[];
  servicesHeading: string;
  services: FooterLink[];
  newsletter: {
    heading: string;
    placeholder: string;
    note: string;
  };
  copyright: string;
  socials: FooterSocialLink[];
}
