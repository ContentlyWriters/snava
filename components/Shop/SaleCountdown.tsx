"use client";
import { useSyncExternalStore } from "react";
import { SALE } from "@/lib/sale";

function remaining(now: number) {
  const ms = Math.max(0, SALE.endsAt.getTime() - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    mins: Math.floor((ms / 60_000) % 60),
    secs: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

// A once-a-second clock that React can subscribe to. The server snapshot is
// null, so the countdown only renders in the browser (no hydration mismatch).
function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const readClock = () => Math.floor(Date.now() / 1000);
const readServerClock = () => null;

/** Live countdown to the end of the sale. */
export default function SaleCountdown({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const nowSec = useSyncExternalStore(subscribeToClock, readClock, readServerClock);

  if (nowSec === null) return <div className="h-[62px]" aria-hidden />;

  const t = remaining(nowSec * 1000);
  if (t.done) return null;

  const cell = tone === "dark"
    ? { background: "rgba(254,214,140,0.1)", border: "1px solid rgba(254,214,140,0.25)" }
    : { background: "rgba(111,55,30,0.06)", border: "1px solid rgba(111,55,30,0.15)" };
  const numColor = tone === "dark" ? "#FED68C" : "#6F371E";
  const lblColor = tone === "dark" ? "rgba(243,236,226,0.45)" : "rgba(111,55,30,0.55)";

  const parts: [number, string][] = [
    [t.days, "Days"],
    [t.hours, "Hrs"],
    [t.mins, "Min"],
    [t.secs, "Sec"],
  ];

  return (
    <div className="flex items-center gap-2" role="timer" aria-label={`Sale ends in ${t.days} days ${t.hours} hours`}>
      {parts.map(([v, l]) => (
        <div key={l} className="flex flex-col items-center rounded-xl px-3 py-2 min-w-[54px]" style={cell}>
          <span className="font-bold tabular-nums leading-none text-xl" style={{ color: numColor }}>
            {String(v).padStart(2, "0")}
          </span>
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.14em] mt-1" style={{ color: lblColor }}>
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}
