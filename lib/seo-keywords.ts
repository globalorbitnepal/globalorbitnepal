/** High-intent Nepal + digital agency keywords (titles, meta, on-page copy). */
export const NEPAL_AGENCY_KEYWORDS = [
  "web developer nepal",
  "website development nepal",
  "web development company kathmandu",
  "website design nepal",
  "seo services nepal",
  "seo company nepal",
  "digital marketing nepal",
  "social media marketing nepal",
  "facebook ads nepal",
  "google ads nepal",
  "web application development nepal",
  "mobile app development nepal",
  "ecommerce website nepal",
  "custom software development nepal",
  "erp software nepal",
  "google ranking nepal",
  "local seo nepal",
  "website banau nepal",
  "professional website kathmandu",
  "Global Orbit Nepal",
] as const;

export function keywordsCsv(extra: string[] = []): string[] {
  const set = new Set<string>([...NEPAL_AGENCY_KEYWORDS, ...extra]);
  return [...set];
}

export function keywordsString(extra: string[] = []): string {
  return keywordsCsv(extra).join(", ");
}
