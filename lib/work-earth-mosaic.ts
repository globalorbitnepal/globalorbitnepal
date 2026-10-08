/** Orbiting browser cards (degrees). Keep these few — GPU-cheap CSS 3D, not the globe mesh. */
export const EARTH_FLOATER_SLOTS = [
  { lat: 8, lng: -52 },
  { lat: -10, lng: 18 },
  { lat: 16, lng: 78 },
  { lat: -6, lng: 132 },
  { lat: 12, lng: -118 },
  { lat: -16, lng: -88 },
  { lat: 22, lng: 42 },
  { lat: -12, lng: 168 },
] as const;

/** Coarse land test in lat/lng — mosaic tiles only paint on continents. */
export function isLand(lat: number, lng: number): boolean {
  const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
    ((lng - cx) / rx) ** 2 + ((lat - cy) / ry) ** 2 <= 1;

  if (ellipse(-100, 48, 42, 28)) return true;
  if (ellipse(-88, 20, 18, 14)) return true;
  if (ellipse(-62, -12, 22, 32)) return true;
  if (ellipse(12, 8, 18, 34)) return true;
  if (ellipse(18, 52, 28, 18)) return true;
  if (ellipse(80, 32, 48, 28)) return true;
  if (ellipse(105, 0, 22, 16)) return true;
  if (ellipse(135, -25, 18, 14)) return true;
  if (lng > 25 && lng < 45 && lat > 8 && lat < 32) return true;
  return false;
}
