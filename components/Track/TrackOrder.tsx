"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BRANDED_TRACKING_URL,
  WHATSAPP_NUMBER,
  awbTrackingUrl,
  looksLikeOrderNumber,
} from "@/lib/tracking";

const STEPS = [
  { n: "1", t: "We ship your order", d: "You get an email with your tracking (AWB) number as soon as it leaves us." },
  { n: "2", t: "Enter it here", d: "Paste the tracking number in the box above." },
  { n: "3", t: "See live status", d: "Follow your parcel right up to your door." },
];

export default function TrackOrder() {
  const [value, setValue] = useState("");
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim().replace(/\s+/g, "");
    if (!v) return;
    if (looksLikeOrderNumber(v)) {
      setOrderNo(v.startsWith("#") ? v : `#${v}`);
      return;
    }
    setOrderNo(null);
    window.open(awbTrackingUrl(v), "_blank", "noopener,noreferrer");
  };

  const waText = encodeURIComponent(
    `Hi Snava, can you share the tracking for my order ${orderNo ?? ""}?`.trim()
  );

  return (
    <main className="bg-[#F3ECE2] min-h-screen">
      <section className="bg-[#6F371E] pt-36 pb-16 md:pt-44 md:pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: "#8FD4F1" }}>
            Order tracking
          </p>
          <h1
            className="font-[family-name:var(--font-playfair)] font-bold text-[#F3ECE2] leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)" }}
          >
            Where&apos;s my <em className="italic text-[#FED68C]">Snava?</em>
          </h1>
          <p className="text-[#F3ECE2]/70 mb-8">
            Enter the tracking (AWB) number from your shipping email to see where your parcel is.
          </p>

          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <label htmlFor="awb" className="sr-only">Tracking number</label>
            <input
              id="awb"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 14326362320718"
              autoComplete="off"
              inputMode="text"
              className="flex-1 rounded-full px-6 py-4 text-[#3d1c08] bg-[#F3ECE2] placeholder:text-[#3d1c08]/40 outline-none focus:ring-2 focus:ring-[#FED68C]"
            />
            <button
              type="submit"
              className="rounded-full px-8 py-4 font-bold uppercase text-xs tracking-[0.18em] bg-[#FED68C] text-[#3d1c08] hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: "0 6px 24px rgba(254,214,140,0.3)" }}
            >
              Track →
            </button>
          </form>

          <p className="mt-3 text-xs text-[#F3ECE2]/55">
            Opens live tracking on Shiprocket, our official shipping partner, in a new tab.
          </p>

          {orderNo && (
            <div className="mt-6 max-w-xl mx-auto rounded-2xl px-5 py-4 text-left bg-white/10 border border-white/15">
              <p className="text-[#F3ECE2] text-sm">
                <b>{orderNo}</b>{" "}looks like an order number. Your tracking number is in the
                &ldquo;Your order is on the way&rdquo; email we sent when it shipped.
                Can&apos;t find it? Message us and we&apos;ll send it right away.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-[#25D366] text-white"
              >
                Ask on WhatsApp
              </a>
            </div>
          )}

          {BRANDED_TRACKING_URL && (
            <p className="mt-6 text-sm text-[#F3ECE2]/70">
              Only have your order ID or phone number?{" "}
              <a href={BRANDED_TRACKING_URL} target="_blank" rel="noopener noreferrer" className="underline text-[#FED68C]">
                Track it here
              </a>
            </p>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[22px] bg-white/60 border border-[#6F371E]/10 p-6">
              <span className="font-[family-name:var(--font-playfair)] font-bold text-3xl text-[#A2452B]">{s.n}</span>
              <h2 className="mt-2 font-bold text-[#3d1c08]">{s.t}</h2>
              <p className="mt-1 text-sm text-[#5a3520]">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-[#5a3520]">
          Questions about your order?{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#A2452B]">
            WhatsApp us
          </a>{" "}
          or read our{" "}
          <Link href="/policy/shipping-policy" className="underline font-semibold text-[#A2452B]">
            shipping policy
          </Link>
          .
        </div>
      </section>
    </main>
  );
}
