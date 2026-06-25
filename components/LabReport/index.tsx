
"use client";

import { useState } from "react";
import Link from "next/link";

const reports = [



  {
    id: 1,
    product: "Smoked Cacao",
    batch: "CCM190626",
    date: "24 JUNE 2026",
    pdf: "/lab-reports/sc001.pdf",
  },

  {
    id: 2,
    product: "Earth Crunch",
    batch: "CR170626",
    date: "24 JUNE 2026",
    pdf: "/lab-reports/ec001.pdf",
  },
 
];

export default function LabReportsPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F3ECE2]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#6F371E]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#8FD4F1] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#FED68C] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8FD4F1]/20 bg-[#8FD4F1]/10 text-[#8FD4F1] text-xs font-bold uppercase tracking-[0.2em]">
            Lab Verified Transparency
          </span>

          <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-[#F3ECE2] font-bold leading-tight text-5xl md:text-7xl">
            Every Batch.
            <br />
            Every Report.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-[#F3ECE2]/70 text-base md:text-lg leading-8">
            We believe you deserve to know exactly what's inside every jar.
            Every production batch is independently tested and published
            here for complete transparency.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* REPORTS AVAILABLE */}
        {reports.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-[#A2452B] text-xs font-bold uppercase tracking-[0.2em]">
                  Available Reports
                </p>

                <h2 className="text-[#3d1c08] text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold mt-2">
                  Batch Test Results
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report: any) => (
                <div
                  key={report.id}
                  className="bg-white rounded-[28px] p-7 border border-[#6F371E]/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-bold uppercase tracking-wider">
                      Lab Verified
                    </span>

                    <span className="text-3xl">📄</span>
                  </div>

                  <h3 className="text-[#3d1c08] text-2xl font-bold font-[family-name:var(--font-playfair)]">
                    {report.product}
                  </h3>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#3d1c08]/50">
                        Batch
                      </span>

                      <span className="font-semibold text-[#3d1c08]">
                        {report.batch}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#3d1c08]/50">
                        Date
                      </span>

                      <span className="font-semibold text-[#3d1c08]">
                        {report.date}
                      </span>
                    </div>
                  </div>

                 

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setSelectedPdf(report.pdf)}
                      className="flex-1 bg-[#6F371E] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#5a2d17] transition"
                    >
                      View Report
                    </button>

                    <a
                      href={report.pdf}
                      download
                      className="flex-1 bg-[#FED68C] text-[#3d1c08] rounded-full py-3 text-center text-sm font-semibold hover:opacity-90 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[32px] border border-[#6F371E]/10 p-10 md:p-20 text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            <div className="text-7xl mb-6">🧪</div>

            <h2 className="font-[family-name:var(--font-playfair)] text-[#3d1c08] text-4xl font-bold">
              Reports Coming Soon
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-[#3d1c08]/65 leading-8">
              We're preparing independent laboratory reports for all
              production batches. As soon as a batch is released,
              its test report will be published here.
            </p>

            <div className="mt-10 inline-flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-[#F3ECE2] text-[#6F371E] text-sm font-medium">
                Heavy Metal Testing
              </span>

              <span className="px-4 py-2 rounded-full bg-[#F3ECE2] text-[#6F371E] text-sm font-medium">
                Microbiology Testing
              </span>

              <span className="px-4 py-2 rounded-full bg-[#F3ECE2] text-[#6F371E] text-sm font-medium">
                Quality Verification
              </span>
            </div>
          </div>
        )}

        {/* INFO STRIP */}
        <div className="mt-14 bg-[#6F371E] rounded-[28px] p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[#FED68C] font-bold mb-2">
                Independent Testing
              </h3>

              <p className="text-[#F3ECE2]/70 text-sm leading-7">
                Reports are generated by independent laboratories.
              </p>
            </div>

            <div>
              <h3 className="text-[#FED68C] font-bold mb-2">
                Batch Specific
              </h3>

              <p className="text-[#F3ECE2]/70 text-sm leading-7">
                Every report corresponds to a specific production batch.
              </p>
            </div>

            <div>
              <h3 className="text-[#FED68C] font-bold mb-2">
                Full Transparency
              </h3>

              <p className="text-[#F3ECE2]/70 text-sm leading-7">
                We publish results so customers can verify quality themselves.
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6F371E] font-semibold hover:text-[#A2452B]"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* PDF MODAL */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8">
          <div className="bg-white w-full h-full rounded-[24px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-semibold text-[#3d1c08]">
                Lab Report Preview
              </h3>

              <button
                onClick={() => setSelectedPdf(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            <iframe
              src={selectedPdf}
              className="flex-1 w-full"
              title="Lab Report"
            />
          </div>
        </div>
      )}
    </main>
  );
}

