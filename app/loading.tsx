import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-20">
      <div className="h-4 w-40 animate-pulse rounded bg-[var(--color-mist)]" />
      <div className="mt-6 h-10 w-80 max-w-full animate-pulse rounded bg-[var(--color-mist)]" />
      <div className="mt-4 h-24 w-full max-w-xl animate-pulse rounded bg-[var(--color-mist)]" />
    </Container>
  );
}
