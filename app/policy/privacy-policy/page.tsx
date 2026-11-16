import Policy from "@/components/Policy/PRIVACYPOLICY";

import Navbar from "@/components/Global/Navbar";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Privacy Policy | Snava",
  description: "How Snava Naturam Private Limited collects, uses and protects your personal information when you shop at snava.in.",
  path: "/policy/privacy-policy",
});
export default function PolicyPage() {
  return  <>
        <Navbar />
        <Policy />
     
      </>
  ;
  
}