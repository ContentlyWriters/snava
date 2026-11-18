import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
import ProductReviews from "@/components/Product/ProductReviews";
import { getProductReviews } from "@/lib/judgeme";
import { GIFT_BOX } from "@/lib/products";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import GiftBox from "@/components/Product/GiftBox";

export const metadata: Metadata = pageSeo({
  title: "The Classic Duo Gift Box | Earth Crunch + Smoked Cacao Peanut Butter",
  description:
    "The Classic Duo: Earth Crunch and Smoked Cacao in one gift box, 2 × 500g. No palm oil in Earth Crunch. Free shipping and Cash on Delivery across India.",
  path: "/products/snava-gift-box",
  image: "/og/classic-duo.jpg",
});

// Re-check Judge.me for new reviews every hour.
export const revalidate = 3600;

export default async function GiftBoxPage() {
  const reviews = await getProductReviews("snava-gift-box");
  return (
    <>
      <Navbar />
        <JsonLd data={productSchema(GIFT_BOX, String(metadata.description), ["/classic-duo.png"], reviews)} />
      <GiftBox />
      <ProductReviews name={GIFT_BOX.name} reviews={reviews} />
        <Footer />
    </>
  );
}
