import EarthCrunch from "@/components/Product/EarthCrunch";
import Footer from "@/components/Global/Footer";
import type { Metadata } from "next";
import { pageSeo, productSchema } from "@/lib/seo";
import JsonLd from "@/components/Seo/JsonLd";
import ProductReviews from "@/components/Product/ProductReviews";
import { getProductReviews } from "@/lib/judgeme";
import { EARTH_CRUNCH } from "@/lib/products";
import Navbar from "@/components/Global/Navbar";

export const metadata: Metadata = pageSeo({
  title: "Earth Crunch Peanut Butter 26g Protein, 91% Peanuts",
  description:
    "Earth Crunch crunchy peanut butter, 500g at ₹269. Made with roasted peanuts and no palm oil. Free shipping on combos.",
  path: "/products/earth-crunch",
  image: "/og/earth-crunch.jpg",
});
// Re-check Judge.me for new reviews every hour.
export const revalidate = 3600;

export default async function EarthCrunchPage() {
  const reviews = await getProductReviews("earth-crunch");
  return  <>
        <Navbar />
        <JsonLd data={productSchema(EARTH_CRUNCH, String(metadata.description), ["/EARTH-CRUNCH.png", "/wb_jar1.png", "/label-earth_crunch.png"], reviews)} />
        <EarthCrunch />
         <ProductReviews name={EARTH_CRUNCH.name} reviews={reviews} />
        <Footer />
      </>
  ;
  
}