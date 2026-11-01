# DNS inventory — change vs preserve

**Captured:** 2026-10-14 (pre-cutover snapshot); **updated 2026-11-01** (post-cutover verify).  
**Do not touch mail/SPF/DKIM/MX unless a separate mail migration is authorized.**

## Current observations (2026-11-01 — cutover active)

| Name | Type | Observed value | Role |
|------|------|----------------|------|
| `arnav.theglobalorbit.com` | A | `51.15.21.166` | Staging — **301 → apex** (nginx) |
| `theglobalorbit.com` | A | `51.15.21.166` | Apex — this VPS (nginx → PM2 `:3031`) |
| `www.theglobalorbit.com` | A | `51.15.21.166` | **301 → apex** (nginx) |
| NS | | `dns1/2.registrar-servers.com` | Namecheap Advanced DNS |

Authoritative + 1.1.1.1 / 8.8.8.8 / 9.9.9.9 all return `51.15.21.166`. TLS: Let’s Encrypt on origin (`theglobalorbit.com` + www).

**If visitors still see Cloudflare Error 1001:** their resolver is likely still using the **old apex IP** (`216.24.57.1`) or a stale cache. Fix: flush local DNS, use 1.1.1.1/8.8.8.8, confirm `dig theglobalorbit.com A` → `51.15.21.166`. Remove orphaned zone from any Cloudflare account if the domain was added there without matching NS.

## Pre-cutover snapshot (historical)

| Name | Type | Observed value | Role |
|------|------|----------------|------|
| `theglobalorbit.com` | A | `216.24.57.1` | Former apex — Cloudflare / Base44 |
| `www.theglobalorbit.com` | CNAME → | `base44.onrender.com` | Former www — Render |
| `theglobalorbit.com` | MX | `10 mail.theglobalorbit.com.` | Mail — **PRESERVE** |
| `theglobalorbit.com` | TXT (SPF) | `v=spf1 mx a:mail.theglobalorbit.com ip4:200.97.170.235 -all` | Mail auth — **PRESERVE** |
| `theglobalorbit.com` | TXT | `google-site-verification=…` | Existing GSC/site verify — **PRESERVE** unless replacing verification |

TLS: apex cert issued via Google Trust Services (Cloudflare); staging cert Let’s Encrypt for `arnav.theglobalorbit.com`.

## Records that MUST change at cutover (authorized only)

| Record | Action | Target after cutover |
|--------|--------|----------------------|
| `theglobalorbit.com` A (and/or AAAA) | Point to this VPS / LB | `51.15.21.166` (or current production LB IP) |
| `www.theglobalorbit.com` | Replace Render CNAME with A/AAAA to same host **or** CNAME to apex per DNS policy | Same host as apex; nginx will 301 www → apex |

If the zone uses Cloudflare proxy (orange cloud), decide proxy vs DNS-only with ops; TLS may be Cloudflare edge vs origin Let’s Encrypt.

## Records to PRESERVE (do not change for web cutover)

- All **MX** records  
- **SPF** TXT (`v=spf1 …`)  
- **DKIM** / **DMARC** TXT (if present — re-query at cutover time)  
- Mail host A/AAAA for `mail.theglobalorbit.com`  
- Unrelated subdomains (`ambition.`, `hostingbeyond`, etc.)  
- Existing `google-site-verification` TXT unless Google issues a new one for the Domain property  

## Rollback DNS

1. Restore previous `theglobalorbit.com` A to `216.24.57.1` (or prior value from registrar snapshot).  
2. Restore `www` CNAME to `base44.onrender.com` (or prior value).  
3. Leave MX/SPF/DKIM untouched throughout.
