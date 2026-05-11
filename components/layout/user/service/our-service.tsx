"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
    {
        title: "Sertifikasi",
        highlight: "Kompetensi Nasional",
        image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=920&q=80",
        imageAlt: "Perpustakaan klasik dengan rak buku tinggi",
        description: [
        "Proses sertifikasi yang mengacu pada Standar Kompetensi Kerja Nasional Indonesia (SKKNI) melalui uji kompetensi yang dilakukan oleh Lembaga Sertifikasi Profesi (LSP) berlisensi Badan Nasional Sertifikasi Profesi (BNSP).",
        "Melalui proses ini, peserta diuji secara objektif untuk memastikan kemampuan kerja sesuai standar nasional sehingga siap bersaing di dunia kerja dan industri.",
        ],
    },

    {
        title: "Sertifikasi",
        highlight: "Internasional",
        image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=920&q=80",
        imageAlt: "Ruang perpustakaan modern dengan pengunjung",
        description: [
        "Program sertifikasi yang diakui secara global dan menggunakan standar internasional untuk memastikan kompetensi peserta relevan dengan kebutuhan industri dunia.",
        "Dengan sertifikasi ini, peserta memiliki nilai tambah berupa pengakuan lintas negara sehingga membuka peluang karier yang lebih luas dan profesional.",
        ],
    },

    {
        title: "Sertifikasi",
        highlight: "ISO",
        image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=920&q=80",
        imageAlt: "Tim profesional melakukan workshop ISO",
        description: [
        "Program sertifikasi dan workshop ISO untuk membantu individu maupun perusahaan memahami penerapan standar internasional secara efektif.",
        "Materi disusun secara aplikatif dengan pembahasan implementasi ISO yang relevan terhadap kebutuhan industri modern dan pengembangan sistem manajemen.",
        ],

        button: {
        text: "Lihat Sertifikasi ISO",
        link: "/user/certifications-iso",
        },
    },

    {
        title: "Paket",
        highlight: "Bundling",
        image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=920&q=80",
        imageAlt: "Peserta pelatihan profesional sedang berdiskusi",
        description: [
        "Paket bundling memberikan kombinasi pelatihan dan sertifikasi dengan harga yang lebih efisien serta materi yang saling terintegrasi.",
        "Cocok bagi peserta yang ingin meningkatkan kompetensi secara lebih lengkap dalam satu program pembelajaran profesional.",
        ],
    },
];

export default function OurService() {
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
                threshold: 0.12,
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
      id="service"
      className="bg-[#e9e9e9] px-6 py-20 text-black sm:px-10 lg:px-20"
    >
        <div className="mx-auto max-w-[1120px]">
            {/* TITLE */}
            <div
            className={`flex flex-col items-center transition-all duration-1000 ${
                isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            >
                <span className="rounded-md bg-[#078fd3] px-4 py-2 text-sm font-bold leading-none text-white">
                    Apa yang Kami Tawarkan
                </span>

                <h2 className="mt-3 text-center text-[34px] font-extrabold leading-none tracking-normal sm:text-[40px]">
                    <span className="text-[#078fd3]">Layanan</span> Kami
                </h2>
            </div>

            {/* CONTENT */}
            <div className="mt-[88px] space-y-[92px]">
                {services.map((service, index) => {
                    const imageFirst = index % 2 === 0;

                    return (
                    <article
                        key={`${service.title}-${service.highlight}`}
                        className={`grid items-center gap-10 transition-all duration-[1200ms] lg:grid-cols-2 lg:gap-[96px] ${
                            isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-12 opacity-0"
                        }`}
                        style={{
                        transitionDelay: `${index * 180}ms`,
                        }}
                    >
                        {/* IMAGE */}
                        <div
                        className={`w-full max-w-[640px] ${
                            imageFirst ? "lg:order-1" : "lg:order-2"
                        }`}
                        >
                            <div className="service-image-wrapper overflow-hidden rounded-[18px]">
                                <img
                                src={service.image}
                                alt={service.imageAlt}
                                className="service-image aspect-[16/10] w-full object-cover shadow-[0_22px_45px_rgba(0,0,0,0.18)]"
                                />
                            </div>
                        </div>

                        {/* TEXT */}
                        <div
                        className={`max-w-[420px] transition-all duration-[1200ms] ${
                            imageFirst ? "lg:order-2" : "lg:order-1"
                        } ${
                            isVisible
                            ? "translate-x-0 opacity-100"
                            : imageFirst
                            ? "translate-x-8 opacity-0"
                            : "-translate-x-8 opacity-0"
                        }`}
                            style={{
                                transitionDelay: `${index * 220}ms`,
                            }}
                        >
                            <h3 className="text-[27px] font-extrabold leading-[1.08] tracking-normal">
                                    {service.title}{" "}
                                <span className="text-[#078fd3]">
                                    {service.highlight}
                                </span>
                            </h3>

                            <div className="mt-8 space-y-5 text-[13px] font-semibold leading-[1.8] text-[#66708b]">
                                {service.description.map((paragraph, paragraphIndex) => (
                                <p
                                    key={paragraph}
                                    className={`transition-all duration-1000 ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-5 opacity-0"
                                    }`}
                                    style={{
                                    transitionDelay: `${
                                        index * 220 + paragraphIndex * 120
                                    }ms`,
                                    }}
                                >
                                    {paragraph}
                                </p>
                                ))}
                            </div>

                            {/* BUTTON ISO */}
                            {service.button && (
                                <a
                                href={service.button.link}
                                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#078fd3] px-7 py-3 text-[13px] font-bold text-white shadow-[0_12px_25px_rgba(7,143,211,0.25)] transition duration-500 hover:scale-[1.03] hover:bg-[#067fbb]"
                                >
                                {service.button.text}
                                </a>
                            )}
                        </div>
                    </article>
                );})}
            </div>
        </div>

        <style>
            {`
            .service-image {
                transition:
                transform 700ms ease,
                filter 700ms ease;
            }

            .service-image-wrapper:hover .service-image {
                transform: scale(1.035);
            }

            @keyframes serviceFloat {
                0% {
                transform: translateY(0px);
                }

                50% {
                transform: translateY(-5px);
                }

                100% {
                transform: translateY(0px);
                }
            }

            .service-image-wrapper {
                animation: serviceFloat 7s ease-in-out infinite;
            }
            `}
        </style>
    </section>
  );
}