"use client";

import { FormEvent, useState } from "react";
import { OrbitFooterSocial } from "@/components/layout/footer-social";
import { FooterEnvelopeHero } from "@/components/layout/footer-icons";

export function FooterConnectBar() {
  const [email, setEmail] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    window.location.href = `mailto:support@theglobalorbit.com?subject=Newsletter&body=Subscribe%20${encodeURIComponent(value)}`;
  };

  return (
    <div className="orbit-footer-connect-bar">
      <div className="orbit-footer-connect-brand">
        <FooterEnvelopeHero />
        <div>
          <h4 className="orbit-footer-connect-title">Connect with us</h4>
          <p className="orbit-footer-connect-lede">
            Follow for product launches, SEO insights, and stories from client projects worldwide.
          </p>
        </div>
      </div>

      <form className="orbit-footer-subscribe" onSubmit={onSubmit}>
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
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </span>
        <button type="submit" className="orbit-footer-subscribe-btn">
          Subscribe
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <OrbitFooterSocial className="orbit-footer-social-premium" />
    </div>
  );
}
