/** Browser cards parked left/right of the globe — always visible. */
export const EARTH_ORBIT_SITES = [
  { id: "earth-first-choice", host: "firstchoiceinterior.com", image: "/brand/projects/demo-first-choice-interior.webp" },
  { id: "earth-kaya", host: "kayahealing.spa", image: "/brand/projects/demo-kaya-spa.webp" },
  { id: "earth-marlo", host: "marlohotels.com", image: "/brand/projects/demo-marlo-hotels.webp" },
  { id: "earth-zen", host: "zenspa.com", image: "/brand/projects/demo-zen-spa.webp" },
  { id: "earth-thamel", host: "thamelpark.com", image: "/brand/projects/demo-thamel-park-hotel.webp" },
  { id: "earth-ambition", host: "ambitionholidays.com", image: "/brand/projects/demo-ambition-holidays.webp" },
  { id: "earth-summit", host: "summitseek.com", image: "/brand/projects/demo-summit-seek.webp" },
] as const;

/** Percent positions: 4 left, 3 right, all inside the globe band. */
export const EARTH_SIDE_LAYOUT = [
  { left: 7, top: 20 },
  { left: 3, top: 40 },
  { left: 8, top: 60 },
  { left: 4, top: 78 },
  { left: 93, top: 22 },
  { left: 97, top: 44 },
  { left: 92, top: 66 },
] as const;

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
  tilt = 0.22,
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
  const orbit = 1.32;
  x *= orbit;
  y *= orbit;
  z *= orbit;
  const cam = 2.22;
  const zEye = cam - z;
  const persp = 2.2 / zEye;
  return {
    x: x * persp,
    y: -y * persp,
    z,
    scale: clamp(0.78 + persp * 0.18, 0.72, 1.08),
    depth: z,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
