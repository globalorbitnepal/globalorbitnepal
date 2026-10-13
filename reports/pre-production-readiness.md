# Pre-production readiness audit — Global Orbit

**Date:** 2026-10-14  
**Baseline commit:** `23b0633` (preserved; no SEO implementation changes in this pass)  
**Staging origin:** `https://arnav.theglobalorbit.com`  
**Intended production origin:** `https://theglobalorbit.com`  

## Checks re-run (evidence)

| Check | Command / method | Result |
|-------|------------------|--------|
| Git HEAD | `git rev-parse HEAD` | `23b0633d4d628bd02bc196df43d78a61a11dcebb` |
| Route wiring | `npm run seo:verify` | **PASS** (6/6) |
| Live sitemap crawl | `BASE_URL=https://arnav.theglobalorbit.com npm run seo:audit` | **PASS** — 64 URLs, Critical=0 High=0 Medium=0 Low=0 |
| Crawl artifact | `reports/seo-live-crawl.json` | `sitemapCount: 64`, `issues: []`, host set = `{arnav.theglobalorbit.com}` only |
| Page map | `reports/seo-page-map.csv` | 64 rows, all `arnav`, all status `200` |
| Prior audit doc | `reports/website-seo-audit.md` | Present; still accurate for staging |
| Migration doc | `docs/domain-migration.md` | Present; cutover still correctly blocked |

### Spot-check (staging HTTP)

| URL | HTTP | Canonical / notes |
|-----|------|-------------------|
| `/` | 200 | `https://arnav.theglobalorbit.com` — title Nepal company meta |
| `/robots.txt` | 200 | Host + Sitemap = arnav |
| `/sitemap.xml` | 200 | `<loc>` hosts = arnav |
| `/service/website-development-nepal` | 200 | canonical + og:url = arnav |
| `/contact` | 200 | canonical + og:url = arnav |

JSON-LD on homepage references `arnav.theglobalorbit.com` and `#organization` / `#website` (live HTML contains `application/ld+json`).

---

## Staging vs production origin (confirmed)

| Environment | Origin | How configured today |
|-------------|--------|----------------------|
| **Staging (live)** | `https://arnav.theglobalorbit.com` | Nginx `server_name arnav.theglobalorbit.com` → `127.0.0.1:3031`. No `NEXT_PUBLIC_SITE_URL` in server `.env`; runtime falls back to `FALLBACK_PUBLIC_ORIGIN` in `lib/site-origin.ts`. |
| **Production (intended)** | `https://theglobalorbit.com` | **Not active for this app.** Set only via `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` **after** authorized cutover + rebuild. |

**Evidence apex is not this deployment:**

| Fact | Value |
|------|--------|
| `arnav.theglobalorbit.com` A | `51.15.21.166` (this VPS) |
| `theglobalorbit.com` A | `216.24.57.1` (different — Cloudflare/CDN path) |
| `www.theglobalorbit.com` | Resolves toward Render/Cloudflare (`base44.onrender.com` CNAME chain) |
| Apex HTML title | “The Global Orbit” (separate live site) |
| Nginx on this VPS | Only `arnav.theglobalorbit.com` for GlobalOrbitNepal app |

**Do not** change DNS, overwrite apex content, set production `SITE_URL`, or add redirects without explicit authorization.

---

## Will staging URLs leak into production after cutover?

| Surface | Mechanism | After correct cutover |
|---------|-----------|------------------------|
| Sitemap | `absoluteUrl()` / `SITE_ORIGIN` | Apex only **if** `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` at **build** + restart |
| robots.txt | `SITE_ORIGIN` (route is **static prerender** — `.next/server/app/robots.txt.body` currently baked with arnav) | Apex only after **rebuild** with apex env (env-only restart is **insufficient**) |
| Canonical / OG URL / OG image | `buildPageMetadata` → `absoluteUrl` / `metadataBase` | Apex after rebuild with apex env |
| JSON-LD | `SITE_ORIGIN` / `absoluteUrl` | Apex after rebuild with apex env |

**Hardcoded `arnav.theglobalorbit.com` in app runtime metadata paths:** none beyond the intentional fallback in `lib/site-origin.ts`. Remaining arnav strings are e2e defaults, audit script default, and docs — not page metadata.

**Emails** (`@theglobalorbit.com`) are brand addresses, not crawlable page hosts — OK.

**Cutover risk:** `NEXT_PUBLIC_*` is resolved at build time. Skipping rebuild after flipping env can leave **staging hosts in robots.txt body and possibly other baked metadata**. Verification after cutover must prove zero `arnav.` in sitemap, robots, canonical, og:url, og:image, and JSON-LD.

---

## Required changes for apex cutover (authorized operators only)

### A. DNS

1. Decide authoritative DNS for `theglobalorbit.com` / `www`.
2. Point apex (and `www` if used) to **this** VPS (`51.15.21.166`) or the intended LB — **only when** the current apex property is decommissioned or moved.
3. Optional: keep temporary records for rollback.
4. **Verify:** `dig +short theglobalorbit.com A` equals intended target; apex HTML is this Next app (not the current Base44/Render site).

### B. Hosting / nginx (this VPS)

1. Backup `/etc/nginx/sites-available/globalorbitnepal` and any apex vhost.
2. Add TLS server block(s) for `theglobalorbit.com` (+ `www`) proxying to `http://127.0.0.1:3031` (same as arnav).
3. After TLS works, add **path-preserving** 301s:  
   `arnav.theglobalorbit.com$request_uri` → `https://theglobalorbit.com$request_uri`  
   (and `www` → apex if that is the canonical choice).
4. **Verify:** `curl -I` old URL → 301 Location to matching apex path; no redirect chains/loops.

### C. TLS

1. Issue/renew Let’s Encrypt (or equivalent) for `theglobalorbit.com` (+ `www`).
2. **Verify:** `openssl s_client -servername theglobalorbit.com -connect theglobalorbit.com:443` shows valid CN/SAN and dates.

### D. Environment + deployment

1. Set server `.env`: `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` (no trailing slash).
2. **Rebuild** (`npm run build` or GitHub Actions Deploy) — required for static robots and `NEXT_PUBLIC_*` inlining.
3. `pm2 restart globalorbitnepal` (or deploy workflow equivalent).
4. **Verify:**  
   - `curl -sL https://theglobalorbit.com/robots.txt` → Host/Sitemap apex only  
   - `curl -sL https://theglobalorbit.com/sitemap.xml` → all `<loc>` apex; **zero** `arnav.`  
   - Spot-check `/`, `/contact`, one `/service/*`: canonical + og:url + og:image + JSON-LD apex only  
   - `BASE_URL=https://theglobalorbit.com npm run seo:audit` → 64 OK, host set = apex only  

### E. Redirects (post-cutover)

| From | To |
|------|----|
| `https://arnav.theglobalorbit.com/<path>` | `https://theglobalorbit.com/<path>` (301) |
| `http://` variants | HTTPS apex |
| `www` (if non-canonical) | apex HTTPS |

In-app path redirects in `next.config.ts` stay relative — no change required for host migration.

### F. Explicitly **not** done in this audit

DNS edits, apex overwrite, `SITE_URL` flip, nginx redirects, rebuild for cutover, GSC verification/submit.

---

## Google Search Console — exact instructions

### Staging (do now — does not require apex cutover)

1. Open [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **URL prefix** → `https://arnav.theglobalorbit.com/`
3. Verify ownership (pick one):
   - **DNS TXT** on the `theglobalorbit.com` zone for the `arnav` hostname (if DNS provider supports), or  
   - **HTML meta tag** / HTML file upload on this Next app (requires a deliberate one-time deploy if used), or  
   - Google Analytics / Tag Manager if already present (not verified in this audit).
4. After “Ownership verified”:
   - **Sitemaps** → add `https://arnav.theglobalorbit.com/sitemap.xml` → submit.
5. **URL Inspection** (request indexing only if you want; not automated here) for:
   - `https://arnav.theglobalorbit.com/`
   - `https://arnav.theglobalorbit.com/service/website-development-nepal`
   - `https://arnav.theglobalorbit.com/seo-services-nepal`
   - `https://arnav.theglobalorbit.com/orbit-software`
   - `https://arnav.theglobalorbit.com/contact`
6. Monitor: Page indexing, Sitemaps, Experience, Manual actions.

**This audit did not verify ownership, submit a sitemap, or confirm indexing.**

### Production (only after apex serves this app)

1. Add **Domain** property: `theglobalorbit.com` (covers apex + www).
2. Verify with **DNS TXT** record Google provides — at the zone apex.
3. Submit sitemap: `https://theglobalorbit.com/sitemap.xml`
4. If the arnav URL-prefix property was used: when eligible, use **Change of Address** (Settings) from old host → new domain property.
5. Re-inspect the same five paths on the apex host.
6. Confirm in GSC that indexed URLs show `theglobalorbit.com`, not `arnav.`.

Do **not** use third-party mass-indexing services.

---

## Remaining blockers

| # | Blocker | Exact action required | Verification |
|---|---------|----------------------|--------------|
| 1 | Apex hosts a **different** live site (DNS ≠ this VPS) | Business authorization to retire/move current apex; then DNS → this VPS/LB | `dig` matches target; apex HTML is this Next app |
| 2 | No apex nginx/TLS on this VPS for this app | Authorized nginx + cert for `theglobalorbit.com` | HTTPS 200 from this app on apex |
| 3 | Production `SITE_URL` not set (correct until cutover) | After #1–2: set env + **rebuild** + restart | robots/sitemap/canonical/OG/JSON-LD contain **zero** `arnav.` |
| 4 | Staging→apex redirects not configured | Authorized nginx 301 path-preserving map | `curl -I` arnav URL → 301 to matching apex path |
| 5 | GSC not verified / sitemap not submitted | Manual Google account steps above | GSC shows verified + sitemap “Success” |
| 6 | Indexing status unknown | After GSC: URL Inspection / Page indexing | Do not claim indexed until GSC shows it |
| 7 | Full postal NAP / GBP (optional SEO) | Business confirms address + GBP URL | Visible NAP + schema match |
| 8 | Some about/testimonial copy still needs confirmation | Business review | Claims match verified facts |

---

## Status matrix (this pass)

| Item | Status | Evidence |
|------|--------|----------|
| Commit `23b0633` preserved | **PASS** | `git rev-parse HEAD` |
| `seo:verify` | **PASS** | 6/6 checks |
| `seo:audit` 64 URLs | **PASS** | 0 issues; crawl JSON |
| Staging host = arnav | **PASS** | nginx, DNS, live meta, sitemap, robots |
| Sitemap/canonical/OG on staging = arnav only | **PASS** | crawl hosts set; CSV |
| Apex ready as live production for this app | **BLOCKED** | DNS/IP + different site title |
| Flip `NEXT_PUBLIC_SITE_URL` to apex | **BLOCKED** | Awaiting authorization (#1–3) |
| DNS / TLS / nginx / redirects changed | **BLOCKED** | Explicitly not performed |
| Staging URLs absent from prod after cutover | **PASS** (design) / **NOT TESTED** (live apex) | Code uses `SITE_ORIGIN`; live apex not this app |
| GSC verify + sitemap submit | **BLOCKED** | No Google account action in this session |
| Pages indexed by Google | **NOT TESTED** | No GSC access — do not claim indexed |
| Core Web Vitals / Lighthouse | **NOT TESTED** | Not run this pass |
| Full Playwright e2e | **NOT TESTED** | Not run this pass |
| Contact page reachable | **PASS** | HTTP 200 |
| Overwrite apex / live DNS | **PASS** (restraint) | No destructive changes made |

---

## Operator commands (safe / read-only)

```bash
cd /srv/apps/globalorbitnepal
git rev-parse HEAD   # expect 23b0633…
npm run seo:verify
BASE_URL=https://arnav.theglobalorbit.com npm run seo:audit
```

After an **authorized** cutover only:

```bash
# set NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com in server .env, then rebuild+restart
BASE_URL=https://theglobalorbit.com npm run seo:audit
# expect: 64 URLs, host set = theglobalorbit.com only, zero arnav in issues/pages
```
