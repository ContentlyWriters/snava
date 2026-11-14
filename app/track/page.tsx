import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import TrackOrder from "@/components/Track/TrackOrder";

export const metadata: Metadata = {
  title: "Track Your Order | Snava",
  description: "Track your Snava peanut butter order. Enter your tracking (AWB) number to see live delivery status.",
};

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <TrackOrder />
      <Footer />
    </>
  );
}
