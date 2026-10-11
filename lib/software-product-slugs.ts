export const SOFTWARE_PRODUCT_SLUGS = [
  "billing-software",
  "hotel-management-system",
  "ota-management-system",
  "warehouse-management",
  "restaurant-pos",
  "crm-software",
] as const;

export type SoftwareProductSlug = (typeof SOFTWARE_PRODUCT_SLUGS)[number];

export function isSoftwareProductSlug(slug: string): slug is SoftwareProductSlug {
  return (SOFTWARE_PRODUCT_SLUGS as readonly string[]).includes(slug);
}

export function softwareProductPath(slug: SoftwareProductSlug) {
  return `/orbit-software/${slug}`;
}
