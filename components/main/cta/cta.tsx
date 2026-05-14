"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function CollaborationCta() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#078fd3] px-6 py-20 text-white sm:px-10 lg:px-20"
    >
      <div
        className={`animate-[softFloat_7s_ease-in-out_infinite] mx-auto flex max-w-[980px] flex-col items-center text-center transition-all duration-[1200ms] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        {/* TITLE */}
        <h2
          className={`text-[28px] font-extrabold leading-tight tracking-normal transition-all duration-1000 sm:text-[34px] lg:text-[36px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          Berkolaborasi Bersama Hismaya Cahaya Rahayu
        </h2>

        {/* DESCRIPTION */}
        <p
          className={`mt-5 max-w-[860px] text-[14px] font-medium leading-[1.45] transition-all duration-[1200ms] sm:text-[15px] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "180ms",
          }}
        >
          Kami adalah lembaga profesional yang menghadirkan layanan pelatihan
          dan sertifikasi dengan pendekatan modern, didukung tim ahli, serta
          berfokus pada peningkatan kompetensi dan pengembangan karier Anda.
        </p>

        {/* BUTTONS */}
        <div
          className={`mt-9 flex items-center justify-center gap-4 transition-all duration-[1400ms] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          style={{
            transitionDelay: "320ms",
          }}
        >
          {/* BUTTON PRIMARY */}
          <Link
            href="/register"
            className="
              group
              rounded-full
              bg-white
              px-6
              py-3

              text-[13px]
              font-bold
              leading-none
              text-[#4a5568]

              shadow-[0_8px_16px_rgba(0,0,0,0.08)]

              transition-all
              duration-500

              hover:-translate-y-1
              hover:bg-[#f5f7fb]
              hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]
            "
          >
            Mulai Sekarang
          </Link>

          {/* BUTTON SECONDARY */}
          <Link
            href="/login"
            className="
              group
              flex
              items-center
              gap-1

              text-[13px]
              font-medium
              leading-none
              text-white

              transition-all
              duration-500

              hover:text-white/80
            "
          >
            <span>Masuk</span>

            <FiChevronRight
              className="
                h-4
                w-4
                stroke-[2.5]

                transition-transform
                duration-500

                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}