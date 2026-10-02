export const PLATFORM_PAGE_SLUGS = ["android-apps", "ios-apps", "web-apps"] as const;
export type PlatformPageSlug = (typeof PLATFORM_PAGE_SLUGS)[number];

export function isPlatformPageSlug(slug: string): slug is PlatformPageSlug {
  return (PLATFORM_PAGE_SLUGS as readonly string[]).includes(slug);
}

export function platformPagePath(slug: PlatformPageSlug) {
  return `/orbit-software/${slug}`;
}
