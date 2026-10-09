export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};

export type BlogTag = {
  slug: string;
  name: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  tags: string;
  category: string;
  focusKeyword: string;
  featuredImage: string;
  featuredImageAlt: string;
  canonical: string;
  robotsIndex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  author: string;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
};

export type BlogStore = {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
};

export const DEFAULT_CATEGORIES: BlogCategory[] = [
  { slug: "seo", name: "SEO", description: "Search and ranking notes." },
  { slug: "engineering", name: "Engineering", description: "Stack and performance notes." },
  { slug: "studio", name: "Studio", description: "How Global Orbit works with clients." },
];

export function emptyPost(): BlogPost {
  const now = new Date().toISOString();
  return {
    slug: "",
    title: "",
    excerpt: "",
    body: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    tags: "",
    category: "",
    focusKeyword: "",
    featuredImage: "",
    featuredImageAlt: "",
    canonical: "",
    robotsIndex: true,
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    author: "Global Orbit",
    isPublished: false,
    publishedAt: now,
    updatedAt: now,
  };
}

export function normalizePost(raw: Partial<BlogPost> & { slug?: string }): BlogPost {
  const base = emptyPost();
  const slug = String(raw.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  return {
    ...base,
    ...raw,
    slug,
    title: String(raw.title || "").trim() || "Untitled",
    excerpt: String(raw.excerpt || "").trim(),
    body: String(raw.body || ""),
    seoTitle: String(raw.seoTitle || "").trim(),
    seoDescription: String(raw.seoDescription || "").trim(),
    keywords: String(raw.keywords || "").trim(),
    tags: String(raw.tags || "").trim(),
    category: String(raw.category || "").trim(),
    focusKeyword: String(raw.focusKeyword || "").trim(),
    featuredImage: String(raw.featuredImage || "").trim(),
    featuredImageAlt: String(raw.featuredImageAlt || "").trim(),
    canonical: String(raw.canonical || "").trim(),
    robotsIndex: raw.robotsIndex !== false,
    ogTitle: String(raw.ogTitle || "").trim(),
    ogDescription: String(raw.ogDescription || "").trim(),
    ogImage: String(raw.ogImage || "").trim(),
    author: String(raw.author || "Global Orbit").trim() || "Global Orbit",
    isPublished: Boolean(raw.isPublished),
    publishedAt: String(raw.publishedAt || new Date().toISOString()),
    updatedAt: String(raw.updatedAt || raw.publishedAt || new Date().toISOString()),
  };
}
