import EarthCrunch from "@/components/Product/EarthCrunch";
import Footer from "@/components/Global/Footer";
import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";

export const metadata: Metadata = {
  title: "Earth Crunch Peanut Butter 26g Protein, 91% Peanuts",
  description:
    "Snava Earth Crunch natural crunchy peanut butter with 91% roasted peanuts, 26g protein, zero trans fat, no palm oil or refined sugar. 500g at ₹249. ",
};
export default function EarthCrunchPage() {
  return  <>
        <Navbar />
        <EarthCrunch />
         <Footer />
      </>
  ;
  
}