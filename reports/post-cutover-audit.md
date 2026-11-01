# Post-cutover production audit

**Date:** 2026-11-01  
**Canonical origin:** `https://theglobalorbit.com`

Run the full gate locally:

```bash
npm run audit:full
```

| Suite | What it checks |
|--------|----------------|
| `seo:verify` | Route inventory / sitemap wiring |
| `migration:validate-apex` | Apex SEO, robots, sitemap, 64 URLs, arnav redirect |
| `seo:audit` | Live crawl of all sitemap URLs on apex |
| `migration:validate-staging` | `arnav` → apex 301 on key paths |

**DNS:** `@` and `www` A → `51.15.21.166` (Namecheap). Visitors on stale resolvers may still see Cloudflare 1001 — see `deploy/migration/TROUBLESHOOTING-cloudflare-1001.md`.
