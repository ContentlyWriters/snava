import type { JudgeMeReview } from "@/lib/judgeme";

// Customer reviews for one product, shown on its product page. Google only
// accepts rating data (the stars in search results) for reviews visible on
// the same page, so this block and the product's JSON-LD use the same list.
const fmt = (d: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));

const shortName = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
};

const Stars = ({ n }: { n: number }) => (
  <span aria-label={`${n} out of 5 stars`} style={{ color: "#E0A030", letterSpacing: "0.1em" }}>
    {"★".repeat(Math.round(n))}
    <span style={{ color: "rgba(111,55,30,0.2)" }}>{"★".repeat(5 - Math.round(n))}</span>
  </span>
);

export default function ProductReviews({ name, reviews }: { name: string; reviews: JudgeMeReview[] }) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  return (
    <section id="reviews" className="bg-[#F3ECE2] px-6 md:px-14 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] block mb-2" style={{ color: "#A2452B" }}>
              Customer reviews
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] font-bold text-[#3d1c08]" style={{ fontSize: "clamp(1.5rem,2.8vw,2.2rem)" }}>
              What people say about {name}
            </h2>
          </div>
          <p className="text-[#3d1c08] font-semibold">
            <Stars n={avg} /> <span className="ml-1">{avg.toFixed(1)} / 5</span>
            <span className="text-[#3d1c08]/60 font-normal"> · {reviews.length} review{reviews.length > 1 ? "s" : ""}</span>
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <article key={r.id} className="rounded-[20px] bg-white/70 border border-[#6F371E]/10 p-6">
              <Stars n={r.rating} />
              {r.title && <h3 className="mt-2 font-bold text-[#3d1c08]">{r.title}</h3>}
              <p className="mt-2 text-sm leading-relaxed text-[#5a3520]">{r.body}</p>
              <p className="mt-4 text-xs text-[#3d1c08]/55">
                {shortName(r.reviewer.name)}
                {r.verified && <span className="ml-2 font-semibold text-green-700">✓ Verified buyer</span>}
                <span className="ml-2">{fmt(r.created_at)}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
