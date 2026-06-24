// lib/shopify.ts
// Shopify Storefront API helpers for Snava

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

async function shopifyFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: { node: ShopifyVariant }[];
  };
  images: {
    edges: { node: { url: string; altText: string | null } }[];
  };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      title: string;
      handle: string;
      images: {
        edges: { node: { url: string; altText: string | null } }[];
      };
    };
  };
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                images(first: 1) {
                  edges { node { url altText } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Product Queries ──────────────────────────────────────────────────────────

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch(
    `query GetProduct($handle: String!) {
      product(handle: $handle) {
        id title handle description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        variants(first: 10) {
          edges {
            node {
              id title availableForSale
              price { amount currencyCode }
            }
          }
        }
        images(first: 5) {
          edges { node { url altText } }
        }
      }
    }`,
    { handle }
  );
  return data.product ?? null;
}

// ─── Cart Mutations ───────────────────────────────────────────────────────────

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch(
    `mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { lines }
  );
  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}`,
    { cartId }
  );
  return data.cart ?? null;
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch(
    `mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines }
  );
  const { cart, userErrors } = data.cartLinesAdd;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch(
    `mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines }
  );
  const { cart, userErrors } = data.cartLinesUpdate;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch(
    `mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lineIds }
  );
  const { cart, userErrors } = data.cartLinesRemove;
  if (userErrors?.length) throw new Error(userErrors[0].message);
  return cart;
}

// ─── Cart ID persistence ──────────────────────────────────────────────────────

const CART_ID_KEY = "snava_cart_id";

export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function setStoredCartId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_ID_KEY, id);
}

export function clearStoredCartId(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_ID_KEY);
}

/**
 * Get the existing Shopify cart, or return null if none / expired.
 */
export async function getOrNullCart(): Promise<ShopifyCart | null> {
  const cartId = getStoredCartId();
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    clearStoredCartId();
    return null;
  }
}

/**
 * Add items to the cart, creating one if it doesn't exist yet.
 * Persists the cart ID to localStorage.
 */
export async function addToCart(
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  const lines = [{ merchandiseId, quantity }];
  const cartId = getStoredCartId();

  if (cartId) {
    try {
      const cart = await addCartLines(cartId, lines);
      return cart;
    } catch {
      // Cart may have expired — create a fresh one
      clearStoredCartId();
    }
  }

  const cart = await createCart(lines);
  setStoredCartId(cart.id);
  return cart;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format a Shopify price amount (string) to INR display string */
export function formatPrice(amount: string | number): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}
