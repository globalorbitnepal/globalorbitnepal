/**
 * IndexNow submission (Bing, Yandex, Seznam, Naver).
 *
 * Google does not consume IndexNow; for Google use Search Console → Sitemaps
 * (the sitemap is already declared in robots.txt) and URL Inspection.
 *
 * Usage:
 *   INDEXNOW_KEY=<your-key> npm run seo:indexnow
 *   INDEXNOW_KEY=<your-key> npm run seo:indexnow -- --dry
 *
 * The key must also be served at https://<host>/<key>.txt — this script writes it
 * to public/ so the verification file is deployed with the build.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = (process.env.BASE_URL || "https://theglobalorbit.com").replace(/\/$/, "");
const KEY = (process.env.INDEXNOW_KEY || "").trim();
const DRY = process.argv.includes("--dry");
const UA = "GlobalOrbit-IndexNow/1.0";

if (!KEY || !/^[a-zA-Z0-9-]{8,128}$/.test(KEY)) {
  console.error("FAIL: set INDEXNOW_KEY (8–128 chars, letters/digits/hyphen).");
  process.exit(1);
}

const keyFile = path.join(root, "public", `${KEY}.txt`);
writeFileSync(keyFile, KEY, "utf8");
console.log(`Wrote ${keyFile}`);

const smRes = await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } });
if (smRes.status !== 200) {
  console.error(`FAIL: sitemap HTTP ${smRes.status}`);
  process.exit(1);
}
const sm = await smRes.text();
const urlList = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (!urlList.length) {
  console.error("FAIL: sitemap contained no URLs");
  process.exit(1);
}
console.log(`Prepared ${urlList.length} URLs from ${BASE}/sitemap.xml`);

if (DRY) {
  console.log("Dry run — nothing submitted.");
  process.exit(0);
}

const keyLocation = `${BASE}/${KEY}.txt`;
const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

let ok = 0;
for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8", "user-agent": UA },
      body: JSON.stringify({
        host: new URL(BASE).host,
        key: KEY,
        keyLocation,
        urlList,
      }),
    });
    const status = res.status;
    // IndexNow uses 200/202 for accepted submissions.
    if (status === 200 || status === 202) {
      ok += 1;
      console.log(`PASS: ${endpoint} — HTTP ${status}`);
    } else {
      console.log(`FAIL: ${endpoint} — HTTP ${status}`);
    }
  } catch (err) {
    console.log(`FAIL: ${endpoint} — ${err.message}`);
  }
}

console.log(`\nAccepted by ${ok}/${endpoints.length} endpoints.`);
if (!ok) process.exit(1);
