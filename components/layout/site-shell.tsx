import type { ReactNode } from "react";
import { OrbitChrome } from "@/components/layout/orbit-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteMain } from "@/components/layout/site-main";
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
    <div className="flex min-h-full flex-col bg-[#06122e] text-[#e8eef8]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#f0c43a] focus:px-4 focus:py-2 focus:text-sm focus:text-[#1a1408]"
      >
        Skip to content
      </a>
      <SiteHeader companyName={companyName} items={headerItems} email={email} phone={phone} />
      <SiteMain>{children}</SiteMain>
      <SiteFooter
        companyName={companyName}
        tagline={tagline}
        items={footerItems}
        email={email}
        phone={phone}
        address={address}
      />
      <OrbitChrome />
    </div>
  );
}
