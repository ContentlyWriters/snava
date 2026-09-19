import Navbar from "@/components/Global/Navbar";
import Hero from "@/components/Home/Hero";
import Marquee from "@/components/Home/Marquee";
import Products from "@/components/Home/Products";
import FlavorNotes from "@/components/Home/FlavorNotes";
import Story from "@/components/Home/Story";
import Footer from "@/components/Global/Footer";
import ReviewSection from "@/components/reviews/ReviewSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <ReviewSection />
      <FlavorNotes />
      <Story />
      <Footer />
    </>
  );
}
