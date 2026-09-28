"use client";

import type { HeroTrustLogo } from "@/lib/hero-trust-logos";

type Props = {
  logos: HeroTrustLogo[];
  label?: string;
};

function TrustMark({ logo }: { logo: HeroTrustLogo }) {
  if (logo.imageSrc) {
    return (
      <img
        src={logo.imageSrc}
        alt=""
        className="h-[26px] w-auto max-w-[8.5rem] object-contain brightness-0 invert sm:h-[28px]"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span className="whitespace-nowrap font-[family-name:var(--font-jakarta)] text-[13px] font-semibold tracking-[0.06em] text-white/88 sm:text-[14px]">
      {logo.label}
    </span>
  );
}

export function OrbitHeroTrustMarquee({ logos, label = "Enterprises that trust us" }: Props) {
  if (!logos.length) return null;
  const row = [...logos, ...logos];

  return (
    <div className="orbit-hero-trust mt-4 w-full sm:mt-5" aria-label={label}>
      <p className="orbit-hero-trust-label">{label}</p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#07070c] to-transparent sm:w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#07070c] via-[#07070c]/70 to-transparent sm:w-20" />
        <div className="orbit-hero-trust-marquee-track flex w-max items-center gap-x-8 sm:gap-x-10">
          {row.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="flex shrink-0 items-center">
              <TrustMark logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
