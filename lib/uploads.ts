import { getAppEnv } from "@/lib/env";

/**
 * Application upload root. Binary files stay outside the Git repository.
 */
export function getUploadDir(): string {
  return getAppEnv().uploadDir;
}
