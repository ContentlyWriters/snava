"use client";
import Link from "next/link";
import GiftBoxVisual from "@/components/Shop/GiftBoxVisual";
import PriceTag from "@/components/Shop/PriceTag";
import { useAddToCart } from "@/components/Shop/useAddToCart";
import {
  CACAO_BOX,
  DESERT_CACAO,
  EARTH_CRUNCH,
  GIFT_BOX,
  SMOKED_CACAO,
  type CatalogItem,
} from "@/lib/products";

// Homepage "Combos" section: the two 2-jar boxes, sitting under the single
// jars in "The Lineup". Prices come from lib/products.ts, so they always
// match the box pages and the cart.
const COMBOS: {
  box: CatalogItem;
  jars: [CatalogItem, CatalogItem];
  bg: string;
  accent: string;
  btn: string;
}[] = [
  {
    box: GIFT_BOX,
    jars: [EARTH_CRUNCH, SMOKED_CACAO],
    bg: "#6F371E",
    accent: "#FED68C",
    btn: "bg-[#FED68C] text-[#3d1c08] hover:bg-[#F3ECE2]",
  },
  {
    box: CACAO_BOX,
    jars: [SMOKED_CACAO, DESERT_CACAO],
    bg: "#3d1c08",
    accent: "#8FD4F1",
    btn: "bg-[#8FD4F1] text-[#3d1c08] hover:bg-[#F3ECE2]",
  },
];

export default function Combos() {
  const { add, addingKey } = useAddToCart();

  return (
    <section id="combos" className="pb-16 px-5 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] block mb-3">
          The Combos
        </span>
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
        >
          Two jars. One box.
          <br />
          Free delivery.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {COMBOS.map(({ box, jars, bg, accent, btn }) => {
          const separately = jars[0].price + jars[1].price;
          const saving = separately - box.price;
          const adding = addingKey === box.key;
          return (
            <div
              key={box.key}
              className="relative rounded-[28px] overflow-hidden p-7 md:p-10 flex flex-col shadow-[0_24px_64px_rgba(61,28,8,0.25)]"
              style={{ background: bg }}
            >
              <span
                className="absolute top-6 right-6 z-10 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em]"
                style={{ background: accent, color: "#3d1c08" }}
              >
                🚚 Free delivery
              </span>

              <Link href={box.href} aria-label={`View ${box.name}`} className="block mx-auto w-full max-w-[360px]">
                <GiftBoxVisual className="aspect-square" jars={jars} />
              </Link>

              <h3
                className="font-[family-name:var(--font-playfair)] font-black text-[#F3ECE2] leading-none mt-2 mb-2"
                style={{ fontSize: "clamp(1.9rem,3.2vw,2.6rem)" }}
              >
                {box.name}
              </h3>
              <p className="text-sm mb-1" style={{ color: "rgba(243,236,226,0.7)" }}>
                {jars[0].name} + {jars[1].name} · {box.size}
              </p>
              {saving > 0 && (
                <p className="text-sm font-semibold mb-6" style={{ color: accent }}>
                  ₹{saving} less than buying the jars separately
                </p>
              )}

              <div className="flex flex-wrap items-end justify-between gap-4 mt-auto">
                <PriceTag item={box} tone="dark" size="md" />
                <div className="flex items-center gap-3">
                  <Link
                    href={box.href}
                    className="text-xs font-bold uppercase tracking-widest underline underline-offset-4 text-[#F3ECE2]/80 hover:text-[#F3ECE2]"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => add(box)}
                    disabled={adding}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 disabled:opacity-60 ${btn}`}
                  >
                    {adding ? "Adding…" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-[#5a3520]">
        🚚 Free delivery on every combo and on any 2 jars · 💵 Cash on Delivery available
      </p>
    </section>
  );
}
