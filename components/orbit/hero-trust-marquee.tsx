"use client";

import type { HeroTrustLogo } from "@/lib/hero-trust-logos";

type Props = {
  logos: HeroTrustLogo[];
  label?: string;
};

const STRIP = "/brand/trust/enterprises-strip.png";

function TrustMark({ logo }: { logo: HeroTrustLogo }) {
  if (logo.imageSrc) {
    return <img src={logo.imageSrc} alt="" className="orbit-hero-trust-img" loading="lazy" decoding="async" />;
  }
  return <span className="orbit-hero-trust-word">{logo.label}</span>;
}

export function OrbitHeroTrustMarquee({ logos, label = "Enterprises that trust us" }: Props) {
  const custom = logos.filter((logo) => logo.imageSrc);
  const useStrip = custom.length === 0;

  return (
    <div className="orbit-hero-trust w-full" aria-label={label}>
      <p className="orbit-hero-trust-label">{label}</p>
      <div className="orbit-hero-trust-frame relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#07070c] to-transparent sm:w-14" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07070c] via-[#07070c]/70 to-transparent sm:w-24" />
        <div className="orbit-hero-trust-marquee-track flex w-max items-center">
          {useStrip
            ? [0, 1].map((copy) => (
                <img
                  key={`strip-${copy}`}
                  src={STRIP}
                  alt=""
                  className="orbit-hero-trust-strip"
                />
              ))
            : [...custom, ...custom].map((logo, index) => (
                <div key={`${logo.id}-${index}`} className="orbit-hero-trust-item flex shrink-0 items-center">
                  <TrustMark logo={logo} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
