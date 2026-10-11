import type { SoftwareProductContent } from "@/lib/software-product-types";
import type { SoftwareProductSlug } from "@/lib/software-product-slugs";
import { BILLING_SOFTWARE } from "@/lib/software-products/billing-software";
import { HOTEL_MANAGEMENT } from "@/lib/software-products/hotel-management-system";
import { OTA_MANAGEMENT } from "@/lib/software-products/ota-management-system";
import { WAREHOUSE_MANAGEMENT } from "@/lib/software-products/warehouse-management";
import { RESTAURANT_POS } from "@/lib/software-products/restaurant-pos";
import { CRM_SOFTWARE } from "@/lib/software-products/crm-software";

const BY_SLUG: Record<SoftwareProductSlug, SoftwareProductContent> = {
  "billing-software": BILLING_SOFTWARE,
  "hotel-management-system": HOTEL_MANAGEMENT,
  "ota-management-system": OTA_MANAGEMENT,
  "warehouse-management": WAREHOUSE_MANAGEMENT,
  "restaurant-pos": RESTAURANT_POS,
  "crm-software": CRM_SOFTWARE,
};

export function getSoftwareProductContent(slug: SoftwareProductSlug): SoftwareProductContent {
  return BY_SLUG[slug];
}

export function softwareProductTitle(slug: SoftwareProductSlug): string {
  return BY_SLUG[slug].h1;
}
