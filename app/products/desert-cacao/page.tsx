import DesertCacao from "@/components/Product/DesertCacao";
import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
import ProductReviews from "@/components/Product/ProductReviews";
import { getProductReviews } from "@/lib/judgeme";
import { DESERT_CACAO } from "@/lib/products";
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";

export const metadata: Metadata = pageSeo({
  title: "Desert Cacao Millet Crisp Peanut Butter | New from Snava",
  description:
    "New from Snava: Desert Cacao, milk chocolate peanut butter with crispy finger millet and sorghum. 62% roasted peanuts, zero trans fat, no preservatives. 500g at ₹299.",
  path: "/products/desert-cacao",
  image: "/og/desert-cacao.jpg",
});

// Re-check Judge.me for new reviews every hour.
export const revalidate = 3600;

export default async function DesertCacaoPage() {
  const reviews = await getProductReviews("desert-cacao");
  return (
    <>
      <Navbar />
        <JsonLd data={productSchema(DESERT_CACAO, String(metadata.description), ["/DESERT-CACAO.png", "/desert-cacao-front-back.png", "/label-desert-cacao.png"], reviews)} />
      <DesertCacao />
      <ProductReviews name={DESERT_CACAO.name} reviews={reviews} />
        <Footer />
    </>
  );
}
