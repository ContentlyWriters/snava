import Policy from "@/components/Policy/REFUND&CANCELLATIONPOLICY";

import Navbar from "@/components/Global/Navbar";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Refund & Cancellation Policy | Snava",
  description: "Snava refund, return and cancellation policy for orders placed on snava.in.",
  path: "/policy/refund-cancellation-policy",
});
export default function PolicyPage() {
  return  <>
        <Navbar />
        <Policy />
     
      </>
  ;
  
}