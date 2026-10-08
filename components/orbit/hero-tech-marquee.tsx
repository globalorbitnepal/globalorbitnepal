import { HERO_TECH_LOGOS } from "@/lib/hero-tech-logos";

export function OrbitHeroTechMarquee() {
  const row = [...HERO_TECH_LOGOS, ...HERO_TECH_LOGOS];

  return (
    <div className="orbit-hero-tech" aria-label="Technologies we build with">
      <div className="orbit-hero-tech-track">
        {row.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="orbit-hero-tech-item">
            <img src={logo.src} alt="" width={28} height={28} decoding="async" />
            <span>{logo.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
