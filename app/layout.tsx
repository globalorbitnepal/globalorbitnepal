import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { listVisibleNavItems } from "@/lib/db/nav-items";
import { getSiteSettings } from "@/lib/db/site-settings";
import {
  FALLBACK_FOOTER_NAV,
  FALLBACK_HEADER_NAV,
  FALLBACK_SITE,
  type FallbackNavItem,
} from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

function toNavItems(
  items: { label: string; href: string; location: "HEADER" | "FOOTER" }[],
  fallback: FallbackNavItem[],
): FallbackNavItem[] {
  if (items.length === 0) {
    return fallback;
  }

  return items.map((item) => ({
    label: item.label,
    href: item.href,
    location: item.location,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.defaultSeoTitle || FALLBACK_SITE.defaultSeoTitle;
  const description =
    settings?.defaultSeoDescription || FALLBACK_SITE.defaultSeoDescription;

  return {
    title: {
      default: title,
      template: `%s · ${settings?.companyName || FALLBACK_SITE.companyName}`,
    },
    description,
    openGraph: {
      title,
      description,
      locale: "en_NP",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const footerRows = await listVisibleNavItems("FOOTER");

  const companyName = settings?.companyName || FALLBACK_SITE.companyName;
  const tagline = settings?.tagline || FALLBACK_SITE.tagline;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteShell
          companyName={companyName}
          tagline={tagline}
          headerItems={FALLBACK_HEADER_NAV}
          footerItems={toNavItems(footerRows, FALLBACK_FOOTER_NAV)}
          email={settings?.email || FALLBACK_SITE.email}
          phone={settings?.phone || FALLBACK_SITE.phone}
          address={settings?.address || FALLBACK_SITE.address}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
