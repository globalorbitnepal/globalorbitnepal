export type FallbackNavItem = {
  label: string;
  href: string;
  location: "HEADER" | "FOOTER";
};

export const FALLBACK_SITE = {
  companyName: "Global Orbit Pvt Ltd",
  tagline: "Ideas · Build · Grow Globally",
  email: "sales@theglobalorbit.com",
  phone: "+91 11 3500 7890",
  address: "Kathmandu, Nepal",
  defaultSeoTitle: "Global Orbit Pvt Ltd — Digital solutions for a bigger tomorrow",
  defaultSeoDescription:
    "We build websites, web applications, mobile apps, ERP systems and provide hosting, dedicated servers, SEO and digital solutions to help businesses grow globally.",
} as const;

export const FALLBACK_HEADER_NAV: FallbackNavItem[] = [
  { label: "Home", href: "/", location: "HEADER" },
  { label: "Services", href: "/services", location: "HEADER" },
  { label: "Solutions", href: "/services/digital-solutions", location: "HEADER" },
  { label: "Technologies", href: "/#technologies", location: "HEADER" },
  { label: "Our Work", href: "/#work", location: "HEADER" },
  { label: "About", href: "/about", location: "HEADER" },
  { label: "Contact", href: "/contact", location: "HEADER" },
];

export const FALLBACK_FOOTER_NAV: FallbackNavItem[] = [
  { label: "Home", href: "/", location: "FOOTER" },
  { label: "About", href: "/about", location: "FOOTER" },
  { label: "Services", href: "/services", location: "FOOTER" },
  { label: "News", href: "/news", location: "FOOTER" },
  { label: "Contact", href: "/contact", location: "FOOTER" },
];
