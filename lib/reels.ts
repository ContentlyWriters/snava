// lib/reels.ts
// Videos for the homepage "Shop the reel" section, each with the product it
// features underneath. A reel can be either:
//   - an Instagram link (instagram: "https://www.instagram.com/reel/…/"),
//     shown with Instagram's own embedded player, or
//   - a video file in /public/reels/ (src + poster), which autoplays muted.
// The product's name, price and Buy Now come from lib/products.ts, so they
// always match the rest of the site.
// While this list is empty, the section doesn't appear on the homepage.
import {
  CACAO_BOX,
  DESERT_CACAO,
  EARTH_CRUNCH,
  GIFT_BOX,
  SMOKED_CACAO,
  type CatalogItem,
} from "@/lib/products";

export interface Reel {
  /** Instagram post or reel link. */
  instagram?: string;
  /** e.g. "/reels/desert-cacao-taste-test-1.mp4" */
  src?: string;
  /** First frame as a JPG, shown before the video loads. */
  poster?: string;
  /** Short caption shown on the video (video files only). */
  title?: string;
  product: CatalogItem;
}

// Kept here so the list below can reference any product.
export const REEL_PRODUCTS = { EARTH_CRUNCH, SMOKED_CACAO, DESERT_CACAO, GIFT_BOX, CACAO_BOX };

// To change which product shows under a reel, swap the product name:
// EARTH_CRUNCH, SMOKED_CACAO, DESERT_CACAO, GIFT_BOX (The Classic Duo),
// CACAO_BOX (The Chocoholic Box).
export const REELS: Reel[] = [
  { instagram: "https://www.instagram.com/p/DdGw00UCQzJ/", product: EARTH_CRUNCH },
  { instagram: "https://www.instagram.com/reel/Dc3OlLSpdZr/", product: SMOKED_CACAO },
  { instagram: "https://www.instagram.com/reel/Dcv1nO6sl8s/", product: GIFT_BOX },
  { instagram: "https://www.instagram.com/reel/Ddd9offy6lR/", product: EARTH_CRUNCH },
  { instagram: "https://www.instagram.com/reel/DeCOwYDp9zi/", product: SMOKED_CACAO },
  { instagram: "https://www.instagram.com/reel/DbNtOctS4Nu/", product: GIFT_BOX },
  { instagram: "https://www.instagram.com/reel/DantM8oTuhJ/", product: GIFT_BOX },
];
