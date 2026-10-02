import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomAppsPageView } from "@/components/orbit-software/custom-apps-page-view";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findBySlug, ORBIT_SOFTWARE } from "@/lib/orbit/catalog";
import { getCustomAppsConfig } from "@/lib/custom-apps-store";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ORBIT_SOFTWARE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) return { title: "Software" };
  if (slug === "custom-apps") {
    const config = await getCustomAppsConfig();
    return buildPageMetadata({
      title: "Custom Web & Mobile Apps",
      description: config.heroLede.slice(0, 155),
      path: item.href,
    });
  }
  return buildPageMetadata({ title: item.title, description: item.summary, path: item.href });
}

export default async function SoftwareDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findBySlug(ORBIT_SOFTWARE, slug);
  if (!item) notFound();

  if (slug === "custom-apps") {
    const config = await getCustomAppsConfig();
    return (
      <>
        <link rel="preload" href={config.heroVideoSrc} as="video" fetchPriority="high" />
        <CustomAppsPageView config={config} />
      </>
    );
  }

  return <OrbitArticlePage eyebrow="ERP Software" title={item.title} summary={item.summary} />;
}
