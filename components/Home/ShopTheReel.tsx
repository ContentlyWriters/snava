"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { REELS, type Reel } from "@/lib/reels";
import type { CatalogItem } from "@/lib/products";
import { effectivePrice, formatINR } from "@/lib/sale";
import { useAddToCart } from "@/components/Shop/useAddToCart";

// Homepage "Shop the reel": real customer and team videos (video files or
// Instagram links), each with the
// product it features underneath. Videos load and play only while on screen
// (muted, looping), so the homepage stays fast.
function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const p = reel.product;

  const visible = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) {
          setLoaded(true);
          if (v.getAttribute("src")) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // First time on screen: the src has just been set, so start playing now.
  useEffect(() => {
    if (loaded && visible.current) videoRef.current?.play().catch(() => {});
  }, [loaded]);

  return (
    <div className="snap-start shrink-0 w-[68vw] sm:w-[260px] flex flex-col">
      <div className="relative aspect-[9/16] rounded-[22px] overflow-hidden bg-[#3d1c08] shadow-[0_18px_40px_rgba(61,28,8,0.25)]">
        <video
          ref={videoRef}
          src={loaded ? reel.src : undefined}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-label={reel.title || reel.product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <p className="text-[#F3ECE2] text-sm font-semibold leading-snug">{reel.title}</p>
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 text-white text-sm flex items-center justify-center backdrop-blur"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <ProductBuy p={p} />
    </div>
  );
}

// Product thumbnail, name, price and Buy Now under each reel.
function ProductBuy({ p }: { p: CatalogItem }) {
  const { add, addingKey } = useAddToCart();
  const router = useRouter();
  const buyNow = async () => {
    await add(p);
    router.push("/products/cart");
  };
  return (
    <div className="mt-3 rounded-2xl bg-white/70 border border-[#6F371E]/10 p-2.5">
      <div className="flex items-center gap-3">
        <Link href={p.href} className="relative w-12 h-12 shrink-0 rounded-xl bg-[#F3ECE2]">
          <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={p.href} className="block text-sm font-bold text-[#3d1c08] leading-tight hover:underline">
            {p.name}
          </Link>
          <p className="text-sm font-semibold text-[#A2452B]">{formatINR(effectivePrice(p.price))}</p>
        </div>
      </div>
      <button
        onClick={buyNow}
        disabled={addingKey === p.key}
        className="mt-2.5 w-full rounded-full py-2.5 text-[0.68rem] font-bold uppercase tracking-widest bg-[#FED68C] text-[#3d1c08] hover:bg-[#3d1c08] hover:text-[#FED68C] transition-colors disabled:opacity-60"
      >
        {addingKey === p.key ? "Adding…" : "Buy Now"}
      </button>
    </div>
  );
}

// Instagram's own embedded player for a post/reel link. The iframe is only
// added when the card comes near the screen, and grows to the height
// Instagram reports so nothing is cut off.
function embedUrl(link: string) {
  const m = link.match(/instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  const kind = m[1] === "p" ? "p" : "reel";
  return `https://www.instagram.com/${kind}/${m[2]}/embed/`;
}

function InstagramCard({ reel }: { reel: Reel }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(560);
  const url = embedUrl(reel.instagram || "");

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://www.instagram.com") return;
      if (e.source !== frameRef.current?.contentWindow) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const h = Number(d?.details?.height);
        if (d?.type === "MEASURE" && h > 200) setHeight(Math.ceil(h));
      } catch {}
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [show]);

  if (!url) return null;
  return (
    <div className="snap-start shrink-0 w-[86vw] max-w-[330px] flex flex-col">
      <div
        ref={boxRef}
        className="relative rounded-[22px] overflow-hidden bg-white shadow-[0_18px_40px_rgba(61,28,8,0.18)]"
        style={{ height }}
      >
        {show ? (
          <iframe
            ref={frameRef}
            src={url}
            title={`${reel.product.name} on Instagram`}
            loading="lazy"
            scrolling="no"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[#6F371E]/60">
            Loading reel…
          </div>
        )}
      </div>
      <ProductBuy p={reel.product} />
    </div>
  );
}

export default function ShopTheReel() {
  if (!REELS.length) return null;
  return (
    <section id="reels" className="py-16 max-w-7xl mx-auto">
      <div className="text-center mb-10 px-5">
        <span className="text-[#A2452B] text-[0.68rem] font-semibold uppercase tracking-[0.22em] block mb-3">
          Snava in real life
        </span>
        <h2
          className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08] leading-tight tracking-tight"
          style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
        >
          Real people. Real spoons.
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 md:px-12 pb-4 [scrollbar-width:thin]">
        {REELS.map((r) =>
          r.instagram ? (
            <InstagramCard key={r.instagram} reel={r} />
          ) : (
            <ReelCard key={r.src} reel={r} />
          )
        )}
      </div>
    </section>
  );
}
