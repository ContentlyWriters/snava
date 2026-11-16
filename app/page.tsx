import Navbar from "@/components/Global/Navbar";
import Hero from "@/components/Home/Hero";
import Marquee from "@/components/Home/Marquee";
import Products from "@/components/Home/Products";
import FlavorNotes from "@/components/Home/FlavorNotes";
import Story from "@/components/Home/Story";
import Footer from "@/components/Global/Footer";
import ReviewSection from "@/components/reviews/ReviewSection";
import DiwaliBanner from "@/components/Home/DiwaliBanner";
import Combos from "@/components/Home/Combos";
import type { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />
      <Navbar />
      <Hero />
      <Marquee />
      <DiwaliBanner />
      <Products />
      <Combos />
      <ReviewSection />
      <FlavorNotes />
      <Story />
      <Footer />
    </>
  );
}
