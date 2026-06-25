import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Hero */}
      <section className="bg-[#6F371E] px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8FD4F1] text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Snava Policies
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-[#F3ECE2] text-4xl md:text-6xl font-bold leading-tight">
            Shipping Policy
          </h1>

          <p className="text-[#F3ECE2]/70 mt-6 max-w-2xl leading-7">
            Everything you need to know about shipping,
            delivery timelines and order dispatch.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">

          {/* Main Content */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm">

            <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
              Shipping Information
            </h2>

            <ul className="space-y-4 text-[#5A3520] leading-8">
              <li>• We deliver everywhere in India.</li>

              <li>
                • Orders are dispatched within 1–2 working days,
                Monday to Saturday.
              </li>

              <li>
                • Tracking link is sent via email within 24 hours of dispatch.
              </li>

              <li>
                • Free shipping on all combo order.
              </li>

              <li>
                • Shipping charges and taxes are calculated at checkout — no hidden fees, no surprises.
              </li>

              <li>
                • Deliveries take place between 10am – 7pm,
                Monday to Saturday.
              </li>

              <li>
                • Please ensure someone is available to receive the package.
              </li>

              <li>
                • Report damaged or missing items within 24 hours
                of delivery.
              </li>
            </ul>

            {/* Contact Box */}
            <div className="mt-10 rounded-2xl bg-[#FFF8EF] border border-[#FED68C]/30 p-6">
              <h3 className="font-semibold text-[#6F371E] mb-2">
                Need Help?
              </h3>

              <p className="text-[#5A3520]">
                For shipping related queries contact:
              </p>

              <a
                href="mailto:infosnava@gmail.com"
                className="text-[#A2452B] font-medium"
              >
                infosnava@gmail.com
              </a>
            </div>

            {/* Delivery Time */}
            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Delivery Timeline
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                <div className="rounded-2xl bg-[#F8F1E8] p-5">
                  <p className="text-[#A2452B] text-xs uppercase tracking-widest font-bold mb-2">
                    Metro Cities
                  </p>

                  <p className="text-[#3D1C08] text-xl font-bold">
                    5–7 Days
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8F1E8] p-5">
                  <p className="text-[#A2452B] text-xs uppercase tracking-widest font-bold mb-2">
                    Outstation
                  </p>

                  <p className="text-[#3D1C08] text-xl font-bold">
                    7–9 Days
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8F1E8] p-5">
                  <p className="text-[#A2452B] text-xs uppercase tracking-widest font-bold mb-2">
                    J&K / NE / Kerala
                  </p>

                  <p className="text-[#3D1C08] text-xl font-bold">
                    9–15 Days
                  </p>
                </div>

              </div>
            </div>

            {/* Closing Note */}
            <div className="mt-12 rounded-2xl bg-[#6F371E] p-8">
              <p className="text-[#F3ECE2] text-lg leading-8 italic">
                “We packed it with care. We want it to reach you the same way.”
              </p>

              <p className="text-[#FED68C] mt-4 font-medium">
                — Team Snava
              </p>
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
                  className="block rounded-xl bg-[#6F371E] text-white px-4 py-3"
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
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
                >
                  Terms & Conditions
                </Link>

              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[#F3ECE2]/50 text-sm leading-6">
                  Looking for another policy?
                  Use the links above to quickly switch between policy pages.
                </p>
              </div>

            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}