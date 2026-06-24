

import { useEffect, useState, useCallback } from "react";
import { getOrNullCart } from "@/lib/shopify";

export function useCartCount(): number {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const cart = await getOrNullCart();
      setCount(cart?.totalQuantity ?? 0);
    } catch {
      setCount(0);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Listen for updates dispatched by product page / cart page
    window.addEventListener("cartUpdated", refresh);
    window.addEventListener("shopifyCartUpdated", refresh);
    return () => {
      window.removeEventListener("cartUpdated", refresh);
      window.removeEventListener("shopifyCartUpdated", refresh);
    };
  }, [refresh]);

  return count;
}
