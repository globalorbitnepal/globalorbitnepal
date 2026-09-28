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

/** Wordmarks matching the studio hero reference strip. */
export const DEFAULT_HERO_TRUST_LOGOS: HeroTrustLogo[] = [
  { id: "holiday-inn", label: "Holiday Inn" },
  { id: "stealthy", label: "STEALTHY" },
  { id: "param", label: "PARAM" },
  { id: "astro-vistaar", label: "ASTRO VISTAAR" },
  { id: "antara", label: "ANTARA" },
  { id: "ageasy", label: "AGEasy" },
  { id: "matrix", label: "MATRIX" },
  { id: "gensol", label: "GENSOL" },
  { id: "valuepersoft", label: "Valuepersoft" },
];

function isLegacyAutoLogos(parsed: HeroTrustLogo[]) {
  if (parsed.some((logo) => logo.imageSrc)) return false;
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
  return hits >= 3;
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
    const imageSrc = typeof row.imageSrc === "string" && row.imageSrc.trim() ? row.imageSrc.trim() : undefined;
    parsed.push({ id, label, imageSrc });
  }
  if (parsed.length === 0 || isLegacyAutoLogos(parsed)) {
    return DEFAULT_HERO_TRUST_LOGOS;
  }
  return parsed;
}
