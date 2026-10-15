interface FooterBrandProps {
  logo: string;
  description: string;
}

export function FooterBrand({ logo, description }: FooterBrandProps) {
  return (
    <div className="flex max-w-[320px] flex-col gap-4">
      <span className="font-[family-name:var(--font-arimo)] text-[16px] font-light text-white">
        {logo}
      </span>
      <p className="font-[family-name:var(--font-arimo)] text-[14px] leading-[145%] text-white/60">
        {description}
      </p>
    </div>
  );
}
