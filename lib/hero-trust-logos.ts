export type HeroTrustLogo = {
  id: string;
  label: string;
  imageSrc?: string;
};

function slugify(title: string, index: number) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `client-${index}`;
}

/** White transparent SVG wordmarks for the hero marquee. */
export const DEFAULT_HERO_TRUST_LOGOS: HeroTrustLogo[] = [
  { id: "holiday-inn", label: "Holiday Inn", imageSrc: "/brand/trust/holiday-inn.svg" },
  { id: "stealthy", label: "STEALTHY", imageSrc: "/brand/trust/stealthy.svg" },
  { id: "param", label: "PARAM", imageSrc: "/brand/trust/param.svg" },
  { id: "astro-vistaar", label: "ASTRO VISTAAR", imageSrc: "/brand/trust/astro-vistaar.svg" },
  { id: "antara", label: "ANTARA", imageSrc: "/brand/trust/antara.svg" },
  { id: "ageasy", label: "AGEasy", imageSrc: "/brand/trust/ageasy.svg" },
  { id: "matrix", label: "MATRIX", imageSrc: "/brand/trust/matrix.svg" },
  { id: "gensol", label: "GENSOL", imageSrc: "/brand/trust/gensol.svg" },
  { id: "valuepersoft", label: "Valuepersoft", imageSrc: "/brand/trust/valuepersoft.svg" },
];

const DEFAULT_BY_ID = new Map(DEFAULT_HERO_TRUST_LOGOS.map((logo) => [logo.id, logo]));

function isLegacyAutoLogos(parsed: HeroTrustLogo[]) {
  const labels = parsed.map((logo) => logo.label.toLowerCase());
  const hits = labels.filter(
    (label) =>
      label.includes("hotel") ||
      label.includes("pokhara") ||
      label.includes("annapurna") ||
      label.includes("everest") ||
      label.includes("himalaya") ||
      label.includes("lakeside"),
  ).length;
  if (hits >= 3) return true;
  return parsed.some((logo) => (logo.imageSrc || "").includes("enterprises-strip"));
}

export function parseTrustLogos(raw: unknown): HeroTrustLogo[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_HERO_TRUST_LOGOS;
  }
  const parsed: HeroTrustLogo[] = [];
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const label = typeof row.label === "string" ? row.label.trim() : "";
    if (!label) continue;
    const id =
      typeof row.id === "string" && row.id.trim()
        ? row.id.trim().replace(/[^a-zA-Z0-9_-]/g, "")
        : slugify(label, i);
    let imageSrc = typeof row.imageSrc === "string" && row.imageSrc.trim() ? row.imageSrc.trim() : undefined;
    if (imageSrc?.includes("enterprises-strip")) imageSrc = undefined;
    const fallback = DEFAULT_BY_ID.get(id);
    parsed.push({
      id,
      label,
      imageSrc: imageSrc || fallback?.imageSrc,
    });
  }
  if (parsed.length === 0 || isLegacyAutoLogos(parsed)) {
    return DEFAULT_HERO_TRUST_LOGOS;
  }
  return parsed;
}
