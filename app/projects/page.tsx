import type { Metadata } from "next";
import { OrbitCtaBand, OrbitPageHero } from "@/components/orbit/page-hero";
import { ORBIT_PROJECTS } from "@/lib/orbit/catalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Our Work",
    description: "Projects delivered by Global Orbit across hotels, travel, restaurants, and ERP.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  return (
    <>
      <OrbitPageHero
        eyebrow="Our Work"
        title="Projects that delivered results"
        lede="Real clients, real numbers — see how we transformed these businesses online."
        headingId="projects-hero"
      />
      <section className="mx-auto grid max-w-[1280px] gap-5 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {ORBIT_PROJECTS.map((item) => (
          <article key={item.title} className="orbit-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#f0c43a]">{item.sector}</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-white/65">{item.result}</p>
          </article>
        ))}
      </section>
      <OrbitCtaBand />
    </>
  );
}
