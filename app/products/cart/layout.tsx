import type { Metadata } from "next";
import Navbar from "@/components/Global/Navbar";

// The cart page is a client component, so its title and noindex live here.
export const metadata: Metadata = {
  title: "Your Cart | Snava",
  description: "Your Snava cart.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
