/** Long-form seed articles for the public blog (rendered as sanitized HTML). */

export type BlogSeed = {
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  body: string;
};

export const BLOG_SEEDS: BlogSeed[] = [
  {
    slug: "rank-nepali-businesses-page-1-google",
    title: "How Nepali Businesses Rank on Page 1 of Google",
    summary:
      "A practical, Nepal-specific SEO playbook: keyword research in Nepali and English, technical fixes that actually move rankings, local map-pack tactics, and the content depth Google expects in 2026.",
    seoTitle: "SEO Nepal: How to Rank on Google Page 1 | Global Orbit",
    seoDescription:
      "Step-by-step SEO guide for Nepali businesses — keyword research, technical fixes, local SEO for Kathmandu, content planning, and realistic ranking timelines.",
    keywords:
      "seo nepal, google ranking nepal, local seo kathmandu, seo company nepal, rank on google nepal",
    body: `<p>Most Nepali businesses lose customers before anyone visits their site: the search result never gets clicked because the title is generic, the site loads slowly on a mid-range Android phone, or Google simply has not indexed the pages at all. Fixing those three things alone is usually enough to move from page three to page one for local intent keywords.</p>

<h2>1. Start with the keywords your customers actually type</h2>
<p>Nepali buyers rarely search in a single language. A hotel owner in Thamel might search "hotel in thamel" in English, while a retail shop searches "billing software price nepal". Build a list from three sources:</p>
<ul>
<li><strong>Search Console queries</strong> — the real phrases people already used to find you, including the ones ranking at position 8–20.</li>
<li><strong>Competitor pages</strong> — the headings and service pages of the top three Nepali competitors for each term.</li>
<li><strong>How you talk to customers</strong> — the words used on the phone are usually the words typed into Google.</li>
</ul>
<p>Group the list into three buckets: service intent ("website development nepal"), local intent ("web developer kathmandu"), and comparison intent ("website price nepal"). Each bucket needs a different page.</p>

<h2>2. Get the technical foundation right first</h2>
<p>Content cannot rank on a site Google cannot crawl. The most common blockers we find on Nepali sites:</p>
<ul>
<li><strong>robots.txt blocking real pages.</strong> A broad rule such as <code>Disallow: /orbit</code> also blocks <code>/orbit-software</code> and every product page under it. robots.txt matching is prefix-based, so be precise.</li>
<li><strong>Blocking CSS and JavaScript.</strong> If <code>/_next/</code> or <code>/static/</code> is disallowed, Googlebot cannot render the page and judges it on an empty shell.</li>
<li><strong>Missing or duplicate canonicals.</strong> Every page needs exactly one self-referencing canonical on the final hostname.</li>
<li><strong>Slow mobile load.</strong> Test on a throttled connection, not office fibre. A 4-second load on a mid-range Android is normal in Nepal and will cap your rankings.</li>
</ul>

<h2>3. Local SEO wins the map pack</h2>
<p>For "near me" and city-level searches, Google Business Profile matters more than on-page copy. Complete every field: categories, service areas, hours, photos, and a short description containing your primary service. Collect reviews consistently — a steady trickle beats a one-time burst. Keep your name, address, and phone identical across the profile, your site footer, and directory listings.</p>

<h2>4. Build content depth, not page count</h2>
<p>Twenty thin pages rank worse than six substantial ones. A service page that answers pricing, timeline, technology, process, and objections usually outranks a thinner competitor with more links. Add structured sections: what is included, who it is for, how long it takes, what it costs, and a short FAQ. Mark the FAQ with FAQPage schema so it is eligible for rich results.</p>

<h2>5. What a realistic timeline looks like</h2>
<p>Technical fixes can be crawled within days, but ranking movement usually takes 6–12 weeks for competitive Nepal keywords. Expect faster movement on long-tail and local terms, slower on broad head terms where established competitors hold authority. Track impressions and average position in Search Console weekly — not daily, since daily noise is misleading.</p>

<p>If you want an audit of what is currently blocking your site, <a href="/contact">book a free consultation</a> and bring your Search Console access.</p>`,
  },
  {
    slug: "core-web-vitals-2026-cheat-sheet",
    title: "Core Web Vitals 2026: A Practical Cheat Sheet",
    summary:
      "LCP, INP, and CLS explained without jargon — the thresholds that matter, how to diagnose each one, and the specific fixes that work on real Nepali mobile connections.",
    seoTitle: "Core Web Vitals 2026 Guide: LCP, INP, CLS | Global Orbit",
    seoDescription:
      "Practical Core Web Vitals guide for 2026 — LCP, INP and CLS thresholds, how to diagnose each metric, and the fixes that improve mobile rankings in Nepal.",
    keywords:
      "core web vitals, lcp inp cls, page speed nepal, website performance, core web vitals 2026",
    body: `<p>Core Web Vitals are Google's page-experience signals. They are not the whole ranking algorithm, but failing them caps how well an otherwise strong page can perform — especially on mobile, where most Nepali traffic arrives.</p>

<h2>The three metrics</h2>
<ul>
<li><strong>LCP — Largest Contentful Paint.</strong> How long until the biggest visible element renders. Good: under 2.5s. Poor: over 4s.</li>
<li><strong>INP — Interaction to Next Paint.</strong> How quickly the page responds to a tap or click. Good: under 200ms. Poor: over 500ms.</li>
<li><strong>CLS — Cumulative Layout Shift.</strong> How much content jumps while loading. Good: under 0.1. Poor: over 0.25.</li>
</ul>

<h2>Fixing LCP</h2>
<p>The culprit is almost always the hero image or a render-blocking font.</p>
<ul>
<li>Serve the hero as WebP or AVIF, correctly sized for the viewport. A 4000px JPEG scaled down to 400px wastes seconds on mobile data.</li>
<li>Add <code>fetchpriority="high"</code> to the hero image and never lazy-load it. Lazy-loading the LCP image delays it by design.</li>
<li>Preload critical fonts, or use <code>font-display: swap</code> so text paints immediately.</li>
<li>Remove render-blocking third-party scripts from the head — chat widgets, tracking pixels, and tag managers are common offenders.</li>
</ul>

<h2>Fixing INP</h2>
<p>INP fails when the main thread is busy. Long JavaScript tasks block the browser from responding to taps.</p>
<ul>
<li>Split large bundles. Ship only the JavaScript the current page needs.</li>
<li>Defer non-critical work with <code>requestIdleCallback</code> or route-level code splitting.</li>
<li>Audit heavy third-party embeds. A single map or chat widget can add hundreds of milliseconds of blocking time.</li>
<li>Avoid large synchronous state updates on first interaction.</li>
</ul>

<h2>Fixing CLS</h2>
<p>Layout shift comes from content that has no reserved space.</p>
<ul>
<li>Always set explicit <code>width</code> and <code>height</code> on images, or use <code>aspect-ratio</code>.</li>
<li>Reserve space for ads, embeds, and dynamic banners before they load.</li>
<li>Do not inject a cookie bar or promo strip that pushes the page down after paint — overlay it instead, or reserve its height.</li>
<li>Use <code>font-display: swap</code> with a metric-compatible fallback to reduce text reflow.</li>
</ul>

<h2>How to measure properly</h2>
<p>Lab tools (Lighthouse) are useful for debugging but do not reflect real users. Use the Chrome UX Report or Search Console's Core Web Vitals report for field data, and test on a throttled mobile profile — not desktop fibre. Fix the worst-performing template first; a failing product page affects every URL built from it.</p>

<p>Need help getting these metrics green? <a href="/contact">Talk to our team</a>.</p>`,
  },
  {
    slug: "right-tech-stack-nepali-startup-2026",
    title: "Choosing the Right Tech Stack for a Nepali Startup",
    summary:
      "Next.js, Laravel, WordPress, or a no-code builder? A decision framework based on team size, budget, SEO needs, and how fast you need to launch in Nepal.",
    seoTitle: "Best Tech Stack for Nepali Startups 2026 | Global Orbit",
    seoDescription:
      "Compare Next.js, Laravel, WordPress and no-code for Nepali startups — cost, SEO, hiring, maintenance and scaling trade-offs, with a clear recommendation framework.",
    keywords:
      "tech stack nepal, nextjs nepal, laravel nepal, wordpress nepal, startup technology nepal",
    body: `<p>"Which stack should we use?" is usually the wrong first question. The better question is: what will this product need to do in eighteen months, and who will maintain it? In Nepal, hiring and support matter as much as raw performance.</p>

<h2>Start from constraints, not frameworks</h2>
<ul>
<li><strong>Budget and timeline</strong> — a two-week launch and a six-month platform need different foundations.</li>
<li><strong>Who maintains it</strong> — an in-house team, an agency retainer, or nobody?</li>
<li><strong>SEO requirements</strong> — if organic search is the growth channel, server-rendered HTML is non-negotiable.</li>
<li><strong>Offline and mobile reality</strong> — patchy connectivity makes payload size a product decision, not a technical detail.</li>
</ul>

<h2>WordPress: still right for content sites</h2>
<p>For a brochure site, blog, or small catalogue where the client edits content weekly, WordPress remains the fastest path. The trade-offs are plugin sprawl, security maintenance, and speed if the theme is bloated. Budget for a proper caching layer and disciplined plugin choice.</p>

<h2>Laravel: strong fit for business systems</h2>
<p>Billing, inventory, hotel PMS, school management, and ERP-style tools map well onto Laravel: mature authentication, queues, scheduled jobs, and a large local hiring pool. It is a pragmatic choice when the product is primarily forms, permissions, and reports rather than real-time interfaces.</p>

<h2>Next.js: best default for SEO-critical products</h2>
<p>If organic search matters and the product is a website or a customer-facing app, Next.js with React gives server-rendered HTML, fast client navigation, and image optimization out of the box. It handles marketing pages and authenticated dashboards in one codebase, which is why we use it for most new builds. The cost is a steeper learning curve and the need for a team comfortable with TypeScript.</p>

<h2>No-code: valid for validation, risky for scale</h2>
<p>A no-code builder can validate an idea in days. The problem arrives at scale: custom logic, integrations, and SEO control become expensive workarounds. Use it to test demand, then migrate before the workarounds define your product.</p>

<h2>A practical recommendation</h2>
<ul>
<li><strong>Content site, editor-managed:</strong> WordPress with a disciplined theme.</li>
<li><strong>Business operations system:</strong> Laravel with PostgreSQL.</li>
<li><strong>Marketing site plus app, SEO-critical:</strong> Next.js with TypeScript.</li>
<li><strong>Idea validation:</strong> no-code, with an explicit migration plan.</li>
</ul>
<p>Whatever you choose, own the code and the data. Lock-in to a platform you cannot export from is a bigger risk than picking the "wrong" framework.</p>

<p>Want a second opinion on your architecture? <a href="/contact">Book a free technical consultation</a>.</p>`,
  },
];
