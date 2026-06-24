"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [activeJar, setActiveJar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJar((prev) => (prev + 1) % 2);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#6F371E] overflow-hidden flex items-center">
      {/* Background Glows */}
      <div className="absolute top-[-200px] right-[-150px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(143,212,241,0.14)_0%,transparent_70%)] animate-float-a pointer-events-none" />

      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(254,214,140,0.12)_0%,transparent_70%)] animate-float-b pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
           <p
  className="text-[#8FD4F1] text-[0.75rem] font-semibold uppercase tracking-[0.35em] mb-6"
  style={{ animation: "fadeUp 0.8s 0.3s both" }}
>
  NOW IT GROWS BACK.
</p>

            <h1
              className="font-[family-name:var(--font-playfair)] font-black leading-[0.88] tracking-tight text-[#F3ECE2] mb-6"
              style={{
                fontSize: "clamp(2rem, 6vw, 8rem)",
                animation: "fadeUp 0.9s 0.5s both",
              }}
            >
              The Best
              <br />
              <em className="text-[#FED68C] not-italic">
                Peanut Butter
              </em>
              <br />
              in India
              <span className="text-[#8FD4F1]">.</span>
            </h1>
 <p
              className="text-[#F3ECE2] font-light max-w-md lg:max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed text-base md:text-lg"
              style={{ animation: "fadeUp 0.9s 0.7s both" }}
            >
               Feed your Best Self.
            </p>
            <p
              className="text-[#F3ECE2]/70 font-light max-w-md lg:max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed text-base md:text-lg"
              style={{ animation: "fadeUp 0.9s 0.7s both" }}
            >
               High Protein, 100% Natural Peanut Butter — Crafted for India
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              style={{ animation: "fadeUp 0.9s 0.9s both" }}
            >
              <Link
                href="#products"
                className="bg-[#FED68C] text-[#3d1c08] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_6px_30px_rgba(254,214,140,0.35)] hover:shadow-[0_10px_40px_rgba(254,214,140,0.5)] hover:-translate-y-1 transition-all duration-300"
              >
                Explore Flavors
              </Link>

              <Link
                href="#our-story"
                className="text-[#F3ECE2] font-medium text-xs uppercase tracking-widest px-8 py-4 rounded-full border-[1.5px] border-[#F3ECE2]/30 hover:border-[#F3ECE2]/80 transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative flex justify-center items-center min-h-[550px]">
            {/* Main Glow */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-[#FED68C]/20 blur-[90px]" />

            {/* Rotating Ring */}
            <div className="absolute w-[430px] h-[430px] border border-[#FED68C]/20 rounded-full animate-spin-slow" />

            <div className="absolute w-[500px] h-[500px] border border-[#8FD4F1]/10 rounded-full animate-spin-slow-reverse" />

            {/* Shadow */}
            <div className="absolute bottom-16 w-[280px] h-[45px] bg-black/30 blur-3xl rounded-full" />

            {/* JAR 1 */}
            <Image
              src="/wb_jar1.png"
              alt="Earth Crunch"
              width={500}
              height={500}
              priority
              className={`absolute object-contain transition-all duration-1000 ease-out ${
                activeJar === 0
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 rotate-12"
              }`}
              style={{
                animation: "floatJar 5s ease-in-out infinite",
              }}
            />

            {/* JAR 2 */}
            <Image
              src="/wb_jar2.png"
              alt="Smoked Cacao"
              width={500}
              height={500}
              priority
              className={`absolute object-contain transition-all duration-1000 ease-out ${
                activeJar === 1
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-12"
              }`}
              style={{
                animation: "floatJar 5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-[-1px] left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C360,120 1080,0 1440,60 L1440,100 L0,100 Z"
          fill="#FAF7F2"
        />
      </svg>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatJar {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spinSlow 25s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spinSlowReverse 35s linear infinite;
        }

        .animate-float-a {
          animation: floatA 10s ease-in-out infinite;
        }

        .animate-float-b {
          animation: floatB 12s ease-in-out infinite;
        }

        @keyframes floatA {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }

        @keyframes floatB {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}