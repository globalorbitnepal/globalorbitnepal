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
        className="h-[22px] w-auto max-w-[7.5rem] object-contain opacity-90 brightness-0 invert"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span className="whitespace-nowrap font-[family-name:var(--font-jakarta)] text-[13px] font-semibold tracking-[0.04em] text-white/72">
      {logo.label}
    </span>
  );
}

export function OrbitHeroTrustMarquee({ logos, label = "Enterprises that trust us" }: Props) {
  if (!logos.length) return null;
  const row = [...logos, ...logos];

  return (
    <div className="w-full" aria-label={label}>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">{label}</p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#07070c] to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07070c] via-[#07070c]/80 to-transparent sm:w-24" />
        <div className="orbit-hero-trust-marquee-track flex w-max items-center gap-x-10 sm:gap-x-12">
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
