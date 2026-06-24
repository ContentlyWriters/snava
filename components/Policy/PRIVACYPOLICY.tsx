import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Hero */}
      <section className="bg-[#6F371E] px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8FD4F1] text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Snava Policies
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-[#F3ECE2] text-4xl md:text-6xl font-bold leading-tight">
            Privacy Policy
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
              Snava Naturam Private Limited ("Snava", "we", "us")
              operates this website. We take your privacy seriously —
              not because we have to, but because we believe you deserve
              to know exactly how your information is used.
            </p>

            {/* What We Collect */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                What We Collect
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Device information — browser type, IP address,
                  pages visited and time spent on site.
                </li>

                <li>
                  • Order information — name, email, phone number,
                  billing & shipping address and payment details.
                </li>

                <li>
                  • Account information — login details and preferences
                  if you create an account.
                </li>

                <li>
                  • Communication information — details shared when
                  contacting customer support.
                </li>
              </ul>
            </div>

            {/* Why We Collect It */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Why We Collect It
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>• To process and fulfil your orders.</li>
                <li>• To send invoices and shipping updates.</li>
                <li>• To provide customer support.</li>
                <li>• To improve our website and user experience.</li>
                <li>
                  • To send offers and updates only if you've opted in.
                </li>
                <li>
                  • To screen for fraud and keep transactions secure.
                </li>
              </ul>
            </div>

            {/* Who We Share It With */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Who We Share It With
              </h2>

              <p className="text-[#5A3520] mb-5">
                We don't sell your data. Ever.
              </p>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Shopify — our store platform for secure order and
                  payment processing.
                </li>

                <li>
                  • Payment gateways such as Razorpay for secure
                  transaction processing. We do not store card details.
                </li>

                <li>
                  • Shipping partners to deliver your orders.
                </li>

                <li>
                  • Google Analytics & Meta Pixel to understand site
                  usage and provide relevant advertising.
                </li>

                <li>
                  • Law enforcement authorities when required under
                  applicable Indian law.
                </li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Cookies
              </h2>

              <p className="text-[#5A3520] leading-8 mb-5">
                We use cookies to improve your browsing experience,
                remember your cart, preferences and login information.
              </p>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • You can manage or block cookies through your browser settings.
                </li>

                <li>
                  • Blocking cookies may affect certain website features.
                </li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Your Rights
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Access the personal information we hold about you.
                </li>

                <li>
                  • Request correction or deletion of your data.
                </li>

                <li>
                  • Withdraw consent for marketing communications.
                </li>

                <li>
                  • Opt out of targeted advertising.
                </li>
              </ul>

              <div className="mt-6 rounded-2xl bg-[#FFF8EF] border border-[#FED68C]/30 p-6">
                <p className="text-[#5A3520] mb-2">
                  To exercise these rights, contact:
                </p>

                <a
                  href="mailto:infosnava@gmail.com"
                  className="text-[#A2452B] font-medium"
                >
                  infosnava@gmail.com
                </a>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Data Retention
              </h2>

              <p className="text-[#5A3520] leading-8">
                We retain information only as long as necessary to
                fulfil orders, provide support and comply with legal
                obligations. You may request deletion at any time.
              </p>
            </div>

            {/* Security */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Security
              </h2>

              <p className="text-[#5A3520] leading-8">
                We use industry-standard security measures through
                Shopify's infrastructure to protect your information.
                While no system is completely foolproof, we take
                reasonable steps to keep your data safe.
              </p>
            </div>

            {/* Children */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Children
              </h2>

              <p className="text-[#5A3520] leading-8">
                Our website is not intended for individuals under
                18 years of age and we do not knowingly collect
                information from minors.
              </p>
            </div>

            {/* Updates */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Changes To This Policy
              </h2>

              <p className="text-[#5A3520] leading-8">
                We may update this Privacy Policy from time to time.
                Any changes will be reflected on this page with an
                updated date at the top.
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
                  className="block rounded-xl bg-[#6F371E] text-white px-4 py-3"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/policy/terms-conditions"
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
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