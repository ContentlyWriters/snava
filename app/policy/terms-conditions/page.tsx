import Policy from "@/components/Policy/TERMS&CONDITIONS";

import Navbar from "@/components/Global/Navbar";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Terms & Conditions | Snava",
  description: "Terms and conditions for using snava.in and buying Snava peanut butter.",
  path: "/policy/terms-conditions",
});
export default function PolicyPage() {
  return  <>
        <Navbar />
        <Policy />
     
      </>
  ;
  
}