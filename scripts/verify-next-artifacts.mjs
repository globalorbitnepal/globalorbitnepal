#!/usr/bin/env node
/**
 * Fail the deploy if the Next.js output is incomplete (prevents "Application error" from stale .next).
 */
import fs from "node:fs";
import path from "node:path";

const distDir = process.env.NEXT_DIST_DIR?.trim() || ".next";
const root = process.cwd();
const base = path.join(root, distDir);

const required = [
  "BUILD_ID",
  "routes-manifest.json",
  "server/app-paths-manifest.json",
  "server/pages-manifest.json",
  "server/app/page.js",
  "server/app/orbit/page.js",
  "server/middleware-manifest.json",
];

const missing = required.filter((rel) => !fs.existsSync(path.join(base, rel)));

if (missing.length) {
  console.error("NEXT_BUILD_VERIFY_FAIL: missing artifacts in", distDir);
  for (const rel of missing) console.error("  -", rel);
  process.exit(1);
}

const buildId = fs.readFileSync(path.join(base, "BUILD_ID"), "utf8").trim();
if (!buildId || buildId.length < 8) {
  console.error("NEXT_BUILD_VERIFY_FAIL: invalid BUILD_ID");
  process.exit(1);
}

console.log("NEXT_BUILD_VERIFY_OK:", distDir, "build", buildId);
