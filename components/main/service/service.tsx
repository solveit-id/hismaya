"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

import type {
  ServiceDTO,
} from "@/features/main/service";

import {
  getTranslation,
} from "@/utils/translation";

import type {
  Locale,
} from "@/types/multilang";

type Props = {
  services: ServiceDTO[];
};

export default function OurService({
  services,
}: Props) {
    const t = useTranslations("main.service");
    const locale = useLocale() as Locale;

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
                    <span className="rounded-md bg-[#078fd3] px-5 py-2.5 text-sm font-bold leading-none text-white md:text-base">
                        {t("badge")}
                    </span>

                    <h2 className="mt-3 text-center text-[34px] font-extrabold leading-none tracking-normal sm:text-[40px]">
                        <span className="text-[#078fd3]">
                            {t("titleHighlight")}
                        </span>{" "}
                        {t("title")}
                    </h2>
                </div>

                {/* CONTENT */}
                <div className="mt-[88px] space-y-[92px]">
                    {services.map((service, index) => {
                        const imageFirst = index % 2 === 0;

                        return (
                            <article
                                key={`${getTranslation(
                                    service.part,
                                    locale
                                )}`}
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
                                        imageFirst
                                            ? "lg:order-1"
                                            : "lg:order-2"
                                    }`}
                                >
                                    <div className="service-image-wrapper overflow-hidden rounded-[18px]">
                                        <img
                                            src={service.img || ""}
                                            alt={getTranslation(
                                                service.part,
                                                locale
                                            )}
                                            className="service-image aspect-[16/10] w-full object-cover shadow-[0_22px_45px_rgba(0,0,0,0.18)]"
                                        />
                                    </div>
                                </div>

                                {/* TEXT */}
                                <div
                                    className={`max-w-[420px] transition-all duration-[1200ms] ${
                                        imageFirst
                                            ? "lg:order-2"
                                            : "lg:order-1"
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
                                        {getTranslation(
                                            service.part,
                                            locale
                                        )}
                                    </h3>

                                    <div className="mt-8 space-y-5 text-[13px] font-semibold leading-[1.8] text-[#66708b]">
                                        <p
                                            className={`transition-all duration-1000 ${
                                                isVisible
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-5 opacity-0"
                                            }`}
                                            style={{
                                                transitionDelay: `${
                                                index * 220
                                                }ms`,
                                            }}
                                            >
                                            {getTranslation(
                                                service.desc,
                                                locale
                                            )}
                                        </p>
                                    </div>

                                    {/* BUTTON ISO */}
                                    {index === 2 && (
                                        <Link
                                            href={{
                                                pathname: "/iso-certification",
                                            }}
                                            locale={locale}
                                            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#078fd3] px-7 py-3 text-[13px] font-bold text-white shadow-[0_12px_25px_rgba(7,143,211,0.25)] transition duration-500 hover:scale-[1.03] hover:bg-[#067fbb]"
                                        >
                                            {t("isoButton")}
                                        </Link>
                                    )}
                                </div>
                            </article>
                        );
                    })}
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