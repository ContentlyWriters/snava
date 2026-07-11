"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import ImageViewer from "./ImageViewer";
import Marquee from "./Marquee";
import RatingBadge from "./RatingBadge";
import { JudgeMeReview, ReviewsApiResponse } from "./types";
import { averageRating, avatarGradient, featuredReviews, initials, ratingDistribution } from "./utils";
import StarRating from "./StarRating";

function QuotePill({ review }: { review: JudgeMeReview }) {
  const [from, to] = avatarGradient(review.reviewer.name);
  const line = review.title || review.body;

  return (
    <div className="flex w-[320px] items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ring-1 ring-white/15"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {initials(review.reviewer.name)}
      </div>
      <div className="min-w-0">
        <StarRating rating={review.rating} showValue={false} size={11} className="mb-1.5" />
        <p className="truncate text-sm text-white/70">{line}</p>
      </div>
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="mb-6 break-inside-avoid animate-pulse overflow-hidden rounded-[26px] border border-white/[0.06] bg-white/[0.025] p-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white/[0.06]" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-28 rounded bg-white/[0.06]" />
          <div className="h-3 w-20 rounded bg-white/[0.04]" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.05]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.05]" />
        <div className="h-3 w-2/3 rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<JudgeMeReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/reviews");
        const data: ReviewsApiResponse = await res.json();
        if (data.success) setReviews(data.reviews);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = useMemo(() => featuredReviews(reviews), [reviews]);
  const rating = useMemo(() => averageRating(reviews), [reviews]);
  const distribution = useMemo(() => ratingDistribution(reviews), [reviews]);

  const openViewer = (images: string[], index: number) => {
    setViewerImages(images);
    setViewerIndex(index);
    setViewerOpen(true);
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#2A160D] py-28">
      {/* ambient background: gold glow + grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(217,154,78,0.09), transparent 65%), linear-gradient(180deg, #2A160D 0%, #3E2116 55%, #2A160D 100%)",
        }}
      />
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.035]">
        <filter id="reviewsGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#reviewsGrain)" />
      </svg>

      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#D99A4E]/80">
            Verified Buyers
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display,ui-serif)] text-4xl italic text-white sm:text-5xl">
            Loved by customers everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/45">
            Real words from real buyers — unedited, star for star.
          </p>
        </motion.div>

        {!loading && reviews.length > 0 && (
          <div className="mb-16">
            <RatingBadge rating={rating} total={reviews.length} distribution={distribution} />
          </div>
        )}

        {/* Quote marquee */}
        {!loading && featured.length > 0 && (
          <div className="mb-16 space-y-4">
            <Marquee pauseOnHover speed={48}>
              {featured.slice(0, 10).map((review) => (
                <QuotePill key={review.id} review={review} />
              ))}
            </Marquee>
            {featured.length > 4 && (
              <Marquee pauseOnHover reverse speed={54}>
                {featured.slice(4, 14).map((review) => (
                  <QuotePill key={review.id} review={review} />
                ))}
              </Marquee>
            )}
          </div>
        )}

        {/* Masonry wall */}
        {loading ? (
          <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-white/40">No reviews yet — be the first to share one.</p>
        ) : (
          <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
            {reviews.map((review, i) => (
              <div key={review.id} className="mb-6 break-inside-avoid">
                <ReviewCard review={review} index={i} onImageClick={openViewer} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageViewer
        open={viewerOpen}
        images={viewerImages}
        index={viewerIndex}
        onClose={() => setViewerOpen(false)}
        onChange={setViewerIndex}
      />
    </section>
  );
}
