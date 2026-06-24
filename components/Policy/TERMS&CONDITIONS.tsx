import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Hero */}
      <section className="bg-[#6F371E] px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8FD4F1] text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Snava Policies
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-[#F3ECE2] text-4xl md:text-6xl font-bold leading-tight">
            Terms & Conditions
          </h1>

          <p className="text-[#F3ECE2]/70 mt-6 max-w-2xl leading-7">
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">

          {/* Main Content */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm">

            <h2 className="text-[#6F371E] text-2xl font-bold mb-4">
              Who We Are
            </h2>

            <p className="text-[#5A3520] leading-8">
              This website is operated by Snava Naturam Private Limited
              ("Snava", "we", "us"), based in Jaipur, Rajasthan, India.
              By visiting or purchasing from this site, you agree to the
              following terms and conditions.
            </p>

            <p className="text-[#5A3520] leading-8 mt-4">
              Our store is hosted on Shopify Inc., which powers our
              e-commerce platform.
            </p>

            {/* Using Website */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Using Our Website
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • You must be 18 years or older to make a purchase on
                  this site.
                </li>

                <li>
                  • By using this site, you agree not to use it for any
                  unlawful or harmful purpose.
                </li>

                <li>
                  • You may not reproduce, copy, sell or exploit any
                  part of this website without our written permission.
                </li>

                <li>
                  • All logos, brand names, product names and content
                  on this site are the property of Snava Naturam
                  Private Limited.
                </li>
              </ul>
            </div>

            {/* Orders */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Orders & Pricing
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Prices are subject to change without notice.
                </li>

                <li>
                  • We reserve the right to refuse or cancel any order,
                  including orders that appear fraudulent, incorrectly
                  priced or placed by resellers.
                </li>

                <li>
                  • If your order is cancelled after payment, a full
                  refund will be issued to your original payment method.
                </li>

                <li>
                  • We make every effort to display product colours
                  and images accurately, but screen variations may occur.
                </li>

                <li>
                  • Promotional offers, discounts and freebies may be
                  modified or withdrawn at any time.
                </li>
              </ul>
            </div>

            {/* Fraud Advisory */}
            <div className="mt-12 rounded-2xl bg-[#FFF8EF] border border-[#FED68C]/30 p-8">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Payments & Fraud Advisory
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Snava will never ask you to make a payment or share
                  your OTP over phone calls, WhatsApp, QR codes or
                  payment links.
                </li>

                <li>
                  • For COD orders, only pay at the time of physical
                  delivery.
                </li>

                <li>
                  • Do not make any additional payment for an already
                  placed prepaid order.
                </li>

                <li>
                  • Snava shall not be responsible for any loss arising
                  from payments made in violation of the above.
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Intellectual Property
              </h2>

              <p className="text-[#5A3520] leading-8">
                All content on this website — including text, images,
                logos, product names and design — belongs to Snava
                Naturam Private Limited. You may not use, copy or
                distribute any content without prior written consent.
              </p>
            </div>

            {/* Third Party */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Third-Party Links
              </h2>

              <p className="text-[#5A3520] leading-8">
                Our website may contain links to third-party websites.
                We are not responsible for their content, privacy
                practices or accuracy. Visiting them is entirely at
                your own risk.
              </p>
            </div>

            {/* Liability */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Limitation of Liability
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Snava is not liable for indirect, incidental or
                  consequential damages arising from the use of this
                  website or our products.
                </li>

                <li>
                  • Our total liability shall not exceed the amount
                  paid for the order in question.
                </li>

                <li>
                  • We do not guarantee that the website will always
                  be available, error-free or uninterrupted.
                </li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Governing Law
              </h2>

              <p className="text-[#5A3520] leading-8">
                These terms are governed by the laws of India.
                Any disputes shall be subject to the jurisdiction
                of courts in Jaipur, Rajasthan.
              </p>
            </div>

            {/* Updates */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Changes To These Terms
              </h2>

              <p className="text-[#5A3520] leading-8">
                We may update these terms at any time. Continued use
                of the website after changes are posted means you
                accept the updated terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mt-12 rounded-2xl bg-[#6F371E] p-8">
              <h3 className="text-[#FED68C] text-xl font-semibold mb-4">
                Questions?
              </h3>

              <div className="space-y-3 text-[#F3ECE2]">
                <p>📧 infosnava@gmail.com</p>
                <p>📞 +91 82335 92208</p>
                <p>Monday – Saturday · 9:00 AM – 7:00 PM</p>
                <p>Snava Naturam Private Limited</p>
                <p>Jaipur, Rajasthan, India</p>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#3D1C08] rounded-[28px] p-7">

              <h3 className="text-[#FED68C] text-xs uppercase tracking-[0.25em] font-bold mb-6">
                Policies
              </h3>

              <div className="space-y-3">

                <Link
                  href="/policy/shipping-policy"
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
                >
                  Shipping Policy
                </Link>

                <Link
                  href="/policy/refund-cancellation-policy"
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
                >
                  Refund & Cancellation
                </Link>

                <Link
                  href="/policy/privacy-policy"
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/policy/terms-conditions"
                  className="block rounded-xl bg-[#6F371E] text-white px-4 py-3"
                >
                  Terms & Conditions
                </Link>

              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}