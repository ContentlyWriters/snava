import Policy from "@/components/Policy/Shipping-Policy";

import Navbar from "@/components/Global/Navbar";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Shipping Policy | Snava",
  description: "Snava shipping policy: delivery timelines, charges, free shipping on combos and Cash on Delivery across India.",
  path: "/policy/shipping-policy",
});
export default function PolicyPage() {
  return  <>
        <Navbar />
        <Policy />
     
      </>
  ;
  
}