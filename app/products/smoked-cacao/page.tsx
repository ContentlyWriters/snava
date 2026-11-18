import SmokedCacao from "@/components/Product/SmokedCacao";
import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
import ProductReviews from "@/components/Product/ProductReviews";
import { getProductReviews } from "@/lib/judgeme";
import { SMOKED_CACAO } from "@/lib/products";
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";
export const metadata: Metadata = pageSeo({
  title: "Smoked Cacao Peanut Butter 20g Protein, Real Chocolate ",
  description:
    "Real chocolate paste, not powder. 73% roasted peanuts, 20g protein, zero trans fat. The chocolate peanut butter you've been waiting for. 500g at ₹289",
  path: "/products/smoked-cacao",
  image: "/og/smoked-cacao.jpg",
});
// Re-check Judge.me for new reviews every hour.
export const revalidate = 3600;

export default async function SmokedCacaoPage() {
  const reviews = await getProductReviews("smoked-cacao");
  return  <>
        <Navbar />
        <JsonLd data={productSchema(SMOKED_CACAO, String(metadata.description), ["/SMOKED-CACAO.png", "/wb_jar2.png", "/label-smoked-cacao.png"], reviews)} />
        <SmokedCacao />
         <ProductReviews name={SMOKED_CACAO.name} reviews={reviews} />
        <Footer />
      </>
  ;
  
}