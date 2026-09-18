// lib/analytics.ts
// Lightweight analytics + UTM attribution helpers for the headless storefront.
//
// Why this exists: a standard Shopify theme auto-fires session/cart/checkout
// analytics events. A headless Next.js frontend using the Storefront API does
// not — nothing was tracking cart adds, checkout starts, or campaign referrers,
// which is why Shopify Analytics was reading near-zero sessions and blank
// referrer attribution despite real traffic and real orders.
//
// track() is a safe no-op until a pixel is actually loaded (see app/layout.tsx),
// so wiring this up now doesn't require having pixel IDs yet — events start
// flowing the moment NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_GA_MEASUREMENT_ID
// are set in .env.local.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type UTMKey = (typeof UTM_KEYS)[number];
type UTMParams = Partial<Record<UTMKey, string>>;

const UTM_STORAGE_KEY = "snava_utm_attribution";

/**
 * Reads UTM params from the current URL and persists them to localStorage.
 * Call this once on every page load (see components/Global/Analytics.tsx).
 *
 * Attribution rule: if the URL carries UTM params, they overwrite whatever
 * was stored before (most-recent marketing-touch wins). A direct/organic
 * visit with no UTM params leaves the existing stored attribution alone, so
 * a cart started from an ad or influencer link still gets credited even if
 * the person returns directly later to finish checkout.
 */
export function captureUTMs(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: UTMParams = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }
  if (!hasAny) return;
  try {
    localStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify({
        ...found,
        capturedAt: new Date().toISOString(),
        landingPage: window.location.pathname,
      })
    );
  } catch {
    // localStorage unavailable (private browsing, etc.) — attribution is best-effort
  }
}

/** Reads back whatever UTM attribution is currently stored, if any. */
export function getStoredUTMs(): UTMParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const { capturedAt, landingPage, ...utms } = parsed;
    void capturedAt;
    void landingPage;
    return utms;
  } catch {
    return null;
  }
}

/**
 * Appends the stored UTM attribution (if any) to a Shopify checkout URL so
 * the order is attributed to the campaign that actually drove it, instead of
 * showing up as blank/"direct" in Shopify Analytics referrer reports.
 */
export function appendUTMsToCheckoutUrl(checkoutUrl: string): string {
  const utms = getStoredUTMs();
  if (!utms || Object.keys(utms).length === 0) return checkoutUrl;
  try {
    const url = new URL(checkoutUrl);
    for (const [key, value] of Object.entries(utms)) {
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

type TrackEvent = "view_item" | "add_to_cart" | "begin_checkout" | "page_view";

interface TrackPayload {
  value?: number;
  currency?: string;
  items?: { id: string; name: string; price?: number; quantity?: number }[];
  [key: string]: unknown;
}

type WindowWithPixels = Window & {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
};

/**
 * Fires a marketing event to whichever pixels are loaded on the page (GA4 /
 * Google Tag Manager via dataLayer, Meta Pixel via fbq). Safe no-op if
 * neither is present yet — nothing breaks, and events start flowing the
 * moment those scripts are added in app/layout.tsx.
 */
export function track(event: TrackEvent, payload: TrackPayload = {}): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithPixels;

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload });
  }

  if (typeof w.fbq === "function") {
    const fbEventMap: Record<TrackEvent, string> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      page_view: "PageView",
    };
    w.fbq("track", fbEventMap[event], payload);
  }

  if (process.env.NODE_ENV !== "production") {
    // Visible in the browser console so you can verify events fire
    // correctly before (or without) wiring up real pixel IDs.
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${event}`, payload);
  }
}
