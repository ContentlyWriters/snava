import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Best Peanut Butter in India | Natural, High Protein | Snava ",
  description:
    "Discover India's best craft peanut butter. High protein, zero trans fat, no palm oil. 100% natural, lab-tested. Free shipping on combos. Order now.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#6F371E",
              color: "#F3ECE2",
              border: "1px solid rgba(143,212,241,0.2)",
              borderRadius: "18px",
              padding: "16px",
              fontSize: "14px",
            },
          }}
        />
     
      </body>
    </html>
  );
}