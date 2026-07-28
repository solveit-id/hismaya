"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

export default function PartnerLogos() {
    const t = useTranslations("main.partner");

    const partners = [
        {
            name: t("partners.0.name"),
            logo: "/img/Unisma.png",
        },
        {
            name: t("partners.1.name"),
            logo: "/img/Logo Polinema.png",
        },
        {
            name: t("partners.2.name"),
            logo: "/img/Logo UM.png",
        },
        {
            name: t("partners.3.name"),
            logo: "/img/Logo UB.png",
        },
        {
            name: t("partners.4.name"),
            logo: "/img/brawijaya multi usaha.jpg",
        },
        {
            name: t("partners.5.name"),
            logo: "/img/KAI.png",
        },
        {
            name: t("partners.6.name"),
            logo: "/img/Logo-BTN.png",
        },
        {
            name: t("partners.7.name"),
            logo: "/img/Logo Pegadaian.png",
        },
        {
            name: t("partners.8.name"),
            logo: "/img/Logo UIN Malang.png",
        },
    ];

    const marqueePartners = [...partners, ...partners];

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
            className="overflow-hidden bg-[#e9e9e9] px-6 py-20 text-[#252d3c] sm:px-10 lg:px-16"
        >
            <div
                className={`mx-auto max-w-[980px] transition-all duration-1000 ${
                    isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                }`}
            >
                <div
                    className={`text-center transition-all duration-1000 ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                    }`}
                >
                    <h2 className="text-[30px] font-extrabold leading-[1.18] tracking-normal text-[#252d3c] sm:text-[34px]">
                        {t("title.first")}

                        <span className="block text-[#078fd3]">
                            {t("title.highlight")}
                        </span>
                    </h2>
                </div>

                <div
                    className={`relative mt-12 transition-all duration-[1400ms] ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-12 opacity-0"
                    }`}
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#e9e9e9] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#e9e9e9] to-transparent" />

                    <div className="overflow-hidden">
                        <div className="partner-logo-marquee flex w-max items-center gap-9 py-5">
                            {marqueePartners.map((partner, index) => (
                                <button
                                    key={`${partner.name}-${index}`}
                                    type="button"
                                    aria-label={partner.name}
                                    className={`partner-logo-item group flex h-[74px] w-[104px] shrink-0 items-center justify-center rounded-xl transition-all duration-700 hover:z-20 hover:scale-150 focus-visible:z-20 focus-visible:scale-150 focus-visible:outline-none ${
                                        isVisible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-8 opacity-0"
                                    }`}
                                    style={{
                                        transitionDelay: `${index * 60}ms`,
                                    }}
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="partner-logo-image max-h-[64px] max-w-[90px] object-contain transition duration-500"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes partner-logo-marquee {
                    from {
                        transform: translateX(0);
                    }

                    to {
                        transform: translateX(calc(-50% - 18px));
                    }
                }

                .partner-logo-marquee {
                    animation: partner-logo-marquee 26s linear infinite;
                    will-change: transform;
                }

                .partner-logo-marquee:hover,
                .partner-logo-marquee:focus-within {
                    animation-play-state: paused;
                }

                .partner-logo-marquee:hover .partner-logo-image,
                .partner-logo-marquee:focus-within .partner-logo-image {
                    opacity: 0.35;
                    filter: grayscale(1);
                }

                .partner-logo-item:hover .partner-logo-image,
                .partner-logo-item:focus-visible .partner-logo-image {
                    opacity: 1;
                    filter: grayscale(0);
                    transform: translateY(-4px);
                }

                .partner-logo-image {
                    opacity: 0.88;
                    filter: grayscale(0.08);
                    transition:
                        opacity 0.4s ease,
                        filter 0.4s ease,
                        transform 0.4s ease;
                }

                @keyframes partner-float {
                    0% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-3px);
                    }

                    100% {
                        transform: translateY(0px);
                    }
                }

                .partner-logo-item {
                    animation: partner-float 4.5s ease-in-out infinite;
                }

                .partner-logo-item:nth-child(2n) {
                    animation-delay: 0.8s;
                }

                .partner-logo-item:nth-child(3n) {
                    animation-delay: 1.6s;
                }

                .partner-logo-item:nth-child(4n) {
                    animation-delay: 2.4s;
                }
                `}
            </style>
        </section>
    );
}