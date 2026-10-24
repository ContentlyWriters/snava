// lib/products.ts
// Product catalogue used by the gift box page, the Diwali landing page and
// the homepage Diwali banner. Prices here are display prices — Shopify is
// what actually charges the customer, so keep these in sync with Shopify
// Admin if you ever change a price.

export interface CatalogItem {
  key: "earth" | "cacao" | "giftbox";
  name: string;
  variantId: string;
  href: string;
  price: number;
  mrp: number;
  size: string;
  image: string;
  tagline: string;
  facts: string[];
}

export const EARTH_CRUNCH: CatalogItem = {
  key: "earth",
  name: "Earth Crunch",
  variantId: "gid://shopify/ProductVariant/51358572642610",
  href: "/products/earth-crunch",
  price: 269,
  mrp: 399,
  size: "500g",
  image: "/EARTH-CRUNCH.png",
  tagline: "Clean ingredients. Real crunch. Zero compromise.",
  facts: ["26g protein per 100g", "91% roasted peanuts", "No palm oil"],
};

export const SMOKED_CACAO: CatalogItem = {
  key: "cacao",
  name: "Smoked Cacao",
  variantId: "gid://shopify/ProductVariant/51358603510066",
  href: "/products/smoked-cacao",
  price: 299,
  mrp: 449,
  size: "500g",
  image: "/SMOKED-CACAO.png",
  tagline: "Real chocolate paste, not powder.",
  facts: ["20g protein per 100g", "Real chocolate paste", "Zero trans fat"],
};

// Shopify fixed bundle: 1 × Earth Crunch + 1 × Smoked Cacao.
// Stock is drawn from the two jar products automatically, so the gift box
// can never sell more than the jars you actually have.
export const GIFT_BOX: CatalogItem = {
  key: "giftbox",
  name: "Snava Gift Box",
  variantId: "gid://shopify/ProductVariant/68032616399154",
  href: "/products/snava-gift-box",
  price: 549,
  mrp: 848,
  size: "2 × 500g",
  image: "/EARTH-CRUNCH.png",
  tagline: "Both flavours. One box. Made for gifting.",
  facts: ["Earth Crunch + Smoked Cacao", "2 × 500g jars", "Free shipping"],
};

// Shopify's real shipping rule (Settings → Shipping): orders of ₹448 or more
// ship free, otherwise ₹79. Any two jars or a gift box clear this, even with
// the Diwali discount applied.
export const FREE_SHIPPING_THRESHOLD = 448;
export const SHIPPING_CHARGE = 79;
