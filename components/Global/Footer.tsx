import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#3d1c08] border-t border-[#F3ECE2]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="relative w-[150px] h-[44px] block"
            >
              <Image
                src="/snava-logo-white.svg"
                alt="Snava"
                fill
                priority
                className="object-contain"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#F3ECE2]/45 max-w-xs">
              Premium food crafted with real ingredients, bold flavours, and
              absolutely no compromises — every single time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[#FED68C] text-xs uppercase tracking-[0.2em] font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="mailto:infosnava@gmail.com"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Gmail
                </Link>
              </li>

              <li>
                <Link
                  href="https://wa.me/918233592208"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  WhatsApp
                </Link>
              </li>

              <li>
                <Link
                  href="http://www.youtube.com/@snavabloom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F3ECE2]/50 hover:text-[#F3ECE2] transition-colors text-sm"
                >
                  Youtube
                </Link>
              </li>

              <li>
                <Link
                  href="https://instagram.com/snava.in"
                  target="_blank"
                  rel="noopener noreferrer"
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[#F3ECE2]/25 text-xs text-center md:text-left uppercase tracking-[0.08em]">
            © 2026 Snava Naturam Private Limited. All rights reserved.
          </p>

          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[#F3ECE2]/20 text-xs text-center md:text-right">
              Crafted with care. Made for everyday nutrition.
            </p>

            <p className="text-[#F3ECE2]/30 text-[11px] text-center md:text-right">
              ⚡ Powered by{" "}
              <a
                href="https://contentlywriters.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5b6cf2]/70 underline underline-offset-2 hover:text-[#FED68C] transition-colors"
              >
                ContentlyWriters.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}