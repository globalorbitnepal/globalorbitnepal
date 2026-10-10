import Link from "next/link";
import type { HeroConfig } from "@/lib/hero-config";
import { HERO_FEATURE_ITEMS } from "@/lib/hero-feature-items";

type Props = {
  config: HeroConfig;
};

export function OrbitStudioHeroCopy({ config }: Props) {
  return (
    <div className="orbit-studio-hero-shell">
      <div className="orbit-studio-hero-copy">
        <p className="orbit-hero-eyebrow">
          <span className="orbit-hero-eyebrow-line" aria-hidden="true" />
          {config.eyebrow}
        </p>
        <h1 id="home-hero-heading" className="orbit-hero-headline">
          <span className="block">{config.headline}</span>
          {config.headlineSecond ? (
            <span className="orbit-hero-headline-accent">{config.headlineSecond}</span>
          ) : null}
        </h1>
        <p className="orbit-hero-lede">{config.lede}</p>
        <div className="orbit-hero-cta">
          <Link href={config.primaryHref} className="orbit-hero-cta-btn">
            {config.primaryLabel}
          </Link>
          <Link href={config.secondaryHref} className="orbit-hero-cta-ghost">
            <span className="orbit-hero-play" aria-hidden="true">▶</span>
            {config.secondaryLabel}
          </Link>
        </div>
        <a href="#need-heading" className="orbit-hero-scroll">
          <span className="orbit-hero-scroll-mouse" aria-hidden="true" />
          Scroll Down
        </a>
      </div>

      <ul className="orbit-hero-features">
        {HERO_FEATURE_ITEMS.map((item) => (
          <li key={item.title}>
            <span className="orbit-hero-feature-icon">{item.icon}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.hint}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
