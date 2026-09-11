export function OrbitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="orbit-mark-title"
    >
      <title id="orbit-mark-title">Abstract orbital diagram</title>
      <circle cx="240" cy="240" r="228" stroke="currentColor" strokeOpacity="0.12" />
      <circle cx="240" cy="240" r="168" stroke="currentColor" strokeOpacity="0.2" />
      <circle cx="240" cy="240" r="108" stroke="currentColor" strokeOpacity="0.35" />
      <ellipse
        cx="240"
        cy="240"
        rx="210"
        ry="72"
        stroke="currentColor"
        strokeOpacity="0.45"
        transform="rotate(-18 240 240)"
      />
      <ellipse
        cx="240"
        cy="240"
        rx="210"
        ry="72"
        stroke="currentColor"
        strokeOpacity="0.2"
        transform="rotate(28 240 240)"
      />
      <circle cx="240" cy="240" r="10" fill="currentColor" />
      <circle cx="412" cy="186" r="6" fill="currentColor" />
      <circle cx="96" cy="292" r="4.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
