import type { ReactNode } from "react";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { FallbackNavItem } from "@/lib/site";

type SiteShellProps = {
  companyName: string;
  tagline: string;
  headerItems: FallbackNavItem[];
  footerItems: FallbackNavItem[];
  email?: string;
  phone?: string;
  address?: string;
  children: ReactNode;
};

export function SiteShell({
  companyName,
  tagline,
  headerItems,
  footerItems,
  email,
  phone,
  address,
  children,
}: SiteShellProps) {
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-copper)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-hero)]"
      >
        Skip to content
      </a>
      <SiteHeader
        companyName={companyName}
        items={headerItems}
        email={email}
        phone={phone}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <ConditionalFooter
        companyName={companyName}
        tagline={tagline}
        items={footerItems}
        email={email}
        phone={phone}
        address={address}
      />
    </div>
  );
}
