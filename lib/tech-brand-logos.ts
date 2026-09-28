/** Official brand marks via Simple Icons CDN (vector, brand-accurate). */
export const TECH_BRAND_LOGOS: Record<
  string,
  { slug: string; hex: string; label: string }
> = {
  "Next.js": { slug: "nextdotjs", hex: "ffffff", label: "Next.js" },
  Laravel: { slug: "laravel", hex: "FF2D20", label: "Laravel" },
  React: { slug: "react", hex: "61DAFB", label: "React" },
  "Node.js": { slug: "nodedotjs", hex: "5FA04E", label: "Node.js" },
  MySQL: { slug: "mysql", hex: "4479A1", label: "MySQL" },
  PostgreSQL: { slug: "postgresql", hex: "4169E1", label: "PostgreSQL" },
};

export function techBrandLogoUrl(slug: string, hex: string) {
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}
