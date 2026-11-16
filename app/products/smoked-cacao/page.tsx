import SmokedCacao from "@/components/Product/SmokedCacao";
import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
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
export default function SmokedCacaoPage() {
  return  <>
        <Navbar />
        <JsonLd data={productSchema(SMOKED_CACAO, String(metadata.description), ["/SMOKED-CACAO.png", "/wb_jar2.png", "/label-smoked-cacao.png"])} />
        <SmokedCacao />
         <Footer />
      </>
  ;
  
}