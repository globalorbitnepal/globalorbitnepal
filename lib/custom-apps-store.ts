import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_CUSTOM_APPS, parseCustomAppsConfig, type CustomAppsConfig } from "@/lib/custom-apps-config";
import { getAppEnv } from "@/lib/env";

function customAppsJsonPath() {
  const root = path.dirname(getAppEnv().uploadDir);
  return path.join(root, "custom-apps.json");
}

export async function getCustomAppsConfig(): Promise<CustomAppsConfig> {
  try {
    const raw = await readFile(customAppsJsonPath(), "utf8");
    return parseCustomAppsConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_CUSTOM_APPS;
  }
}

export async function saveCustomAppsConfig(config: CustomAppsConfig) {
  const file = customAppsJsonPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
