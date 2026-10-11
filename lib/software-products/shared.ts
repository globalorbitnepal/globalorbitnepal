import type { SoftwareProductSlug } from "@/lib/software-product-slugs";
import { ORBIT_SOFTWARE } from "@/lib/orbit/catalog";

export const SOFTWARE_CTA = {
  primaryHref: "/contact",
  primaryLabel: "Request a Demo",
  secondaryHref: "/contact",
  secondaryLabel: "Contact Sales",
  exploreHref: "#product-features",
  exploreLabel: "Explore Features",
};

export function relatedProducts(slugs: SoftwareProductSlug[]) {
  return slugs
    .map((slug) => ORBIT_SOFTWARE.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
