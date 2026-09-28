export type HeroConfig = {
  eyebrow: string;
  headline: string;
  headlineSecond: string;
  lede: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  shipsOn: string;
  imageSrc: string;
  videoSrc: string;
  useVideo: boolean;
};

export const DEFAULT_HERO: HeroConfig = {
  eyebrow: "Web · Apps · SEO",
  headline: "Precise approach",
  headlineSecond: "to your product.",
  lede: "We specialize in guiding you from your original idea to a high-quality website, custom app, and SEO programme that fuels your growth.",
  primaryLabel: "Start a project",
  primaryHref: "/contact",
  secondaryLabel: "Know more",
  secondaryHref: "/projects",
  shipsOn: "Play store · App store",
  imageSrc: "/brand/studio-hero-phones.jpg",
  videoSrc: "/brand/hero-product.mp4",
  useVideo: true,
};

export function parseHeroConfig(raw: unknown): HeroConfig {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof HeroConfig, fallback: string) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  return {
    eyebrow: str("eyebrow", DEFAULT_HERO.eyebrow),
    headline: str("headline", DEFAULT_HERO.headline),
    headlineSecond: str("headlineSecond", DEFAULT_HERO.headlineSecond),
    lede: str("lede", DEFAULT_HERO.lede),
    primaryLabel: str("primaryLabel", DEFAULT_HERO.primaryLabel),
    primaryHref: str("primaryHref", DEFAULT_HERO.primaryHref),
    secondaryLabel: str("secondaryLabel", DEFAULT_HERO.secondaryLabel),
    secondaryHref: str("secondaryHref", DEFAULT_HERO.secondaryHref),
    shipsOn: str("shipsOn", DEFAULT_HERO.shipsOn),
    imageSrc: str("imageSrc", DEFAULT_HERO.imageSrc),
    videoSrc: str("videoSrc", DEFAULT_HERO.videoSrc),
    useVideo: data.useVideo === false || data.useVideo === "false" ? false : true,
  };
}
