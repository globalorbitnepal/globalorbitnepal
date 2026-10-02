import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_ABOUT, parseAboutConfig, type AboutConfig } from "@/lib/about-config";
import { getAppEnv } from "@/lib/env";

function aboutJsonPath() {
  const root = path.dirname(getAppEnv().uploadDir);
  return path.join(root, "about.json");
}

export async function getAboutConfig(): Promise<AboutConfig> {
  try {
    const raw = await readFile(aboutJsonPath(), "utf8");
    return parseAboutConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function saveAboutConfig(config: AboutConfig) {
  const file = aboutJsonPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
