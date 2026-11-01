import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import GiftBox from "@/components/Product/GiftBox";

export const metadata: Metadata = {
  title: "The Classic Duo Gift Box | Earth Crunch + Smoked Cacao Peanut Butter",
  description:
    "The Classic Duo: both Snava peanut butters in one gift box: Earth Crunch and Smoked Cacao, 2 × 500g. Free shipping and Cash on Delivery across India.",
};

export default function GiftBoxPage() {
  return (
    <>
      <Navbar />
      <GiftBox />
      <Footer />
    </>
  );
}
