export default function OrbitLayout({ children }: LayoutProps<"/orbit">) {
  return (
    <div className="orbit-dashboard-root min-h-[100dvh] bg-[#05050b] text-white">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_45%_at_12%_-10%,rgba(79,70,229,0.16),transparent_50%),radial-gradient(ellipse_60%_40%_at_90%_0%,rgba(56,189,248,0.08),transparent_45%)]"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
