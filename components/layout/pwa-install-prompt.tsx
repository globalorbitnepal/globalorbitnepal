"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { FooterInstallIcon } from "@/components/layout/footer-action-icons";
import { isOrbitAdminPath } from "@/lib/is-orbit-admin-route";

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

function subscribeStandalone(onChange: () => void) {
  const mql = window.matchMedia("(display-mode: standalone)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isIosSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const webkit = /WebKit/.test(ua);
  const chrome = /CriOS|FxiOS|EdgiOS/.test(ua);
  return iOS && webkit && !chrome;
}

export function PwaInstallPrompt() {
  const pathname = usePathname();
  const installed = useSyncExternalStore(subscribeStandalone, isStandalone, () => false);
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [iosHint, setIosHint] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [showAndroidHelp, setShowAndroidHelp] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    try {
      if (window.localStorage.getItem("orbit-pwa-dismiss") === "1") setDismissed(true);
    } catch {
      /* ignore */
    }

    setIosHint(isIosSafari());

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as PromptEvent);
    };
    const onInstalled = () => {
      setPrompt(null);
      setDismissed(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (isOrbitAdminPath(pathname)) return null;

  const showBanner = !installed && (Boolean(prompt) || iosHint) && !dismissed;

  const dismiss = () => {
    setDismissed(true);
    setShowIosHelp(false);
    setShowAndroidHelp(false);
    try {
      window.localStorage.setItem("orbit-pwa-dismiss", "1");
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (prompt) {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") dismiss();
      return;
    }
    if (iosHint) {
      setShowIosHelp(true);
      return;
    }
    setShowAndroidHelp(true);
  };

  return (
    <>
      {showBanner ? (
        <div className="orbit-pwa-banner" role="region" aria-label="Install Global Orbit app">
          <div className="orbit-pwa-banner-copy">
            <strong>Install Global Orbit</strong>
            <span>Open like a mobile app — faster, full screen, home-screen icon.</span>
          </div>
          <div className="orbit-pwa-banner-actions">
            <button type="button" className="orbit-pwa-banner-install" onClick={() => void install()}>
              <FooterInstallIcon />
              Install
            </button>
            <button type="button" className="orbit-pwa-banner-dismiss" onClick={dismiss} aria-label="Dismiss install banner">
              Not now
            </button>
          </div>
        </div>
      ) : null}

      {showIosHelp || showAndroidHelp ? (
        <div className="orbit-pwa-ios" role="dialog" aria-modal="true" aria-labelledby="orbit-ios-install-title">
          <div className="orbit-pwa-ios-card">
            <h2 id="orbit-ios-install-title">{showIosHelp ? "Add to Home Screen" : "Install this app"}</h2>
            {showIosHelp ? (
              <ol>
                <li>
                  Tap the <strong>Share</strong> button in Safari
                </li>
                <li>
                  Choose <strong>Add to Home Screen</strong>
                </li>
                <li>
                  Tap <strong>Add</strong>
                </li>
              </ol>
            ) : (
              <ol>
                <li>
                  Open the browser <strong>menu</strong> (⋮)
                </li>
                <li>
                  Tap <strong>Install app</strong> / <strong>Add to Home screen</strong>
                </li>
                <li>Confirm to open Global Orbit like a native app</li>
              </ol>
            )}
            <button type="button" className="orbit-pwa-banner-install" onClick={dismiss}>
              Got it
            </button>
          </div>
        </div>
      ) : null}

      <nav className={`orbit-app-dock${installed ? " is-installed" : ""}`} aria-label="App shortcuts">
        <Link href="/" className={`orbit-app-dock-item${pathname === "/" ? " is-active" : ""}`}>
          <span aria-hidden="true">⌂</span>
          Home
        </Link>
        <Link
          href="/services"
          className={`orbit-app-dock-item${pathname.startsWith("/service") ? " is-active" : ""}`}
        >
          <span aria-hidden="true">◇</span>
          Services
        </Link>
        <Link
          href="/projects"
          className={`orbit-app-dock-item${pathname.startsWith("/project") ? " is-active" : ""}`}
        >
          <span aria-hidden="true">▣</span>
          Work
        </Link>
        <Link
          href="/contact"
          className={`orbit-app-dock-item${pathname.startsWith("/contact") ? " is-active" : ""}`}
        >
          <span aria-hidden="true">✉</span>
          Contact
        </Link>
        {!installed ? (
          <button type="button" className="orbit-app-dock-item" onClick={() => void install()}>
            <span aria-hidden="true">↓</span>
            Install
          </button>
        ) : null}
      </nav>
    </>
  );
}

/** Compact footer / menu install control */
export function PwaInstallButton({ className }: { className?: string }) {
  const installed = useSyncExternalStore(subscribeStandalone, isStandalone, () => false);
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as PromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (installed) {
    return <span className={className}>App installed</span>;
  }

  return (
    <button
      type="button"
      className={className}
      disabled={!prompt && !isIosSafari()}
      onClick={() => {
        if (prompt) void prompt.prompt();
      }}
    >
      <FooterInstallIcon />
      Install app
    </button>
  );
}
