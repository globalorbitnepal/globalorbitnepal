import type { Metadata } from "next";
import { ProjectsPageView } from "@/components/projects/projects-page-view";
import { getProjectsConfig } from "@/lib/projects-store";
import { applyPageSeo } from "@/lib/apply-page-seo";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getProjectsConfig();
  return applyPageSeo("/projects", {
    title: "Our Work · Projects",
    description: config.heroLede.slice(0, 155),
  });
}

export default async function ProjectsPage() {
  const config = await getProjectsConfig();
  return <ProjectsPageView config={config} />;
}
