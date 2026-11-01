import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { getAboutConfig } from "@/lib/about-store";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/about", {
    title: "About Global Orbit · Web & Software Studio Nepal",
    description:
      "Enterprise websites, custom apps, ERP, and SEO from Kathmandu with teams in Nepal, India, and the United States — one accountable studio.",
  });
}

export default async function AboutPage() {
  const config = await getAboutConfig();
  return <AboutPageView config={config} />;
}
