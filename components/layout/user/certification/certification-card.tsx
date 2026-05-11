"use client";

import { useEffect, useState } from "react";

type CertificationCardProps = {
    
    certification: {
        id: number;
        title: string;
        type: string;
        field: string;

        category: string;
        duration: string;

        image: string;
        imageAlt: string;
        description: string;

        benefits?: string[];
    };
};

export default function CertificationCard({
    certification,
}: CertificationCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const whatsappNumber = "6282335501778";

    const whatsappMessage = encodeURIComponent(
        `Halo Admin, saya ingin mendaftar program "${certification.title}". Mohon informasi lebih lanjut.`,
    );
    
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // LOCK SCROLL SAAT POPUP TERBUKA
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

  return (
    <>
    {/* CARD */}
    <article className="relative mx-auto mt-10 w-full max-w-[320px] md:max-w-[360px] lg:max-w-[292px]">
        {/* BACKGROUND SHAPE */}
        <div
          className="
            absolute
            left-[-18px]
            top-[-18px]

            h-[340px]
            w-[265px]

            md:left-[-24px]
            md:w-[300px]

            lg:left-[-28px]
            lg:w-[270px]
          "
        >
            <svg viewBox="0 0 270 350" className="h-full w-full">
                <path
                d="
                    M50,0
                    Q0,0 0,60
                    L27,300
                    L270,300
                    L270,60
                    L270,60
                    L220,16
                    Z
                "
                fill="#b9ddea"
                />
            </svg>
        </div>

        {/* CARD CONTENT */}
        <div
          className="
            relative
            flex
            min-h-[360px]
            flex-col

            rounded-[18px_18px_52px_0]
            bg-white

            px-5
            pb-6
            pt-4

            shadow-[14px_18px_30px_rgba(0,0,0,0.2)]

            md:min-h-[390px]
            md:px-6

            lg:min-h-[360px]
          "
        >
            {/* IMAGE */}
            <img
                src={certification.image}
                alt={certification.imageAlt}
                className="
                h-[185px]
                w-full
                rounded-[22px]
                object-cover

                md:h-[215px]

                lg:h-[178px]
                "
            />

            {/* TITLE */}
            <h3
                className="
                mt-6
                text-[17px]
                font-extrabold
                leading-tight
                text-black

                md:text-[19px]

                lg:text-[16px]
                "
            >
                {certification.title}
            </h3>

            {/* DESCRIPTION */}
            <p
                className="
                mt-4
                text-[13px]
                font-medium
                leading-[1.7]
                text-[#747474]
                line-clamp-3

                md:text-[14px]

                lg:text-[12px]
                "
            >
                {certification.description}
            </p>

            {/* BUTTON */}
            <button
                onClick={() => setIsOpen(true)}
                className="
                mt-6
                w-fit
                rounded-[10px]
                bg-[#078fd3]

                px-5
                py-2.5

                text-[12px]
                font-bold
                text-white

                transition
                hover:bg-[#0678b3]

                md:px-6
                md:py-3
                "
            >
                Lihat Detail
            </button>
        </div>
    </article>
    
    {/* POPUP */}
    {isOpen && (
        <div
          className="
            fixed inset-0 z-[9999]
            overflow-y-auto
            bg-black/60
            px-4 py-8
            backdrop-blur-[4px]

            md:px-8 md:py-10
          "
        >
            <div className="flex min-h-full items-center justify-center">
                <div
                className="
                    relative
                    w-full
                    max-w-[430px]

                    rounded-[30px]
                    bg-white
                    p-6

                    shadow-[0_25px_70px_rgba(0,0,0,0.25)]

                    sm:p-7

                    md:max-w-[560px]
                    md:p-8

                    lg:max-w-[430px]
                "
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="
                        absolute
                        right-4
                        top-4

                        flex
                        h-[40px]
                        w-[40px]
                        items-center
                        justify-center

                        rounded-full
                        bg-[#f3f4f6]

                        text-[24px]
                        font-bold
                        text-[#333]

                        transition
                        hover:rotate-90
                        hover:bg-[#e5e7eb]

                        md:h-[44px]
                        md:w-[44px]
                        "
                    >
                        ×
                    </button>

                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-[24px]">
                        <img
                        src={certification.image}
                        alt={certification.imageAlt}
                        className="
                            h-[190px]
                            w-full
                            object-cover

                            sm:h-[220px]

                            md:h-[260px]

                            lg:h-[190px]
                        "
                        />
                    </div>

                    {/* TITLE */}
                    <h2
                        className="
                        mt-6
                        pr-10

                        text-[28px]
                        font-extrabold
                        leading-[1.15]
                        text-[#1f2937]

                        md:text-[36px]

                        lg:text-[30px]
                        "
                    >
                        {certification.title}
                    </h2>

                    {/* CATEGORY & DURATION */}
                    <div
                        className="
                        mt-6
                        grid
                        grid-cols-2
                        gap-4

                        md:gap-5
                        "
                    >
                        {/* CATEGORY */}
                        <div
                        className="
                            rounded-[18px]
                            border
                            border-[#d9e7f1]
                            bg-[#f8fbfd]

                            px-4
                            py-4

                            md:px-5
                            md:py-5
                        "
                        >
                            <span
                                className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[1px]
                                text-[#078fd3]

                                md:text-[12px]
                                "
                            >
                                Kategori
                            </span>

                            <p
                                className="
                                mt-2
                                text-[15px]
                                font-bold
                                leading-snug
                                text-[#1f2937]

                                md:text-[17px]
                                "
                            >
                                {certification.category}
                            </p>
                        </div>

                        {/* DURATION */}
                        <div
                        className="
                            rounded-[18px]
                            border
                            border-[#d9e7f1]
                            bg-[#f8fbfd]

                            px-4
                            py-4

                            md:px-5
                            md:py-5
                        "
                        >
                            <span
                                className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[1px]
                                text-[#078fd3]

                                md:text-[12px]
                                "
                            >
                                Durasi
                            </span>

                            <p
                                className="
                                mt-2
                                text-[15px]
                                font-bold
                                leading-snug
                                text-[#1f2937]

                                md:text-[17px]
                                "
                            >
                                {certification.duration}
                            </p>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-7">
                        <h3
                        className="
                            text-[18px]
                            font-extrabold
                            text-[#1f2937]

                            md:text-[22px]
                        "
                        >
                            Deskripsi
                        </h3>

                        <p
                        className="
                            mt-3
                            text-[15px]
                            leading-[1.9]
                            text-[#667085]

                            md:text-[16px]
                            md:leading-[2]
                        "
                        >
                            {certification.description}
                        </p>
                    </div>

                    {/* BENEFITS */}
                    {certification.benefits &&
                        certification.benefits.length > 0 && (
                        <div className="mt-7">
                            <h3
                            className="
                                text-[18px]
                                font-extrabold
                                text-[#1f2937]

                                md:text-[22px]
                            "
                            >
                                Manfaat
                            </h3>

                            <ul className="mt-4 space-y-3">
                                {certification.benefits.map((item, index) => (
                                    <li
                                    key={index}
                                    className="
                                        flex
                                        items-start
                                        gap-3

                                        text-[14px]
                                        leading-[1.8]
                                        text-[#667085]

                                        md:text-[15px]
                                        md:leading-[2]
                                    "
                                    >
                                        <span className="mt-[9px] h-[7px] w-[7px] rounded-full bg-[#078fd3]" />

                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* BUTTON */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                        mt-8
                        flex
                        h-[56px]
                        w-full
                        items-center
                        justify-center

                        rounded-[18px]
                        bg-[#078fd3]

                        text-[15px]
                        font-bold
                        text-white

                        shadow-[0_12px_24px_rgba(7,143,211,0.25)]

                        transition
                        hover:scale-[1.02]
                        hover:bg-[#0678b3]

                        md:h-[60px]
                        md:text-[16px]
                        "
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </div>
        </div>
    )}
    </>
  );
}