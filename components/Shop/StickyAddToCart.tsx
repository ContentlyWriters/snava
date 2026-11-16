"use client";
import { useEffect, useState } from "react";

/**
 * Mobile-only bar pinned to the bottom of product pages. It slides in while
 * the page's own "Add to Cart" button (targetId) is off screen, so shoppers
 * can always add to cart without scrolling, and hides when that button is
 * visible so the two never show at once.
 */
export default function StickyAddToCart({
  targetId,
  name,
  price,
  adding,
  onAdd,
}: {
  targetId: string;
  name: string;
  price: string;
  adding: boolean;
  onAdd: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <>
      {/* keeps the bar from covering the last bit of the page */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div
        aria-hidden={!show}
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          background: "#3d1c08",
          borderTop: "1px solid rgba(254,214,140,0.2)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-widest truncate" style={{ color: "rgba(243,236,226,0.6)" }}>
              {name}
            </p>
            <p className="font-bold text-lg leading-tight" style={{ color: "#FED68C" }}>
              {price}
            </p>
          </div>
          <button
            onClick={onAdd}
            disabled={adding}
            tabIndex={show ? 0 : -1}
            className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] disabled:opacity-60"
            style={{ background: "#FED68C", color: "#3d1c08" }}
          >
            {adding ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
