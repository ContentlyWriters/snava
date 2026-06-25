"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { addToCart as addToShopifyCart } from "@/lib/shopify";


const VARIANT_IDS: Record<string, string> = {
  cacao: "gid://shopify/ProductVariant/51358603510066",
  earth: "gid://shopify/ProductVariant/51358572642610",
};

const products = [
  {
    id: "cacao",
    tag: "Smoked Cacao",
    name: "Smoked Cacao",
    price: "₹299",
    oldPrice: "₹449",
    image: "/SMOKED-CACAO.png",
    bg: "bg-[#6F371E]",
    tagColor: "text-[#8FD4F1]",
    nameColor: "text-[#F3ECE2]",
    descColor: "text-[#F3ECE2]/60",
    priceColor: "text-[#FED68C]",
    btnClass: "bg-[#F3ECE2] text-[#6F371E] hover:bg-[#FED68C]",
    badgeClass: "border-[#F3ECE2]/25 text-[#F3ECE2]",
    shadow: "shadow-[0_24px_64px_rgba(111,55,30,0.28)]",
    blobColor: "#F3ECE2",
  },
  {
    id: "earth",
    tag: "Earth Crunch",
    name: "Earth Crunch",
    price: "₹249",
    oldPrice: "₹399",
    image: "/EARTH-CRUNCH.png",
    bg: "bg-[#A2452B]",
    tagColor: "text-[#FED68C]",
    nameColor: "text-[#F3ECE2]",
    descColor: "text-[#F3ECE2]/60",
    priceColor: "text-[#FED68C]",
    btnClass: "bg-[#FED68C] text-[#3d1c08] hover:bg-[#F3ECE2]",
    badgeClass: "border-[#FED68C]/30 text-[#FED68C]",
    shadow: "shadow-[0_24px_64px_rgba(162,69,43,0.3)]",
    blobColor: "#FED68C",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

// Products array mein yeh helper function add karo (products ke upar)
function getDiscount(price: string, oldPrice: string) {
  const current = parseInt(price.replace("₹", ""));
  const original = parseInt(oldPrice.replace("₹", ""));
  return Math.round(((original - current) / original) * 100);
}
const addToCart = async (product: any) => {
  try {
    const variantId = VARIANT_IDS[product.id];

    await addToShopifyCart(variantId, 1);

    window.dispatchEvent(new Event("cartUpdated"));

    toast.custom(
      () => (
        <div
          className="rounded-2xl px-5 py-4 shadow-2xl"
          style={{
            background: "#6F371E",
            border: "1px solid rgba(143,212,241,0.18)",
            color: "#F3ECE2",
          }}
        >
          <p
            className="uppercase text-[11px] font-bold"
            style={{ color: "#8FD4F1" }}
          >
            Cart Updated
          </p>

          <h4
            className="mt-1 font-bold"
            style={{ color: "#FED68C" }}
          >
            1 × {product.name}
          </h4>
        </div>
      ),
      {
        duration: 1500,
      }
    );
  } catch (error) {
    console.error("Add to cart failed:", error);
    toast.error("Failed to add item");
  }
};
export default function Products() {
  const header = useReveal();

  return (
    <section id="products" className="py-16 px-5 md:px-12 max-w-7xl mx-auto">
      {/* header */}
      <div
        ref={header.ref}
        className={`text-center mb-16 transition-all duration-700 ${header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] block mb-3">The Lineup</span>
        <h2 className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] leading-tight tracking-tight"
          style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
          Two Flavors.<br />Infinite Possibilities.
        </h2>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {products.map((p, i) => {
          const card = useReveal(); // eslint-disable-line react-hooks/rules-of-hooks
          return (
            <div
              key={p.id}
              ref={card.ref}
              className={`relative rounded-[28px] overflow-hidden min-h-[380px] md:min-h-[360px] flex flex-col p-7 md:p-12 cursor-pointer group ${p.bg} ${p.shadow} transition-all duration-700 hover:-translate-y-2 ${card.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* animated blob */}
              <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                <svg
                  viewBox="0 0 200 200"
                  className={`absolute w-[130%] h-[130%] -top-[15%] -left-[15%] opacity-15 ${i === 0 ? "animate-blob" : "animate-blob-rev"}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill={p.blobColor} d="M42.7,-62.5C54.1,-53.4,61.4,-38.8,66.5,-23.3C71.6,-7.7,74.4,8.8,69.5,22.7C64.6,36.5,52,47.6,38.3,57.4C24.6,67.2,9.8,75.6,-6.1,78.1C-22,80.5,-39,77,-50.9,67.1C-62.8,57.2,-69.6,40.9,-72.9,24.4C-76.1,7.8,-75.7,-9,-69.4,-23.5C-63.1,-38,-51,-50.2,-37.6,-58.7C-24.2,-67.2,-9.6,-72,4.7,-77.8C19,-83.7,31.4,-71.5,42.7,-62.5Z" transform="translate(100 100)" />
                </svg>
              </div>

              {/* badge */}
              {/* <div className={`absolute top-6 right-6 w-[66px] h-[66px] rounded-full border flex items-center justify-center text-[0.55rem] font-bold tracking-wider uppercase text-center leading-tight ${p.badgeClass}`}>
                {p.badge.split(" ").join("\n")}
              </div> */}

            {/* PRODUCT IMAGE */}
<div className="relative z-10 flex justify-center items-center h-[360px] md:h-[420px] mt-2">
  
  {/* Glow behind jar */}
  <div className="absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full bg-white/10 blur-3xl" />

  {/* Shadow under jar */}
  <div className="absolute bottom-0 w-[180px] h-[26px] bg-black/30 blur-2xl rounded-full" />

  <Image
    src={p.image}
    alt={p.name}
    width={500}
    height={500}
    className="
      relative z-10
      object-contain
      w-auto
      h-[320px]
      md:h-[400px]
      transition-all
      duration-700
      group-hover:scale-110
      group-hover:-rotate-3
      drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)]
    "
  />
</div>

              <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] mb-1 relative z-10 ${p.tagColor}`}></p>
              <h3
                className={`font-[family-name:var(--font-playfair)] font-black leading-none tracking-tight mb-4 relative z-10 whitespace-pre-line ${p.nameColor}`}
                style={{ fontSize: "clamp(1.9rem,3.5vw,2.8rem)" }}
              >
                {p.name}
              </h3>
              {/* <p className={`text-sm leading-relaxed font-light mb-7 max-w-xs relative z-10 ${p.descColor}`}>{p.desc}</p> */}

          <div className="flex items-end justify-between relative z-10 mt-auto">
  <div>
    {/* MRP + Discount Badge row */}
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/40">
        MRP
      </span>
      <span className="text-white/40 line-through text-sm">
        {p.oldPrice}
      </span>
      <span className="bg-white/15 border border-white/20 text-green-400 text-[0.6rem] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5">
        {getDiscount(p.price, p.oldPrice)}% OFF
      </span>
    </div>

    {/* Final Price */}
    <div
      className={`font-[family-name:var(--font-playfair)] text-4xl font-bold ${p.priceColor}`}
    >
      {p.price}
    </div>
  </div>

<button
  onClick={() => addToCart(p)}
  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 ${p.btnClass}`}
>
  Add to Cart
</button>
</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
