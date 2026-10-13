# Domain migration readiness — Global Orbit

**Migration package (reversible, not activated):** [`deploy/migration/README.md`](../deploy/migration/README.md)

## Current vs intended hosts

| Role | Origin |
|------|--------|
| Live staging / public VPS hostname | `https://arnav.theglobalorbit.com` |
| Intended production apex | `https://theglobalorbit.com` |

**Blocker:** As of the SEO audit date, `https://theglobalorbit.com` serves a **different** property. Do **not** set `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` or point apex DNS at this app until cutover is explicitly authorized and that host is free for Global Orbit.

## Single configuration knob

All sitemap, robots, canonical, Open Graph, and JSON-LD absolute URLs resolve through:

- `NEXT_PUBLIC_SITE_URL` (preferred)
- Fallback in `lib/site-origin.ts` → `https://arnav.theglobalorbit.com`
- Helpers: `SITE_ORIGIN`, `absoluteUrl()`, `INTENDED_PRODUCTION_SITE_ORIGIN`

Never hardcode either hostname in page metadata.

## Pre-cutover checklist (authorized operators only)

1. Backup nginx vhosts, TLS certs, and PM2/env for both hosts.
2. Confirm apex DNS will resolve to this VPS (or the correct load balancer).
3. Issue/renew TLS for `theglobalorbit.com` (+ `www` if used).
4. Set server `.env`: `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com`
5. Rebuild and restart `globalorbitnepal` (GitHub Actions Deploy or local `npm run build` + `pm2 restart`).
6. Verify `https://theglobalorbit.com/robots.txt` and `/sitemap.xml` use the apex host only.
7. Spot-check homepage + 5 commercial URLs for canonical / OG URL.
8. Add 301s from `arnav.theglobalorbit.com/*` → `theglobalorbit.com/$request_uri` (nginx), avoiding chains.
9. Google Search Console: domain property for `theglobalorbit.com`, DNS TXT verify, submit sitemap, use Change of Address if applicable.
10. Monitor crawl errors and indexed URL host for 2–4 weeks.

## Redirect mapping

Preserve path identity. Example:

- `https://arnav.theglobalorbit.com/service/website-development-nepal` → `https://theglobalorbit.com/service/website-development-nepal`

Do not blanket-redirect every URL to `/`. Existing in-app redirects in `next.config.ts` stay path-relative and remain valid after host change.

## Search Console (manual — requires Google account)

### While on arnav subdomain

1. Add URL-prefix property `https://arnav.theglobalorbit.com/`
2. Verify (HTML tag, DNS, or Google Analytics — pick one).
3. Submit `https://arnav.theglobalorbit.com/sitemap.xml`
4. Inspect `/`, `/service/website-development-nepal`, `/seo-services-nepal`, `/orbit-software`, `/contact`

### After apex cutover

1. Add **Domain** property `theglobalorbit.com` (DNS TXT).
2. Submit `https://theglobalorbit.com/sitemap.xml`
3. If both properties exist, use Change of Address from old host to new when eligible.
4. Do not mass-submit URLs through third-party “indexing” spam tools.
