"use client";

export function FooterBackToTop() {
  return (
    <button
      type="button"
      className="orbit-footer-back-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 6.5 7 12.5M12 6.5l5 6M12 6.5V18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </button>
  );
}
