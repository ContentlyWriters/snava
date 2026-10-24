"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/lib/shopify";
import { track } from "@/lib/analytics";
import { effectivePrice } from "@/lib/sale";
import type { CatalogItem } from "@/lib/products";

/**
 * Add-to-cart for the gift box page, the Diwali page and the homepage
 * banner. Same behaviour as the existing product pages: adds to the Shopify
 * cart, fires the add_to_cart pixel event, updates the navbar count and
 * shows the brown "Cart Updated" toast.
 */
export function useAddToCart() {
  const [addingKey, setAddingKey] = useState<string | null>(null);

  const add = async (item: CatalogItem, qty = 1) => {
    if (addingKey) return;
    setAddingKey(item.key);
    try {
      await addToCart(item.variantId, qty);
      const unit = effectivePrice(item.price);
      track("add_to_cart", {
        value: Math.round(unit * qty * 100) / 100,
        currency: "INR",
        items: [{ id: item.variantId, name: item.name, price: unit, quantity: qty }],
      });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.custom(
        () => (
          <div
            className="max-w-sm rounded-2xl px-5 py-4 shadow-2xl"
            style={{
              background: "#6F371E",
              border: "1px solid rgba(143,212,241,0.18)",
              color: "#F3ECE2",
            }}
          >
            <p
              className="uppercase font-bold"
              style={{ color: "#8FD4F1", fontSize: "11px", letterSpacing: "0.15em" }}
            >
              Cart Updated
            </p>
            <h4 className="mt-1 font-bold" style={{ color: "#FED68C" }}>
              {qty} × {item.name}
            </h4>
            <a
              href="/products/cart"
              className="text-sm mt-1 inline-block underline underline-offset-2"
              style={{ color: "rgba(243,236,226,0.8)" }}
            >
              View cart →
            </a>
          </div>
        ),
        { duration: 2500 }
      );
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAddingKey(null);
    }
  };

  return { add, addingKey };
}
