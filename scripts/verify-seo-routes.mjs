/**
 * Post-build sanity check: sitemap module paths and SEO defaults stay in sync.
 * Run: npm run build && node scripts/verify-seo-routes.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function read(rel) {
  return readFileSync(path.join(root, rel), "utf8");
}

const inventory = read("lib/route-inventory.ts");
const defaults = read("lib/seo-page-defaults.ts");
const sitemap = read("lib/public-sitemap-urls.ts");

const checks = [
  ["route-inventory exports listInventoryPathStrings", inventory.includes("listInventoryPathStrings")],
  ["sitemap uses route inventory", sitemap.includes("listInventoryPathStrings")],
  ["seo defaults include ORBIT_LANDINGS", defaults.includes("ORBIT_LANDINGS")],
  ["seo defaults include ORBIT_SERVICE_PAGES", defaults.includes("ORBIT_SERVICE_PAGES")],
  ["redirects in next.config", read("next.config.ts").includes("/portfolio")],
  [
    "sitemap does not block /orbit-software",
    !read("lib/public-sitemap-urls.ts").includes('path.startsWith("/orbit")'),
  ],
];

let failed = 0;
for (const [label, ok] of checks) {
  if (!ok) {
    console.error("FAIL:", label);
    failed += 1;
  } else {
    console.log("PASS:", label);
  }
}

if (failed > 0) {
  process.exit(1);
}
console.log("SEO route wiring checks passed.");
