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
        loading="eager"
        decoding="async"
      />
    );
  }
  return <span className="orbit-hero-trust-word">{logo.label}</span>;
}

export function OrbitHeroTrustMarquee({ logos, label = "Enterprises that trust us" }: Props) {
  if (!logos.length) return null;

  return (
    <div className="orbit-hero-trust w-full" aria-label={label}>
      <p className="orbit-hero-trust-label">{label}</p>
      <div className="orbit-hero-trust-frame">
        <div className="orbit-hero-trust-static">
          {logos.map((logo) => (
            <div key={logo.id} className="orbit-hero-trust-item">
              <TrustMark logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
