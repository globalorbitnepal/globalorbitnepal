import { OrbitStudioHome } from "@/components/orbit/studio-home";
import type { HeroConfig } from "@/lib/hero-config";
import type { NeedConfig } from "@/lib/need-config";
import type { WorkConfig } from "@/lib/work-config";

export function OrbitHomeView({
  hero,
  need,
  work,
}: {
  hero: HeroConfig;
  need: NeedConfig;
  work: WorkConfig;
}) {
  return <OrbitStudioHome hero={hero} need={need} work={work} />;
}
