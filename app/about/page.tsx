import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page-view";
import { getAboutConfig } from "@/lib/about-store";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "About Us",
    description:
      "Global Orbit Pvt Ltd — enterprise software, web development, and SEO from Kathmandu with studios in Nepal, India, and the United States.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const config = await getAboutConfig();
  return <AboutPageView config={config} />;
}
