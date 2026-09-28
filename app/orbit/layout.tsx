export default function OrbitLayout({ children }: LayoutProps<"/orbit">) {
  return (
    <div className="orbit-dashboard-root min-h-[100dvh] bg-[#040408] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(240,196,58,0.08),transparent_55%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
