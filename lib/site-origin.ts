/**
 * Canonical public site origin.
 *
 * Staging (current VPS public hostname): https://arnav.theglobalorbit.com
 * Intended production cutover:          https://theglobalorbit.com
 *
 * Set NEXT_PUBLIC_SITE_URL in the server .env for the environment you are
 * serving. Never hardcode a hostname in page metadata or JSON-LD — use
 * SITE_ORIGIN / absoluteUrl() instead.
 *
 * IMPORTANT: https://theglobalorbit.com currently hosts a different property.
 * Do not flip this default to theglobalorbit.com until DNS/cutover is authorized
 * and that host is pointed at this app.
 */
const FALLBACK_PUBLIC_ORIGIN = "https://arnav.theglobalorbit.com";
const INTENDED_PRODUCTION_ORIGIN = "https://theglobalorbit.com";

function normalizeOrigin(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

export const SITE_ORIGIN =
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? FALLBACK_PUBLIC_ORIGIN;

/** Documented target after authorized domain migration (not used as runtime default). */
export const INTENDED_PRODUCTION_SITE_ORIGIN = INTENDED_PRODUCTION_ORIGIN;

/** True when this build is configured for the final apex domain. */
export function isProductionApexOrigin(): boolean {
  return SITE_ORIGIN === INTENDED_PRODUCTION_ORIGIN;
}

/** Default Open Graph / Twitter image (absolute path on site). */
export const DEFAULT_OG_IMAGE_PATH = "/brand/hero-uhd.jpg";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}
