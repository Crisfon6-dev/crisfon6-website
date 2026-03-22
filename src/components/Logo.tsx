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
        d="M24 4L42 14.4v19.2L24 44 6 33.6V14.4L24 4Z"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* < bracket */}
      <polyline
        points="19,18 12,24 19,30"
        stroke="#f8fafc"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* / slash */}
      <line
        x1="26"
        y1="17"
        x2="22"
        y2="31"
        stroke="#f8fafc"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* > bracket */}
      <polyline
        points="29,18 36,24 29,30"
        stroke="#f8fafc"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Accent dot — top-right vertex */}
      <circle cx="42" cy="14.4" r="2.6" fill="#22c55e" />
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
