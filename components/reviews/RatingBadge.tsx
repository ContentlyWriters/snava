"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  total: number;
  distribution: { star: number; count: number; pct: number }[];
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0.0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function RatingBadge({ rating, total, distribution }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl sm:flex-row sm:items-stretch sm:gap-10 sm:p-10"
    >
      {/* ambient gold glow */}
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[32px] opacity-60"
        style={{
          background:
            "radial-gradient(140% 100% at 15% 0%, rgba(217,154,78,0.14), transparent 60%)",
        }}
      />

      {/* the seal */}
      <div className="flex shrink-0 flex-col items-center justify-center gap-3 sm:border-r sm:border-white/10 sm:pr-10">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, #D99A4E, #F4C87A, #D99A4E 50%, #8A5A28, #D99A4E)",
              padding: 1.5,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <div className="absolute inset-[6px] rounded-full border border-white/10 bg-[#3E2116]" />
          <div className="relative flex flex-col items-center">
            <span className="font-[family-name:var(--font-display,ui-serif)] text-4xl italic text-white">
              <CountUp value={rating} />
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#D99A4E]/80">
              out of 5
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={13}
              className="text-[#D99A4E]"
              fill={i < Math.round(rating) ? "#D99A4E" : "transparent"}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <p className="text-xs text-white/40">{total} verified reviews</p>
      </div>

      {/* distribution */}
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {distribution.map((row, i) => (
          <div key={row.star} className="flex items-center gap-3">
            <span className="w-8 shrink-0 text-xs text-white/50">{row.star}★</span>
            <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#8A5A28] to-[#D99A4E]"
              />
            </div>
            <span className="w-9 shrink-0 text-right text-xs text-white/35">{row.pct}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
