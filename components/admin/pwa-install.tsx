"use client";

import { useEffect, useState } from "react";
import { FooterInstallIcon } from "@/components/layout/footer-action-icons";

type PromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function PwaInstall({ className }: { className?: string }) {
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as PromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
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
      onClick={() => {
        if (prompt) {
          void prompt.prompt();
          return;
        }
        window.alert("Use your browser menu → Add to Home Screen / Install app.");
      }}
    >
      <FooterInstallIcon />
      <span className="orbit-footer-chip-label">Install app</span>
    </button>
  );
}
