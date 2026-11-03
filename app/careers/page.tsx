import type { Metadata } from "next";
import { CareersPageView } from "@/components/careers/careers-page-view";
import { getCareersConfig } from "@/lib/careers-store";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  return applyPageSeo("/careers", {
    title: "Careers · Web, SEO & Software Jobs Kathmandu",
    description:
      "Join Global Orbit Nepal — developers, designers, and SEO specialists building world-class websites and software.",
  });
}

export default async function CareersPage() {
  const config = await getCareersConfig();
  return <CareersPageView config={config} />;
}
