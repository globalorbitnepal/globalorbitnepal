export type EditorSection =
  | "hero"
  | "need"
  | "work"
  | "software"
  | "about"
  | "careers"
  | "projects"
  | "customApps"
  | "appointments";

export type AdminPageId =
  | "home"
  | "about"
  | "projects"
  | "careers"
  | "software"
  | "web-apps"
  | "android-apps"
  | "ios-apps"
  | "contact"
  | "blogs"
  | "packages"
  | "services"
  | "privacy"
  | "terms";

export type AdminView =
  | "overview"
  | "page"
  | "seo"
  | "chrome"
  | "inquiries"
  | "blogs";

export type SectionId = EditorSection | "seo" | "hub";

export type AdminSection = {
  id: SectionId;
  label: string;
  hint: string;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  pageIds: AdminPageId[];
};

export type AdminPage = {
  id: AdminPageId;
  label: string;
  path: string;
  editor?: EditorSection;
  platformSlug?: "web-apps" | "android-apps" | "ios-apps";
  sections: AdminSection[];
  seoOnly?: boolean;
};

export const ADMIN_PAGES: AdminPage[] = [
  {
    id: "home",
    label: "Homepage",
    path: "/",
    editor: "hero",
    sections: [
      { id: "hero", label: "Hero", hint: "Eyebrow, headline, CTAs, video" },
      { id: "need", label: "Why you need us", hint: "Stats, slides, video" },
      { id: "software", label: "Enterprise software", hint: "Product cards" },
      { id: "work", label: "Websites we ship", hint: "Globe mosaic tiles" },
      { id: "seo", label: "SEO", hint: "Title, description, robots" },
    ],
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    editor: "about",
    sections: [
      { id: "about", label: "Page content", hint: "Story, timeline, team, CTA" },
      { id: "seo", label: "SEO", hint: "Metadata for /about" },
    ],
  },
  {
    id: "software",
    label: "Orbit Software",
    path: "/orbit-software",
    editor: "software",
    sections: [
      { id: "software", label: "Products", hint: "ERP and product cards" },
      { id: "seo", label: "SEO", hint: "Metadata for /orbit-software" },
    ],
  },
  {
    id: "web-apps",
    label: "Web Apps",
    path: "/orbit-software/web-apps",
    editor: "customApps",
    platformSlug: "web-apps",
    sections: [{ id: "customApps", label: "Page content", hint: "Web apps landing" }],
  },
  {
    id: "android-apps",
    label: "Android Apps",
    path: "/orbit-software/android-apps",
    editor: "customApps",
    platformSlug: "android-apps",
    sections: [{ id: "customApps", label: "Page content", hint: "Android landing" }],
  },
  {
    id: "ios-apps",
    label: "iOS Apps",
    path: "/orbit-software/ios-apps",
    editor: "customApps",
    platformSlug: "ios-apps",
    sections: [{ id: "customApps", label: "Page content", hint: "iOS landing" }],
  },
  {
    id: "projects",
    label: "Portfolio",
    path: "/projects",
    editor: "projects",
    sections: [
      { id: "projects", label: "Page content", hint: "Demos, stats, CTA" },
      { id: "seo", label: "SEO", hint: "Metadata for /projects" },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    path: "/careers",
    editor: "careers",
    sections: [
      { id: "careers", label: "Page content", hint: "Roles, culture, apply" },
      { id: "seo", label: "SEO", hint: "Metadata for /careers" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    editor: "appointments",
    sections: [
      { id: "appointments", label: "Appointment inbox", hint: "Book Appointment form" },
      { id: "seo", label: "SEO", hint: "Metadata for /contact" },
    ],
  },
  {
    id: "blogs",
    label: "Blog",
    path: "/blogs",
    sections: [{ id: "seo", label: "SEO", hint: "Metadata for /blogs" }],
  },
  {
    id: "packages",
    label: "Packages",
    path: "/packages",
    seoOnly: true,
    sections: [{ id: "seo", label: "SEO", hint: "Catalog copy is code; metadata is editable" }],
  },
  {
    id: "services",
    label: "Solutions",
    path: "/services",
    seoOnly: true,
    sections: [{ id: "seo", label: "SEO", hint: "Catalog copy is code; metadata is editable" }],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    path: "/privacy-policy",
    seoOnly: true,
    sections: [{ id: "seo", label: "SEO", hint: "Metadata only" }],
  },
  {
    id: "terms",
    label: "Terms",
    path: "/terms-and-conditions",
    seoOnly: true,
    sections: [{ id: "seo", label: "SEO", hint: "Metadata only" }],
  },
];

/** Sidebar groups — matches live site structure. */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "main",
    label: "Main website",
    pageIds: ["home", "about", "software", "projects", "careers", "contact"],
  },
  {
    id: "platforms",
    label: "App platforms",
    pageIds: ["web-apps", "android-apps", "ios-apps"],
  },
  {
    id: "catalog",
    label: "Catalog & legal",
    pageIds: ["packages", "services", "blogs", "privacy", "terms"],
  },
];

export function adminPageById(id: string) {
  return ADMIN_PAGES.find((page) => page.id === id);
}

export function adminPageByPath(path: string) {
  return ADMIN_PAGES.find((page) => page.path === path);
}
