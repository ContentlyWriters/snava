// lib/sale.ts
// Single source of truth for site-wide sales shown on the frontend.
//
// The actual discount is applied by Shopify, not by this file: there's an
// automatic discount in Shopify Admin called "Diwali Sale - 15% Off" with the
// same percentage and the same start/end time. This file only controls what
// the website DISPLAYS. If you change the dates or percentage, change them in
// both places so the site and checkout keep showing the same price.
//
// Everything sale-related on the site (prices, badges, the announcement bar,
// the homepage Diwali banner) switches off by itself once endsAt passes —
// no redeploy needed.

export const SALE = {
  name: "Diwali Sale",
  percent: 15,
  startsAt: new Date("2026-10-24T00:00:00Z"), // 24 Oct 2026, 5:30 AM IST
  endsAt: new Date("2026-11-08T18:29:59Z"), // 8 Nov 2026, 11:59 PM IST
  endsLabel: "8 Nov, 11:59 PM",
} as const;

export function isSaleActive(now: Date = new Date()): boolean {
  return now >= SALE.startsAt && now <= SALE.endsAt;
}

/** Price after the sale discount, rounded to paise exactly like Shopify does. */
export function salePrice(price: number): number {
  return Math.round(price * (100 - SALE.percent)) / 100;
}

/** The price a customer actually pays right now for a given list price. */
export function effectivePrice(price: number, now: Date = new Date()): number {
  return isSaleActive(now) ? salePrice(price) : price;
}

/** ₹269 for whole rupees, ₹228.65 when there are paise. */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const hasPaise = !Number.isInteger(rounded);
  return `₹${rounded.toLocaleString("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
