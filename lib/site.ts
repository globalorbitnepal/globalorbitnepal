export type FallbackNavItem = {
  label: string;
  href: string;
  location: "HEADER" | "FOOTER";
};

export const FALLBACK_SITE = {
  companyName: "Global Orbit Pvt Ltd",
  tagline: "Studios in Nepal, India and the United States",
  email: "support@theglobalorbit.com",
  phone: "+977-9823631899",
  address: "Kathmandu · India · United States",
  defaultSeoTitle: "Web Developer Nepal · Website, SEO, Apps & Digital Marketing | Global Orbit",
  defaultSeoDescription:
    "Kathmandu studio for website development, SEO, Google & social media ads, web apps, and ERP software — mobile-perfect builds for Nepal and global brands.",
} as const;

export const FALLBACK_HEADER_NAV: FallbackNavItem[] = [
  { label: "Overview", href: "/", location: "HEADER" },
  { label: "ERP Software", href: "/orbit-software", location: "HEADER" },
  { label: "Solutions", href: "/services", location: "HEADER" },
  { label: "Our Work", href: "/projects", location: "HEADER" },
  { label: "About Us", href: "/about", location: "HEADER" },
  { label: "Contact", href: "/contact", location: "HEADER" },
];

export const FALLBACK_FOOTER_NAV: FallbackNavItem[] = [
  { label: "Home", href: "/", location: "FOOTER" },
  { label: "About", href: "/about", location: "FOOTER" },
  { label: "Services", href: "/services", location: "FOOTER" },
  { label: "Projects", href: "/projects", location: "FOOTER" },
  { label: "Contact", href: "/contact", location: "FOOTER" },
];
