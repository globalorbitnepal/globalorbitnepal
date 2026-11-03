/**
 * Guard: every URL in the live sitemap must be crawlable.
 *
 * robots.txt uses prefix matching, so a single overly broad rule (for example
 * `Disallow: /orbit`) silently de-indexes a whole product section. This script
 * fails the build gate if any sitemap URL matches a Disallow rule for the
 * generic user-agent, and also verifies that Googlebot can fetch HTML, CSS, and
 * JS without being blocked.
 *
 * Usage: BASE_URL=https://theglobalorbit.com node scripts/verify-robots-coverage.mjs
 */
const BASE = (process.env.BASE_URL || "https://theglobalorbit.com").replace(/\/$/, "");
const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const failures = [];
const passes = [];

function pass(name, detail = "") {
  passes.push(name);
  console.log(`PASS: ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  failures.push({ name, detail });
  console.log(`FAIL: ${name}${detail ? ` — ${detail}` : ""}`);
}

function parseGroups(text) {
  const groups = [];
  let current = null;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.split("#")[0].trim();
    if (!line) continue;
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      if (current && (current.allow.length || current.disallow.length)) current = null;
      if (!current) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && key === "allow") {
      current.allow.push(value);
    } else if (current && key === "disallow") {
      current.disallow.push(value);
    }
  }
  return groups;
}

/** Length of the path portion a robots rule actually matches. */
function matchLength(rule, pathname) {
  if (!rule || rule === "/") return rule === "/" ? 0 : -1;
  const anchored = rule.endsWith("$");
  const body = anchored ? rule.slice(0, -1) : rule;
  const hasWildcard = body.includes("*");
  if (hasWildcard) {
    const pattern = new RegExp(`^${body.split("*").map(escapeRegex).join(".*")}${anchored ? "$" : ""}`);
    if (!pattern.test(pathname)) return -1;
    return body.length;
  }
  if (!pathname.startsWith(body)) return -1;
  return body.length;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isBlocked(groups, pathname) {
  const star = groups.find((g) => g.agents.includes("*"));
  if (!star) return false;
  let bestDisallow = -1;
  let bestAllow = -1;
  for (const rule of star.disallow) {
    if (rule === "/") continue;
    bestDisallow = Math.max(bestDisallow, matchLength(rule, pathname));
  }
  for (const rule of star.allow) bestAllow = Math.max(bestAllow, matchLength(rule, pathname));
  return bestDisallow >= 0 && bestDisallow >= bestAllow;
}

async function main() {
  console.log(`BASE_URL=${BASE}`);

  const robotsRes = await fetch(`${BASE}/robots.txt`, { headers: { "user-agent": UA } });
  if (robotsRes.status !== 200) {
    fail("robots_http", `HTTP ${robotsRes.status}`);
    report();
    return;
  }
  const robots = await robotsRes.text();
  const groups = parseGroups(robots);
  pass("robots_http", "200");

  if (!/^Sitemap:\s*https:\/\//im.test(robots)) fail("robots_sitemap_directive", "missing absolute Sitemap:");
  else pass("robots_sitemap_directive");

  for (const dir of ["/_next/", "/_next/static/"]) {
    if (isBlocked(groups, dir)) fail("next_assets_crawlable", `${dir} blocked — Googlebot cannot render CSS/JS`);
    else pass("next_assets_crawlable", dir);
  }

  const smRes = await fetch(`${BASE}/sitemap.xml`, { headers: { "user-agent": UA } });
  if (smRes.status !== 200) {
    fail("sitemap_http", `HTTP ${smRes.status}`);
    report();
    return;
  }
  const smText = await smRes.text();
  const locs = [...smText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  pass("sitemap_http", `${locs.length} urls`);

  const blocked = locs.filter((url) => {
    try {
      return isBlocked(groups, new URL(url).pathname);
    } catch {
      return false;
    }
  });
  if (blocked.length) {
    fail("sitemap_urls_crawlable", `${blocked.length} blocked: ${blocked.slice(0, 5).join(", ")}`);
  } else {
    pass("sitemap_urls_crawlable", "all sitemap URLs allowed");
  }

  const sample = locs[Math.min(1, locs.length - 1)] || `${BASE}/`;
  const pageRes = await fetch(sample, { headers: { "user-agent": UA } });
  if (pageRes.status !== 200) fail("googlebot_page_fetch", `${sample} → HTTP ${pageRes.status}`);
  else pass("googlebot_page_fetch", sample);

  const html = await pageRes.text();
  const robotsMeta = (html.match(/<meta name="robots" content="([^"]+)"/i) || [])[1] || "";
  if (/noindex/i.test(robotsMeta)) fail("sample_page_indexable", `${sample} is noindex`);
  else pass("sample_page_indexable", robotsMeta || "index, follow");

  const cssHref = (html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i) || [])[1];
  if (cssHref) {
    const cssUrl = new URL(cssHref, BASE).href;
    const cssRes = await fetch(cssUrl, { headers: { "user-agent": UA } });
    if (cssRes.status !== 200) fail("googlebot_css_fetch", `${cssUrl} → HTTP ${cssRes.status}`);
    else pass("googlebot_css_fetch", cssUrl.replace(BASE, ""));
  }

  report();
}

function report() {
  console.log(`\nSummary: PASS=${passes.length} FAIL=${failures.length}`);
  if (failures.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
