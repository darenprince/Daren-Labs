import { useId } from "react";

interface AppIconProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function AppIcon({ src, alt, className = "h-12 w-12", loading = "lazy" }: AppIconProps) {
  const clipId = `crown-app-icon-squircle-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <span className={`relative inline-block shrink-0 aspect-square ${className}`}>
      <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0.5,0 C0.90,0 1,0.09 1,0.5 C1,0.91 0.9,1 0.5,1 C0.09,1 0,0.9 0,0.5 C0,0.09 0.09,0 0.5,0Z" />
          </clipPath>
        </defs>
      </svg>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="block h-full w-full object-cover"
        style={{ clipPath: `url(#${clipId})` }}
      />
    </span>
  );
}
