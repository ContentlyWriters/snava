import Image from "next/image";
import { EARTH_CRUNCH, SMOKED_CACAO } from "@/lib/products";

/**
 * Stand-in visual for the gift box: both jars side by side in a ribboned box.
 * Swap for a real photo of the gift box when you have one — drop it in
 * /public and replace this component's contents with a single <Image>.
 */
export default function GiftBoxVisual({
  className = "",
  eager = false,
}: {
  className?: string;
  /**
   * Pass true only when the box is above the fold (e.g. a page hero).
   * Next.js 16 deprecated <Image priority>; its docs recommend
   * loading="eager" + fetchPriority="high" instead.
   */
  eager?: boolean;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Box */}
      <div
        className="absolute inset-x-[6%] bottom-[6%] top-[22%] rounded-[28px]"
        style={{
          background: "linear-gradient(160deg, #8a4a2a 0%, #6F371E 55%, #5a2e15 100%)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />
      {/* Ribbon — vertical */}
      <div
        className="absolute top-[22%] bottom-[6%] left-1/2 -translate-x-1/2 w-[9%]"
        style={{ background: "linear-gradient(90deg, #e9bd63, #FED68C, #e9bd63)", opacity: 0.9 }}
      />
      {/* Ribbon — horizontal */}
      <div
        className="absolute inset-x-[6%] top-[58%] h-[8%]"
        style={{ background: "linear-gradient(180deg, #e9bd63, #FED68C, #e9bd63)", opacity: 0.9 }}
      />
      {/* Jars */}
      <div className="relative z-10 flex items-end justify-center gap-[2%] h-full pt-[2%] pb-[10%]">
        <div className="relative w-[44%] h-[88%] -rotate-[5deg]">
          <Image
            src={EARTH_CRUNCH.image}
            alt="Earth Crunch peanut butter jar"
            fill
            sizes="(min-width: 1024px) 260px, 45vw"
            className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
          />
        </div>
        <div className="relative w-[44%] h-[88%] rotate-[5deg]">
          <Image
            src={SMOKED_CACAO.image}
            alt="Smoked Cacao peanut butter jar"
            fill
            sizes="(min-width: 1024px) 260px, 45vw"
            className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
          />
        </div>
      </div>
    </div>
  );
}
