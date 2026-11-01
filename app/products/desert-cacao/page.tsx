import DesertCacao from "@/components/Product/DesertCacao";
import type { Metadata } from "next";
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";

export const metadata: Metadata = {
  title: "Desert Cacao Millet Crisp Peanut Butter | New from Snava",
  description:
    "New from Snava: Desert Cacao, milk chocolate peanut butter with crispy finger millet and sorghum. 62% roasted peanuts, zero trans fat, no palm oil. 500g at ₹299.",
};

export default function DesertCacaoPage() {
  return (
    <>
      <Navbar />
      <DesertCacao />
      <Footer />
    </>
  );
}
