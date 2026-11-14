// lib/tracking.ts
// Order tracking. Snava ships through Shiprocket, and every shipment gets an
// AWB (tracking) number that opens on Shiprocket's public tracking page.
//
// BRANDED_TRACKING_URL: once the branded tracking page is set up in
// Shiprocket (it lets customers search by order ID or phone number), paste its
// link here, e.g. "https://track.snava.in". The Track page then shows a
// button for it. Leave it empty until then.
export const BRANDED_TRACKING_URL = "";

export const WHATSAPP_NUMBER = "918233592208";

export function awbTrackingUrl(awb: string): string {
  return `https://shiprocket.co/tracking/${encodeURIComponent(awb)}`;
}

/** "#1054", "1054", "SN1054"-style inputs are order numbers, not AWBs. */
export function looksLikeOrderNumber(value: string): boolean {
  return /^#?\d{3,5}$/.test(value.trim());
}
