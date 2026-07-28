"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

import {
    FaWhatsapp,
    FaInstagram,
    FaEnvelope,
} from "react-icons/fa6";

export default function Footer() {

    const t = useTranslations("main.footer");

    const pageLinks = t.raw("home.links") as string[];

    const cmsLinks = t.raw("about.links") as string[];

    const utilityLinks = t.raw("services.links") as string[];

    const bundlingLinks = t.raw("bundling.links") as string[];

    const socialLinks = [
        {
            label: t("social.whatsapp"),
            icon: FaWhatsapp,
            href: "https://wa.me/6285933486769",
        },
        {
            label: t("social.email"),
            icon: FaEnvelope,
            href: `mailto:hismayacahayarahayu@gmail.com?subject=${encodeURIComponent(
                t("social.emailSubject")
            )}&body=${encodeURIComponent(
                t("social.emailBody")
            )}`,
        },
        {
            label: t("social.instagram"),
            icon: FaInstagram,
            href: "https://www.instagram.com/hismayacahayarahayu/",
        },
    ];

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
                            {t("brand.title")}
                        </h2>

                        <p className="mt-4 max-w-[220px] text-[14px] leading-[1.8]">
                            {t("brand.description")}
                        </p>
                    </div>

                    {/* HOME */}
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
                            {t("home.title")}
                        </h3>

                        <div className="mt-6 grid grid-cols-2 gap-x-10">
                            <ul className="space-y-4">
                                {pageLinks.map((item) => (
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
                    </div>

                    {/* ABOUT */}
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
                            {t("about.title")}
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {cmsLinks.map((item) => (
                                <li key={item}>
                                    <Link
                                        href="/#about"
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

                    {/* SERVICES */}
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
                            {t("services.title")}
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {utilityLinks.map((item) => (
                                <li key={item}>
                                    <Link
                                        href="/#service"
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

                    {/* BUNDLING */}
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
                            {t("bundling.title")}
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {bundlingLinks.map((item) => (
                                <li key={item}>
                                    <Link
                                        href="/#bundling"
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
                        {t("bottom.copyright")}
                    </p>

                    <p className="text-[13px] font-medium text-[#98a2b3]">
                        {t("bottom.supported")}
                    </p>

                    {/* SOCIAL */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ label, icon: Icon, href }, index) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
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