import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#3d1c08] border-t border-[#F3ECE2]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
           <Link href="/" className="relative w-[140px] h-[40px] block">
  <Image
    src="/snava-logo.svg"
    alt="Snava"
    fill
    priority
    className="object-contain"
  />
</Link>

            <p className="mt-4 text-sm leading-7 text-[#F3ECE2]/45 max-w-xs">
              Premium peanut butter crafted with real ingredients,
              bold flavours and absolutely no compromises.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#FED68C] text-xs uppercase tracking-[0.2em] font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/#products"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Shop
                </Link>
              </li>

            

             <li>
  <Link
    href="https://wa.me/918233592208"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
  >
    Contact
  </Link>
</li>
  <li>
                <Link
                  href="http://www.youtube.com/@snavabloom "
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/snava.in"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-[#FED68C] text-xs uppercase tracking-[0.2em] font-semibold mb-5">
              Policies
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/policy/shipping-policy"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policy/refund-cancellation-policy"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policy/privacy-policy"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policy/terms-conditions"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F3ECE2]/10 my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-[#F3ECE2]/25 text-xs text-center md:text-left">
            © 2026 Snava. All rights reserved.
          </p>

          <p className="text-[#F3ECE2]/20 text-xs text-center md:text-right">
            Crafted with care. Made for everyday nutrition.
          </p>

        </div>
      </div>
    </footer>
  );
}