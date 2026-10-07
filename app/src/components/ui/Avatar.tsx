"use client";

import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  online?: boolean;
  verified?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 min-w-8 min-h-8 max-w-8 max-h-8 text-xs",
  md: "w-10 h-10 min-w-10 min-h-10 max-w-10 max-h-10 text-sm",
  lg: "w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 text-base",
  xl: "w-20 h-20 min-w-20 min-h-20 max-w-20 max-h-20 text-xl",
  "2xl": "w-28 h-28 min-w-28 min-h-28 max-w-28 max-h-28 text-2xl",
};

const dotSizeMap = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
  "2xl": "w-5 h-5",
};

const pixelMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
  "2xl": 112,
};

export default function Avatar({ src, name, size = "md", online, className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const [imgError, setImgError] = React.useState(false);
  const px = pixelMap[size];

  return (
    <div
      className={`relative inline-flex shrink-0 ${sizeMap[size]} rounded-full ${className}`}
      style={{ width: px, height: px, minWidth: px, minHeight: px, maxWidth: px, maxHeight: px }}
    >
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-sb-green text-white font-semibold ring-2 ring-white select-none"
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="w-full h-full object-cover rounded-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{initials}</span>
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
