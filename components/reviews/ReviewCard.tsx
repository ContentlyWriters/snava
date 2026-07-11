"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote } from "lucide-react";
import { JudgeMeReview } from "./types";
import { avatarGradient, formatDate, initials } from "./utils";
import StarRating from "./StarRating";

interface Props {
  review: JudgeMeReview;
  index: number;
  onImageClick?: (images: string[], index: number) => void;
}

export default function ReviewCard({ review, index, onImageClick }: Props) {
  const [from, to] = avatarGradient(review.reviewer.name);

  const images = review.pictures
    .filter((p) => !p.hidden)
    .map((p) => p.urls.original || p.urls.huge || p.urls.compact);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-[#D99A4E]/35 hover:shadow-[0_30px_80px_-20px_rgba(217,154,78,0.18)]"
    >
      {/* hairline top accent, brightens on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity duration-500 group-hover:via-[#D99A4E]/50" />

      <Quote
        size={64}
        strokeWidth={1}
        className="pointer-events-none absolute -top-2 right-4 text-white/[0.035]"
      />

      {/* Header */}
      <div className="flex items-center gap-4 p-6 pb-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white/95 shadow-[0_6px_18px_rgba(0,0,0,0.35)] ring-1 ring-white/15"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {initials(review.reviewer.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="truncate font-medium text-white">{review.reviewer.name}</h4>

            {review.verified === "yes" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#9CAF6B]/30 bg-[#9CAF6B]/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#C4D69A]">
                <BadgeCheck size={11} />
                Verified
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-3">
            <StarRating rating={review.rating} showValue={false} size={13} />
            <span className="text-[11px] text-white/35">{formatDate(review.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        {review.title && (
          <h3 className="mb-2.5 font-[family-name:var(--font-display,ui-serif)] text-lg italic leading-snug text-white">
            {review.title}
          </h3>
        )}

        <p className="whitespace-pre-line text-[14.5px] leading-7 text-white/60">{review.body}</p>
      </div>

      {/* Images */}
      {!!images.length && (
        <div
          className={`mt-5 grid gap-1.5 px-6 ${
            images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {images.slice(0, 6).map((image, i) => (
            <button
              key={image}
              onClick={() => onImageClick?.(images, i)}
              className="group/image relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/image:bg-black/20" />
              {i === 5 && images.length > 6 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-medium text-white backdrop-blur-sm">
                  +{images.length - 6}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 border-t border-white/[0.07] px-6 py-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#D99A4E]/85">
          {review.product_title}
        </p>
      </div>
    </motion.article>
  );
}
