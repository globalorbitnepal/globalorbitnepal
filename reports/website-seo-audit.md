# Global Orbit — Website SEO Audit & Implementation Report

**Audit date:** 2026-10-14  
**Live host audited:** https://arnav.theglobalorbit.com  
**Intended production host:** https://theglobalorbit.com  
**Stack:** Next.js 16.3.4, React 19, Prisma, PM2 port 3031, nginx  

## Executive summary

Technical SEO, canonical-origin configuration, homepage Nepal positioning, metadata architecture, structured data, sitemap/robots, and live crawl QA were implemented against the existing app. **64/64 sitemap URLs return HTTP 200** with unique titles, descriptions, canonicals, and Open Graph fields after the post-fix crawl (`npm run seo:audit` → Critical=0 High=0 Medium=0 Low=0).

**Blocked without authorization:** DNS / apex cutover to `theglobalorbit.com` (currently a different property), Google Search Console verification/submission, and confirmation of unverified marketing claims (testimonials narrative, year counts in about copy).

---

## 1. Route inventory (audited)

Source of truth: `lib/route-inventory.ts` + runtime sitemap (`lib/public-sitemap-urls.ts`).

| Kind | Examples |
|------|----------|
| Core | `/`, `/about`, `/contact`, `/projects`, `/services`, `/orbit-software`, `/packages`, `/blogs`, `/careers`, `/studio`, `/inside-orbit`, policies |
| Service funnels | `/service/*` (7 pages) |
| Industry landings | `/*-nepal` root slugs (14 landings) |
| Packages | `/packages/*` |
| Software products | `/orbit-software/*` |
| Legacy catalog | `/services/{web-development,hosting,seo,digital-solutions}` |
| Blog / careers | `/blog/{slug}`, `/careers/{slug}` (runtime) |
| Private / excluded | `/admin`, `/orbit`, `/api/*`, `/demo` (noindex), `/news` (redirect) |

Full live metadata table: `reports/seo-page-map.csv`  
Raw crawl JSON: `reports/seo-live-crawl.json`

---

## 2. Files changed (this session) and why

| Area | Files | Why |
|------|--------|-----|
| Canonical origin | `lib/site-origin.ts`, `.env.example`, `docs/domain-migration.md` | Single `NEXT_PUBLIC_SITE_URL` knob; document apex risk |
| Homepage SEO | `app/page.tsx`, `lib/site.ts`, `lib/seo-page-defaults.ts`, `lib/hero-config.ts` | Nepal company title/description; hero CTAs; defaults not masked by chrome |
| Metadata pipeline | `lib/seo.ts`, `lib/apply-page-seo.ts`, `lib/page-seo-store.ts` | Absolute titles; Admin overrides only from persisted JSON |
| Schema / OG | `lib/seo.ts`, `app/layout.tsx`, software/blog absolute URLs | Logo fields, `metadataBase`, production-safe absolutes |
| Claim hygiene | `home-hero.tsx`, `why-section.tsx`, `contact-page.ts`, `brand.ts`, testimonials excerpt | Remove unverified counts/ratings/% claims from UI |
| QA | `scripts/audit-seo-live.mjs`, `package.json` `seo:audit` | Automated live sitemap crawl |
| Lint | `pwa-install-prompt.tsx`, `site-header.tsx` | Clear React setState-in-effect errors |
| Docs / reports | `docs/domain-migration.md`, `reports/*` | Migration + audit deliverables |

---

## 3. Technical SEO fixes applied

- Homepage title/description aligned to Nepal commercial positioning (live verified).
- `buildPageMetadata` uses `title.absolute` to prevent layout template double-branding.
- Service vs landing title patterns differentiated (no duplicate titles in crawl).
- Website development service page keeps custom commercial title.
- `applyPageSeo` reads **persisted** Admin SEO only, so code defaults + page fallbacks work.
- Stale “Web Developer Nepal…” titles rejected in `mergeSeoFallback`.
- Duplicate Organization JSON-LD removed from homepage (sitewide `GlobalJsonLd` remains).
- Sitemap/robots already origin-aware via `SITE_ORIGIN` (staging host until cutover).
- Live audit script added; wiring check `npm run seo:verify` passes.

---

## 4. Keyword → URL map (primary intents)

Volumes **not** invented. Prefer GSC / Keyword Planner for volumes later.

| Primary intent | Canonical URL | Notes |
|----------------|---------------|--------|
| web development company nepal | `/` | Homepage |
| website development nepal | `/service/website-development-nepal` | Primary service funnel |
| website development nepal (guide) | `/website-development-nepal` | Supporting landing — distinct title |
| seo services nepal | `/service/seo-optimization-nepal` + `/seo-services-nepal` | Funnel + landing |
| local seo nepal | `/local-seo-nepal` | |
| digital marketing nepal | `/service/digital-marketing-nepal` | Google Ads / SMM intents merge here |
| ecommerce website nepal | `/service/ecommerce-development-nepal` | |
| custom software / ERP | `/custom-software-development-nepal`, `/erp-software-nepal`, `/orbit-software` | |
| hotel / trek / travel / restaurant / spa / booking | matching `/*-website-development-nepal` landings | |
| website design nepal | `/studio` | |
| hosting / maintenance | `/services/hosting` | maintenance redirects here |
| mobile apps | `/orbit-software/web-apps`, `android-apps`, `ios-apps` | |
| contact / consultation | `/contact` | Conversion |

See also `docs/seo-keyword-map.md` and `docs/domain-migration.md`.

---

## 5. Sitemap & robots (validated live)

| Asset | URL | Result |
|-------|-----|--------|
| Sitemap | https://arnav.theglobalorbit.com/sitemap.xml | 200, 64 `<loc>`, host matches staging origin |
| Robots | https://arnav.theglobalorbit.com/robots.txt | 200; Allow `/`; Disallow admin/orbit/api/demo/news; Sitemap referenced |

After apex cutover, both must reference `https://theglobalorbit.com` via `NEXT_PUBLIC_SITE_URL` only.

---

## 6. Production canonical-domain configuration

```bash
# Staging (current — correct until cutover authorized)
NEXT_PUBLIC_SITE_URL=https://arnav.theglobalorbit.com

# Apex — ONLY after DNS/content cutover authorized
# NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com
```

Code: `lib/site-origin.ts` → `SITE_ORIGIN`, `absoluteUrl()`, `INTENDED_PRODUCTION_SITE_ORIGIN`.

---

## 7. Domain migration & redirect plan

Documented in `docs/domain-migration.md`.

**Not executed this session:** DNS changes, apex env flip, nginx host redirects, GSC Change of Address.

**When authorized:** path-preserving 301s from `arnav.theglobalorbit.com$request_uri` → `theglobalorbit.com$request_uri`; rebuild; verify canonicals; submit apex sitemap.

---

## 8. Structured data

| Type | Where | Status |
|------|--------|--------|
| Organization | `GlobalJsonLd` | Present; logo absolute via `SITE_ORIGIN` |
| WebSite + SearchAction | `GlobalJsonLd` | Present |
| ProfessionalService (local) | `GlobalJsonLd` | Present; Kathmandu / NP — no fabricated street if unknown |
| Service / FAQ | Website-dev & AI automation service pages | Present |
| BreadcrumbList / Software | Orbit software + some services | Present |
| BlogPosting | Blog posts | Present |

No fabricated AggregateRating. FAQ schema is content-backed, not for guaranteed rich results.

---

## 9. Performance & responsive

- Prior laptop (1366) and mobile PWA work remain in place.
- This session did **not** re-run Lighthouse / CrUX field data — **do not claim CWV pass**.
- Lint: 0 errors (img warnings remain).
- Build: `npm run build` succeeded.
- Typecheck: included in Next build (passed).

---

## 10. Build / lint / automated tests

| Check | Result |
|-------|--------|
| `npm run build` | Passed |
| `npm run lint` | Passed (0 errors, warnings only) |
| `npm run seo:verify` | Passed |
| `npm run seo:audit` (live) | Passed — 64 URLs, 0 severity issues |
| Playwright e2e | Not re-run full suite this session (helpers updated for origin) |

---

## 11. Unresolved / needs business or deployment access

1. **Apex DNS cutover** — `theglobalorbit.com` is another property; blocked.
2. **Google Search Console** — verify + submit sitemap (manual Google account).
3. **Google Business Profile** link — not confirmed in repo; add when verified.
4. **Street address** — NAP uses “Kathmandu · India · United States”; confirm full postal address before LocalBusiness enrichment.
5. **Testimonials / about journey years** — anonymized quotes remain; quantitative claims removed from hero/footer/contact; about “nine years” still needs confirmation.
6. **City landing pages** — not mass-created (avoid doorway pages); expand only with real coverage evidence.
7. **Business email product page** — webmail link exists on contact; no separate SEO landing (not justified without product page content).

---

## 12. Google Search Console setup (exact steps)

1. Search Console → Add property → URL prefix `https://arnav.theglobalorbit.com/` (now) or Domain `theglobalorbit.com` (after cutover).
2. Verify (DNS TXT preferred for domain property).
3. Sitemaps → submit `https://arnav.theglobalorbit.com/sitemap.xml` (or apex equivalent).
4. URL Inspection on `/`, `/service/website-development-nepal`, `/seo-services-nepal`, `/orbit-software`, `/contact`.
5. Monitor Coverage, Page indexing, Experience (CWV), Manual actions.
6. **Not done in this session:** ownership verification, sitemap submit, indexing requests.

---

## 13. Final checklist

| Item | Status |
|------|--------|
| Homepage Nepal positioning + CTAs | Completed (hero defaults + live title) |
| Public route crawl (sitemap) | Completed — 64 OK |
| Metadata unique per URL | Completed (post-fix audit) |
| Sitemap / robots | Completed / validated |
| Canonical host config | Completed (staging); apex ready via env |
| Structured data | Completed / validated syntax in code |
| Soften unverified stats | Completed (key surfaces) |
| Forms / contact reachable | Completed (HTTP 200 `/contact`) |
| Build + lint + seo:audit | Completed |
| Apex DNS / env cutover | Blocked — needs authorization |
| GSC verify + sitemap submit | Blocked — needs Google access |
| CrUX / Lighthouse CWV claim | Not tested — do not claim pass |
| Full Playwright suite | Not tested this session |

---

## Verification commands

```bash
npm run build
npm run lint
npm run seo:verify
BASE_URL=https://arnav.theglobalorbit.com npm run seo:audit
```
