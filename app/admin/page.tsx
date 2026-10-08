import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/admin-app";
import { AdminLogin } from "@/components/admin/admin-login";
import { getAboutConfig } from "@/lib/about-store";
import { getBlogPosts } from "@/lib/blog-store";
import { getCareersConfig } from "@/lib/careers-store";
import { getPlatformPageConfig } from "@/lib/platform-page-store";
import { getProjectsConfig } from "@/lib/projects-store";
import { getHeroConfig } from "@/lib/hero-store";
import { getNeedConfig } from "@/lib/need-store";
import { getWorkConfig } from "@/lib/work-store";
import { getSoftwareConfig } from "@/lib/software-store";
import { isOrbitAuthed } from "@/lib/orbit-auth";
import { getPageSeoList } from "@/lib/page-seo-store";
import { DEFAULT_SITE_CHROME, getSiteChrome } from "@/lib/site-chrome-store";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isOrbitAuthed();
  if (!authed) return <AdminLogin />;

  const [config, need, work, software, about, careers, projects, webApps, androidApps, iosApps, posts, pages, chrome] =
    await Promise.all([
      getHeroConfig(),
      getNeedConfig(),
      getWorkConfig(),
      getSoftwareConfig(),
      getAboutConfig(),
      getCareersConfig(),
      getProjectsConfig(),
      getPlatformPageConfig("web-apps"),
      getPlatformPageConfig("android-apps"),
      getPlatformPageConfig("ios-apps"),
      getBlogPosts(),
      getPageSeoList(),
      getSiteChrome(),
    ]);

  return (
    <AdminApp
      initial={config}
      initialNeed={need}
      initialWork={work}
      initialSoftware={software}
      initialAbout={about}
      initialCareers={careers}
      initialProjects={projects}
      initialWebApps={webApps}
      initialAndroidApps={androidApps}
      initialIosApps={iosApps}
      posts={posts}
      pages={pages}
      chrome={chrome ?? DEFAULT_SITE_CHROME}
    />
  );
}
