interface ProjectIconProps {
  size?: number;
  className?: string;
}

export function ProjectIcon({ size = 64, className = "" }: ProjectIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      
      {/* Outer hexagon */}
      <path
        d="M32 4L54 16V40L32 52L10 40V16L32 4Z"
        fill="url(#purpleGradient)"
        opacity="0.2"
      />
      
      {/* Inner hexagon */}
      <path
        d="M32 12L46 20V36L32 44L18 36V20L32 12Z"
        fill="url(#purpleGradient)"
      />
      
      {/* Letter O */}
      <text
        x="32"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="20"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        O
      </text>
    </svg>
  );
}