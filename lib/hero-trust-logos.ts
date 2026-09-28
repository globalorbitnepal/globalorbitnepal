import { ORBIT_PROJECTS } from "@/lib/orbit/catalog";

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

export const DEFAULT_HERO_TRUST_LOGOS: HeroTrustLogo[] = ORBIT_PROJECTS.slice(0, 18).map((project, index) => ({
  id: slugify(project.title, index),
  label: project.title,
}));

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
  return parsed.length > 0 ? parsed : DEFAULT_HERO_TRUST_LOGOS;
}
