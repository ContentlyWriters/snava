"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  getOrNullCart,
  updateCartLines,
  removeCartLines,
  formatPrice,
  type ShopifyCart,
  type ShopifyCartLine,
} from "@/lib/shopify";

// ─── Derived display type ─────────────────────────────────────────────────────

interface DisplayLine {
  lineId: string;
  variantId: string;
  name: string;
  variantTitle: string;
  price: number;       // per unit, in currency units (e.g. 249)
  quantity: number;
  image: string;
  altText: string;
}

function toDisplayLines(cart: ShopifyCart): DisplayLine[] {
  return cart.lines.edges.map(({ node }: { node: ShopifyCartLine }) => {
    const { merchandise } = node;
    const perUnit = parseFloat(merchandise.price.amount);
    const img = merchandise.product.images.edges[0]?.node;
    return {
      lineId: node.id,
      variantId: merchandise.id,
      name: merchandise.product.title,
      variantTitle: merchandise.title === "Default Title" ? "" : merchandise.title,
      price: perUnit,
      quantity: node.quantity,
      image: img?.url ?? "",
      altText: img?.altText ?? merchandise.product.title,
    };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch cart on mount ───────────────────────────────────────────────────

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
    // Also refresh when the product page dispatches cartUpdated
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [fetchCart]);

  // ── Quantity update ───────────────────────────────────────────────────────

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

  // ── Remove item ───────────────────────────────────────────────────────────

  const removeItem = async (lineId: string) => {
    if (!cart) return;
    setUpdatingId(lineId);
    setError(null);
    try {
      const updated = await removeCartLines(cart.id, [lineId]);
      setCart(updated);
      setLines(toDisplayLines(updated));
      // Keep the navbar count in sync
      window.dispatchEvent(new CustomEvent("shopifyCartUpdated", { detail: updated }));
    } catch (e) {
      setError("Couldn't remove item. Please try again.");
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Checkout ──────────────────────────────────────────────────────────────

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  // ── Derived totals ────────────────────────────────────────────────────────

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const totalItems = cart?.totalQuantity ?? 0;

  // ── Render ────────────────────────────────────────────────────────────────

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Header */}
      <section className="bg-[#6F371E] px-6 md:px-12 py-14">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-[#8FD4F1] mb-3">
            Shopping Cart
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#F3ECE2]">
            Your Cart
          </h1>
          <p className="mt-4 text-[#F3ECE2]/60">
            {loading
              ? "Loading…"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your basket`}
          </p>
        </div>
      </section>

      {/* Error banner */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <p className="rounded-2xl bg-red-100 border border-red-300 text-red-700 px-5 py-3 text-sm">
            {error}
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6F371E]/10" />
            <div className="h-4 w-48 rounded bg-[#6F371E]/10" />
            <div className="h-4 w-32 rounded bg-[#6F371E]/10" />
          </div>
        </section>
      )}

      {/* Empty Cart */}
      {!loading && lines.length === 0 && (
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="text-7xl mb-6">🥜</div>
          <h2 className="text-3xl font-bold text-[#3d1c08] mb-4">
            Your cart feels empty
          </h2>
          <p className="text-[#6F371E]/70 mb-8">
            Time to stock up on some seriously good peanut butter.
          </p>
          <a
            href="/"
            className="inline-flex items-center rounded-full px-8 py-4 font-bold uppercase tracking-wider bg-[#FED68C] text-[#3d1c08]"
          >
            Continue Shopping
          </a>
        </section>
      )}

      {/* Cart Items */}
      {!loading && lines.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-10">

            {/* Left — line items */}
            <div className="space-y-6">
              {lines.map((item) => {
                const isBusy = updatingId === item.lineId;
                return (
                  <div
                    key={item.lineId}
                    className={`bg-white/50 backdrop-blur rounded-3xl p-5 md:p-6 border border-[#6F371E]/10 transition-opacity duration-200 ${
                      isBusy ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <div className="relative w-full md:w-40 h-40 rounded-2xl overflow-hidden bg-[#F8F3EC] flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.altText}
                            fill
                            className="object-contain p-3"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            🥜
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-[#3d1c08]">
                              {item.name}
                            </h3>
                            {item.variantTitle && (
                              <p className="text-[#6F371E]/70 mt-1 text-sm">
                                {item.variantTitle}
                              </p>
                            )}
                            <p className="text-[#6F371E]/70 mt-1">500g</p>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#A2452B]">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-[#6F371E]/60">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-5 mt-8">
                          {/* Quantity */}
                          <div
                            className="flex items-center rounded-full overflow-hidden"
                            style={{
                              background: "rgba(111,55,30,0.08)",
                              border: "1px solid rgba(111,55,30,0.15)",
                            }}
                          >
                            <button
                              onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                              className="w-11 h-11 text-xl text-[#6F371E]"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-12 text-center font-bold text-[#3d1c08]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                              className="w-11 h-11 text-xl text-[#6F371E]"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.lineId)}
                            className="text-red-600 text-sm font-medium hover:underline"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right — order summary */}
            <div>
              <div className="lg:sticky lg:top-24 bg-[#6F371E] rounded-3xl p-7">
                <h2 className="text-2xl font-bold text-[#F3ECE2] mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-[#F3ECE2]/80">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-[#F3ECE2]/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#F3ECE2]/80">
                    <span>Shipping</span>
                    <span className="text-[#8FD4F1]">Free</span>
                  </div>
                  <div className="flex justify-between text-[#F3ECE2]/80">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="flex justify-between items-center">
                  <span className="text-[#F3ECE2] text-lg font-semibold">Total</span>
                  <span className="text-[#FED68C] text-3xl font-bold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!cart?.checkoutUrl}
                  className="w-full mt-8 rounded-full py-4 font-bold uppercase tracking-[0.18em] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: "#FED68C",
                    color: "#3d1c08",
                    boxShadow: "0 8px 28px rgba(254,214,140,0.35)",
                  }}
                >
                  Proceed To Checkout →
                </button>

                <div className="mt-6 space-y-3 text-sm text-[#F3ECE2]/60">
                  <p>✓ Secure Checkout via Shopify</p>
                  <p>✓ Premium Ingredients</p>
                  <p>✓ Fast Delivery Across India</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </main>
  );
}
