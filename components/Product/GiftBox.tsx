"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { SALE, effectivePrice, isSaleActive } from "@/lib/sale";
import { EARTH_CRUNCH, GIFT_BOX, SMOKED_CACAO } from "@/lib/products";
import PriceTag from "@/components/Shop/PriceTag";
import GiftBoxVisual from "@/components/Shop/GiftBoxVisual";
import TrustRow from "@/components/Shop/TrustRow";
import { useAddToCart } from "@/components/Shop/useAddToCart";

const INSIDE = [EARTH_CRUNCH, SMOKED_CACAO];

export default function GiftBox() {
  const [qty, setQty] = useState(1);
  const { add, addingKey } = useAddToCart();
  const adding = addingKey === GIFT_BOX.key;
  const onSale = isSaleActive();

  useEffect(() => {
    const unit = effectivePrice(GIFT_BOX.price);
    track("view_item", {
      value: unit,
      currency: "INR",
      items: [{ id: GIFT_BOX.variantId, name: GIFT_BOX.name, price: unit, quantity: 1 }],
    });
  }, []);

  return (
    <main className="bg-[#F3ECE2] overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: "#6F371E" }}>
        <div className="grid md:grid-cols-2 md:min-h-[92vh]">
          {/* Visual — first on mobile */}
          <div
            className="relative order-1 md:order-2 flex items-center justify-center pt-24 pb-6 md:py-20 px-6"
            style={{ background: "#5a2e15" }}
          >
            <GiftBoxVisual className="aspect-square max-w-[520px]" eager />
            <div
              className="absolute bottom-5 right-5 md:bottom-7 md:right-7 rounded-[14px] px-4 py-2.5"
              style={{
                background: "rgba(111,55,30,0.82)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(143,212,241,0.18)",
              }}
            >
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#8FD4F1" }}>
                Gift Box · {GIFT_BOX.size}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="relative order-2 md:order-1 flex flex-col justify-center px-6 py-10 md:px-14 md:py-20">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 w-fit"
              style={{ background: "rgba(143,212,241,0.1)", border: "1px solid rgba(143,212,241,0.22)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8FD4F1" }} />
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em]" style={{ color: "#8FD4F1" }}>
                Both flavours · {GIFT_BOX.size}
              </span>
            </div>

            <p
              className="font-[family-name:var(--font-playfair)] italic mb-1"
              style={{ color: "rgba(243,236,226,0.22)", fontSize: "1rem", letterSpacing: "0.15em" }}
            >
              snava.
            </p>
            <h1
              className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-[1.03] mb-2"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4rem)", letterSpacing: "-0.01em" }}
            >
              Gift<br />
              <em className="italic" style={{ color: "#FED68C" }}>Box</em>
            </h1>
            <p className="text-[0.8rem] font-light mb-7" style={{ color: "rgba(143,212,241,0.6)", letterSpacing: "0.04em" }}>
              {GIFT_BOX.tagline}
            </p>

            {/* What's inside */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
              {INSIDE.map((p) => (
                <Link
                  key={p.key}
                  href={p.href}
                  className="rounded-2xl px-4 py-3 transition-colors hover:bg-white/5"
                  style={{ background: "rgba(143,212,241,0.07)", border: "1px solid rgba(143,212,241,0.16)" }}
                >
                  <p className="text-sm font-bold" style={{ color: "#F3ECE2" }}>{p.name}</p>
                  <p className="text-[0.68rem] mt-0.5" style={{ color: "rgba(243,236,226,0.5)" }}>
                    {p.size} · {p.facts[0]}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mb-7">
              <PriceTag item={GIFT_BOX} qty={qty} tone="dark" />
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center rounded-full overflow-hidden flex-shrink-0"
                style={{ background: "rgba(143,212,241,0.08)", border: "1px solid rgba(143,212,241,0.2)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-lg font-light"
                  style={{ color: "#8FD4F1" }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[28px] text-center text-sm font-bold" style={{ color: "#F3ECE2" }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(5, q + 1))}
                  className="w-10 h-11 flex items-center justify-center text-lg font-light"
                  style={{ color: "#8FD4F1" }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => add(GIFT_BOX, qty)}
                disabled={adding}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                style={{
                  background: "#FED68C",
                  color: "#3d1c08",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  padding: "15px 32px",
                  boxShadow: "0 4px 24px rgba(254,214,140,0.28)",
                }}
              >
                {adding ? "Adding…" : "Add Gift Box to Cart"}
                {!adding && <span className="text-base leading-none">→</span>}
              </button>
            </div>

            {onSale && (
              <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-wider" style={{ color: "#FED68C" }}>
                🪔 {SALE.name}: extra {SALE.percent}% off, no code needed · ends {SALE.endsLabel}
              </p>
            )}

            <div className="mt-5">
              <TrustRow tone="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIDE THE BOX ───────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] mb-3 text-center">
          Inside the box
        </p>
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] text-center leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
        >
          One for crunch. One for chocolate.
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {INSIDE.map((p, i) => (
            <div
              key={p.key}
              className="relative rounded-[28px] overflow-hidden p-7 md:p-10 flex flex-col"
              style={{ background: i === 0 ? "#A2452B" : "#6F371E" }}
            >
              <div className="relative h-[260px] mb-6">
                <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]" />
              </div>
              <h3
                className="font-[family-name:var(--font-playfair)] font-black text-[#F3ECE2] leading-none mb-2"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                {p.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(243,236,226,0.65)" }}>{p.tagline}</p>
              <ul className="space-y-1.5 mb-6">
                {p.facts.map((f) => (
                  <li key={f} className="text-sm" style={{ color: "#FED68C" }}>✓ {f}</li>
                ))}
              </ul>
              <Link
                href={p.href}
                className="mt-auto text-xs font-bold uppercase tracking-widest underline underline-offset-4"
                style={{ color: "#F3ECE2" }}
              >
                About {p.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
