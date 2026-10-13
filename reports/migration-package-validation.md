# Migration package validation report

**Date:** 2026-10-14  
**Baseline commit (unchanged SEO tree):** `23b0633`  
**This pass:** added `deploy/migration/*` + `scripts/migration-validate.mjs` only — **no live DNS, nginx install, apex overwrite, or production SITE_URL flip**

## Claims explicitly NOT made

- Migration is complete  
- Apex serves this Next.js application  
- Google has indexed any URLs  

## Checks performed

| Check | Status | Evidence |
|-------|--------|----------|
| `npm run seo:verify` | **PASS** | 6/6 |
| `npm run migration:validate-staging` | **PASS** | 25 PASS / 0 FAIL / 0 BLOCKED |
| `npm run seo:audit` (arnav) | **PASS** | 64 URLs, 0 issues |
| Live staging robots/sitemap host = arnav | **PASS** | curl + `.next/server/app/robots.txt.body` |
| Isolated apex build (`NEXT_DIST_DIR=.next-apex-validate` + `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com`) | **PASS** | `robots.txt.body` → `Host: theglobalorbit.com`, Sitemap apex, **zero arnav** |
| Live `.next` still arnav after isolated build | **PASS** | live robots body unchanged; PM2 online |
| Live apex `migration:validate-apex` | **FAIL** (expected) / treated as **BLOCKED for cutover** | HTTP 200 but `og:image` host = `media.base44.com` (not this app); sitemap 40 locs vs staging 64 |
| Staging→apex nginx redirects activated | **BLOCKED** | conf shipped as `.disabled` only |
| DNS / TLS / prod env applied | **BLOCKED** | not authorized |
| GSC verify / sitemap submit / indexing | **NOT TESTED** | no Google account action |

## Build-time vs runtime confirmation

| Surface | Finding |
|---------|---------|
| robots.txt | Static prerender; isolated apex build bakes `theglobalorbit.com` into `.next-apex-validate/.../robots.txt.body` |
| Live robots | Still arnav because live `.next` was not replaced |
| Implication | Cutover **requires** `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` + **rebuild** of the live distDir + restart |

## Package artifacts

See `deploy/migration/README.md` for commands, rollback, and DNS preserve/change list.

## Outstanding external access

1. Explicit cutover authorization  
2. DNS/Cloudflare access (A + www only; preserve MX/SPF/DKIM)  
3. Plan to retire/move current Base44/Render apex  
4. sudo for nginx + certbot on VPS  
5. Google Search Console account  
