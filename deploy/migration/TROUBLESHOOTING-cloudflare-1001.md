# Cloudflare Error 1001 after apex cutover

## What it means

**Error 1001 — DNS resolution error** appears when the browser reaches **Cloudflare’s edge** (old hosting path), not this VPS. The new site is served only when DNS returns **`51.15.21.166`**.

Global DNS (Namecheap NS + 1.1.1.1 / 8.8.8.8) already points to the VPS. The app, nginx, and Let’s Encrypt on the server pass `npm run migration:validate-apex` (26 checks).

## Fix on your device (Nepal / any ISP)

1. **Check what IP you get**
   ```bash
   dig +short theglobalorbit.com A
   # or: nslookup theglobalorbit.com
   ```
   Must show **`51.15.21.166`**. If you see **`216.24.57.1`** or nothing useful, continue below.

2. **Flush DNS**
   - Windows: `ipconfig /flushdns`
   - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - Linux: `resolvectl flush-caches` (or restart NetworkManager)
   - Phone: toggle airplane mode, or Wi‑Fi off/on; clear browser cache / site data for `theglobalorbit.com`

3. **Use a public resolver** (Settings → DNS)
   - `1.1.1.1` / `1.0.0.1` (Cloudflare DNS — not the same as orange-cloud proxy)
   - or `8.8.8.8` / `8.8.4.4`

4. **Turn off VPN / WARP** temporarily and retry in a private/incognito window.

5. **Namecheap Advanced DNS** (registrar login)
   - `@` **A** → `51.15.21.166`
   - `www` **A** → `51.15.21.166` (delete old **CNAME** to `base44.onrender.com`)
   - Do **not** delete MX / SPF TXT

6. **Cloudflare dashboard** (if you ever added this domain)
   - Remove the zone or fix A records to `51.15.21.166` **only if** nameservers are Cloudflare.
   - With Namecheap NS (`dns1.registrar-servers.com`), public traffic should **not** go through Cloudflare unless DNS still resolves to the old IP.

## Verify the new site (correct path)

```bash
curl -sI https://theglobalorbit.com/ | head -5
```

Expect: `HTTP/2 200`, `server: nginx`, `x-powered-by: Next.js` — **no** `cf-ray` header.

## Staging URL

`https://arnav.theglobalorbit.com` redirects to `https://theglobalorbit.com` (301).
