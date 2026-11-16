import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
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

export default function GiftBoxPage() {
  return (
    <>
      <Navbar />
        <JsonLd data={productSchema(GIFT_BOX, String(metadata.description), ["/classic-duo.png"])} />
      <GiftBox />
      <Footer />
    </>
  );
}
