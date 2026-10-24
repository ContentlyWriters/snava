import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import DiwaliLanding from "@/components/Diwali/DiwaliLanding";

export const metadata: Metadata = {
  title: "Diwali Sale | Extra 15% Off + Snava Gift Box",
  description:
    "Gift something real this Diwali. The Snava Gift Box has Earth Crunch and Smoked Cacao peanut butter, 2 × 500g. Extra 15% off everything till 8 Nov, applied automatically. Free shipping and Cash on Delivery.",
};

export default function DiwaliPage() {
  return (
    <>
      <Navbar />
      <DiwaliLanding />
      <Footer />
    </>
  );
}
