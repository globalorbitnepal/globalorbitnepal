import type { Metadata } from "next";
import { CareersPageView } from "@/components/careers/careers-page-view";
import { getCareersConfig } from "@/lib/careers-store";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/careers", {
    title: "Careers",
    description: "Join Global Orbit — engineering, design, and SEO roles across Nepal, India, and the United States.",
  });
}

export default async function CareersPage() {
  const config = await getCareersConfig();
  return <CareersPageView config={config} />;
}
