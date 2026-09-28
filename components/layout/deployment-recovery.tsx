"use client";

import { useEffect } from "react";

const RELOAD_KEY = "globalorbitnepal-chunk-reload";

function shouldRecoverFrom(message: string) {
  return (
    /Loading chunk|ChunkLoadError|failed to fetch dynamically imported module/i.test(message) ||
    /is not a function/i.test(message) ||
    /Server Reference ID did not match/i.test(message)
  );
}

/**
 * After a deploy, cached HTML can reference removed JS chunks. One hard reload usually fixes it.
 */
export function DeploymentRecovery() {
  useEffect(() => {
    const recover = (message: string) => {
      if (!shouldRecoverFrom(message)) return;
      if (sessionStorage.getItem(RELOAD_KEY)) return;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      recover(event.message || String(event.error ?? ""));
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "";
      recover(message);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
