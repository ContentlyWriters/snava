// lib/seo.ts
// One place for canonical URLs, share previews (Open Graph / Twitter) and
// schema.org structured data. Every page's metadata goes through pageSeo().
import type { Metadata } from "next";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_CHARGE, type CatalogItem } from "@/lib/products";
import type { JudgeMeReview } from "@/lib/judgeme";

export const SITE_URL = "https://www.snava.in";
export const SITE_NAME = "Snava";

export const HOME_TITLE = "Craft Peanut Butter in India | Natural Ingredients | Snava";
export const HOME_DESCRIPTION =
  "Craft peanut butter from Jaipur: Earth Crunch, Smoked Cacao and Desert Cacao. Roasted peanuts, real ingredients, lab-tested. Free delivery from ₹440.";

export function pageSeo({
  title,
  description,
  path,
  image = "/og/home.jpg",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Snava",
  legalName: "Snava Naturam Private Limited",
  url: SITE_URL,
  logo: abs("/snava-logo.png"),
  email: "infosnava@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "47/124 Moti Path, Kiran Path, Mansarovar",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302020",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8233592208",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: ["https://instagram.com/snava.in", "https://www.youtube.com/@snavabloom"],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Snava",
  url: SITE_URL,
};

// Google Merchant listings: shipping + return policy, taken from the Shipping
// and Refund policy pages. Single jars pay ₹79 shipping; the combo boxes are
// above the free-shipping threshold, so they ship free.
function shippingDetails(item: CatalogItem) {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: item.price >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE,
      currency: "INR",
    },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      // Dispatched within 1–2 working days; metros 5–7 days, J&K / NE / Kerala up to 15.
      handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 15, unitCode: "DAY" },
    },
  };
}

// Refund policy: no general returns (damaged/wrong items are replaced or
// refunded on request, which Google doesn't count as a return policy).
const RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "IN",
  returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
};

/** Product + Offer for a product page. Price comes from lib/products.ts. */
export function productSchema(
  item: CatalogItem,
  description: string,
  images: string[],
  reviews: JudgeMeReview[] = []
) {
  // Ratings only when the product has real Judge.me reviews (shown on the page).
  const ratings = reviews.length
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.slice(0, 6).map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.reviewer.name.trim().split(/\s+/)[0] },
          datePublished: r.created_at.slice(0, 10),
          ...(r.title ? { name: r.title } : {}),
          reviewBody: r.body,
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
        })),
      }
    : {};
  return {
    ...ratings,
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description,
    image: images.map(abs),
    sku: item.variantId.split("/").pop(),
    brand: { "@type": "Brand", name: "Snava" },
    offers: {
      "@type": "Offer",
      url: abs(item.href),
      priceCurrency: "INR",
      price: item.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Snava" },
      shippingDetails: shippingDetails(item),
      hasMerchantReturnPolicy: RETURN_POLICY,
    },
  };
}
