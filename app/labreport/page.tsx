import LabReport from "@/components/LabReport/index";
import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import Navbar from "@/components/Global/Navbar";
export const metadata: Metadata = pageSeo({
  title: "Lab-Verified Peanut Butter Reports | Snava India",
  description:
    "Know exactly what's in your jar. Every Snava batch is independently tested for heavy metals, microbiology, quality. Download batch reports. No secrets, ever. ",
  path: "/labreport",
});
export default function LabReportPage() {
  return  <>
        <Navbar />
        <LabReport />
     
      </>
  ;
  
}