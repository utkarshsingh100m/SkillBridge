"use client";

interface MatchCircleProps {
  score: number;
  size?: number | "sm" | "md" | "lg";
  strokeWidth?: number;
  label?: string;
}

export default function MatchCircle({ score, size = 100, strokeWidth = 8, label = "Overall Match" }: MatchCircleProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 52
      : size === "md"
      ? 76
      : 100;
  const computedStroke = typeof size === "string" && size === "sm" ? 4 : strokeWidth;
  const radius = (pixelSize - computedStroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return "#16a34a";
    if (s >= 75) return "#22c55e";
    if (s >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: pixelSize, height: pixelSize }}>
        <svg width={pixelSize} height={pixelSize} className="-rotate-90">
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={computedStroke}
          />
          <circle
            cx={pixelSize / 2}
            cy={pixelSize / 2}
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth={computedStroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="match-circle"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold text-sb-dark ${
              pixelSize <= 56 ? "text-xs font-mono" : "text-2xl"
            }`}
          >
            {score}%
          </span>
        </div>
      </div>
      {label && <span className="text-xs text-text-secondary">{label}</span>}
    </div>
  );
}
