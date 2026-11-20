"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  getOrNullCart,
  updateCartLines,
  removeCartLines,
  formatPrice,
  type ShopifyCart,
  type ShopifyCartLine,
} from "@/lib/shopify";
import { appendUTMsToCheckoutUrl, track } from "@/lib/analytics";
import { SALE, isSaleActive } from "@/lib/sale";
import { BOX_HANDLES, FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE } from "@/lib/products";

interface DisplayLine {
  lineId: string;
  variantId: string;
  handle: string;
  name: string;
  variantTitle: string;
  /** Regular unit price (before any discount). */
  price: number;
  quantity: number;
  /** Line total before discounts. */
  lineSubtotal: number;
  /** Line total after discounts — what the customer pays. */
  lineTotal: number;
  discountLabel: string | null;
  image: string;
  altText: string;
}

// The combo boxes show both jars in the cart (Shopify only has one jar photo
// for the bundle products).
const BOX_IMAGES: Record<string, string> = {
  "snava-gift-box": "/classic-duo.png",
  "chocoholic-box": "/chocoholic-box.png",
};

function toDisplayLines(cart: ShopifyCart): DisplayLine[] {
  return cart.lines.edges.map(({ node }: { node: ShopifyCartLine }) => {
    const { merchandise } = node;
    const perUnit = parseFloat(merchandise.price.amount);
    const img = merchandise.product.images.edges[0]?.node;
    const lineSubtotal = parseFloat(node.cost.subtotalAmount?.amount ?? String(perUnit * node.quantity));
    let lineTotal = parseFloat(node.cost.totalAmount.amount);
    const firstDiscount = node.discountAllocations?.[0];
    let discountLabel: string | null = firstDiscount ? firstDiscount.title ?? firstDiscount.code ?? "Discount" : null;
    // Shopify's cart API doesn't always apply the automatic sale discount
    // before checkout (checkout always does). So during the sale, if the
    // line comes back undiscounted, show the sale price here too — the same
    // price shown on the product pages and charged at checkout.
    if (isSaleActive() && lineTotal >= lineSubtotal - 0.005) {
      lineTotal = Math.round(lineSubtotal * (100 - SALE.percent)) / 100;
      discountLabel = `${SALE.name}: extra ${SALE.percent}% off`;
    }
    return {
      lineId: node.id,
      variantId: merchandise.id,
      handle: merchandise.product.handle,
      name: merchandise.product.title,
      variantTitle: merchandise.title === "Default Title" ? "" : merchandise.title,
      price: perUnit,
      quantity: node.quantity,
      lineSubtotal,
      lineTotal,
      discountLabel,
      image: BOX_IMAGES[merchandise.product.handle] ?? img?.url ?? "",
      altText: img?.altText ?? merchandise.product.title,
    };
  });
}

// Shipping mirrors Shopify's real rule (Settings → Shipping): free when the
// order is ₹440 or more after discounts, otherwise ₹79. Counting items used to
// break for the gift box (1 item, but 2 jars) — see lib/products.ts.

export default function CartPage() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const c = await getOrNullCart();
      setCart(c);
      setLines(c ? toDisplayLines(c) : []);
    } catch (e) {
      setError("Couldn't load your cart. Please refresh.");
      console.error(e);
    } finally {
      setLoading(false);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [fetchCart]);

  const updateQuantity = async (lineId: string, newQty: number) => {
    if (!cart) return;
    if (newQty < 1 || newQty > 5) return;
    setUpdatingId(lineId);
    setError(null);
    try {
      const updated = await updateCartLines(cart.id, [{ id: lineId, quantity: newQty }]);
      setCart(updated);
      setLines(toDisplayLines(updated));
    } catch (e) {
      setError("Couldn't update quantity. Please try again.");
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart) return;
    setUpdatingId(lineId);
    setError(null);
    try {
      const updated = await removeCartLines(cart.id, [lineId]);
      setCart(updated);
      setLines(toDisplayLines(updated));
      window.dispatchEvent(new CustomEvent("shopifyCartUpdated", { detail: updated }));
    } catch (e) {
      setError("Couldn't remove item. Please try again.");
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      track("begin_checkout", {
        value: grandTotal,
        currency: cart.cost.totalAmount.currencyCode,
        items: lines.map((l) => ({
          id: l.variantId,
          name: l.name,
          price: Math.round((l.lineTotal / l.quantity) * 100) / 100,
          quantity: l.quantity,
        })),
      });
      // Carry campaign attribution (utm_source etc.) through to Shopify's
      // checkout so orders stop showing up as blank/"direct" in referrer
      // reports — see lib/analytics.ts for why this is necessary on a
      // headless storefront.
      window.location.href = appendUTMsToCheckoutUrl(cart.checkoutUrl);
    }
  };

  const totalItems = cart?.totalQuantity ?? 0;
  const itemsSubtotal = lines.reduce((sum, l) => sum + l.lineSubtotal, 0);
  const afterDiscounts = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const discountTotal = Math.round((itemsSubtotal - afterDiscounts) * 100) / 100;
  const discountLabel = lines.find((l) => l.discountLabel)?.discountLabel ?? "Discount";

  // Same rule Shopify applies at checkout: ₹440+ after discounts ships free.
  const isFreeShipping = afterDiscounts >= FREE_SHIPPING_THRESHOLD;
  const shippingCharge = isFreeShipping ? 0 : SHIPPING_CHARGE;
  const grandTotal = Math.round((afterDiscounts + shippingCharge) * 100) / 100;
  const onSale = isSaleActive();

  if (!mounted) return null;

  const toFreeShipping = Math.max(0, Math.ceil(FREE_SHIPPING_THRESHOLD - afterDiscounts));

  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Slim brand header — sits behind the site navbar */}
      <section className="bg-[#6F371E] pt-28 pb-7 md:pt-32 md:pb-9">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-end justify-between gap-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#F3ECE2]">
            Your cart
            {!loading && totalItems > 0 && (
              <span className="ml-2 text-base font-normal text-[#F3ECE2]/60">({totalItems})</span>
            )}
          </h1>
          <Link href="/" className="text-sm text-[#F3ECE2]/70 hover:text-[#FED68C] underline underline-offset-4">
            Continue shopping
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-10 pt-6 md:pt-8 pb-16">

        {error && (
          <p className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </p>
        )}

        {loading && (
          <div className="py-24 flex flex-col items-center gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-[#6F371E]/10" />
            <div className="h-4 w-48 rounded bg-[#6F371E]/10" />
          </div>
        )}

        {!loading && lines.length === 0 && (
          <div className="rounded-2xl bg-white border border-[#6F371E]/10 py-20 px-6 text-center">
            <div className="text-6xl mb-5">🥜</div>
            <h2 className="text-2xl font-bold text-[#3d1c08] mb-3">Your cart is empty</h2>
            <p className="text-[#6F371E]/70 mb-8">Time to stock up on some seriously good peanut butter.</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl px-8 py-3.5 font-semibold bg-[#8FD4F1] text-[#14303f] hover:bg-[#7cc9ea] transition-colors"
            >
              Shop now
            </Link>
          </div>
        )}

        {!loading && lines.length > 0 && (
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Items */}
            <div className="rounded-2xl bg-white border border-[#6F371E]/10 divide-y divide-[#6F371E]/10">
              {lines.map((item) => {
                const isBusy = updatingId === item.lineId;
                const discounted = item.lineTotal < item.lineSubtotal;
                return (
                  <div
                    key={item.lineId}
                    className={`flex gap-4 p-4 md:p-5 transition-opacity ${isBusy ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl bg-[#F8F3EC] border border-[#6F371E]/10">
                      {item.image ? (
                        <Image src={item.image} alt={item.altText} fill sizes="96px" className="object-contain p-1.5" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🥜</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#3d1c08] leading-snug">{item.name}</h3>
                          <p className="text-sm text-[#6F371E]/60 mt-0.5">
                            {item.variantTitle ? `${item.variantTitle} · ` : ""}
                            {BOX_HANDLES.includes(item.handle) ? "2 × 500g" : "500g"}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          {discounted && (
                            <p className="text-xs text-[#6F371E]/45 line-through">{formatPrice(item.lineSubtotal)}</p>
                          )}
                          <p className="font-semibold text-[#3d1c08]">{formatPrice(item.lineTotal)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-3">
                        <div className="inline-flex items-center rounded-lg border border-[#6F371E]/20">
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                            className="w-9 h-9 text-lg text-[#6F371E] disabled:opacity-30"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#3d1c08]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            className="w-9 h-9 text-lg text-[#6F371E] disabled:opacity-30"
                            disabled={item.quantity >= 5}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.lineId)}
                          className="text-sm text-[#6F371E]/60 hover:text-red-600 underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 rounded-2xl bg-white border border-[#6F371E]/10 p-5 md:p-6">
              <div className="space-y-3 text-[0.95rem]">
                <div className="flex justify-between text-[#3d1c08]/80">
                  <span>Subtotal</span>
                  <span>{formatPrice(itemsSubtotal)}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-[#2e7d32]">
                    <span>{discountLabel}</span>
                    <span>−{formatPrice(discountTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#3d1c08]/80">
                  <span>Shipping</span>
                  {isFreeShipping ? (
                    <span className="font-semibold text-[#2e7d32]">Free</span>
                  ) : (
                    <span>{formatPrice(SHIPPING_CHARGE)}</span>
                  )}
                </div>
              </div>

              {!isFreeShipping && (
                <p className="mt-3 rounded-lg bg-[#8FD4F1]/15 px-3 py-2 text-sm text-[#14303f]">
                  Add {formatPrice(toFreeShipping)} more for free delivery
                </p>
              )}

              <div className="h-px bg-[#6F371E]/10 my-5" />

              <div className="flex justify-between items-baseline">
                <span className="text-lg font-semibold text-[#3d1c08]">Total</span>
                <span className="text-2xl font-bold text-[#3d1c08]">
                  <span className="text-xs font-normal text-[#6F371E]/50 mr-1.5">INR</span>
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!cart?.checkoutUrl}
                className="w-full mt-5 rounded-xl py-4 text-base font-semibold bg-[#8FD4F1] text-[#14303f] hover:bg-[#7cc9ea] active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-[#F3ECE2] px-3 py-1.5 text-[#3d1c08]">COD available</span>
                <span className="rounded-full bg-[#F3ECE2] px-3 py-1.5 text-[#3d1c08]">
                  {onSale ? `${SALE.percent}% off applied` : "10% off first order: SNAVA10"}
                </span>
              </div>

              <p className="mt-4 text-center text-xs text-[#6F371E]/50">🔒 Secure checkout by Shopify</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
