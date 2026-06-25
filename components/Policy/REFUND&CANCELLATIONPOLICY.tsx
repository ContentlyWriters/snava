import Link from "next/link";

export default function RefundCancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* Hero */}
      <section className="bg-[#6F371E] px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8FD4F1] text-xs uppercase tracking-[0.25em] font-bold mb-4">
            Snava Policies
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-[#F3ECE2] text-4xl md:text-6xl font-bold leading-tight">
            Refund & Cancellation Policy
          </h1>

          <p className="text-[#F3ECE2]/70 mt-6 max-w-2xl leading-7">
            Learn about returns, refunds, replacements and order
            cancellations at Snava.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">

          {/* Main Content */}
          <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-sm">

            <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
              Returns
            </h2>

            <ul className="space-y-4 text-[#5A3520] leading-8">
              <li>
                • We don't accept general returns — but we always make it right
                if something goes wrong on our end.
              </li>

              <li>
                • If you receive a damaged or wrong product, raise a request
                within 24 hours of delivery at infosnava@gmail.com with a
                photo or unboxing video as proof.
              </li>

              <li>
                • We'll either replace the product or issue a full refund —
                your choice, no questions asked.
              </li>
            </ul>

            <div className="mt-10 rounded-2xl bg-[#FFF8EF] border border-[#FED68C]/30 p-6">
              <h3 className="font-semibold text-[#6F371E] mb-2">
                Return Request Email
              </h3>

              <a
                href="mailto:infosnava@gmail.com"
                className="text-[#A2452B] font-medium"
              >
                infosnava@gmail.com
              </a>
            </div>

            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Refunds
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Refunds are processed to the original payment method only.
                </li>

                <li>
                  • Refunds typically take 4–7 working days after approval.
                </li>

                <li>
                  • COD orders — shipping and COD charges are non-refundable.
                </li>

                <li>
                  • No refund or replacement if the claim is raised after
                  24 hours of delivery.
                </li>

                <li>
                  • No refund or replacement if the product delivered is
                  correct and undamaged.
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-[#6F371E] text-2xl font-bold mb-6">
                Cancellations
              </h2>

              <ul className="space-y-4 text-[#5A3520] leading-8">
                <li>
                  • Orders can be cancelled within 24 hours of placement by
                  writing to infosnava@gmail.com
                </li>

                <li>
                  • Once the order is dispatched, it cannot be cancelled.
                </li>

                <li>
                  • Snava reserves the right to cancel orders that appear
                  fraudulent, suspicious, or incorrectly priced.
                </li>

                <li>
                  • A full refund will be issued in such cases, excluding shipping charges.
                </li>
              </ul>
            </div>

            <div className="mt-12 rounded-2xl bg-[#6F371E] p-8">
              <p className="text-[#F3ECE2] text-lg leading-8 italic">
                “We stand behind every jar we send out. If something isn't
                right — just talk to us. We'll fix it.”
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
                  className="block rounded-xl bg-white/5 text-[#F3ECE2]/80 hover:bg-white/10 px-4 py-3 transition"
                >
                  Shipping Policy
                </Link>

                <Link
                  href="/policy/refund-cancellation-policy"
                  className="block rounded-xl bg-[#6F371E] text-white px-4 py-3"
                >
                  Refund & Cancellation Policy
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
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
}