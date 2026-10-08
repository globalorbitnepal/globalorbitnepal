import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { getAboutConfig } from "@/lib/about-store";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/about", {
    title: "About Us",
    description:
      "Global Orbit Pvt Ltd — enterprise software, web development, and SEO from Kathmandu with studios in Nepal, India, and the United States.",
  });
}

export default async function AboutPage() {
  const config = await getAboutConfig();
  return <AboutPageView config={config} />;
}
