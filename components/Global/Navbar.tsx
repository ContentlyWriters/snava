"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { getOrNullCart } from "@/lib/shopify";

const productItems = [
  {
    name: "Smoked Cacao",
    href: "/products/smoked-cacao",
  },
  {
    name: "Earth Crunch",
    href: "/products/earth-crunch",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const cart = await getOrNullCart();
        setCartCount(cart?.totalQuantity || 0);
      } catch (error) {
        console.error("Failed to load cart count:", error);
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount as EventListener
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement Bar — new customer coupon (home page only) */}
      {isHome && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-center px-4 text-center"
          style={{ background: "#3d1c08" }}
        >
          <p
            className="text-[10.5px] md:text-xs font-semibold tracking-wide"
            style={{ color: "#FED68C" }}
          >
            New here? Get <span className="underline decoration-dotted underline-offset-2">10% OFF</span> your first order — code{" "}
            <span className="font-bold">SNAVA10</span>
          </p>
        </div>
      )}

      <nav
        className={`fixed ${isHome ? "top-9" : "top-0"} left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-[#F3ECE2]/90 backdrop-blur-md border-b border-[#6F371E]/10"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative w-[140px] h-[40px] block">
          <Image
            src="/snava-logo.svg"
            alt="Snava"
            fill
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 list-none items-center">
          {/* Products Dropdown */}
          <li className="relative group">
            <button
              className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                scrolled
                  ? "text-[#6F371E] hover:text-[#A2452B]"
                  : "text-[#F3ECE2]/80 hover:text-[#FED68C]"
              }`}
            >
              Products
            </button>

            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-[#F3ECE2] rounded-2xl shadow-xl border border-[#6F371E]/10 min-w-[220px] overflow-hidden">
                {productItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-5 py-4 text-sm font-medium text-[#6F371E] hover:bg-[#FED68C]/20 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          <li>
            <Link
              href="/#our-story"
              className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                scrolled
                  ? "text-[#6F371E] hover:text-[#A2452B]"
                  : "text-[#F3ECE2]/80 hover:text-[#FED68C]"
              }`}
            >
              Our Story
            </Link>
          </li>

          <li>
            <Link
              href="/labreport"
              className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                scrolled
                  ? "text-[#6F371E] hover:text-[#A2452B]"
                  : "text-[#F3ECE2]/80 hover:text-[#FED68C]"
              }`}
            >
              Lab Report
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="/products/cart"
            className={`relative hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full border-[1.5px] transition-all duration-300 ${
              scrolled
                ? "border-[#6F371E] text-[#6F371E] hover:bg-[#6F371E] hover:text-[#F3ECE2]"
                : "border-[#F3ECE2]/50 text-[#F3ECE2] hover:bg-[#F3ECE2] hover:text-[#6F371E]"
            }`}
          >
            <ShoppingCart size={16} strokeWidth={2} />

            Cart

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  min-w-[22px]
                  h-[22px]
                  px-1.5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[10px]
                  font-bold
                  shadow-lg
                "
                style={{
                  background: "#FED68C",
                  color: "#3d1c08",
                  border: "2px solid #F3ECE2",
                }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
              relative
              md:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
              z-[70]
              ${scrolled ? "text-[#6F371E]" : "text-[#F3ECE2]"}
            `}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`
                  absolute left-0 top-0
                  h-[2px] w-6 bg-current rounded-full
                  transition-all duration-300
                  ${menuOpen ? "rotate-45 top-[9px]" : ""}
                `}
              />

              <span
                className={`
                  absolute left-0 top-[9px]
                  h-[2px] w-6 bg-current rounded-full
                  transition-all duration-300
                  ${menuOpen ? "opacity-0" : ""}
                `}
              />

              <span
                className={`
                  absolute left-0 bottom-0
                  h-[2px] w-6 bg-current rounded-full
                  transition-all duration-300
                  ${menuOpen ? "-rotate-45 bottom-[9px]" : ""}
                `}
              />
            </div>

            {cartCount > 0 && !menuOpen && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-[18px]
                  h-[18px]
                  px-1
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[9px]
                  font-bold
                  shadow-lg
                "
                style={{
                  background: "#FED68C",
                  color: "#3d1c08",
                }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU — nav ke BAHAR hai, scroll affect nahi karega */}
      <div
        className={`
          fixed inset-0 z-[60] md:hidden
          transition-all duration-500
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >

        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0"
          style={{
            background: "rgba(61,28,8,0.78)",
            backdropFilter: "blur(14px)",
          }}
        />

        {/* Drawer */}
        <div
          className={`
            absolute
            bottom-0
            left-0
            right-0
            rounded-t-[36px]
            bg-[#F3ECE2]
            transition-all duration-500
            ${
              menuOpen
                ? "translate-y-0"
                : "translate-y-full"
            }
          `}
        >

          {/* Handle */}
          <div className="flex justify-center pt-4">
            <div
              className="w-14 h-1.5 rounded-full"
              style={{
                background: "rgba(111,55,30,0.18)",
              }}
            />
          </div>

          <div className="px-8 pt-8 pb-10">

            {/* Heading */}
            <div className="mb-10">
              <p
                className="text-[11px] font-bold tracking-[0.22em]"
                style={{
                  color: "#A2452B",
                }}
              >
                SNAVA.
              </p>

              <h3
                className="mt-2 font-[family-name:var(--font-playfair)]"
                style={{
                  color: "#3d1c08",
                  fontSize: "2rem",
                  lineHeight: "1",
                }}
              >
                Explore
              </h3>
            </div>

            {/* Products */}
            <div className="mb-10">

              <p
                className="mb-5 text-[11px] font-bold tracking-[0.18em]"
                style={{
                  color: "#A2452B",
                }}
              >
                PRODUCTS
              </p>

              <div className="space-y-1">

                {productItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex
                      items-center
                      justify-between
                      py-5
                      border-b
                      border-[#6F371E]/10
                    "
                  >
                    <span
                      className="
                        font-[family-name:var(--font-playfair)]
                        text-2xl
                      "
                      style={{
                        color: "#3d1c08",
                      }}
                    >
                      {item.name}
                    </span>

                    <span
                      style={{
                        color: "#A2452B",
                      }}
                    >
                      →
                    </span>
                  </Link>
                ))}

              </div>

            </div>

            {/* Links */}
            <div className="mb-10 space-y-4">

              <Link
                href="/#our-story"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-5
                  py-4
                "
                style={{
                  background: "rgba(111,55,30,0.05)",
                }}
              >
                <span className="font-medium text-[#6F371E]">
                  Our Story
                </span>

                <span>→</span>
              </Link>

              <Link
                href="/labreport"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-5
                  py-4
                "
                style={{
                  background: "rgba(111,55,30,0.05)",
                }}
              >
                <span className="font-medium text-[#6F371E]">
                  Lab Report
                </span>

                <span>→</span>
              </Link>

            </div>

            {/* Cart CTA */}
            <Link
              href="/products/cart"
              onClick={() => setMenuOpen(false)}
              className="
                relative
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                py-4
                font-bold
                uppercase
                tracking-[0.16em]
              "
              style={{
                background: "#6F371E",
                color: "#F3ECE2",
              }}
            >
              <ShoppingCart size={18} />

              Cart

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    right-4
                    min-w-[24px]
                    h-[24px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    font-bold
                  "
                  style={{
                    background: "#FED68C",
                    color: "#3d1c08",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}
