# One-time font setup

The redesign leans on **Fraunces** (an expressive serif with an italic cut) for the
headline, the star rating figure, and card titles, paired with your existing sans
for everything else. It's referenced via `var(--font-display)` so it degrades
gracefully to a system serif if you skip this step — but it's worth the 3 lines.

Palette note: the section now runs on a warm cacao/caramel base (`#2A160D` →
`#3E2116`) with `#D99A4E` caramel and `#F4C87A` honey as accents, instead of the
earlier navy/gold — reads as a food brand, not jewelry.

In your root `layout.tsx`:

```tsx
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-display",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  );
}
```

That's it — `ReviewSection`, `ReviewCard`, `RatingBadge`, and `StarRating` all pick
it up automatically through the CSS variable.
