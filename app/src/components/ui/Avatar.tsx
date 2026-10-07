"use client";

import React, { useState } from "react";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  online?: boolean;
  verified?: boolean;
  className?: string;
}

const pixelMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  "2xl": 112,
};

const dotSizeMap = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
  "2xl": "w-5 h-5",
};

export default function Avatar({
  src,
  name = "User",
  size = "md",
  online,
  className = "",
}: AvatarProps) {
  const safeName = typeof name === "string" && name.trim() ? name : "User";
  const initials = safeName
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "SB";

  const [imgError, setImgError] = useState(false);
  const px = pixelMap[size] || 40;

  return (
    <div
      className={`relative inline-flex shrink-0 rounded-full select-none ${className}`}
      style={{
        width: `${px}px`,
        height: `${px}px`,
        minWidth: `${px}px`,
        minHeight: `${px}px`,
        maxWidth: `${px}px`,
        maxHeight: `${px}px`,
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-sb-green text-white font-semibold ring-2 ring-white">
        {src && !imgError ? (
          <img
            src={src}
            alt={safeName}
            className="w-full h-full object-cover rounded-full"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            style={{ fontSize: `${Math.max(10, Math.floor(px * 0.35))}px` }}
            className="font-bold tracking-tight"
          >
            {initials}
          </span>
        )}
      </div>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizeMap[size]} rounded-full border-2 border-white ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
}
