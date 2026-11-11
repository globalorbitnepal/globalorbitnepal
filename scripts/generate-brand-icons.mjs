/**
 * Regenerate favicon, PWA icons, and default OG image from brand assets.
 * Source globe: public/brand/globe-emblem.webp (copy from design handoff if missing).
 */
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const brand = path.join(root, "public/brand");
const icons = path.join(root, "public/icons");
const appDir = path.join(root, "app");

const GLOBE = path.join(brand, "globe-emblem.webp");
const LOGO = path.join(brand, "logo-official-gold.png");
const BG = { r: 7, g: 7, b: 11, alpha: 1 };
/** Google SERP shows favicons on a light background — use white so the gold globe reads clearly. */
const SERP_BG = { r: 255, g: 255, b: 255, alpha: 1 };

async function squareGlobe(size, outPath, { background = BG, padding = 0.12 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const globe = await sharp(GLOBE).resize(inner, inner, { fit: "contain" }).png().toBuffer();
  const canvas = sharp({
    create: { width: size, height: size, channels: 4, background },
  });
  await canvas
    .composite([{ input: globe, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function buildOgDefault() {
  const w = 1200;
  const h = 630;
  const logoBuf = await sharp(LOGO)
    .resize(520, null, { fit: "inside" })
    .png()
    .toBuffer();
  const globeBuf = await sharp(GLOBE)
    .resize(340, 340, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp({
    create: { width: w, height: h, channels: 3, background: { r: 7, g: 7, b: 11 } },
  })
    .composite([
      { input: logoBuf, left: 72, top: Math.round((h - 280) / 2) },
      { input: globeBuf, left: w - 420, top: Math.round((h - 340) / 2) },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(brand, "og-default.jpg"));
}

async function main() {
  if (!existsSync(GLOBE)) {
    console.error(`Missing ${GLOBE}`);
    process.exit(1);
  }
  mkdirSync(icons, { recursive: true });

  await squareGlobe(512, path.join(icons, "pwa-512.png"));
  await squareGlobe(512, path.join(icons, "pwa-maskable-512.png"), { padding: 0.2 });
  await squareGlobe(192, path.join(icons, "pwa-192.png"));
  await squareGlobe(180, path.join(icons, "apple-touch-180.png"), { background: SERP_BG, padding: 0.07 });
  await squareGlobe(96, path.join(icons, "favicon-96.png"), { background: SERP_BG, padding: 0.06 });
  await squareGlobe(48, path.join(icons, "favicon-48.png"), { background: SERP_BG, padding: 0.06 });
  await squareGlobe(32, path.join(icons, "favicon-32.png"), { background: SERP_BG, padding: 0.06 });
  await squareGlobe(512, path.join(brand, "logo-emblem-square.png"));
  await squareGlobe(192, path.join(brand, "google-logo-192.png"), { background: SERP_BG, padding: 0.06 });

  await buildOgDefault();

  await sharp(path.join(icons, "favicon-48.png")).toFile(path.join(appDir, "icon.png"));
  await sharp(path.join(icons, "favicon-48.png")).toFile(path.join(root, "public/favicon.png"));

  await sharp(path.join(icons, "apple-touch-180.png")).toFile(path.join(appDir, "apple-icon.png"));

  console.log("Brand icons generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
