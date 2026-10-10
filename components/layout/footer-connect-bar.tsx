"use client";

import { FormEvent, useState } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { OrbitFooterSocial } from "@/components/layout/footer-social";
import { FooterEnvelopeHero } from "@/components/layout/footer-icons";
import type { FooterConfig } from "@/lib/footer-config";
import { DEFAULT_FOOTER_CONFIG } from "@/lib/footer-config";

export function FooterConnectBar({ footer = DEFAULT_FOOTER_CONFIG }: { footer?: FooterConfig }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    setBusy(true);
    const form = new FormData();
    form.set("name", "Newsletter");
    form.set("email", value);
    form.set("message", "Please add this address to product and studio updates.");
    form.set("source", "newsletter");
    form.set("pagePath", "/");
    const result = await submitInquiry(
      { status: "idle", message: "", errors: {} },
      form,
    );
    setBusy(false);
    setStatus(result.status === "success" ? "success" : "error");
  };

  return (
    <div className="orbit-footer-connect-bar">
      <div className="orbit-footer-connect-brand">
        <FooterEnvelopeHero />
        <div>
          <h4 className="orbit-footer-connect-title">{footer.connectTitle}</h4>
          <p className="orbit-footer-connect-lede">{footer.connectLede}</p>
        </div>
      </div>

      {status === "success" ? (
        <p className="orbit-footer-connect-lede" role="status">
          Thanks. We recorded your email.
        </p>
      ) : (
      <form className="orbit-footer-subscribe" onSubmit={(event) => void onSubmit(event)}>
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <span className="orbit-footer-subscribe-field">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="orbit-footer-subscribe-icon">
            <path
              d="M4 8.5 12 14l8-5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            id="footer-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={footer.subscribePlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </span>
        <button type="submit" className="orbit-footer-subscribe-btn" disabled={busy}>
          {busy ? "Saving…" : footer.subscribeButton}
          <span aria-hidden="true">→</span>
        </button>
        {status === "error" ? (
          <p className="orbit-footer-connect-lede" role="alert">
            Could not save just now. Try again, or email support@theglobalorbit.com.
          </p>
        ) : null}
      </form>
      )}

      <OrbitFooterSocial className="orbit-footer-social-premium" items={footer.social} />
    </div>
  );
}
