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
        alt={logo.label}
        className="orbit-hero-trust-img"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <span className="orbit-hero-trust-word">{logo.label}</span>;
}

export function OrbitHeroTrustMarquee({ logos, label = "Enterprises that trust us" }: Props) {
  if (!logos.length) return null;
  const row = [...logos, ...logos];

  return (
    <div className="orbit-hero-trust w-full" aria-label={label}>
      <p className="orbit-hero-trust-label">{label}</p>
      <div className="orbit-hero-trust-frame relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#07070c] to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#07070c] via-[#07070c]/80 to-transparent sm:w-20" />
        <div className="orbit-hero-trust-marquee-track flex w-max items-center">
          {row.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="orbit-hero-trust-item flex shrink-0 items-center justify-center">
              <TrustMark logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
