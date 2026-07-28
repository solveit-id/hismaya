"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useLocale, useTranslations } from "next-intl";

import { useRouter } from "@/lib/i18n/navigation";

export default function Hero() {
    const t = useTranslations("main.hero");
    const locale = useLocale();
    const router = useRouter();

    const categoryPlaceholder = t("filter.category.placeholder");
    const sectorPlaceholder = t("filter.sector.placeholder");
    const durationPlaceholder = t("filter.duration.placeholder");

    const [category, setCategory] = useState(categoryPlaceholder);
    const [Sector, setSector] = useState(sectorPlaceholder);
    const [duration, setDuration] = useState(durationPlaceholder);

    const [openCategory, setOpenCategory] = useState(false);
    const [openSector, setOpenSector] = useState(false);
    const [openDuration, setOpenDuration] = useState(false);

    const categoryRef = useRef<HTMLDivElement>(null);
    const sectorRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);

    const categories = [
        t("filter.category.items.national"),
        t("filter.category.items.international"),
        t("filter.category.items.iso"),
    ];

    const nationalSector = t.raw(
        "filter.sector.national"
    ) as string[];

    const internationalSector = t.raw(
        "filter.sector.international"
    ) as string[];

    const isoSector = t.raw(
        "filter.sector.iso"
    ) as string[];

    const durations = t.raw(
        "filter.duration.items"
    ) as string[];

    const filteredSector =
        category === t("filter.category.items.national") ? nationalSector : 
        category === t("filter.category.items.international") ? internationalSector :
        category === t("filter.category.items.iso") ? isoSector : 
    [];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                categoryRef.current &&
                !categoryRef.current.contains(event.target as Node)
            ) {
                setOpenCategory(false);
            }

            if (
                sectorRef.current &&
                !sectorRef.current.contains(event.target as Node)
            ) {
                setOpenSector(false);
            }

            if (
                durationRef.current &&
                !durationRef.current.contains(event.target as Node)
            ) {
                setOpenDuration(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="relative bg-[#E9E9E9] px-6 pb-16 pt-16 text-[#333333] sm:px-10 sm:pb-20 sm:pt-15 lg:px-20 lg:pb-24">

            <div className="relative mx-auto max-w-[1420px] lg:min-h-[560px]">

                <div
                    className="
                    grid items-center gap-10

                    md:gap-14

                    lg:grid-cols-2
                    lg:gap-8

                    xl:gap-10
                    "
                >

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                        relative z-20 flex justify-center text-center

                        md:min-h-[720px]

                        lg:h-[600px]
                        lg:min-h-0
                        lg:text-left
                        "
                    >
                        <div className="relative w-full max-w-[540px] lg:flex lg:flex-col lg:justify-center">

                            {/* TITLE */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.15,
                                    duration: 0.7,
                                    ease: "easeOut",
                                }}
                                className="mx-auto max-w-[520px] text-[34px] font-black uppercase leading-[1.22] text-[#303030] sm:text-[44px] sm:leading-[1.28] lg:mx-0 lg:text-[50px] lg:leading-[1.35]"
                            >
                                {t("title.first")}{" "}
                                <span className="text-[#078fd3]">
                                    {t("title.highlightOne")}
                                </span>{" "}
                                    {t("title.middle")}{" "}
                                <span className="text-[#078fd3]">
                                    {t("title.highlightTwo")}
                                </span>{" "}
                                {t("title.last")}
                            </motion.h1>

                            {/* DESCRIPTION */}
                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.28,
                                    duration: 0.7,
                                    ease: "easeOut",
                                }}
                                className="mx-auto mt-5 max-w-[500px] text-[15px] font-medium leading-[1.8] text-[#777777] sm:text-[17px] sm:leading-[2] lg:mx-0 lg:text-[#9a9a9a]"
                            >
                                {t("description")}
                            </motion.p>

                            {/* BUTTON */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.4,
                                    duration: 0.5,
                                }}
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                onClick={() => {
                                    window.location.href = "/#about";
                                }}
                                className="mt-6 w-[150px] rounded-full bg-[#078fd3] px-4 py-3 text-xs font-black uppercase text-white transition hover:bg-[#067fbb]"
                                >
                                {t("button.learn")}
                            </motion.button>

                            {/* FILTER */}
                            <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="
                                relative z-[99999] mt-10
                                w-full
                                rounded-2xl
                                bg-[#eeeeee]
                                px-5 py-5
                                text-left
                                shadow-[0_8px_25px_rgba(0,0,0,0.06)]
                                sm:px-6

                                md:rounded-[28px]
                                md:px-7

                                lg:absolute
                                lg:left-0
                                lg:top-[520px]
                                lg:mt-8
                                lg:w-[920px]
                                lg:rounded-full
                                lg:px-8

                                xl:w-[980px]
                                "
                            >
                                <div
                                    className="
                                    grid gap-4
                                    sm:grid-cols-2

                                    md:grid-cols-2
                                    md:gap-5

                                    lg:flex
                                    lg:items-center
                                    lg:justify-between
                                    lg:gap-6
                                    "
                                >

                                    {/* CATEGORY */}
                                    <div
                                        ref={categoryRef}
                                        className="relative flex min-w-0 items-center gap-3 rounded-xl bg-white/45 px-4 py-3 lg:border-r lg:border-gray-300 lg:bg-transparent lg:px-0 lg:py-0 lg:pr-10"
                                    >
                                        <svg
                                            className="h-5 w-5 shrink-0 text-[#078fd3]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 6v-6h6v6h-6z"
                                            />
                                        </svg>

                                        <div className="relative flex min-w-0 flex-1 flex-col">
                                            <span className="pl-1 text-[12px] text-gray-400">
                                                {t("filter.category.label")}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setOpenCategory(!openCategory)}
                                                className="mt-1 flex items-center justify-between pl-1 text-left text-[14px] font-semibold text-[#333]"
                                            >
                                                {category}

                                                <svg
                                                    className={`ml-3 h-4 w-4 transition-transform duration-300 ${
                                                        openCategory ? "rotate-180" : ""
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                className={`absolute left-0 top-[58px] z-[9999] w-[220px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-all duration-300 ${
                                                    openCategory
                                                        ? "visible translate-y-0 opacity-100"
                                                        : "invisible -translate-y-2 opacity-0"
                                                }`}
                                            >
                                                {categories.map((item) => (
                                                    <button
                                                        key={item}
                                                    onClick={() => {
                                                        setCategory(item);

                                                        // RESET Sector
                                                        setSector(sectorPlaceholder);

                                                        setOpenCategory(false);
                                                    }}
                                                        className={`w-full px-5 py-4 text-left text-[15px] font-medium transition ${
                                                            category === item
                                                                ? "bg-[#eef7fd] text-[#078fd3]"
                                                                : "text-[#3d3d3d] hover:bg-[#f4f7fa]"
                                                        }`}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sector */}
                                    <div
                                        ref={sectorRef}
                                        className="relative flex min-w-0 items-center gap-3 rounded-xl bg-white/45 px-4 py-3 lg:border-r lg:border-gray-300 lg:bg-transparent lg:px-0 lg:py-0 lg:pr-10"
                                    >
                                        <svg
                                            className="h-5 w-5 shrink-0 text-[#078fd3]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="6"
                                                y="4"
                                                width="12"
                                                height="16"
                                                rx="2"
                                                strokeWidth="2"
                                            />
                                            <path strokeWidth="2" d="M9 4h6v2H9z" />
                                            <path strokeWidth="2" d="M9 10l1.5 1.5L14 8" />
                                        </svg>

                                        <div className="relative flex min-w-0 flex-1 flex-col">
                                            <span className="pl-1 text-[12px] text-gray-400">
                                                {t("filter.sector.label")}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setOpenSector(!openSector)}
                                                className="mt-1 flex items-center justify-between pl-1 text-left text-[14px] font-semibold text-[#333]"
                                            >
                                                {Sector}

                                                <svg
                                                    className={`ml-3 h-4 w-4 transition-transform duration-300 ${
                                                        openSector ? "rotate-180" : ""
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                className={`absolute left-0 top-[58px] z-[9999] w-[280px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-all duration-300 ${
                                                    openSector
                                                        ? "visible translate-y-0 opacity-100"
                                                        : "invisible -translate-y-2 opacity-0"
                                                }`}
                                            >
                                                <div className="max-h-[320px] overflow-y-auto py-2">
                                                    {filteredSector.map((item) => (
                                                        <button
                                                            key={item}
                                                            onClick={() => {
                                                                setSector(item);
                                                                setOpenSector(false);
                                                            }}
                                                            className={`w-full px-5 py-4 text-left text-[14px] font-medium transition ${
                                                                Sector === item
                                                                    ? "bg-[#eef7fd] text-[#078fd3]"
                                                                    : "text-[#3d3d3d] hover:bg-[#f4f7fa]"
                                                            }`}
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DURATION */}
                                    <div
                                        ref={durationRef}
                                        className="relative flex min-w-0 items-center gap-3 rounded-xl bg-white/45 px-4 py-3 lg:border-r lg:border-gray-300 lg:bg-transparent lg:px-0 lg:py-0 lg:pr-10"
                                    >
                                        <svg
                                            className="h-5 w-5 shrink-0 text-[#078fd3]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <div className="relative flex min-w-0 flex-1 flex-col">
                                            <span className="pl-1 text-[12px] text-gray-400">
                                                {t("filter.duration.label")}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setOpenDuration(!openDuration)}
                                                className="mt-1 flex items-center justify-between pl-1 text-left text-[14px] font-semibold text-[#333]"
                                            >
                                                {duration}

                                                <svg
                                                    className={`ml-3 h-4 w-4 transition-transform duration-300 ${
                                                        openDuration ? "rotate-180" : ""
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>

                                            <div
                                                className={`absolute left-0 top-[58px] z-[9999] w-[180px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-all duration-300 ${
                                                    openDuration
                                                        ? "visible translate-y-0 opacity-100"
                                                        : "invisible -translate-y-2 opacity-0"
                                                }`}
                                            >
                                                {durations.map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => {
                                                            setDuration(item);
                                                            setOpenDuration(false);
                                                        }}
                                                        className={`w-full px-5 py-4 text-left text-[15px] font-medium transition ${
                                                            duration === item
                                                                ? "bg-[#eef7fd] text-[#078fd3]"
                                                                : "text-[#3d3d3d] hover:bg-[#f4f7fa]"
                                                        }`}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEARCH */}
                                    <motion.button
                                        whileHover={{
                                            y: -2,
                                            scale: 1.01,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        onClick={() => {
                                            const params = new URLSearchParams();

                                            // CATEGORY
                                            if (
                                                category &&
                                                category !== categoryPlaceholder
                                            ) {
                                                params.set("category", category);
                                            }

                                            // Sector
                                            if (
                                                Sector &&
                                                Sector !== sectorPlaceholder
                                            ) {
                                                params.set("Sector", Sector);
                                            }

                                            // DURATION
                                            if (
                                                duration &&
                                                duration !== durationPlaceholder
                                            ) {
                                                params.set("duration", duration);
                                            }

                                            const queryString = params.toString();

                                            // ISO PAGE
                                            if (
                                                category ===
                                                t("filter.category.items.iso")
                                            ) {
                                                router.push(
                                                        `/certification-iso${
                                                        queryString ? `?${queryString}` : ""
                                                    }`
                                                );

                                                return;
                                            }

                                            // NORMAL PAGE
                                            router.push(
                                                    `/certification${
                                                    queryString ? `?${queryString}` : ""
                                                }`
                                            );
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#078fd3] px-10 py-4 text-[15px] font-semibold text-white transition hover:bg-[#067fbb] sm:col-span-2 lg:w-auto"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.2}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                            />
                                        </svg>

                                        {t("button.search")}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                        relative hidden
                        h-[520px]

                        md:grid
                        md:h-[560px]

                        lg:h-[600px]
                        place-items-center
                        "
                    >
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/img/Hero.png"
                                alt={t("imageAlt")}
                                width={680}
                                height={588}
                                className="
                                h-auto
                                w-[420px]

                                md:w-[500px]

                                lg:w-[560px]
                                "
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}