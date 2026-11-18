import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
import ProductReviews from "@/components/Product/ProductReviews";
import { getProductReviews } from "@/lib/judgeme";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import GiftBox from "@/components/Product/GiftBox";
import { CACAO_BOX, DESERT_CACAO, SHIPS_AFTER_DIWALI, SMOKED_CACAO } from "@/lib/products";

export const metadata: Metadata = pageSeo({
  title: "The Chocoholic Box | Smoked Cacao + Desert Cacao Peanut Butter",
  description:
    "The Chocoholic Box, both chocolate Snavas in one box: Smoked Cacao and the new Desert Cacao (millet crisp), 2 × 500g. Free shipping and Cash on Delivery across India.",
  path: "/products/chocoholic-box",
  image: "/og/chocoholic-box.jpg",
});

// Re-check Judge.me for new reviews every hour.
export const revalidate = 3600;

export default async function ChocoholicBoxPage() {
  const reviews = await getProductReviews("chocoholic-box");
  return (
    <>
      <Navbar />
        <JsonLd data={productSchema(CACAO_BOX, String(metadata.description), ["/chocoholic-box.png"], reviews)} />
      <GiftBox
        box={CACAO_BOX}
        inside={[SMOKED_CACAO, DESERT_CACAO]}
        titleTop="The Chocoholic"
        titleBottom="Box"
        insideHeading="One smooth. One with crunch."
        ctaLabel="Add Chocoholic Box to Cart"
        shipsAfterDiwali={SHIPS_AFTER_DIWALI}
      />
      <ProductReviews name={CACAO_BOX.name} reviews={reviews} />
        <Footer />
    </>
  );
}
