# Global Orbit — reversible production migration package

**Baseline SEO commit:** `23b0633`  
**Status:** Package prepared — **cutover NOT executed**  
**Staging:** `https://arnav.theglobalorbit.com`  
**Intended production:** `https://theglobalorbit.com`

This directory is the single runbook for an authorized, reversible host cutover. It does **not** change live DNS, overwrite the existing apex site, or activate redirects by itself.

## Contents

| Path | Purpose |
|------|---------|
| `INVENTORY-staging-vs-apex.md` | Current staging vs existing apex deployment |
| `env.production.cutover.example` | Production `NEXT_PUBLIC_SITE_URL` fragment |
| `dns-records.md` | Which DNS records change vs preserve (MX/SPF untouched) |
| `redirect-map.md` | Path-preserving 301 plan |
| `nginx/arnav.theglobalorbit.com.live-snapshot.conf` | Live staging vhost backup copy |
| `nginx/theglobalorbit.com.conf` | Prepared apex vhost (**not installed**) |
| `nginx/arnav-to-apex-redirect.conf.disabled` | Staging→apex 301 (**disabled**) |
| `../../scripts/migration-validate.mjs` | Pre/post validation (fails on arnav leak when expecting apex) |

Related docs: `docs/domain-migration.md`, `reports/pre-production-readiness.md`.

## Build-time vs runtime (critical)

| Artifact | Behavior | Cutover implication |
|----------|----------|---------------------|
| `robots.txt` | Next **static** prerender; host baked into `.next/server/app/robots.txt.body` | **Must rebuild** after setting `NEXT_PUBLIC_SITE_URL` |
| `sitemap.xml` | Dynamic (`force-dynamic`) via `SITE_ORIGIN` | Rebuild recommended; env must be present at runtime/build for `NEXT_PUBLIC_*` |
| Canonical / OG / JSON-LD | `SITE_ORIGIN` / `absoluteUrl()` from `lib/site-origin.ts` | Same — set env then **rebuild** |

`NEXT_PUBLIC_SITE_URL` is inlined at build. **Restart alone is insufficient.**

Isolated apex bake validation (does not replace live `.next`):

```bash
cd /srv/apps/globalorbitnepal
NEXT_DIST_DIR=.next-apex-validate \
  NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com \
  npm run build
# Inspect: grep Host .next-apex-validate/server/app/robots.txt.body
# Expect: Host: theglobalorbit.com — zero arnav
```

Live PM2 continues using `.next` until an authorized cutover rebuild targets `.next`.

## Exact deployment commands (authorized cutover only)

### Pre-flight (safe now)

```bash
cd /srv/apps/globalorbitnepal
git rev-parse --short HEAD    # note baseline; deploy known-good commit
npm run seo:verify
BASE_URL=https://arnav.theglobalorbit.com EXPECT_ORIGIN=https://arnav.theglobalorbit.com \
  npm run migration:validate
BASE_URL=https://arnav.theglobalorbit.com npm run seo:audit
```

**Expected:** all PASS; 64 sitemap URLs; hosts = arnav.

### Cutover sequence (requires explicit authorization)

1. **Backup** nginx, `.env`, and note DNS values (`dns-records.md`).
2. Retire/move the **current** apex property (Base44/Render) — out of band.
3. **DNS:** change only A/www per `dns-records.md`; preserve MX/SPF/DKIM.
4. **TLS:** `certbot` (or Cloudflare) for `theglobalorbit.com` (+ www).
5. **Install nginx** apex conf; `nginx -t` && reload. Keep arnav vhost until redirects enabled.
6. **Env:** set `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` in server `.env`.
7. **Rebuild & restart:**
   ```bash
   cd /srv/apps/globalorbitnepal
   npm run build
   pm2 restart globalorbitnepal
   ```
8. **Validate apex:**
   ```bash
   BASE_URL=https://theglobalorbit.com EXPECT_ORIGIN=https://theglobalorbit.com \
     npm run migration:validate
   # Must FAIL if any arnav.theglobalorbit.com remains in robots/sitemap/canonical/OG/JSON-LD
   ```
9. **Enable** staging redirects: replace arnav vhost with `arnav-to-apex-redirect.conf.disabled` contents; `nginx -t` && reload.
10. `CHECK_STAGING_REDIRECT=1` with migration:validate.
11. GSC Domain property + submit `https://theglobalorbit.com/sitemap.xml`.

### Rollback

1. Restore nginx from `arnav.theglobalorbit.com.live-snapshot.conf` / dated bak; remove apex site symlink if needed; `nginx -t` && reload.  
2. Restore DNS A/www to pre-cutover values (`dns-records.md`).  
3. Set `NEXT_PUBLIC_SITE_URL=https://arnav.theglobalorbit.com` (or remove), **rebuild**, `pm2 restart`.  
4. Confirm staging `migration:validate` PASS.  
5. MX/SPF/DKIM should never have changed.

## Outstanding external access

| Need | Why |
|------|-----|
| Explicit cutover authorization | Legal/ops ownership of apex |
| DNS registrar / Cloudflare login | Change A/www only |
| Ability to retire Base44/Render apex | Avoid overwriting without migration |
| sudo nginx + certbot on VPS | Install apex vhost + TLS |
| Google Search Console | Verify + sitemap (not done in package prep) |

## What this package does NOT claim

- Migration complete  
- Apex serves this Next.js app  
- Google has indexed any URL  
