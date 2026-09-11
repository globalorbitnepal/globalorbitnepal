"use client";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <main className="mx-auto max-w-xl px-6 py-20">
          <h1 className="text-2xl font-semibold">Application error</h1>
          <p className="mt-3 text-[var(--color-muted)]">
            Global Orbit Nepal could not render this page.
          </p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            {error.digest ? `Reference: ${error.digest}` : null}
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
