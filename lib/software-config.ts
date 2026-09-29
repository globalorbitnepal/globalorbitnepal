import { ORBIT_SOFTWARE } from "@/lib/orbit/catalog";

export type SoftwareProduct = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  previewSrc: string;
  accent: string;
};

export type SoftwareConfig = {
  kicker: string;
  headline: string;
  headlineAccent: string;
  lede: string;
  footerKicker: string;
  footerTitle: string;
  videoSrc: string;
  products: SoftwareProduct[];
};

const ACCENTS = [
  "#60a5fa",
  "#a78bfa",
  "#f0c43a",
  "#34d399",
  "#f87171",
  "#fb923c",
  "#2dd4bf",
  "#818cf8",
  "#38bdf8",
  "#4ade80",
];

export const DEFAULT_SOFTWARE: SoftwareConfig = {
  kicker: "Global Orbit",
  headline: "Enterprise software, already in",
  headlineAccent: "production",
  lede: "Billing, hotel ops, OTA, warehouse, manufacturing ERP, POS, CRM, custom apps, and the SaaS layer that runs them.",
  footerKicker: "Building a smarter tomorrow",
  footerTitle: "Technology for a Brighter World",
  videoSrc: "/brand/hero-product.mp4",
  products: ORBIT_SOFTWARE.map((item, index) => ({
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    href: item.href,
    previewSrc: `/brand/soft-previews/${String(index + 1).padStart(2, "0")}.png`,
    accent: ACCENTS[index] ?? ACCENTS[0],
  })),
};

function parseProduct(raw: unknown, fallback: SoftwareProduct): SoftwareProduct {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof SoftwareProduct) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback[key];
  };
  return {
    slug: fallback.slug,
    title: str("title"),
    summary: str("summary"),
    href: str("href"),
    previewSrc: str("previewSrc"),
    accent: str("accent"),
  };
}

export function parseSoftwareConfig(raw: unknown): SoftwareConfig {
  const data = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const str = (key: keyof SoftwareConfig, fallback: string) => {
    const value = data[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const productsRaw = Array.isArray(data.products) ? data.products : [];
  const products = DEFAULT_SOFTWARE.products.map((fallback, index) => {
    const bySlug = productsRaw.find(
      (p) => p && typeof p === "object" && (p as SoftwareProduct).slug === fallback.slug,
    );
    return parseProduct(bySlug ?? productsRaw[index], fallback);
  });
  return {
    kicker: str("kicker", DEFAULT_SOFTWARE.kicker),
    headline: str("headline", DEFAULT_SOFTWARE.headline),
    headlineAccent: str("headlineAccent", DEFAULT_SOFTWARE.headlineAccent),
    lede: str("lede", DEFAULT_SOFTWARE.lede),
    footerKicker: str("footerKicker", DEFAULT_SOFTWARE.footerKicker),
    footerTitle: str("footerTitle", DEFAULT_SOFTWARE.footerTitle),
    videoSrc: str("videoSrc", DEFAULT_SOFTWARE.videoSrc),
    products,
  };
}
