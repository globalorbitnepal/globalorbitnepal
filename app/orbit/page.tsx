import type { Metadata } from "next";
import { OrbitHeroEditor } from "@/components/orbit/orbit-hero-editor";
import { getAboutConfig } from "@/lib/about-store";
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
  const [config, need, work, software, about, authed, setup] = await Promise.all([
    getHeroConfig(),
    getNeedConfig(),
    getWorkConfig(),
    getSoftwareConfig(),
    getAboutConfig(),
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
      authed={authed}
      needsSetup={!setup}
    />
  );
}
