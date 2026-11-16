// lib/seo.ts
// One place for canonical URLs, share previews (Open Graph / Twitter) and
// schema.org structured data. Every page's metadata goes through pageSeo().
import type { Metadata } from "next";
import type { CatalogItem } from "@/lib/products";

export const SITE_URL = "https://www.snava.in";
export const SITE_NAME = "Snava";

export const HOME_TITLE = "Craft Peanut Butter in India | Natural Ingredients | Snava";
export const HOME_DESCRIPTION =
  "Craft peanut butter from Snava. Earth Crunch has no palm oil, and our chocolate and smoked cacao spreads are made with natural ingredients. See our lab reports. Free shipping on combos.";

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

/** Product + Offer for a product page. Price comes from lib/products.ts. */
export function productSchema(item: CatalogItem, description: string, images: string[]) {
  return {
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
    },
  };
}
