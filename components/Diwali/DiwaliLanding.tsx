"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { SALE, effectivePrice, isSaleActive } from "@/lib/sale";
import { EARTH_CRUNCH, GIFT_BOX, SMOKED_CACAO, SHIPPING_CHARGE } from "@/lib/products";
import PriceTag from "@/components/Shop/PriceTag";
import GiftBoxVisual from "@/components/Shop/GiftBoxVisual";
import TrustRow from "@/components/Shop/TrustRow";
import SaleCountdown from "@/components/Shop/SaleCountdown";
import { useAddToCart } from "@/components/Shop/useAddToCart";

// Small glowing "diya" lights scattered over the hero.
const LIGHTS = [
  { top: "14%", left: "8%", size: 6, delay: "0s" },
  { top: "28%", left: "46%", size: 4, delay: "1.2s" },
  { top: "70%", left: "6%", size: 5, delay: "2.1s" },
  { top: "18%", left: "88%", size: 7, delay: "0.6s" },
  { top: "62%", left: "52%", size: 4, delay: "1.8s" },
  { top: "84%", left: "80%", size: 6, delay: "0.9s" },
  { top: "40%", left: "24%", size: 3, delay: "2.6s" },
];

const REASONS = [
  {
    title: "Not another box of sweets",
    body: "Everyone gets mithai. A gift box of real peanut butter is the one they'll still be eating in December.",
  },
  {
    title: "Real food, no shortcuts",
    body: "Roasted peanuts doing the heavy lifting. Up to 26g protein per 100g, zero trans fat, no palm oil.",
  },
  {
    title: "Lab-tested, out in the open",
    body: "We publish our lab report, so you know exactly what you're gifting.",
    link: { href: "/labreport", label: "See the lab report →" },
  },
];

export default function DiwaliLanding() {
  const onSale = isSaleActive();
  const { add, addingKey } = useAddToCart();

  useEffect(() => {
    const unit = effectivePrice(GIFT_BOX.price);
    track("view_item", {
      value: unit,
      currency: "INR",
      items: [{ id: GIFT_BOX.variantId, name: GIFT_BOX.name, price: unit, quantity: 1 }],
    });
  }, []);

  const faqs = [
    {
      q: "Do I need a coupon code?",
      a: onSale
        ? `No. The extra ${SALE.percent}% comes off automatically at checkout. It can't be combined with other coupon codes.`
        : "No code needed. The prices you see are the prices you pay.",
    },
    { q: "Is Cash on Delivery available?", a: "Yes, you can pay with Cash on Delivery or online at checkout." },
    {
      q: "How much is shipping?",
      a: `Free on the gift box or any two jars. A single jar ships for ₹${SHIPPING_CHARGE}.`,
    },
    ...(onSale
      ? [{ q: "When does the sale end?", a: `${SALE.endsLabel} (IST). After that, prices go back to normal.` }]
      : []),
    {
      q: "Will it arrive before Diwali?",
      a: "We ship across India. If you need it before Diwali, order as early as you can so the courier has time to deliver.",
    },
  ];

  return (
    <main className="bg-[#F3ECE2] overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative pt-28 md:pt-32 pb-16 md:pb-24"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(254,214,140,0.18) 0%, rgba(254,214,140,0) 55%), radial-gradient(ellipse at 10% 90%, rgba(162,69,43,0.5) 0%, rgba(162,69,43,0) 60%), #5a2e15",
        }}
      >
        {LIGHTS.map((l, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute rounded-full pointer-events-none ${i % 2 ? "animate-float-a" : "animate-float-b"}`}
            style={{
              top: l.top,
              left: l.left,
              width: l.size,
              height: l.size,
              background: "#FED68C",
              boxShadow: `0 0 ${l.size * 4}px ${l.size}px rgba(254,214,140,0.45)`,
              animationDelay: l.delay,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(254,214,140,0.12)", border: "1px solid rgba(254,214,140,0.3)" }}
            >
              <span aria-hidden>🪔</span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em]" style={{ color: "#FED68C" }}>
                {onSale ? `${SALE.name} · Extra ${SALE.percent}% off everything` : "The Snava Gift Box"}
              </span>
            </div>

            <h1
              className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-[1.04] mb-5"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)", letterSpacing: "-0.01em" }}
            >
              Gift something <em className="italic" style={{ color: "#FED68C" }}>real</em> this Diwali.
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(243,236,226,0.72)" }}>
              Both Snava flavours, Earth Crunch and Smoked Cacao, in one gift box.
              {onSale && <> Extra {SALE.percent}% off, applied automatically at checkout.</>}
            </p>

            {onSale && (
              <div className="mb-8">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(243,236,226,0.5)" }}>
                  Sale ends in
                </p>
                <SaleCountdown tone="dark" />
              </div>
            )}

            <div className="mb-7">
              <PriceTag item={GIFT_BOX} tone="dark" />
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={() => add(GIFT_BOX)}
                disabled={addingKey === GIFT_BOX.key}
                className="inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 w-full sm:w-auto"
                style={{
                  background: "#FED68C",
                  color: "#3d1c08",
                  fontSize: "0.74rem",
                  letterSpacing: "0.18em",
                  padding: "17px 34px",
                  boxShadow: "0 6px 30px rgba(254,214,140,0.35)",
                }}
              >
                {addingKey === GIFT_BOX.key ? "Adding…" : "Add Gift Box to Cart"}
                {addingKey !== GIFT_BOX.key && <span className="text-base leading-none">→</span>}
              </button>
              <a
                href="#jars"
                className="text-xs font-bold uppercase tracking-widest underline underline-offset-4"
                style={{ color: "rgba(243,236,226,0.75)" }}
              >
                Or shop single jars ↓
              </a>
            </div>

            <TrustRow tone="dark" />
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 flex justify-center">
            <Link href={GIFT_BOX.href} aria-label="View the Snava Gift Box" className="block w-[min(88vw,540px)]">
              <GiftBoxVisual className="aspect-square" eager />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY IT MAKES A BETTER GIFT ───────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] mb-3 text-center">
          Why Snava
        </p>
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] text-center leading-tight mb-12"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
        >
          A gift that doesn&apos;t end up in the back of a cupboard.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-[24px] p-7 bg-white/60 border border-[#6F371E]/10">
              <h3 className="text-lg font-bold text-[#3d1c08] mb-2">{r.title}</h3>
              <p className="text-sm leading-relaxed text-[#6F371E]/80">{r.body}</p>
              {r.link && (
                <Link href={r.link.href} className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-[#A2452B] underline underline-offset-4">
                  {r.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SINGLE JARS ──────────────────────────────────── */}
      <section id="jars" className="px-6 md:px-12 pb-16 md:pb-24 max-w-6xl mx-auto scroll-mt-24">
        <p className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] mb-3 text-center">
          Or pick their favourite
        </p>
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] text-center leading-tight mb-3"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Single jars{onSale ? `, ${SALE.percent}% off too` : ""}
        </h2>
        <p className="text-center text-sm text-[#6F371E]/70 mb-10">Any two jars ship free.</p>

        <div className="grid md:grid-cols-2 gap-5">
          {[EARTH_CRUNCH, SMOKED_CACAO].map((p, i) => (
            <div
              key={p.key}
              className="rounded-[28px] p-7 md:p-9 flex flex-col"
              style={{ background: i === 0 ? "#A2452B" : "#6F371E" }}
            >
              <Link href={p.href} className="relative h-[240px] md:h-[280px] mb-6 block">
                <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]" />
              </Link>
              <h3
                className="font-[family-name:var(--font-playfair)] font-black text-[#F3ECE2] leading-none mb-2"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                {p.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(243,236,226,0.65)" }}>{p.tagline}</p>
              <div className="mb-6">
                <PriceTag item={p} tone="dark" size="md" />
              </div>
              <button
                onClick={() => add(p)}
                disabled={addingKey === p.key}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                style={{
                  background: "#F3ECE2",
                  color: "#3d1c08",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  padding: "14px 24px",
                }}
              >
                {addingKey === p.key ? "Adding…" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-16 md:pb-24 max-w-3xl mx-auto">
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] text-center leading-tight mb-8"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
        >
          Quick answers
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white/60 border border-[#6F371E]/10 px-6 py-4">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-[#3d1c08]">
                {f.q}
                <span className="text-[#A2452B] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#6F371E]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-20">
        <div
          className="max-w-6xl mx-auto rounded-[32px] px-7 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center gap-8 justify-between"
          style={{ background: "#6F371E" }}
        >
          <div className="text-center md:text-left">
            <h2
              className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-tight mb-2"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              Make this Diwali a little more real.
            </h2>
            <p className="text-sm" style={{ color: "rgba(243,236,226,0.65)" }}>
              {onSale ? `Extra ${SALE.percent}% off ends ${SALE.endsLabel}.` : "Both flavours, one box."}
            </p>
          </div>
          <button
            onClick={() => add(GIFT_BOX)}
            disabled={addingKey === GIFT_BOX.key}
            className="inline-flex items-center gap-2 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 flex-shrink-0"
            style={{
              background: "#FED68C",
              color: "#3d1c08",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              padding: "16px 32px",
            }}
          >
            {addingKey === GIFT_BOX.key ? "Adding…" : "Add Gift Box to Cart →"}
          </button>
        </div>
      </section>
    </main>
  );
}
