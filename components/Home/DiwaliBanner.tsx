"use client";
import Link from "next/link";
import { SALE, formatINR, isSaleActive, salePrice } from "@/lib/sale";
import { GIFT_BOX } from "@/lib/products";
import GiftBoxVisual from "@/components/Shop/GiftBoxVisual";
import SaleCountdown from "@/components/Shop/SaleCountdown";

/** Homepage strip promoting the Diwali sale. Disappears by itself when the sale ends. */
export default function DiwaliBanner() {
  if (!isSaleActive()) return null;

  return (
    <section className="px-5 md:px-12 pt-10 md:pt-14 max-w-7xl mx-auto">
      <div
        className="relative overflow-hidden rounded-[28px] grid md:grid-cols-[1.4fr_1fr] items-center"
        style={{
          background:
            "radial-gradient(ellipse at 85% 50%, rgba(254,214,140,0.22) 0%, rgba(254,214,140,0) 60%), #6F371E",
        }}
      >
        <div className="px-7 py-9 md:px-12 md:py-12 order-2 md:order-1">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#FED68C" }}>
            🪔 {SALE.name} · ends {SALE.endsLabel}
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
          >
            Extra {SALE.percent}% off everything.
          </h2>
          <p className="text-sm md:text-base mb-6 max-w-md" style={{ color: "rgba(243,236,226,0.72)" }}>
            New: the Snava Gift Box, both flavours together, now {formatINR(salePrice(GIFT_BOX.price))}{" "}
            <span className="line-through opacity-60">{formatINR(GIFT_BOX.price)}</span>. No code needed.
          </p>
          <div className="mb-7">
            <SaleCountdown tone="dark" />
          </div>
          <Link
            href="/diwali"
            className="inline-flex items-center gap-2 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "#FED68C",
              color: "#3d1c08",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              padding: "15px 30px",
            }}
          >
            Shop the Diwali Sale →
          </Link>
        </div>
        <Link href="/diwali" className="order-1 md:order-2 flex justify-center px-6 pt-8 md:p-6" aria-label="Shop the Diwali sale">
          <div className="w-[min(70vw,360px)]">
            <GiftBoxVisual className="aspect-square" />
          </div>
        </Link>
      </div>
    </section>
  );
}
