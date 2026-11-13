import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import GiftBox from "@/components/Product/GiftBox";
import { CACAO_BOX, DESERT_CACAO, SHIPS_AFTER_DIWALI, SMOKED_CACAO } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Chocoholic Box | Smoked Cacao + Desert Cacao Peanut Butter",
  description:
    "The Chocoholic Box, both chocolate Snavas in one box: Smoked Cacao and the new Desert Cacao (millet crisp), 2 × 500g. Free shipping and Cash on Delivery across India.",
};

export default function ChocoholicBoxPage() {
  return (
    <>
      <Navbar />
      <GiftBox
        box={CACAO_BOX}
        inside={[SMOKED_CACAO, DESERT_CACAO]}
        titleTop="The Chocoholic"
        titleBottom="Box"
        insideHeading="One smooth. One with crunch."
        ctaLabel="Add Chocoholic Box to Cart"
        shipsAfterDiwali={SHIPS_AFTER_DIWALI}
      />
      <Footer />
    </>
  );
}
