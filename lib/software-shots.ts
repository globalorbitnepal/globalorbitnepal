/** Ultra-HD dashboard captures for homepage software catalog (1024×535). */
export const SOFTWARE_SHOT_WIDTH = 1024;
export const SOFTWARE_SHOT_HEIGHT = 535;

export const SOFTWARE_SHOTS: Record<string, { src: string; title: string }> = {
  "billing-software": {
    src: "/brand/orbit-software/uhd/billing-software.webp",
    title: "Billing Software",
  },
  "hotel-management-system": {
    src: "/brand/orbit-software/uhd/hotel-management.webp",
    title: "Hotel Management System",
  },
  "ota-management-system": {
    src: "/brand/orbit-software/uhd/ota-management.webp",
    title: "OTA Management System",
  },
  "warehouse-management": {
    src: "/brand/orbit-software/uhd/warehouse-management.webp",
    title: "Warehouse Management",
  },
  "restaurant-pos": {
    src: "/brand/orbit-software/uhd/restaurant-pos.webp",
    title: "Restaurant POS",
  },
  "crm-software": {
    src: "/brand/orbit-software/uhd/crm-software.webp",
    title: "CRM Software",
  },
};

export function softwareShotForSlug(slug: string) {
  return SOFTWARE_SHOTS[slug] ?? null;
}
