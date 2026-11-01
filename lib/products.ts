// lib/products.ts
// Product catalogue used by the gift box page, the Diwali landing page and
// the homepage Diwali banner. Prices here are display prices — Shopify is
// what actually charges the customer, so keep these in sync with Shopify
// Admin if you ever change a price.

export interface CatalogItem {
  key: "earth" | "cacao" | "desert" | "giftbox" | "cacaobox";
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
  price: 289,
  mrp: 449,
  size: "500g",
  image: "/SMOKED-CACAO.png",
  tagline: "Real chocolate paste, not powder.",
  facts: ["20g protein per 100g", "Real chocolate paste", "Zero trans fat"],
};

// New launch (1 Nov 2026). Orders ship after Diwali — see SHIPS_AFTER_DIWALI.
// No protein claims in facts until the lab report is in.
export const DESERT_CACAO: CatalogItem = {
  key: "desert",
  name: "Desert Cacao",
  variantId: "gid://shopify/ProductVariant/68114484592946",
  href: "/products/desert-cacao",
  price: 299,
  mrp: 469,
  size: "500g",
  image: "/DESERT-CACAO.png",
  tagline: "Chocolate peanut butter with a millet crunch.",
  facts: ["Millet crisps in every spoon", "Milk chocolate + roasted peanuts", "No palm oil"],
};

// Shown on Desert Cacao and The Chocoholic Box while the first batch is
// being labelled. Set to false once orders dispatch normally.
export const SHIPS_AFTER_DIWALI = true;

// Shopify fixed bundle: 1 × Earth Crunch + 1 × Smoked Cacao.
// Stock is drawn from the two jar products automatically, so the gift box
// can never sell more than the jars you actually have.
export const GIFT_BOX: CatalogItem = {
  key: "giftbox",
  name: "The Classic Duo",
  variantId: "gid://shopify/ProductVariant/68032616399154",
  href: "/products/snava-gift-box",
  price: 519,
  mrp: 848,
  size: "2 × 500g",
  image: "/EARTH-CRUNCH.png",
  tagline: "Both flavours. One box. Made for gifting.",
  facts: ["Earth Crunch + Smoked Cacao", "2 × 500g jars", "Free shipping"],
};

// Shopify fixed bundle: 1 × Smoked Cacao + 1 × Desert Cacao.
export const CACAO_BOX: CatalogItem = {
  key: "cacaobox",
  name: "The Chocoholic Box",
  variantId: "gid://shopify/ProductVariant/68114484724018",
  href: "/products/chocoholic-box",
  price: 549,
  mrp: 918,
  size: "2 × 500g",
  image: "/DESERT-CACAO.png",
  tagline: "Two chocolate Snavas. One smooth, one with crunch.",
  facts: ["Smoked Cacao + Desert Cacao", "2 × 500g jars", "Free shipping"],
};

// Shopify handles of the 2-jar boxes (the cart shows "2 × 500g" for these).
export const BOX_HANDLES = ["snava-gift-box", "chocoholic-box"];

// Shopify's real shipping rule (Settings → Shipping): orders of ₹440 or more
// ship free, otherwise ₹79. Any two jars or a box clear this, even with the
// Diwali discount applied (gift box at 15% off = ₹441.15).
export const FREE_SHIPPING_THRESHOLD = 440;
export const SHIPPING_CHARGE = 79;
