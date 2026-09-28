export function isDatabaseUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    errorCode?: string;
    code?: string;
    name?: string;
    message?: string;
  };

  const code = candidate.errorCode || candidate.code;
  if (
    code === "P1000" ||
    code === "P1001" ||
    code === "P1002" ||
    code === "P1008" ||
    code === "P1017" ||
    code === "P2024"
  ) {
    return true;
  }

  if (
    candidate.name === "PrismaClientInitializationError" ||
    candidate.name === "PrismaClientRustPanicError"
  ) {
    return true;
  }

  const message = typeof candidate.message === "string" ? candidate.message.toLowerCase() : "";
  if (
    message.includes("connect") &&
    (message.includes("timeout") ||
      message.includes("refused") ||
      message.includes("terminated") ||
      message.includes("unavailable"))
  ) {
    return true;
  }

  return false;
}
