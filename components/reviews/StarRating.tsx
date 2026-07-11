"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 18,
  showValue = true,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-[3px]">
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, rating - index));

          return (
            <div key={index} className="relative" style={{ width: size, height: size }}>
              <Star
                size={size}
                strokeWidth={1.5}
                className="absolute inset-0 text-white/15"
                fill="transparent"
              />

              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star
                  size={size}
                  strokeWidth={1.5}
                  className="text-[#D99A4E] drop-shadow-[0_0_6px_rgba(217,154,78,0.45)]"
                  fill="#D99A4E"
                />
              </div>
            </div>
          );
        })}
      </div>

      {showValue && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-[family-name:var(--font-display,ui-serif)] text-sm font-medium text-white">
            {rating.toFixed(1)}
          </span>

          {typeof reviewCount === "number" && (
            <span className="text-xs text-white/40">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
