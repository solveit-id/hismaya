"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const pageLinks = [
    [
        "Beranda",
        "Tentang Kami",
        "Layanan",
        "Sertifikasi",
        "Sertifikasi ISO",
        "Paket Bundling",
        "Kolaborasi",
    ],
    ["Artikel", "Kontak", "Karier"],
];

const cmsLinks = [
    "Artikel",
    "Kategori Artikel",
    "Tim Profesional",
    "Kategori Harga",
    "Detail Program",
    "Detail Karier",
];

const utilityLinks = [
    "Panduan Gaya",
    "Lisensi",
    "Pembaruan",
    "Halaman 404",
    "Kata Sandi",
];

const socialLinks = [
    { label: "Facebook", icon: FaFacebookF },
    { label: "X", icon: FaXTwitter },
    { label: "LinkedIn", icon: FaLinkedinIn },
    { label: "Instagram", icon: FaInstagram },
];

export default function Footer() {
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
                threshold: 0.1,
            }
        );
        
        observer.observe(currentSection);

        return () => {
            observer.disconnect();
        };
    }, []);
    
    return (
    
    <footer
      ref={sectionRef}
      className="
        overflow-hidden
        bg-[#f3f4f6]
        px-6
        pb-8
        pt-20
        text-[#667085]

        sm:px-10
        lg:px-16
        xl:px-20
      "
    >
        <div className="mx-auto max-w-[1280px]">
            {/* TOP CONTENT */}
            <div
            className="
                grid
                gap-y-14
                gap-x-12

                md:grid-cols-2

                lg:grid-cols-[220px_1fr_1fr_1fr]
                lg:items-start

                xl:grid-cols-[240px_1fr_1fr_1fr_320px]
            "
            >
                {/* LOGO */}
                <div
                    className={`
                        transition-all
                        duration-1000
                        ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                        }
                    `}
                >
                    <div className="transition-transform duration-500 hover:scale-[1.03]">
                        <Image
                            src="/img/hismayaaaa.png"
                            alt="Hismaya"
                            width={72}
                            height={72}
                            className="h-auto w-[70px]"
                        />
                    </div>

                    <h2 className="mt-5 text-[22px] font-extrabold text-[#1f2937]">
                    HISMAYA
                    </h2>

                    <p className="mt-4 max-w-[220px] text-[14px] leading-[1.8]">
                    Lembaga profesional pelatihan dan sertifikasi untuk meningkatkan
                    kompetensi dan pengembangan karier Anda.
                    </p>
                </div>

                {/* HALAMAN */}
                <div
                    className={`
                        transition-all
                        duration-[1200ms]
                        ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                        }
                    `}
                    style={{
                    transitionDelay: "120ms",
                    }}
                >
                    <h3 className="text-[17px] font-extrabold text-[#1f2937]">
                    Halaman
                    </h3>

                    <div className="mt-6 grid grid-cols-2 gap-x-10">
                        {pageLinks.map((column, index) => (
                            <ul key={index} className="space-y-4">
                                {column.map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="
                                            inline-flex
                                            text-[14px]
                                            font-medium

                                            transition-all
                                            duration-300

                                            hover:translate-x-1
                                            hover:text-[#078fd3]
                                            "
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

                {/* CMS */}
                <div
                    className={`
                        transition-all
                        duration-[1300ms]
                        ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                        }
                    `}
                    style={{
                    transitionDelay: "220ms",
                    }}
                >
                    <h3 className="text-[17px] font-extrabold text-[#1f2937]">
                    Halaman CMS
                    </h3>

                    <ul className="mt-6 space-y-4">
                        {cmsLinks.map((item) => (
                            <li key={item}>
                                <Link
                                    href="#"
                                    className="
                                    inline-flex
                                    text-[14px]
                                    font-medium

                                    transition-all
                                    duration-300

                                    hover:translate-x-1
                                    hover:text-[#078fd3]
                                    "
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* UTILITAS */}
                <div
                    className={`
                        transition-all
                        duration-[1400ms]
                        ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                        }
                    `}
                    style={{
                    transitionDelay: "320ms",
                    }}
                >
                    <h3 className="text-[17px] font-extrabold text-[#1f2937]">
                        Halaman Utilitas
                    </h3>

                    <ul className="mt-6 space-y-4">
                        {utilityLinks.map((item) => (
                            <li key={item}>
                                <Link
                                    href="#"
                                    className="
                                    inline-flex
                                    text-[14px]
                                    font-medium

                                    transition-all
                                    duration-300

                                    hover:translate-x-1
                                    hover:text-[#078fd3]
                                    "
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* BERLANGGANAN */}
                <div
                    className={`
                        transition-all
                        duration-[1500ms]
                        ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-12 opacity-0"
                        }
                    `}
                    style={{
                    transitionDelay: "420ms",
                    }}
                >
                    <h3 className="text-[17px] font-extrabold text-[#1f2937]">
                    Berlangganan
                    </h3>

                    <p className="mt-5 text-[14px] leading-[1.8]">
                    Dapatkan informasi terbaru mengenai pelatihan, sertifikasi, dan
                    pembaruan program dari kami.
                    </p>

                    <form className="mt-6 flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="
                            h-[48px]
                            rounded-[14px]
                            border
                            border-[#dbe1ea]
                            bg-white
                            px-4

                            text-[14px]
                            text-[#1f2937]

                            outline-none

                            transition-all
                            duration-300

                            placeholder:text-[#98a2b3]

                            focus:border-[#078fd3]
                            focus:shadow-[0_0_0_4px_rgba(7,143,211,0.12)]
                            "
                        />

                        <button
                            type="submit"
                            className="
                            h-[48px]
                            rounded-full
                            bg-[#1f2937]

                            text-[14px]
                            font-bold
                            text-white

                            shadow-[0_8px_20px_rgba(0,0,0,0.12)]

                            transition-all
                            duration-500

                            hover:-translate-y-1
                            hover:bg-[#111827]
                            hover:shadow-[0_14px_24px_rgba(0,0,0,0.16)]
                            "
                        >
                            Berlangganan
                        </button>
                    </form>

                    <p className="mt-5 text-[12px] leading-[1.7] text-[#98a2b3]">
                        Dengan berlangganan Anda menyetujui{" "}
                            <Link
                                href="#"
                                className="
                                underline
                                underline-offset-2
                                transition
                                hover:text-[#078fd3]
                                "
                            >
                                Kebijakan Privasi
                            </Link>{" "}
                        kami dan bersedia menerima informasi terbaru dari perusahaan.
                    </p>
                </div>
            </div>

            {/* DIVIDER */}
            <div
            className={`
                    mt-16
                    h-px
                    bg-[#d9dee7]

                    origin-left
                    transition-all
                    duration-[1400ms]

                    ${
                    isVisible
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }
                `}
            />

            {/* BOTTOM */}
            <div
            className={`
                    mt-8
                    flex
                    flex-col
                    items-center
                    justify-between
                    gap-5

                    text-center

                    transition-all
                    duration-[1600ms]

                    md:flex-row
                    md:text-left

                    ${
                    isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                `}
                style={{
                    transitionDelay: "520ms",
                }}
            >
                <p className="text-[13px] font-medium">
                    © Hismaya Cahaya Rahayu
                </p>

                <p className="text-[13px] font-medium text-[#98a2b3]">
                    Didukung oleh Solveti.id
                </p>

                {/* SOCIAL */}
                <div className="flex items-center gap-3">
                    {socialLinks.map(({ label, icon: Icon }, index) => (
                        <Link
                            key={label}
                            href="#"
                            aria-label={label}
                            className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center

                            rounded-full
                            border
                            border-[#dbe1ea]

                            bg-white
                            text-[#078fd3]

                            transition-all
                            duration-500

                            hover:-translate-y-1
                            hover:border-[#078fd3]
                            hover:bg-[#078fd3]
                            hover:text-white
                            hover:shadow-[0_12px_24px_rgba(7,143,211,0.22)]
                            "
                            style={{
                            transitionDelay: `${index * 70}ms`,
                            }}
                        >
                            <Icon className="h-4 w-4" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  );
}