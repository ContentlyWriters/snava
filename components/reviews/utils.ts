import { JudgeMeReview } from "./types";

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(
    new Date(date)
  );

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");

// Warm, edible gradient pairs — caramel, cacao, toasted peanut, terracotta —
// kept inside the brand's own pantry rather than arbitrary rainbow avatars.
const gradients: [string, string][] = [
  ["#D99A4E", "#F4C87A"], // caramel drizzle
  ["#3E2116", "#8A5A28"], // dark cacao
  ["#B5651D", "#E0975A"], // toasted peanut skin
  ["#6B4226", "#D9B48F"], // milk chocolate
  ["#8A5A28", "#C9924F"], // roasted honey
  ["#7A3B2A", "#C97A5B"], // terracotta fig
];

export const avatarGradient = (seed: string) => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
};

export const averageRating = (reviews: JudgeMeReview[]) => {
  if (!reviews.length) return 0;
  return Number((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1));
};

export const featuredReviews = (reviews: JudgeMeReview[]) =>
  reviews.filter(
    (r) => r.product_handle !== "judgeme-shop-reviews" && !r.pictures.some((p) => p.hidden)
  );

/**
 * Star distribution used by the RatingBadge signature element.
 * Returns 5-star first, descending — the order a reader scans a hallmark/seal.
 */
export const ratingDistribution = (reviews: JudgeMeReview[]) => {
  const counts = [0, 0, 0, 0, 0]; // idx 0 = 1★ ... idx 4 = 5★
  reviews.forEach((r) => {
    const idx = Math.min(5, Math.max(1, Math.round(r.rating))) - 1;
    counts[idx]++;
  });
  const total = reviews.length || 1;
  return counts
    .map((count, i) => ({
      star: i + 1,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .reverse();
};
