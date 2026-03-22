export function LogoIcon({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hexagon */}
      <path
        d="M24 3L43 14v18L24 43 5 32V14L24 3Z"
        stroke="#60a5fa"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* "C6" as clean bold text — centered in hexagon */}
      <text
        x="23"
        y="30"
        textAnchor="middle"
        fontFamily="ui-monospace, 'Geist Mono', monospace"
        fontWeight="700"
        fontSize="19"
        fill="#f8fafc"
        letterSpacing="-0.5"
      >
        C6
      </text>
      {/* Accent dot — top-right vertex */}
      <circle cx="43" cy="14" r="2.8" fill="#22c55e" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ""}`}>
      <LogoIcon size={28} />
      <span className="font-mono text-sm text-text-secondary tracking-tight">
        crisfon6
      </span>
    </span>
  );
}
