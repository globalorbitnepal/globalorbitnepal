import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { OrbitArticlePage } from "@/components/orbit/catalog-page";
import { findCareerRole } from "@/lib/careers-config";
import { getCareersConfig } from "@/lib/careers-store";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const config = await getCareersConfig();
  return config.roles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = await getCareersConfig();
  const item = findCareerRole(config, slug);
  if (!item) return { title: "Role" };
  return buildPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/careers/${item.slug}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const config = await getCareersConfig();
  const item = findCareerRole(config, slug);
  if (!item) notFound();

  return (
    <>
      <OrbitArticlePage eyebrow="Careers" title={item.title} summary={item.summary} />
      <div className="orbit-about-page px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-3">
          <Link href="/careers" className="orbit-btn-glass inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold text-white">
            ← All roles
          </Link>
          <Link href="/contact" className="orbit-btn-gold inline-flex h-11 items-center rounded-full px-6 text-sm font-bold">
            Apply for this role
          </Link>
        </div>
        <p className="mx-auto mt-6 max-w-lg text-center text-sm text-white/45">
          {item.location} · {item.employmentType} · {item.department}
        </p>
      </div>
    </>
  );
}
