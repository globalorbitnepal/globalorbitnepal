import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", h1: /Global Orbit|website|development|SEO/i },
  { path: "/about", h1: /About Global Orbit/i },
  { path: "/contact", h1: /Contact Global Orbit/i },
  { path: "/service/website-development-nepal", h1: /Website development in Nepal/i },
  { path: "/trekking-website-development-nepal", h1: /Trekking Website Development Nepal/i },
  { path: "/services", h1: /digital solutions|Complete digital/i },
  { path: "/blogs", h1: /Notes from the studio|Blog/i },
  { path: "/packages/starter-website", h1: /Starter Website/i },
  { path: "/orbit-software/billing-software", h1: /Billing Software/i },
];

test.describe("public SEO smoke", () => {
  for (const { path, h1 } of pages) {
    test(`page ${path} has title, canonical, and H1`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toContainText(h1);
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const href = await canonical.getAttribute("href");
      const origin = new URL(page.url()).origin;
      expect(href?.startsWith("https://")).toBe(true);
      if (origin.includes("theglobalorbit.com")) {
        expect(href).toMatch(/^https:\/\/arnav\.theglobalorbit\.com/);
      }
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      const desc = page.locator('meta[name="description"]');
      await expect(desc).toHaveCount(1);
    });
  }

  test("blog article", async ({ page }) => {
    await page.goto("/blogs");
    const link = page.locator('a[href^="/blog/"]').first();
    const href = await link.getAttribute("href");
    test.skip(!href, "No published blog link on /blogs");
    const response = await page.goto(href!);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("sitemap.xml", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/orbit-software/billing-software");
    const locs = body.match(/<loc>[^<]+<\/loc>/g) ?? [];
    const unique = new Set(locs);
    expect(unique.size).toBe(locs.length);
    expect(locs.length).toBeGreaterThanOrEqual(60);
  });

  test("robots.txt", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Sitemap: https://arnav.theglobalorbit.com/sitemap.xml");
    expect(body).toContain("Disallow: /demo");
  });

  test("redirect /portfolio", async ({ request }) => {
    const res = await request.get("/portfolio", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toBe("/projects");
  });
});

test.describe("layout overflow", () => {
  const widths = [375, 1024, 1920];
  for (const width of widths) {
    test(`homepage no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      expect(overflow).toBe(false);
    });
  }
});
