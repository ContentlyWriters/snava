import SmokedCacao from "@/components/Product/SmokedCacao";
import type { Metadata } from "next";
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";
export const metadata: Metadata = {
  title: "Smoked Cacao Peanut Butter 20g Protein, Real Chocolate ",
  description:
    "Real chocolate paste, not powder. 73% roasted peanuts, 20g protein, zero trans fat. The chocolate peanut butter you've been waiting for. 500g at ₹299",
};
export default function SmokedCacaoPage() {
  return  <>
        <Navbar />
        <SmokedCacao />
         <Footer />
      </>
  ;
  
}