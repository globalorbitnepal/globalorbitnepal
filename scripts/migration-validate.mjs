/**
 * Pre-cutover / post-cutover SEO host validation.
 *
 * Staging (safe anytime):
 *   BASE_URL=https://arnav.theglobalorbit.com EXPECT_ORIGIN=https://arnav.theglobalorbit.com \
 *     node scripts/migration-validate.mjs
 *
 * Production after authorized cutover (must FAIL if arnav remains in SEO output):
 *   BASE_URL=https://theglobalorbit.com EXPECT_ORIGIN=https://theglobalorbit.com \
 *     node scripts/migration-validate.mjs
 *
 * Exit 0 = PASS, exit 1 = FAIL.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = (process.env.BASE_URL || "").replace(/\/$/, "");
const EXPECT = (process.env.EXPECT_ORIGIN || BASE).replace(/\/$/, "");
const STAGING_HOST = "arnav.theglobalorbit.com";
const APEX_HOST = "theglobalorbit.com";
const FORBIDDEN_IN_APEX_SEO = STAGING_HOST;

if (!BASE || !EXPECT) {
  console.error("FAIL: set BASE_URL and EXPECT_ORIGIN (https://host, no trailing slash)");
  process.exit(1);
}

const expectHost = new URL(EXPECT).host;
const isApexExpect = expectHost === APEX_HOST || expectHost === `www.${APEX_HOST}`;

const results = [];
function record(name, status, detail = "") {
  results.push({ name, status, detail });
  const mark = status === "PASS" ? "PASS" : status === "BLOCKED" ? "BLOCKED" : "FAIL";
  console.log(`${mark}: ${name}${detail ? ` — ${detail}` : ""}`);
}

async function fetchText(url, opts = {}) {
  const res = await fetch(url, {
    redirect: opts.redirect || "manual",
    headers: { "user-agent": "GlobalOrbit-Migration-Validate/1.0" },
  });
  const text = res.status >= 200 && res.status < 400 && !res.headers.get("location")
    ? await res.text()
    : res.status >= 200 && res.status < 300
      ? await res.text()
      : "";
  return { status: res.status, location: res.headers.get("location"), text, headers: res.headers };
}

function attr(html, name) {
  const re = new RegExp(
    `(?:name|property|rel)=["']${name}["'][^>]*content=["']([^"']*)["']|content=["']([^"']*)["'][^>]*(?:name|property|rel)=["']${name}["']`,
    "i",
  );
  const m = html.match(re);
  return m ? m[1] || m[2] || null : null;
}

function canonical(html) {
  const m = html.match(
    /rel=["']canonical["'][^>]*href=["']([^"']+)["']|href=["']([^"']+)["'][^>]*rel=["']canonical["']/i,
  );
  return m ? m[1] || m[2] : null;
}

function assertNoStagingLeak(label, text) {
  if (!isApexExpect) return true;
  if (text.includes(FORBIDDEN_IN_APEX_SEO)) {
    record(label, "FAIL", `contains forbidden staging host ${FORBIDDEN_IN_APEX_SEO}`);
    return false;
  }
  return true;
}

function assertHost(label, urlOrHost) {
  if (!urlOrHost) {
    record(label, "FAIL", "missing");
    return false;
  }
  let host;
  try {
    host = urlOrHost.includes("://") ? new URL(urlOrHost).host : urlOrHost.replace(/^https?:\/\//, "");
  } catch {
    record(label, "FAIL", `unparseable: ${urlOrHost}`);
    return false;
  }
  const ok =
    host === expectHost ||
    (expectHost === APEX_HOST && host === APEX_HOST) ||
    (isApexExpect && host === APEX_HOST);
  if (!ok) {
    record(label, "FAIL", `got host ${host}, expected ${expectHost}`);
    return false;
  }
  record(label, "PASS", host);
  return true;
}

const SPOT_PATHS = ["/", "/contact", "/service/website-development-nepal", "/orbit-software", "/about"];

async function main() {
  console.log(`BASE_URL=${BASE}`);
  console.log(`EXPECT_ORIGIN=${EXPECT}`);
  console.log(`Apex leak check: ${isApexExpect ? "ON (fail on arnav in SEO)" : "off (staging mode)"}`);

  // Reachability
  const home = await fetchText(`${BASE}/`);
  if (home.status !== 200) {
    if (isApexExpect && (home.status === 0 || home.status >= 400)) {
      record("apex_reachable", "BLOCKED", `HTTP ${home.status} — apex may not serve this app yet`);
    } else {
      record("home_http", "FAIL", `HTTP ${home.status}`);
    }
  } else {
    record("home_http", "PASS", "200");
    const titleOk = /Global Orbit/i.test(home.text) || /<title>/i.test(home.text);
    record("home_has_title", titleOk ? "PASS" : "FAIL");
    const canon = canonical(home.text);
    assertHost("home_canonical_host", canon);
    assertNoStagingLeak("home_canonical_no_arnav", canon || "");
    assertNoStagingLeak("home_html_seo_no_arnav", [
      canon,
      attr(home.text, "og:url"),
      attr(home.text, "og:image"),
      home.text.match(/application\/ld\+json[\s\S]{0,8000}/i)?.[0] || "",
    ].join("\n"));
    assertHost("home_og_url_host", attr(home.text, "og:url"));
    const ogImage = attr(home.text, "og:image");
    if (ogImage) assertHost("home_og_image_host", ogImage);
    else record("home_og_image_host", "FAIL", "missing og:image");
    if (home.text.includes("application/ld+json")) {
      record("home_jsonld_present", "PASS");
      const ldHosts = [...home.text.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)]
        .map((m) => m[1])
        .filter((h) => h.includes("theglobalorbit.com"));
      if (isApexExpect && ldHosts.some((h) => h.includes("arnav."))) {
        record("home_jsonld_no_arnav", "FAIL", "arnav found in page absolute URLs near JSON-LD");
      } else if (isApexExpect) {
        record("home_jsonld_no_arnav", "PASS");
      } else {
        record("home_jsonld_staging_hosts", "PASS", "staging mode — arnav expected");
      }
    } else {
      record("home_jsonld_present", "FAIL", "no ld+json");
    }
  }

  // robots
  const robots = await fetchText(`${BASE}/robots.txt`);
  if (robots.status !== 200) {
    record("robots_http", isApexExpect ? "BLOCKED" : "FAIL", `HTTP ${robots.status}`);
  } else {
    record("robots_http", "PASS");
    if (!robots.text.includes("Sitemap:")) record("robots_sitemap_dir", "FAIL", "missing Sitemap");
    else record("robots_sitemap_dir", "PASS");
    if (isApexExpect) {
      assertNoStagingLeak("robots_no_arnav", robots.text);
      if (robots.text.includes(`Host: ${APEX_HOST}`) || robots.text.includes(`Sitemap: ${EXPECT}/sitemap.xml`)) {
        record("robots_apex_host", "PASS");
      } else {
        record("robots_apex_host", "FAIL", "Host/Sitemap not apex");
      }
    } else {
      if (robots.text.includes(STAGING_HOST)) record("robots_staging_host", "PASS");
      else record("robots_staging_host", "FAIL", "expected arnav in staging robots");
    }
  }

  // sitemap
  const sm = await fetchText(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) {
    record("sitemap_http", isApexExpect ? "BLOCKED" : "FAIL", `HTTP ${sm.status}`);
  } else {
    const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    record("sitemap_http", "PASS", `${locs.length} locs`);
    if (isApexExpect) {
      assertNoStagingLeak("sitemap_no_arnav", sm.text);
      const bad = locs.filter((u) => !u.startsWith(EXPECT) && !u.startsWith(`https://${APEX_HOST}`));
      record("sitemap_locs_apex", bad.length ? "FAIL" : "PASS", bad.length ? bad.slice(0, 3).join(", ") : "all apex");
    } else {
      const bad = locs.filter((u) => !u.startsWith(EXPECT));
      record("sitemap_locs_expect", bad.length ? "FAIL" : "PASS", `${locs.length} urls`);
    }
  }

  // spot pages
  for (const p of SPOT_PATHS) {
    if (p === "/") continue;
    const page = await fetchText(`${BASE}${p}`);
    if (page.status !== 200) {
      record(`page_${p}`, isApexExpect && page.status !== 200 ? "BLOCKED" : "FAIL", `HTTP ${page.status}`);
      continue;
    }
    const c = canonical(page.text);
    const og = attr(page.text, "og:url");
    let ok = true;
    if (!assertHost(`canonical_${p}`, c)) ok = false;
    if (og && !assertHost(`ogurl_${p}`, og)) ok = false;
    if (isApexExpect) {
      if (!assertNoStagingLeak(`no_arnav_${p}`, [c, og, page.text.slice(0, 50000)].join("\n"))) ok = false;
    }
    if (ok) record(`page_${p}`, "PASS");
  }

  // Internal absolute links sample on homepage (staging mode allows arnav)
  if (home.status === 200) {
    const abs = [...home.text.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((m) => m[1]);
    const foreign = abs.filter((u) => {
      try {
        const h = new URL(u).host;
        return h.endsWith("theglobalorbit.com") && h !== expectHost && !(isApexExpect && h === APEX_HOST);
      } catch {
        return false;
      }
    });
    if (isApexExpect) {
      const arnavLinks = abs.filter((u) => u.includes(STAGING_HOST));
      record(
        "home_internal_abs_no_arnav",
        arnavLinks.length ? "FAIL" : "PASS",
        arnavLinks.length ? arnavLinks.slice(0, 3).join(" ") : "ok",
      );
    } else {
      record("home_abs_links_sampled", "PASS", `${abs.length} absolute hrefs scanned`);
    }
    if (foreign.length && isApexExpect) {
      // www links might appear — flag only arnav
    }
  }

  // Optional redirect check (post-cutover): staging should 301 to apex
  if (process.env.CHECK_STAGING_REDIRECT === "1") {
    const r = await fetchText(`https://${STAGING_HOST}/contact`, { redirect: "manual" });
    if (r.status === 301 || r.status === 308) {
      const loc = r.location || "";
      if (loc.startsWith(`${EXPECT}/contact`) || loc === `${EXPECT}/contact`) {
        record("staging_redirect_contact", "PASS", loc);
      } else {
        record("staging_redirect_contact", "FAIL", `Location=${loc}`);
      }
    } else {
      record("staging_redirect_contact", "FAIL", `expected 301, got ${r.status}`);
    }
  } else if (isApexExpect) {
    record("staging_redirect_contact", "BLOCKED", "set CHECK_STAGING_REDIRECT=1 after enabling nginx redirect");
  }

  const dir = path.join(root, "reports");
  mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "migration-validate-last.json");
  const summary = {
    at: new Date().toISOString(),
    BASE,
    EXPECT,
    isApexExpect,
    results,
  };
  writeFileSync(out, `${JSON.stringify(summary, null, 2)}\n`);

  const failed = results.filter((r) => r.status === "FAIL");
  const blocked = results.filter((r) => r.status === "BLOCKED");
  console.log(`\nSummary: PASS=${results.filter((r) => r.status === "PASS").length} FAIL=${failed.length} BLOCKED=${blocked.length}`);
  console.log(`Wrote ${out}`);
  if (failed.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
