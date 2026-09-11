export function isDatabaseUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { errorCode?: string; code?: string; name?: string };
  return (
    candidate.errorCode === "P1000" ||
    candidate.errorCode === "P1001" ||
    candidate.errorCode === "P1017" ||
    candidate.code === "P1000" ||
    candidate.code === "P1001" ||
    candidate.name === "PrismaClientInitializationError"
  );
}
