type ProcessListProps = {
  items: { step: string; title: string; body: string }[];
};

export function ProcessList({ items }: ProcessListProps) {
  return (
    <ol className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
      {items.map((item) => (
        <li
          key={item.step}
          className="grid gap-2 py-7 sm:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-8"
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-copper)]">
            {item.step}
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            {item.title}
          </h3>
          <p className="text-[0.95rem] leading-7 text-[var(--color-muted)]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
