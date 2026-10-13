# Path-preserving redirect plan (staging → apex)

**Status:** Documented only — **not activated**.  
Activation file: `nginx/arnav-to-apex-redirect.conf.disabled`

## Rule

Every request to staging maps to the **same path** on apex:

```
https://arnav.theglobalorbit.com{path}?{query}  →  301  https://theglobalorbit.com{path}?{query}
```

Nginx form: `return 301 https://theglobalorbit.com$request_uri;`

## Examples

| From (staging) | To (production) |
|----------------|-----------------|
| `https://arnav.theglobalorbit.com/` | `https://theglobalorbit.com/` |
| `https://arnav.theglobalorbit.com/contact` | `https://theglobalorbit.com/contact` |
| `https://arnav.theglobalorbit.com/service/website-development-nepal` | `https://theglobalorbit.com/service/website-development-nepal` |
| `https://arnav.theglobalorbit.com/orbit-software/billing-software` | `https://theglobalorbit.com/orbit-software/billing-software` |
| `https://arnav.theglobalorbit.com/sitemap.xml` | `https://theglobalorbit.com/sitemap.xml` |

Do **not** redirect all paths to `/`.

## Also after cutover

| From | To |
|------|----|
| `http://theglobalorbit.com/...` | `https://theglobalorbit.com/...` |
| `https://www.theglobalorbit.com/...` | `https://theglobalorbit.com/...` |
| `http://arnav.theglobalorbit.com/...` | `https://theglobalorbit.com/...` (via redirect vhost) |

## In-app redirects

`next.config.ts` path redirects (e.g. `/portfolio` → `/projects`) remain path-relative and stay valid on either host — no change required for host migration.
