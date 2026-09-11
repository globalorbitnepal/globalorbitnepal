"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-lg text-[var(--color-muted)]">
        The page could not be loaded. You can try again without affecting other
        applications on this server.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 inline-flex rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white"
      >
        Try again
      </button>
    </Container>
  );
}
