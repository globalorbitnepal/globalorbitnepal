import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_NEED, parseNeedConfig, type NeedConfig } from "@/lib/need-config";
import { getAppEnv } from "@/lib/env";

function needJsonPath() {
  const root = path.dirname(getAppEnv().uploadDir);
  return path.join(root, "need.json");
}

export async function getNeedConfig(): Promise<NeedConfig> {
  try {
    const raw = await readFile(needJsonPath(), "utf8");
    return parseNeedConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_NEED;
  }
}

export async function saveNeedConfig(config: NeedConfig) {
  const file = needJsonPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}
