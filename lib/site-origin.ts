export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://arnav.theglobalorbit.com";

/** Default Open Graph / Twitter image (absolute path on site). */
export const DEFAULT_OG_IMAGE_PATH = "/brand/hero-uhd.jpg";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
