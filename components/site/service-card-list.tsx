import Link from "next/link";
import { SERVICE_CATALOG, type ServiceContent } from "@/lib/content/services";

type ServiceCardListProps = {
  items?: Pick<ServiceContent, "slug" | "index" | "title" | "summary">[];
};

export function ServiceCardList({ items = SERVICE_CATALOG }: ServiceCardListProps) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
      {items.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/services/${service.slug}`}
            className="block h-full bg-[var(--color-paper)] p-8 transition-colors duration-200 hover:bg-[var(--color-mist)] sm:p-10"
          >
            <p className="font-[family-name:var(--font-geist-mono)] text-xs tracking-widest text-[var(--color-copper)]">
              {service.index}
            </p>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl tracking-tight">
              {service.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-7 text-[var(--color-muted)]">
              {service.summary}
            </p>
            <p className="mt-6 text-sm font-medium text-[var(--color-brand)]">
              Read more
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
