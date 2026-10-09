import { htmlToPlainText, looksLikeHtml } from "@/lib/sanitize-html";

export type SeoCheck = {
  id: string;
  label: string;
  passed: boolean;
  points: number;
  hint: string;
};

export type SeoScoreInput = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  body: string;
  slug: string;
  canonical?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  excerpt?: string;
};

export function scoreSeo(input: SeoScoreInput) {
  const seoTitle = input.seoTitle.trim() || input.title.trim();
  const desc = input.seoDescription.trim();
  const keyword = input.focusKeyword.trim().toLowerCase();
  const bodyText = looksLikeHtml(input.body) ? htmlToPlainText(input.body) : input.body;
  const words = bodyText ? bodyText.split(/\s+/).filter(Boolean) : [];
  const intro = bodyText.slice(0, 180).toLowerCase();
  const slugOk = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug);
  const hasH2 = /<h2\b/i.test(input.body) || /^##\s/m.test(input.body);
  const hasInternal = /href=["'](\/|https?:\/\/arnav\.theglobalorbit\.com)/i.test(input.body) || /\]\(\//.test(input.body);

  const checks: SeoCheck[] = [
    {
      id: "title",
      label: "SEO title is present",
      passed: seoTitle.length > 0,
      points: 8,
      hint: "Add a meta title for search results.",
    },
    {
      id: "title-length",
      label: "SEO title is 30–60 characters",
      passed: seoTitle.length >= 30 && seoTitle.length <= 60,
      points: 8,
      hint: "Aim for a concise, specific title.",
    },
    {
      id: "description",
      label: "Meta description is present",
      passed: desc.length > 0,
      points: 8,
      hint: "Write a unique meta description.",
    },
    {
      id: "description-length",
      label: "Meta description is 70–160 characters",
      passed: desc.length >= 70 && desc.length <= 160,
      points: 8,
      hint: "Keep the snippet long enough to explain the page.",
    },
    {
      id: "keyword",
      label: "Focus keyword is set",
      passed: keyword.length > 1,
      points: 8,
      hint: "Choose the phrase this page should rank for.",
    },
    {
      id: "keyword-title",
      label: "Focus keyword appears in the title",
      passed: Boolean(keyword) && seoTitle.toLowerCase().includes(keyword),
      points: 8,
      hint: "Use the focus keyword naturally in the title.",
    },
    {
      id: "keyword-intro",
      label: "Focus keyword appears in the introduction",
      passed: Boolean(keyword) && intro.includes(keyword),
      points: 6,
      hint: "Mention the topic in the opening paragraph.",
    },
    {
      id: "headings",
      label: "Has a subheading (H2)",
      passed: hasH2,
      points: 6,
      hint: "Break the article with at least one H2.",
    },
    {
      id: "length",
      label: "Body has 300+ words",
      passed: words.length >= 300,
      points: 8,
      hint: `Current length: ${words.length} words. Add useful detail, not filler.`,
    },
    {
      id: "excerpt",
      label: "Excerpt is present",
      passed: Boolean(input.excerpt?.trim()),
      points: 4,
      hint: "Excerpts appear on the blog index and social cards.",
    },
    {
      id: "image",
      label: "Featured image is set",
      passed: Boolean(input.featuredImage?.trim()),
      points: 8,
      hint: "Add a featured image for listings and social shares.",
    },
    {
      id: "alt",
      label: "Featured image has alt text",
      passed: Boolean(input.featuredImage?.trim() && input.featuredImageAlt?.trim()),
      points: 6,
      hint: "Describe the image for accessibility and image search.",
    },
    {
      id: "slug",
      label: "URL slug is valid",
      passed: slugOk,
      points: 6,
      hint: "Use lowercase letters, numbers, and hyphens only.",
    },
    {
      id: "canonical",
      label: "Canonical URL is set",
      passed: Boolean(input.canonical?.trim()),
      points: 4,
      hint: "Set a canonical to avoid duplicate URLs.",
    },
    {
      id: "internal",
      label: "Contains an internal link",
      passed: hasInternal,
      points: 4,
      hint: "Link to another Global Orbit page where it helps the reader.",
    },
  ];

  const earned = checks.filter((item) => item.passed).reduce((sum, item) => sum + item.points, 0);
  const total = checks.reduce((sum, item) => sum + item.points, 0);
  const score = Math.round((earned / total) * 100);
  return { score, earned, total, checks, wordCount: words.length, charCount: bodyText.length };
}
