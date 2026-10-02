import type { Metadata } from "next";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { getAboutConfig } from "@/lib/about-store";
import { getCareersConfig } from "@/lib/careers-store";
import { getPlatformPageConfig } from "@/lib/platform-page-store";
import { getProjectsConfig } from "@/lib/projects-store";
import { getHeroConfig } from "@/lib/hero-store";
import { getNeedConfig } from "@/lib/need-store";
import { getWorkConfig } from "@/lib/work-store";
import { getSoftwareConfig } from "@/lib/software-store";
import { hasOrbitPassword, isOrbitAuthed } from "@/lib/orbit-auth";

export const metadata: Metadata = {
  title: "Orbit",
  robots: { index: false, follow: false },
};

export default async function OrbitEditorPage() {
  const [config, need, work, software, about, careers, projects, webApps, androidApps, iosApps, authed, setup] =
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
    isOrbitAuthed(),
    hasOrbitPassword(),
  ]);

  return (
    <OrbitHeroEditor
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
      authed={authed}
      needsSetup={!setup}
    />
  );
}
