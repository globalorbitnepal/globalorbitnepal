# DNS inventory — change vs preserve

**Captured:** 2026-10-14 (public resolver 8.8.8.8 / getent)  
**Do not modify live DNS until cutover is authorized.**  
**Do not touch mail/SPF/DKIM/MX unless a separate mail migration is authorized.**

## Current observations

| Name | Type | Observed value | Role |
|------|------|----------------|------|
| `arnav.theglobalorbit.com` | A | `51.15.21.166` | Staging — this VPS (GlobalOrbitNepal / PM2 `:3031`) |
| `theglobalorbit.com` | A | `216.24.57.1` | Current apex — **different** hosting (Cloudflare edge) |
| `www.theglobalorbit.com` | CNAME → | `base44.onrender.com` (+ CDN chain) | Current apex www — **not** this VPS |
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
