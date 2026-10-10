# SEO keyword → URL map (arnav.theglobalorbit.com)

Internal reference for Global Orbit Nepal. Search volumes are **not** listed unless verified in Google Search Console or Keyword Planner — do not treat this file as ranking guarantees.

## Site technical SEO

| Asset | URL |
|--------|-----|
| Sitemap | `https://arnav.theglobalorbit.com/sitemap.xml` |
| Robots | `https://arnav.theglobalorbit.com/robots.txt` |
| Default OG image | `/brand/hero-uhd.jpg` |
| Metadata source | `lib/seo-page-defaults.ts` + Admin → SEO (`page-seo.json`) |

## Core pages

| Primary keyword (intent) | Canonical URL | Notes |
|--------------------------|---------------|--------|
| web developer nepal | `/` | Homepage; Organization + WebSite JSON-LD sitewide |
| web development company nepal | `/about` | Studio story, trust |
| website consultation nepal | `/contact` | Primary conversion |
| website portfolio nepal | `/projects` | Alias redirect: `/portfolio` → `/projects` |
| digital marketing nepal | `/services` | Solutions hub |
| erp software nepal | `/orbit-software` | Product catalog |
| website package nepal | `/packages` | Pricing tiers |
| seo tips nepal | `/blogs` | Content hub |
| website design nepal | `/studio` | Design positioning |

## Service pages (`/service/*`)

| Primary keyword | URL |
|-----------------|-----|
| website development nepal | `/service/website-development-nepal` |
| seo services nepal | `/service/seo-optimization-nepal` |
| ecommerce website nepal | `/service/ecommerce-development-nepal` |
| google ranking nepal | `/service/google-ranking-services-nepal` |
| crm software nepal | `/service/erp-crm-software-nepal` |
| digital marketing nepal | `/service/digital-marketing-nepal` |
| ai automation nepal | `/service/ai-automation` |

## SEO landing pages (root slugs)

| Primary keyword | URL |
|-----------------|-----|
| website development nepal | `/website-development-nepal` |
| custom software development nepal | `/custom-software-development-nepal` |
| web development nepal | `/web-development-nepal` |
| erp software nepal | `/erp-software-nepal` |
| seo services nepal | `/seo-services-nepal` |
| local seo nepal | `/local-seo-nepal` |
| hotel website nepal | `/hotel-website-development-nepal` |
| trekking website nepal | `/trekking-website-development-nepal` |
| travel website nepal | `/travel-website-development-nepal` |
| restaurant website nepal | `/restaurant-website-development-nepal` |
| resort website nepal | `/resort-website-development-nepal` |
| spa website nepal | `/spa-website-development-nepal` |
| ecommerce development nepal | `/ecommerce-website-development-nepal` |
| booking website nepal | `/booking-website-development-nepal` |

## Friendly redirects (not in sitemap)

These URLs 301 to the canonical route above (see `next.config.ts`):

- `/services/website-development-nepal` → `/service/website-development-nepal`
- `/services/seo-services-nepal` → `/service/seo-optimization-nepal`
- `/services/trekking-travel-website-development` → `/trekking-website-development-nepal`
- `/services/hotel-website-development` → `/hotel-website-development-nepal`
- `/portfolio` → `/projects`
- `/request-a-quote` → `/contact`

## Legacy content routes (`/services/*` catalog)

| Slug | URL |
|------|-----|
| web-development | `/services/web-development` |
| hosting | `/services/hosting` |
| seo | `/services/seo` |
| digital-solutions | `/services/digital-solutions` |

## Cannibalization rules

1. **One primary keyword per canonical URL** — edit focus keyword in Admin SEO per path.
2. Landings vs `/service/*` — landings are industry/marketing long-tail; `/service/*` are main service funnels. Cross-link, do not duplicate H1 copy.
3. Do not add `meta keywords` for Google ranking; use visible copy and headings.

## Google Search Console (manual)

1. Verify `arnav.theglobalorbit.com`.
2. Submit `https://arnav.theglobalorbit.com/sitemap.xml`.
3. Inspect URL → Request indexing for new service/landing pages after deploy.
4. Monitor queries: website development nepal, seo company nepal, trekking website nepal, digital marketing nepal.
