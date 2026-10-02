import type { Metadata } from "next";
import { CareersPageView } from "@/components/careers/careers-page-view";
import { getCareersConfig } from "@/lib/careers-store";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Careers",
    description: "Join Global Orbit — engineering, design, and SEO roles across Nepal, India, and the United States.",
    path: "/careers",
  });
}

export default async function CareersPage() {
  const config = await getCareersConfig();
  return <CareersPageView config={config} />;
}
