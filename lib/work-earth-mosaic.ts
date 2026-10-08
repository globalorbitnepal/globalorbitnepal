/** Orbiting browser cards in lat/lng. Positions are projected in JS around the globe. */
export const EARTH_FLOATER_SLOTS = [
  { lat: 18, lng: -40 },
  { lat: -14, lng: 8 },
  { lat: 22, lng: 58 },
  { lat: -8, lng: 112 },
  { lat: 12, lng: -102 },
  { lat: -22, lng: -68 },
  { lat: 8, lng: 28 },
  { lat: -12, lng: 164 },
] as const;

export type EarthFloaterSlot = (typeof EARTH_FLOATER_SLOTS)[number];

/** Coarse land test in lat/lng — mosaic tiles only paint on continents. */
export function isLand(lat: number, lng: number): boolean {
  const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
    ((lng - cx) / rx) ** 2 + ((lat - cy) / ry) ** 2 <= 1;

  if (lat > 72 && lng > -75 && lng < -15) return ellipse(-42, 76, 28, 12);
  if (ellipse(-100, 52, 48, 26)) return true;
  if (ellipse(-104, 24, 22, 14)) return true;
  if (ellipse(-62, -14, 24, 34)) return true;
  if (ellipse(-70, -40, 12, 16)) return true;
  if (ellipse(10, 54, 32, 18)) return true;
  if (ellipse(-2, 54, 10, 10)) return true;
  if (ellipse(18, 8, 22, 36)) return true;
  if (ellipse(22, -22, 16, 18)) return true;
  if (ellipse(46, 26, 18, 16)) return true;
  if (ellipse(78, 26, 28, 22)) return true;
  if (ellipse(100, 36, 36, 22)) return true;
  if (ellipse(108, 0, 22, 14)) return true;
  if (ellipse(120, 16, 18, 12)) return true;
  if (ellipse(138, 36, 10, 14)) return true;
  if (ellipse(134, -24, 20, 16)) return true;
  if (ellipse(172, -42, 8, 10)) return true;
  if (ellipse(46, 62, 70, 16)) return true;
  if (lng > 95 && lng < 150 && lat > -11 && lat < 8) return true;
  if (Math.abs(lat) > 78) return true;
  return false;
}

export function projectOrbitCard(
  lat: number,
  lng: number,
  yawDeg: number,
  tilt = 0.28,
) {
  const yaw = (yawDeg * Math.PI) / 180;
  const phi = (lng * Math.PI) / 180 + yaw;
  const theta = ((90 - lat) * Math.PI) / 180;
  let x = Math.cos(phi) * Math.sin(theta);
  let y = Math.cos(theta);
  let z = Math.sin(phi) * Math.sin(theta);
  const cx = Math.cos(tilt);
  const sx = Math.sin(tilt);
  const y2 = y * cx - z * sx;
  const z2 = y * sx + z * cx;
  y = y2;
  z = z2;
  const orbit = 1.36;
  x *= orbit;
  y *= orbit;
  z *= orbit;
  const cam = 2.48;
  const zEye = cam - z;
  const persp = 2.18 / zEye;
  return {
    x: x * persp,
    y: -y * persp,
    z,
    scale: clamp(0.72 + persp * 0.28, 0.62, 1.18),
    depth: z,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
