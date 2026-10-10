"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FooterInstallIcon } from "@/components/layout/footer-action-icons";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

function subscribeStandalone(onChange: () => void) {
  const mql = window.matchMedia("(display-mode: standalone)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function PwaInstall({ className }: { className?: string }) {
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const installed = useSyncExternalStore(subscribeStandalone, isStandalone, () => false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as PromptEvent);
    };
    const onInstalled = () => {
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return <span className={className}>App installed</span>;
  }

  return (
    <button
      type="button"
      className={className}
      disabled={!prompt}
      onClick={() => {
        if (prompt) void prompt.prompt();
      }}
    >
      <FooterInstallIcon />
      Install app
    </button>
  );
}
