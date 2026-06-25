"use client";
import Image from "next/image";
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

const LeafIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const PawIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 13.5c-2.33 0-7 1.17-7 3.5v1.5h14V17c0-2.33-4.67-3.5-7-3.5zM6.5 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm11 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-5.5-1c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
  </svg>
);

const SeedIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C8 2 5 5.5 5 10c0 6 5 12 7 12s7-6 7-12c0-4.5-3-8-7-8z" />
  </svg>
);

export default function MissionSection() {
  const left = useReveal(0);
  const right = useReveal(200);

  return (
    <section className="bg-[#F3ECE2] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">

        {/* LEFT — Plantation */}
      {/* LEFT — Plantation */}
<div
  ref={left.ref}
  className={`
    relative flex flex-col overflow-hidden
    transition-all duration-1000 ease-out
    ${left.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
  `}
>
  {/* Image */}
  <div className="relative w-full h-[280px] md:h-[580px]">
    <Image
      src="/Earth crunch planted.png"
      alt="Earth Crunch — planted seed growing"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />

    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, rgba(111,55,30,0) 25%, rgba(111,55,30,0.6) 65%, #6F371E 100%)",
      }}
    />

    <div className="absolute top-6 left-6">
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.18em]"
        style={{
          background: "rgba(111,55,30,0.7)",
          backdropFilter: "blur(12px)",
          color: "#8FD4F1",
          border: "1px solid rgba(143,212,241,0.35)",
        }}
      >
        <LeafIcon />
        Plantation
      </div>
    </div>
  </div>

  {/* Content */}
  <div
    className="flex-1 flex flex-col px-8 pt-6 pb-10 md:px-12 md:pb-14"
    style={{ background: "#6F371E" }}
  >
    <h2
      className="font-[family-name:var(--font-playfair)] font-bold leading-[1.15] mb-4"
      style={{
        fontSize: "clamp(1.6rem, 3.2vw, 2.7rem)",
        color: "#F3ECE2",
      }}
    >
      A second life awaits.
      <br />
      Every jar comes with a seed.
    </h2>

    <div className="flex items-center gap-1.5 mb-8">
     {Array.from({ length: 5 }).map((_, i) => (
  <span key={i} style={{ color: "#8FD4F1", opacity: 0.9 }}>
    <SeedIcon />
  </span>
))}

      <span
        className="text-[0.72rem] font-medium ml-2"
        style={{ color: "#F3ECE2", opacity: 0.65 }}
      >
        Every jar includes a seed to begin a new life.
      </span>
    </div>

    <div
      className="mt-auto flex items-center gap-3 rounded-2xl px-5 py-4"
      style={{
        background: "rgba(143,212,241,0.07)",
        border: "1px solid rgba(143,212,241,0.18)",
      }}
    >
      <span
                className="text-[0.72rem] font-medium ml-2"
                style={{ color: "#8FD4F1", opacity: 0.65 }}
              >
    <SeedIcon />
      </span>

      
        <span className="text-[0.8rem] leading-snug" style={{ color: "#8FD4F1", opacity: 0.85 }}>
        Rinse, Plant and watch something new grow.
      </span>
    </div>
  </div>
</div>

        {/* RIGHT — Animal Welfare */}
        <div
          ref={right.ref}
          className={`
            relative flex flex-col overflow-hidden
            transition-all duration-1000 ease-out
            ${right.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
          `}
        >
          {/* Full-bleed image — mobile pe chhoti, desktop pe badi */}
          <div className="relative w-full h-[280px] md:h-[580px]">
            <Image
              src="/cat-dog.jpg"
              alt="Animal welfare — a life protected"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(162,69,43,0) 25%, rgba(162,69,43,0.6) 65%, #A2452B 100%)",
              }}
            />
            <div className="absolute top-6 left-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                style={{
                  background: "rgba(162,69,43,0.7)",
                  backdropFilter: "blur(12px)",
                  color: "#FED68C",
                  border: "1px solid rgba(254,214,140,0.35)",
                }}
              >
                <HeartIcon />
                Animal Welfare
              </div>
            </div>
          </div>

          {/* Content panel */}
          <div
            className="flex-1 flex flex-col px-8 pt-6 pb-10 md:px-12 md:pb-14"
            style={{ background: "#A2452B" }}
          >
            <h2
              className="font-[family-name:var(--font-playfair)] font-bold leading-[1.15] mb-4"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.7rem)", color: "#F3ECE2" }}
            >
              Every jar gives back.<br />Every purchase protects a life.
            </h2>

            <div className="flex items-center gap-1.5 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#FED68C", opacity: i < 5 ? 0.9 : 0.3 }}>
                  <PawIcon />
                </span>
              ))}
              <span
                className="text-[0.72rem] font-medium ml-2"
                style={{ color: "#F3ECE2", opacity: 0.65 }}
              >
                A share of our profits helps support animal welfare.
              </span>
            </div>

            <div
              className="mt-auto flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(254,214,140,0.08)",
                border: "1px solid rgba(254,214,140,0.2)",
              }}
            >
              <span style={{ color: "#FED68C" }}>
                <HeartIcon />
              </span>
              <span className="text-[0.8rem] leading-snug" style={{ color: "#F3ECE2", opacity: 0.85 }}>
                A portion of every sale is donated. Automatically, always.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}