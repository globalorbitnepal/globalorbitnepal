export type HeaderNavLink = {
  label: string;
  href: string;
};

export type HeaderNavItem =
  | HeaderNavLink
  | {
      label: string;
      children: HeaderNavLink[];
    };

export function isNavDropdown(item: HeaderNavItem): item is { label: string; children: HeaderNavLink[] } {
  return "children" in item && Array.isArray(item.children);
}

/** Primary studio header — matches Metaminds-style pill + Services flyout. */
export const STUDIO_HEADER_NAV: HeaderNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Portfolio", href: "/projects" },
  {
    label: "Services",
    children: [
      { label: "App", href: "/orbit-software/custom-apps" },
      { label: "Website", href: "/service/website-development-nepal" },
      { label: "ERP Software", href: "/orbit-software" },
      { label: "AI Automation", href: "/service/ai-automation" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
