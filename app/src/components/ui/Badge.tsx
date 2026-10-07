"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "amber" | "red" | "outline" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  neutral: "bg-gray-100 text-gray-700",
  green: "bg-primary-50 text-sb-green",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
  outline: "border border-gray-200 text-gray-600 bg-white",
};

export default function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full whitespace-nowrap ${variants[variant]} ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      } ${className}`}
    >
      {children}
    </span>
  );
}
