"use client";
import { SALE, formatINR, isSaleActive, salePrice } from "@/lib/sale";
import type { CatalogItem } from "@/lib/products";

interface PriceTagProps {
  item: CatalogItem;
  qty?: number;
  /** "dark" sits on the brown sections, "light" on cream sections. */
  tone?: "dark" | "light";
  size?: "lg" | "md";
}

/**
 * MRP (struck) → regular price (struck, only during a sale) → price you pay.
 * During the Diwali sale this reads: MRP ₹848  ₹549  [EXTRA 15% OFF]  ₹466.65
 */
export default function PriceTag({ item, qty = 1, tone = "dark", size = "lg" }: PriceTagProps) {
  const onSale = isSaleActive();
  const regular = item.price * qty;
  const pay = onSale ? salePrice(item.price) * qty : regular;
  const mrp = item.mrp * qty;
  const offMrp = Math.round(((mrp - pay) / mrp) * 100);

  const muted = tone === "dark" ? "rgba(243,236,226,0.4)" : "rgba(111,55,30,0.5)";
  const priceColor = tone === "dark" ? "#FED68C" : "#A2452B";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-1.5">
        <span
          className="text-[0.62rem] font-semibold uppercase tracking-widest"
          style={{ color: muted }}
        >
          MRP
        </span>
        <span className="line-through text-sm" style={{ color: muted }}>
          {formatINR(mrp)}
        </span>
        {onSale && (
          <span className="line-through text-sm" style={{ color: muted }}>
            {formatINR(regular)}
          </span>
        )}
        <span
          className="text-[0.6rem] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5"
          style={
            onSale
              ? { background: "#FED68C", color: "#3d1c08" }
              : {
                  background: tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: tone === "dark" ? "#4ade80" : "#15803d",
                }
          }
        >
          {onSale ? `🪔 Extra ${SALE.percent}% off` : `${offMrp}% off`}
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span
          className="font-[family-name:var(--font-playfair)] font-bold leading-none"
          style={{
            color: priceColor,
            fontSize: size === "lg" ? "clamp(2.2rem, 4vw, 2.8rem)" : "1.9rem",
          }}
        >
          {formatINR(pay)}
        </span>
        <span className="text-[0.75rem] font-light" style={{ color: muted, letterSpacing: "0.06em" }}>
          / {item.size}
        </span>
      </div>
      {onSale && (
        <p className="mt-1.5 text-[0.7rem]" style={{ color: muted }}>
          {offMrp}% off MRP · discount applied automatically at checkout
        </p>
      )}
    </div>
  );
}
