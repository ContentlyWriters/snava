"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/shopify";
import { track } from "@/lib/analytics";

const EARTH_CRUNCH_VARIANT_GID = "gid://shopify/ProductVariant/51358572642610";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return { ref, visible };
}

const macros = [
  { val: "26g",  lbl: "Protein"    },
  { val: "0g",   lbl: "Trans Fat"  },
  { val: "91%",  lbl: "Peanuts"    },
  { val: "0",    lbl: "Artificial" },
];

const nutritionStrip = [
  { val: "26g",   lbl: "Protein per 100g"         },
  { val: "91%",   lbl: "Medium Roasted Peanuts"   },
  { val: "Zero",  lbl: "Trans Fat"                 },
  { val: "No",    lbl: "Artificial Colours"        },
];

const ingredients = [
  "Low Cholesterol",
  "No Preservatives",
  "Vegetable Protein",
  "Guilt-Free",
  "Trans Fat Free",
  "no palm oil ",
];

const BASE_PRICE = 249;
const MRP = 399;
const DISCOUNT_PCT = Math.round(((MRP - BASE_PRICE) / MRP) * 100);

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const totalPrice = BASE_PRICE * qty;
  const totalMrp   = MRP * qty;
  const hero  = useReveal(0);
  const strip = useReveal(100);
  const desc  = useReveal(150);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    track("view_item", {
      value: BASE_PRICE,
      currency: "INR",
      items: [{ id: EARTH_CRUNCH_VARIANT_GID, name: "Earth Crunch", price: BASE_PRICE, quantity: 1 }],
    });
  }, []);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addToCart(EARTH_CRUNCH_VARIANT_GID, qty);
      track("add_to_cart", {
        value: totalPrice,
        currency: "INR",
        items: [{ id: EARTH_CRUNCH_VARIANT_GID, name: "Earth Crunch", price: BASE_PRICE, quantity: qty }],
      });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.custom((t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-sm rounded-2xl px-5 py-4 shadow-2xl`}
          style={{
            background: "#6F371E",
            border: "1px solid rgba(143,212,241,0.18)",
            color: "#F3ECE2",
          }}
        >
          <p style={{ color: "#8FD4F1", fontSize: "11px", letterSpacing: "0.15em" }} className="uppercase font-bold">
            Cart Updated
          </p>
          <h4 className="mt-1 font-bold" style={{ color: "#FED68C" }}>
            {qty} × Earth Crunch
          </h4>
          <p className="text-sm mt-1" style={{ color: "rgba(243,236,226,0.7)" }}>
            Added to your cart successfully.
          </p>
        </div>
      ));
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const productImages = [
    "/EARTH-CRUNCH.png",
    "/wb_jar1.png",
    "/label-earth_crunch.png",
  ];

  return (
    <main className="bg-[#F3ECE2] overflow-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        ref={hero.ref}
        className={`
          transition-all duration-700
          ${hero.visible ? "opacity-100" : "opacity-0"}
        `}
        style={{ background: "#6F371E" }}
      >
        {/* MOBILE LAYOUT — stacked, image first */}
        <div className="md:hidden flex flex-col">

          {/* Product Image — mobile pe pehle */}
          <div className="relative w-full"  style={{ background: "#5a2e15" }}>
            {/* Thumbnails — horizontal strip at top */}
            <div className="flex gap-2 px-4 pt-4 pb-2 mt-18">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                    activeImage === index
                      ? "ring-2 ring-[#FED68C] scale-105"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Product ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative w-full h-[300px]">
              <Image
                src={productImages[activeImage]}
                alt="Earth Crunch Peanut Butter"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Floating label */}
            <div
              className="absolute bottom-4 right-4 rounded-[12px] px-3 py-2"
              style={{
                background: "rgba(111,55,30,0.82)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(143,212,241,0.18)",
              }}
            >
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#8FD4F1" }}>
                Earth Crunch · 500g
              </p>
            </div>
          </div>

          {/* Content — mobile */}
          <div className="relative flex flex-col px-6 py-8 overflow-hidden">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 w-fit"
              style={{
                background: "rgba(143,212,241,0.1)",
                border: "1px solid rgba(143,212,241,0.22)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8FD4F1" }} />
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em]" style={{ color: "#8FD4F1" }}>
                500g · Crunch Peanut Butter
              </span>
            </div>

            {/* Brand + Title */}
            <p
              className="font-[family-name:var(--font-playfair)] italic mb-1"
              style={{ color: "rgba(243,236,226,0.22)", fontSize: "0.88rem", letterSpacing: "0.15em" }}
            >
              snava.
            </p>
            <h1
              className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-[1.02] mb-2"
              style={{ fontSize: "3rem", letterSpacing: "-0.01em" }}
            >
              Earth<br />
              <em className="italic" style={{ color: "#8FD4F1" }}>Crunch</em>
            </h1>
            <p className="text-[0.75rem] font-light mb-6" style={{ color: "rgba(143,212,241,0.55)", letterSpacing: "0.04em" }}>
              Clean ingredients. Real crunch. Zero compromise.
            </p>

            {/* Macro pills — 2x2 grid on mobile */}
            <div className="grid grid-cols-4 gap-2 mb-7">
              {macros.map((m) => (
                <div
                  key={m.lbl}
                  className="flex flex-col items-center rounded-[14px] px-2 py-3"
                  style={{
                    background: "rgba(143,212,241,0.07)",
                    border: "1px solid rgba(143,212,241,0.16)",
                  }}
                >
                  <span
                    className="font-[family-name:var(--font-playfair)] font-bold leading-none mb-1"
                    style={{ color: "#8FD4F1", fontSize: "1rem" }}
                  >
                    {m.val}
                  </span>
                  <span
                    className="text-[0.52rem] font-bold uppercase tracking-[0.08em] text-center"
                    style={{ color: "rgba(243,236,226,0.38)" }}
                  >
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[0.62rem] font-semibold uppercase tracking-widest" style={{ color: "rgba(243,236,226,0.35)" }}>
                  MRP
                </span>
                <span className="line-through text-sm" style={{ color: "rgba(243,236,226,0.35)" }}>
                  ₹{totalMrp}
                </span>
                <span
                  className="text-[0.58rem] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#4ade80",
                  }}
                >
                  {DISCOUNT_PCT}% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-[family-name:var(--font-playfair)] font-bold leading-none"
                  style={{ color: "#FED68C", fontSize: "2.6rem" }}
                >
                  ₹{totalPrice}
                </span>
                <span className="text-[0.75rem] font-light" style={{ color: "rgba(243,236,226,0.35)", letterSpacing: "0.06em" }}>
                  / 500g
                </span>
              </div>
            </div>

            {/* Qty + CTA — side by side on mobile */}
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div
                className="flex items-center rounded-full overflow-hidden flex-shrink-0"
                style={{
                  background: "rgba(143,212,241,0.08)",
                  border: "1px solid rgba(143,212,241,0.2)",
                }}
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

              {/* CTA — full width */}
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-all duration-300 disabled:opacity-60"
                style={{
                  background: "#FED68C",
                  color: "#3d1c08",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  padding: "14px 20px",
                  boxShadow: "0 4px 24px rgba(254,214,140,0.28)",
                }}
              >
                {adding ? "Adding…" : "Add to Cart"}
                {!adding && <span className="text-base leading-none">→</span>}
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT — side by side, same as before */}
        <div className="hidden md:grid md:grid-cols-2 min-h-[92vh]">
          {/* LEFT — content */}
          <div className="relative flex flex-col justify-center px-14 py-20 overflow-hidden">
            <span className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: "rgba(143,212,241,0.05)" }} />
            <span className="absolute right-10 bottom-10 w-36 h-36 rounded-full pointer-events-none" style={{ background: "rgba(143,212,241,0.04)" }} />

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 w-fit"
              style={{ background: "rgba(143,212,241,0.1)", border: "1px solid rgba(143,212,241,0.22)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8FD4F1" }} />
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em]" style={{ color: "#8FD4F1" }}>
                500g · Crunch Peanut Butter
              </span>
            </div>

            <p className="font-[family-name:var(--font-playfair)] italic mb-1" style={{ color: "rgba(243,236,226,0.22)", fontSize: "1rem", letterSpacing: "0.15em" }}>
              snava.
            </p>
            <h1
              className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-[1.05] mb-2"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)", letterSpacing: "-0.01em" }}
            >
              Earth<br />
              <em className="italic" style={{ color: "#8FD4F1" }}>Crunch</em>
            </h1>
            <p className="text-[0.78rem] font-light mb-7" style={{ color: "rgba(143,212,241,0.55)", letterSpacing: "0.04em" }}>
              Clean ingredients. Real crunch. Zero compromise.
            </p>

            <p
              className="font-[family-name:var(--font-playfair)] italic leading-[1.6] mb-9"
              style={{ color: "rgba(243,236,226,0.5)", fontSize: "clamp(0.88rem, 1.4vw, 1rem)", maxWidth: "320px" }}
            >
              You&apos;ve had Crunch peanut butter before. This is not that.
            </p>

            <div className="flex flex-wrap gap-3 mb-9">
              {macros.map((m) => (
                <div
                  key={m.lbl}
                  className="flex flex-col items-center rounded-[14px] px-4 py-2.5"
                  style={{ background: "rgba(143,212,241,0.07)", border: "1px solid rgba(143,212,241,0.16)" }}
                >
                  <span className="font-[family-name:var(--font-playfair)] font-bold leading-none mb-1" style={{ color: "#8FD4F1", fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}>
                    {m.val}
                  </span>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(243,236,226,0.38)" }}>
                    {m.lbl}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-7">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest" style={{ color: "rgba(243,236,226,0.35)" }}>MRP</span>
                <span className="line-through text-sm" style={{ color: "rgba(243,236,226,0.35)" }}>₹{totalMrp}</span>
                <span className="text-[0.6rem] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "#4ade80" }}>
                  {DISCOUNT_PCT}% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-playfair)] font-bold leading-none" style={{ color: "#FED68C", fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}>
                  ₹{totalPrice}
                </span>
                <span className="text-[0.78rem] font-light" style={{ color: "rgba(243,236,226,0.35)", letterSpacing: "0.06em" }}>/ 500g</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em]" style={{ color: "rgba(243,236,226,0.45)" }}>Qty</span>
              <div className="flex items-center rounded-full overflow-hidden" style={{ background: "rgba(143,212,241,0.08)", border: "1px solid rgba(143,212,241,0.2)" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-lg font-light hover:bg-white/5" style={{ color: "#8FD4F1" }} aria-label="Decrease quantity">−</button>
                <span className="min-w-[28px] text-center text-sm font-bold" style={{ color: "#F3ECE2" }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(5, q + 1))} className="w-9 h-9 flex items-center justify-center text-lg font-light hover:bg-white/5" style={{ color: "#8FD4F1" }} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="inline-flex items-center gap-3 rounded-full font-bold uppercase transition-all duration-300 hover:-translate-y-0.5 w-fit disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ background: "#FED68C", color: "#3d1c08", fontSize: "0.72rem", letterSpacing: "0.18em", padding: "16px 32px", boxShadow: "0 4px 24px rgba(254,214,140,0.28)" }}
              onMouseEnter={(e) => { if (!adding) (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 36px rgba(254,214,140,0.45)"; }}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(254,214,140,0.28)")}
            >
              {adding ? "Adding…" : "Add to Cart"}
              {!adding && <span className="text-base leading-none">→</span>}
            </button>

            <p
              className="mt-4 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-wider"
              style={{ color: "#FED68C" }}
            >
              <span>💵</span> Cash on Delivery Available
            </p>
          </div>

          {/* RIGHT — product image */}
          <div className="relative flex items-center justify-center overflow-hidden" style={{ background: "#5a2e15" }}>
            <div className="flex flex-row items-center gap-6 w-full h-full p-6">
              <div className="flex flex-col gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${activeImage === index ? "ring-2 ring-[#FED68C] scale-105" : "opacity-70 hover:opacity-100"}`}
                  >
                    <Image src={img} alt={`Product ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative flex-1 w-full h-[650px]">
                <Image src={productImages[activeImage]} alt="Earth Crunch Peanut Butter" fill priority className="object-contain" />
              </div>
            </div>
            <div className="absolute bottom-7 right-7 rounded-[14px] px-4 py-2.5" style={{ background: "rgba(111,55,30,0.82)", backdropFilter: "blur(12px)", border: "1px solid rgba(143,212,241,0.18)" }}>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#8FD4F1" }}>Earth Crunch · 500g</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NUTRITION STRIP
      ══════════════════════════════════════ */}
      <div
        ref={strip.ref}
        className={`
          flex items-center gap-0 overflow-x-auto px-6 md:px-14 py-4 md:py-5
          transition-all duration-700
          ${strip.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{ background: "#3d1c08" }}
      >
        {nutritionStrip.map((n, i) => (
          <div key={n.lbl} className="flex items-center gap-0 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-playfair)] font-bold" style={{ color: "#FED68C", fontSize: "0.95rem" }}>
                {n.val}
              </span>
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.1em]" style={{ color: "rgba(243,236,226,0.38)" }}>
                {n.lbl}
              </span>
            </div>
            {i < nutritionStrip.length - 1 && (
              <span className="block mx-5 md:mx-7 flex-shrink-0" style={{ width: "1px", height: "20px", background: "rgba(254,214,140,0.14)" }} />
            )}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          DESCRIPTION GRID
      ══════════════════════════════════════ */}
      <section
        ref={desc.ref}
        className={`
          max-w-6xl mx-auto px-6 md:px-14 py-14 md:py-28
          grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start
          transition-all duration-700
          ${desc.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* LEFT — copy */}
        <div>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] block mb-3 md:mb-4" style={{ color: "#A2452B" }}>
            What makes it different
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] leading-[1.12] mb-6 md:mb-7"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
          >
            It&apos;s what happens when you respect{" "}
            <em className="italic" style={{ color: "#A2452B" }}>
              the peanut enough to let it do all the talking.
            </em>
          </h2>

          <div className="space-y-4 md:space-y-5 mb-7 md:mb-8">
            <p className="text-[#5a3520] font-light leading-[1.85] text-sm md:text-[0.92rem]">
              We start with 91% roasted peanuts — and then we mostly step back. A touch of sugar. Some salt.
            </p>
            <p className="text-[#5a3520] font-light leading-[1.85] text-sm md:text-[0.92rem]">
              Vitamins your body actually uses. That&apos;s the whole story. No palm oil. No shortcuts. No ingredient you&apos;d have to Google.
            </p>
            <p className="text-[#5a3520] font-light leading-[1.85] text-sm md:text-[0.92rem]">
              26 grams of protein per 100g. Zero trans fat. A crunch that hits right and a flavour that&apos;s deep, nutty, and completely honest.
            </p>
          </div>

          <div className="rounded-[20px] px-6 py-6 md:px-8 md:py-8 mb-6 md:mb-8" style={{ background: "#6F371E" }}>
            <span className="font-[family-name:var(--font-playfair)] italic block leading-none mb-2" style={{ fontSize: "3.5rem", color: "rgba(143,212,241,0.14)" }} aria-hidden="true">
              &ldquo;
            </span>
            <p className="font-[family-name:var(--font-playfair)] italic text-[#F3ECE2] leading-[1.65]" style={{ fontSize: "clamp(0.88rem, 1.5vw, 1rem)" }}>
              The kind of peanut butter that makes you realise how much you were settling before.
            </p>
          </div>

          <p className="text-sm md:text-[0.92rem] font-medium leading-[1.8]" style={{ color: "#A2452B" }}>
            This is what clean eating actually tastes like. Not bland. Not boring. Just real.
          </p>
        </div>

        {/* RIGHT — nutrition label + ingredients */}
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="rounded-[20px] overflow-hidden" style={{ background: "#3d1c08" }}>
            <div className="flex items-center justify-between px-5 md:px-6 py-4" style={{ background: "#6F371E" }}>
              <span className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2]" style={{ fontSize: "0.95rem" }}>
                Nutrition Facts
              </span>
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em]" style={{ color: "#8FD4F1" }}>
                Per 100g serving
              </span>
            </div>

            <div className="p-4 md:p-5">
              <div className="rounded-xl p-3 md:p-4 mb-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[0.68rem] uppercase font-bold tracking-[0.14em]" style={{ color: "#8FD4F1" }}>
                  Nutritional Information (Approx Values)
                </p>
                <p className="mt-2 text-[0.72rem]" style={{ color: "rgba(243,236,226,0.75)" }}>Total 20 Servings Per Pack</p>
                <p className="text-[0.72rem]" style={{ color: "rgba(243,236,226,0.75)" }}>Serving Size: 1.5 Tbsp (25g)</p>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(254,214,140,0.15)" }}>
                    <th className="pb-2 md:pb-3 text-[0.68rem] uppercase" style={{ color: "#FED68C" }}>Nutrient</th>
                    <th className="pb-2 md:pb-3 text-right text-[0.68rem] uppercase" style={{ color: "#FED68C" }}>Per 100g</th>
                    <th className="pb-2 md:pb-3 text-right text-[0.68rem] uppercase" style={{ color: "#FED68C" }}>% RDA*</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Energy (kcal)", "616.00", "7.70%"],
                    ["Protein (g)", "26.00", "-"],
                    ["Carbohydrates (g)", "27.00", "-"],
                    ["Total Sugars (g)", "9.00", "-"],
                    ["Added Sugars (g)", "6.00", "3.00%"],
                    ["Total Fat (g)", "44.00", "16.40%"],
                    ["Trans Fat (g)", "0.00", "0.00%"],
                    ["Sodium (mg)", "160.00", "2.00%"],
                    ["Vitamin A (ug)", "600.00", "-"],
                    ["Vitamin D2 (ug)", "10.00", "-"],
                  ].map(([name, value, rda]) => (
                    <tr key={name} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td className="py-2 md:py-3 text-[0.72rem] md:text-[0.78rem]" style={{ color: "#F3ECE2" }}>{name}</td>
                      <td className="py-2 md:py-3 text-right text-[0.72rem] md:text-[0.78rem] font-medium" style={{ color: "#FED68C" }}>{value}</td>
                      <td className="py-2 md:py-3 text-right text-[0.72rem] md:text-[0.78rem]" style={{ color: "rgba(243,236,226,0.7)" }}>{rda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <p className="mt-3 md:mt-4 text-[0.62rem] leading-relaxed" style={{ color: "rgba(243,236,226,0.45)" }}>
                *Percentage RDA values are approximate and based on a standard adult diet.
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="rounded-[18px] px-5 md:px-6 py-5 md:py-6" style={{ background: "#F3ECE2", border: "1px solid rgba(162,69,43,0.14)" }}>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] block mb-3 md:mb-4" style={{ color: "#A2452B" }}>
              Ingredients
            </span>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full px-3 py-1.5 text-[0.7rem] font-semibold"
                  style={{ background: "rgba(162,69,43,0.07)", border: "1px solid rgba(162,69,43,0.14)", color: "#6F371E" }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* We believe strip */}
          <div className="rounded-[18px] px-5 md:px-6 py-4 md:py-5" style={{ background: "rgba(111,55,30,0.06)", border: "1px solid rgba(111,55,30,0.1)" }}>
            <p className="font-[family-name:var(--font-playfair)] italic leading-[1.65] text-[0.85rem] md:text-[0.88rem]" style={{ color: "#5a3520" }}>
              We believe you should know exactly what goes into your body. So here it is — no hiding, no rounding, no fine print.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}