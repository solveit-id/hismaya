"use client";

import { useTranslations } from "next-intl";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const packages = [
  {
    key: "package1",

    name: "INSTRUKTUR LEVEL IV + PUBLIC SPEAKING",

    description:
      "Paket pelatihan untuk meningkatkan kompetensi instruktur sekaligus kemampuan komunikasi, presentasi, dan penyampaian materi di depan audiens.",

    shortText: "Tingkatkan komunikasi dan kemampuan mengajar.",

    inverted: false,
    highlighted: false,
  },

  {
    key: "package2",

    name: "INSTRUKTUR LEVEL IV + PELAYANAN PRIMA",

    description:
      "Kombinasi pelatihan instruktur dan service excellence untuk membangun kemampuan mengajar yang profesional serta pelayanan yang responsif.",

    shortText: "Bangun pelayanan prima yang profesional.",

    inverted: true,
    highlighted: false,
  },

  {
    key: "package3",

    name: "INSTRUKTUR LEVEL IV + PUBLIC SPEAKING",

    description:
      "Program bundling untuk memperkuat keterampilan instruktur dalam memfasilitasi pembelajaran dan membangun kepercayaan diri saat berbicara.",

    shortText: "Perkuat public speaking dan rasa percaya diri.",

    inverted: false,
    highlighted: false,
  },
];

function BackgroundShape({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  if (index === 0) {
    return (
      <div
        className={`absolute -left-[45px] -top-[40px] h-[326px] w-[290px] rotate-[17deg] rounded-[60px_40px_50px_40px] bg-[#add3df] transition-all duration-700 ${
          active ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 95%)",
          maskImage:
            "linear-gradient(to bottom, black 40%, transparent 95%)",
        }}
      />
    );
  }

  if (index === 1) {
    return (
      <div
        className={`absolute left-[-65px] top-[-8px] h-[390px] w-[390px] transition-all duration-700 ${
          active ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <svg viewBox="0 0 270 350" className="h-full w-full">
          <path
            d="
                        M20,10
                        L17,30
                        L0,250
                        A50,50 0 0 0 50,300
                        L270,276
                        L270,60
                        L220,16
                        Z
                        "
            fill="#b9ddea"
          />
        </svg>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div
        className={`absolute -right-[35px] -top-[42px] h-[326px] w-[300px] -rotate-[17deg] rounded-[40px_60px_40px_50px] bg-[#add3df] transition-all duration-700 ${
          active ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 95%)",
          maskImage:
            "linear-gradient(to bottom, black 40%, transparent 95%)",
        }}
      />
    );
  }

  return null;
}

const backCardRestStyles: CSSProperties[] = [
  { left: "-45px", top: "-40px", transform: "rotate(17deg)" },
  { left: "-65px", top: "-8px", transform: "rotate(0deg)" },
  { right: "-35px", top: "-42px", transform: "rotate(-17deg)" },
];

const backCardActiveStyles: CSSProperties[] = [
  { left: 0, top: 0, transform: "rotate(0deg)" },
  { left: 0, top: 0, transform: "rotate(0deg)" },
  { right: 0, top: 0, transform: "rotate(0deg)" },
];

const frontCardActiveStyles: CSSProperties[] = [
  { transform: "translate(-45px, -40px) rotate(17deg)" },
  { transform: "translate(-65px, -8px)" },
  { transform: "translate(35px, -42px) rotate(-17deg)" },
];

export default function BundlingPackage() {
  const t = useTranslations("main.package");

  const [activePackage, setActivePackage] = useState<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const whatsappNumber = "6285933486769";

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

  const togglePackage = (index: number) => {
    setActivePackage((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  const handleTogglePointer = (
    event: React.PointerEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    togglePackage(index);
  };

  const handleToggleKey = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      togglePackage(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="bundling"
      className="overflow-hidden bg-[#e9e9e9] px-5 py-20 text-[#252d3c] sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-[1040px]">
        {/* TITLE */}
        <div
          className={`flex flex-col items-center text-center transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <span className="rounded-md bg-[#078fd3] px-5 py-2.5 text-sm font-bold leading-none text-white md:text-base">
            {t("badge")}
          </span>

          <h2 className="mt-3 text-[34px] font-extrabold sm:text-[40px]">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-[#078fd3]">
                  {chunks}
                </span>
              ),
            })}
          </h2>
        </div>

        {/* CARD GRID */}
        <div className="mt-[94px] grid items-end justify-items-center gap-x-[54px] gap-y-14 md:grid-cols-3">
          {packages.map((item, index) => {
            const isActive = activePackage === index;

            return (
              <article
                key={`${item.name}-${index}`}
                className={`relative h-[346px] w-full max-w-[296px] transition-all duration-[1200ms] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                } ${
                  item.highlighted
                    ? "outline outline-[3px] outline-[#078fd3] outline-offset-[14px]"
                    : ""
                }`}
                style={{
                  transitionDelay: `${index * 180}ms`,
                }}
              >
                <BackgroundShape
                  index={index}
                  active={isActive}
                />

                {/* BACK CARD */}
                <div
                  className={`absolute h-[300px] w-full overflow-hidden px-7 py-8 text-center text-[#252d3c] shadow-[8px_11px_12px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out [border-radius:0_46px_0_46px] ${
                    index === 1
                      ? "bg-[#b9ddea]"
                      : "bg-[#add3df]"
                  }`}
                  style={{
                    ...(isActive
                      ? backCardActiveStyles[index]
                      : backCardRestStyles[index]),
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 20 : 0,
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center">
                    <p className="text-[13px] font-extrabold uppercase text-[#078fd3]">
                      {t("descriptionLabel")}
                    </p>

                    <h3 className="mt-4 text-[15px] font-extrabold leading-tight text-[#161616]">
                      {t(`${item.key}.name`)}
                    </h3>

                    <p className="mt-4 text-[13px] font-medium leading-[1.55] text-[#4f4f4f]">
                      {t(`${item.key}.description`)}
                    </p>

                    <button
                      type="button"
                      onPointerDown={(event) =>
                        handleTogglePointer(event, index)
                      }
                      onKeyDown={(event) =>
                        handleToggleKey(event, index)
                      }
                      className="relative z-30 mt-5 touch-manipulation rounded-full bg-[#078fd3] px-5 py-2 text-[11px] font-extrabold text-white transition-all duration-500 hover:scale-[1.04]"
                    >
                      {t("back")}
                    </button>
                  </div>
                </div>

                {/* FRONT CARD */}
                <div
                  className="absolute left-0 top-0 h-full w-full transition-all duration-700 ease-out"
                  style={{
                    ...(isActive
                      ? frontCardActiveStyles[index]
                      : {
                          transform:
                            "translate(0, 0) rotate(0deg)",
                        }),
                    opacity: isActive ? 0.7 : 1,
                    scale: isActive ? 0.95 : 1,
                    zIndex: isActive ? 0 : 10,
                  }}
                >
                  <div
                    className={`bundling-card relative flex h-[300px] flex-col items-center px-5 pb-5 pt-[42px] text-center shadow-[8px_11px_12px_rgba(0,0,0,0.24)] transition-all duration-700 [border-radius:0_46px_0_46px] ${
                      item.inverted
                        ? "bg-[#078fd3] text-white"
                        : "bg-white text-[#4f4f4f]"
                    }`}
                  >
                    <p
                      className={`text-[14px] ${
                        item.inverted
                          ? "text-white"
                          : "text-[#161616]"
                      }`}
                    >
                      {t("cardLabel")}
                    </p>

                    <div
                      className={`mt-4 flex h-[54px] w-full max-w-[224px] items-center justify-center rounded-[0_12px_0_12px] px-4 text-[13px] font-extrabold uppercase transition-all duration-500 ${
                        item.inverted
                          ? "bg-white text-[#078fd3]"
                          : "bg-[#078fd3] text-white"
                      }`}
                    >
                      {t(`${item.key}.name`)}
                    </div>

                    <p
                      className={`mt-4 max-w-[210px] text-[15px] leading-relaxed ${
                        item.inverted
                          ? "text-white"
                          : "text-[#555]"
                      }`}
                    >
                      {t(`${item.key}.shortText`)}
                    </p>

                    <button
                      type="button"
                      onPointerDown={(event) =>
                        handleTogglePointer(event, index)
                      }
                      onKeyDown={(event) =>
                        handleToggleKey(event, index)
                      }
                      aria-expanded={isActive}
                      className={`relative z-30 mt-5 touch-manipulation rounded-full px-5 py-2 text-[10px] font-extrabold transition-all duration-500 hover:scale-[1.04] ${
                        item.inverted
                          ? "bg-white text-[#4f4f4f]"
                          : "bg-[#078fd3] text-white"
                      }`}
                    >
                      {isActive
                        ? t("close")
                        : t("detail")}
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      t("whatsappMessage", {
                        name: t(`${item.key}.name`),
                      })
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute bottom-[30px] left-1/2 flex h-[40px] w-[172px] -translate-x-1/2 items-center justify-center rounded-full text-[12px] font-extrabold shadow-[0_5px_10px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.03] ${
                      item.inverted
                        ? "bg-white text-[#4f4f4f]"
                        : "bg-[#078fd3] text-white"
                    }`}
                  >
                    {t("register")}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>
        {`
                .bundling-card {
                    transition:
                    transform 700ms ease,
                    box-shadow 700ms ease;
                }

                .bundling-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 22px 30px rgba(0,0,0,0.18);
                }

                @keyframes floatingCard {
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

                article {
                    animation: floatingCard 7s ease-in-out infinite;
                }

                article:nth-child(2) {
                    animation-delay: 1.4s;
                }

                article:nth-child(3) {
                    animation-delay: 2.8s;
                }
            `}
      </style>
    </section>
  );
}