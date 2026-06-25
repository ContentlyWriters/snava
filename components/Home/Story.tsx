"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return { ref, visible };
}

export default function Story() {
  const hero = useReveal(0);
  const body = useReveal(120);
  const right = useReveal(220);
  const cta = useReveal(300);

  return (
    <section id="our-story" className="bg-[#F3ECE2] overflow-hidden">

      {/* ── HERO BAND — dark, full-width headline ── */}
      <div
        ref={hero.ref}
        className={`
          relative  px-6 py-16 md:px-16 md:py-24 overflow-hidden
          transition-all duration-700
          ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Decorative large letter — purely atmospheric */}
        <span
          className="font-[family-name:var(--font-playfair)] font-bold absolute right-8 top-1/2 -translate-y-1/2 leading-none pointer-events-none select-none hidden md:block"
          style={{ fontSize: "18rem", color: "rgba(254,214,140,0.04)" }}
          aria-hidden="true"
        >
          S
        </span>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-9">
            <span className="block w-8 h-px bg-[#A2452B]" />
            <span className="text-[#A2452B] text-[0.62rem] font-bold uppercase tracking-[0.24em]">
              Our Story
            </span>
          </div>

          {/* Headline — italic "properly" in gold */}
          <h2
            className="font-[family-name:var(--font-playfair)] font-bold text-[#000000] leading-[1.08]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", letterSpacing: "-0.01em" }}
          >
            Born from a love<br />
            of things done{" "}
            <em className="text-[#6F371E] not-italic font-bold font-[family-name:var(--font-playfair)] italic">
              properly.
            </em>
          </h2>
        </div>
      </div>

      {/* ── BODY GRID ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-14 md:pt-16 pb-0">

          {/* LEFT — Founder prose */}
          <div
            ref={body.ref}
            className={`transition-all duration-700 ${body.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="space-y-5">
              <p className="text-[#5a3520] font-light leading-[1.95] text-sm md:text-[0.93rem]">
                There came a moment when I tried everything out there and still felt empty. No substance. No story. Just packaging.
              </p>
              <p className="text-[#5a3520] font-light leading-[1.95] text-sm md:text-[0.93rem]">
                So we asked a different question. What if food could do more than feed you?
                What if every jar could give something back — to your body, to the earth,
                to the lives around us?
              </p>
              <p className="text-[#5a3520] font-light leading-[1.95] text-sm md:text-[0.93rem]">
                That question became Snava.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-7" style={{ borderTop: "1px solid rgba(162,69,43,0.2)" }}>
              <span
                className="font-[family-name:var(--font-playfair)] italic text-[#3d1c08] block leading-none mb-1.5"
                style={{ fontSize: "2rem" }}
              >
                Akshat Sharma
              </span>
              <span className="text-[#A2452B] text-[0.62rem] font-bold uppercase tracking-[0.2em]">
                Founder · Snava
              </span>
            </div>
          </div>

          {/* RIGHT — two editorial cards */}
          <div
            ref={right.ref}
            className={`flex flex-col gap-5 transition-all duration-700 ${right.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Dark green pull-quote */}
            <div className="bg-[#6F371E] rounded-[20px] px-8 py-8">
              <span
                className="font-[family-name:var(--font-playfair)] italic text-[#8FBF72] block leading-none mb-2"
                style={{ fontSize: "4.5rem", opacity: 0.2 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p
                className="font-[family-name:var(--font-playfair)] italic text-[#E8F5E0] leading-[1.65]"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" }}
              >
                I looked at everything on the shelf and felt nothing. No honesty.
                No soul. Just products.
              </p>
            </div>

            {/* Terracotta accent card — the founding question */}
            <div
              className="rounded-[0_20px_20px_0] px-7 py-7"
              style={{
                background: "rgba(162,69,43,0.07)",
                borderLeft: "3px solid #A2452B",
              }}
            >
              <span className="text-[#A2452B] text-[0.6rem] font-bold uppercase tracking-[0.2em] block mb-3">
                The question that started it all
              </span>
              <p
                className="font-[family-name:var(--font-playfair)] italic text-[#3d1c08] leading-[1.6]"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1rem)" }}
              >
               What if food could be honest — with your body, with the earth, with you?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ROW ── */}
      <div
        ref={cta.ref}
        className={`
          max-w-5xl mx-auto px-6 md:px-16 pt-12 pb-20 md:pb-24
          flex flex-col sm:flex-row items-start sm:items-center gap-5
          transition-all duration-700
          ${cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <Link
          href="#products"
          className="inline-block bg-[#FED68C] text-[#3d1c08] font-bold text-[0.68rem] uppercase tracking-[0.18em] px-8 py-4 rounded-full shadow-[0_4px_24px_rgba(254,214,140,0.28)] hover:shadow-[0_8px_32px_rgba(254,214,140,0.45)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
        >
          Try the Range
        </Link>
        <span className="text-[#96563A] text-sm font-light">
          No fillers. No shortcuts. Just craft.
        </span>
      </div>

    </section>
  );
}
