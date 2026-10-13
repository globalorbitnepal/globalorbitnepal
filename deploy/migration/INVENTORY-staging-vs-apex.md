# Deployment inventory — staging vs existing apex

Baseline app commit for SEO-ready staging: **`23b0633`**.

## A. Staging — GlobalOrbitNepal (this application)

| Item | Value |
|------|--------|
| Public URL | `https://arnav.theglobalorbit.com` |
| Server IP | `51.15.21.166` |
| App path | `/srv/apps/globalorbitnepal` |
| Runtime | PM2 process `globalorbitnepal` → `next start -p 3031 -H 127.0.0.1` |
| Upstream | nginx `server_name arnav.theglobalorbit.com` → `http://127.0.0.1:3031` |
| TLS | Let’s Encrypt `/etc/letsencrypt/live/arnav.theglobalorbit.com/` |
| Canonical origin | Fallback `https://arnav.theglobalorbit.com` via `lib/site-origin.ts` (no `NEXT_PUBLIC_SITE_URL` required) |
| Uploads | `/data/globalorbitnepal/uploads` |
| Database | Dedicated `globalorbitnepal_db` (do not point at HostingBeyond) |
| Nginx snapshot | `deploy/migration/nginx/arnav.theglobalorbit.com.live-snapshot.conf` |
| Sitemap | `https://arnav.theglobalorbit.com/sitemap.xml` (64 URLs at last audit) |
| Robots | Host + Sitemap = arnav |

## B. Existing apex — NOT this Next.js app

| Item | Value |
|------|--------|
| Public URL | `https://theglobalorbit.com` / `www` |
| DNS A | `216.24.57.1` (Cloudflare) |
| www | CNAME → `base44.onrender.com` (+ CDN) |
| Observed title | “The Global Orbit” (separate property) |
| TLS | Google Trust Services (WE1) via Cloudflare |
| Relation to this repo | **None** — must not be overwritten without authorization and content migration plan for that property |

## C. Intended production (after authorized cutover)

| Item | Value |
|------|--------|
| Public URL | `https://theglobalorbit.com` |
| App | Same PM2 process / same codebase |
| Env | `NEXT_PUBLIC_SITE_URL=https://theglobalorbit.com` + **rebuild** |
| Nginx | `deploy/migration/nginx/theglobalorbit.com.conf` (prepared, not installed) |
| Staging after cutover | Optional 301 via `arnav-to-apex-redirect.conf.disabled` |
