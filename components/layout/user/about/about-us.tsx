"use client";

import { useEffect, useRef, useState } from "react";

const profileItems = [
    {
        number: "1.",
        title: "Siapa Kami",
        description:
        "Lembaga profesional berkomitmen meningkatkan kualitas dan kompetensi individu secara berkelanjutan",
    },
    {
        number: "2.",
        title: "Apa yang Kami Lakukan",
        description:
        "Menyediakan pelatihan pembelajaran dan sertifikasi inovatif sesuai kebutuhan industri saat ini",
    },
    {
        number: "3.",
        title: "Bagaimana Kami Membantu",
        description:
        "Membantu mengembangkan pengetahuan keterampilan dan sikap kerja melalui proses terstruktur profesional",
    },
    {
        number: "4.",
        title: "Menciptakan Kompetensi Unggul",
        description:
        "Memastikan peserta memiliki standar kompetensi tinggi menjadi profesional siap bersaing global",
    },
    ];

    const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=520&q=80",
        alt: "Interior meja kayu minimalis",
        className:
        "left-[70px] top-[80px] h-[120px] w-[190px] xl:left-[102px] xl:w-[198px]",
    },
    {
        src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=520&q=80",
        alt: "Kursi hitam di samping meja kecil",
        className:
        "left-[280px] top-[34px] h-[220px] w-[190px] xl:left-[319px] xl:w-[198px]",
    },
    {
        src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=520&q=80",
        alt: "Kursi sofa biru dengan buku",
        className:
        "left-[70px] top-[225px] h-[210px] w-[190px] xl:left-[102px] xl:w-[198px]",
    },
    {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=520&q=80",
        alt: "Sofa dan kabinet ruang tamu",
        className:
        "left-[280px] top-[285px] h-[118px] w-[190px] xl:left-[319px] xl:w-[198px]",
    },
];

export default function AboutUs() {
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
                threshold: 0.15,
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
      id="about"
      className="bg-[#E9E9E9] px-6 py-16 text-black sm:px-10 md:px-12 md:py-20 lg:px-16 xl:px-20"
    >
        <div className="mx-auto max-w-[1280px]">
            {/* TITLE */}
            <div
            className={`flex flex-col items-center transition-all duration-1000 ${
                isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            >
                <span className="rounded-md bg-[#078fd3] px-5 py-2.5 text-sm font-bold leading-none text-white md:text-base">
                    Profil Perusahaan
                </span>

                <h2 className="mt-4 text-center text-[32px] font-extrabold leading-none tracking-normal sm:text-[38px] md:text-[42px]">
                    Tentang <span className="text-[#078fd3]">Kami</span>
                </h2>
            </div>

            {/* CONTENT */}
            <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_480px] lg:gap-10 xl:grid-cols-[1fr_560px] xl:gap-[72px]">
                
                {/* LEFT CONTENT */}
                <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-x-14 md:gap-y-14">
                    {profileItems.map((item, index) => (
                        <article
                            key={item.number}
                            className={`max-w-[280px] transition-all duration-1000 ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                            }`}
                            style={{
                            transitionDelay: `${index * 120}ms`,
                            }}
                        >
                            <p className="text-[42px] font-extrabold leading-none md:text-[48px]">
                            {item.number}
                            </p>

                            <h3 className="mt-5 text-[22px] font-extrabold leading-[1.15] md:text-[25px]">
                            {item.title}
                            </h3>

                            <p className="mt-4 text-[14px] font-medium leading-[1.7] text-[#3d3d3d] md:text-[15px]">
                            {item.description}
                            </p>
                        </article>
                    ))}
                </div>

                {/* DESKTOP/TABLET GALLERY */}
                <div
                    className={`relative hidden h-[470px] w-full max-w-[520px] shrink-0 transition-all duration-[1400ms] md:block lg:h-[440px] xl:h-[460px] ${
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-10 opacity-0"
                    }`}
                >
                    {galleryImages.map((image, index) => (
                        <img
                            key={image.alt}
                            src={image.src}
                            alt={image.alt}
                            className={`
                            about-gallery-image
                            absolute rounded-[14px] object-cover
                            shadow-[0_18px_40px_rgba(0,0,0,0.14)]
                            transition duration-700 hover:scale-[1.02]
                            ${image.className}
                            `}
                            style={{
                            animationDelay: `${index * 0.8}s`,
                            }}
                        />
                    ))}
                </div>

                {/* MOBILE GALLERY */}
                <div
                    className={`grid grid-cols-2 gap-4 transition-all duration-1000 md:hidden ${
                    isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                >
                    {galleryImages.map((image, index) => (
                        <img
                            key={image.alt}
                            src={image.src}
                            alt={image.alt}
                            className="
                            aspect-[4/3]
                            w-full
                            rounded-[14px]
                            object-cover
                            shadow-[0_10px_24px_rgba(0,0,0,0.12)]
                            "
                            style={{
                            transitionDelay: `${index * 120}ms`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>

        <style>
            {`
            @keyframes floatingImage {
                0% {
                transform: translateY(0px);
                }

                50% {
                transform: translateY(-6px);
                }

                100% {
                transform: translateY(0px);
                }
            }

            .about-gallery-image {
                animation: floatingImage 6s ease-in-out infinite;
                will-change: transform;
            }
            `}
        </style>
    </section>
  );
}