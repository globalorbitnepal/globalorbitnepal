import { OrbitStudioHome } from "@/components/orbit/studio-home";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";
import type { SoftwareConfig } from "@/lib/software-config";

export function OrbitHomeView({
  hero,
  need,
  work,
  software,
}: {
  hero: HeroConfig;
  need: NeedConfig;
  work: WorkConfig;
  software: SoftwareConfig;
}) {
  return <OrbitStudioHome hero={hero} need={need} work={work} software={software} />;
}
