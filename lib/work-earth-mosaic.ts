/** Fibonacci sphere — even distribution for mosaic thumbnails. */
export function fibonacciSpherePoints(count: number): { lat: number; lng: number }[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const t = count <= 1 ? 0 : i / (count - 1);
    const y = 1 - 2 * t;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const lngRad = Math.atan2(Math.sin(theta) * ring, Math.cos(theta) * ring);
    const lng = (lngRad * 180) / Math.PI;
    const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
    return { lat, lng };
  });
}

/** Larger demo browsers in orbit (degrees). */
export const EARTH_FLOATER_SLOTS = [
  { lat: 12, lng: -48 },
  { lat: -8, lng: -12 },
  { lat: 18, lng: 38 },
  { lat: -14, lng: 72 },
  { lat: 6, lng: 118 },
  { lat: -18, lng: 158 },
  { lat: 22, lng: -95 },
  { lat: -6, lng: -128 },
] as const;

export const EARTH_MOSAIC_TILE_COUNT = 108;
