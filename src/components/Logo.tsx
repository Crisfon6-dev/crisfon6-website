export function LogoIcon({ size = 28, className }: { size?: number; className?: string }) {
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
        stroke="#d97757"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* < bracket */}
      <polyline
        points="20,14 12,24 20,34"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* > bracket */}
      <polyline
        points="28,14 36,24 28,34"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Accent dot — top-right vertex */}
      <circle cx="42" cy="14.4" r="2.8" fill="#e28f74" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ''}`}>
      <LogoIcon size={28} />
      <span className="font-mono text-sm text-text-secondary tracking-tight">crisfon6</span>
    </span>
  );
}
