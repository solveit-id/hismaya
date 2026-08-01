"use client";

import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const t = useTranslations("main.footer");

  const currentYear = new Date().getFullYear();

  const phoneNumber = "6285933486769";
  const emailAddress = "hismayacahayarahayu@gmail.com";

  const socialLinks = [
    {
      label: t("social.whatsapp"),
      icon: FaWhatsapp,
      href: `https://wa.me/${phoneNumber}`,
    },
    {
      label: t("social.email"),
      icon: FaEnvelope,
      href: `mailto:${emailAddress}?subject=${encodeURIComponent(
        t("social.emailSubject"),
      )}&body=${encodeURIComponent(t("social.emailBody"))}`,
    },
    {
      label: t("social.instagram"),
      icon: FaInstagram,
      href: "https://www.instagram.com/hismayacahayarahayu/",
    },
  ];

  return (
    <footer className="bg-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1280px] border-y border-[#dfe3ea] bg-white px-6 py-10 sm:px-8 lg:px-12">
        {/* KONTEN UTAMA */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1.15fr_1fr_0.75fr] lg:gap-14">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/img/hismayaaaa.png"
                alt="Logo Hismaya"
                width={30}
                height={30}
                className="h-7 w-7 object-contain"
              />

              <h2 className="text-[18px] font-semibold text-[#111827]">
                {t("brand.name")}{" "}
                <span className="text-[#2457ff]">{t("brand.highlight")}</span>
              </h2>
            </div>

            <p className="mt-5 max-w-[330px] text-[14px] leading-[1.65] text-[#5f6b7a]">
              {t("brand.description")}
            </p>
          </div>

          <div>
            <h3 className="text-[16px] font-medium text-[#2457ff]">
              {t("address.title")}
            </h3>

            <address className="mt-3 not-italic text-[14px] leading-6 text-[#667085]">
              {t("address.line1")}
              <br />
              {t("address.line2")}
              <br />
              {t("address.line3")}
            </address>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-[16px] font-medium text-[#2457ff]">
              {t("contact.title")}
            </h3>

            <div className="mt-3 space-y-1 text-[14px] leading-6 text-[#667085]">
              <Link
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#2457ff]"
              >
                {t("contact.phone")}
              </Link>

              <Link
                href={`mailto:${emailAddress}`}
                className="block break-words transition-colors hover:text-[#2457ff]"
              >
                {t("contact.email")}
              </Link>
            </div>
          </div>

          {/* JAM OPERASIONAL */}
          <div>
            <h3 className="text-[16px] font-medium text-[#2457ff]">
              {t("hours.title")}
            </h3>

            <div className="mt-3 text-[14px] leading-6 text-[#667085]">
              <p>{t("hours.weekdays")}</p>
              <p>{t("hours.weekdayTime")}</p>

              <p className="mt-1">{t("hours.saturday")}</p>
              <p>{t("hours.saturdayTime")}</p>
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="text-[13px] text-[#667085]">
            <span className="font-medium text-[#2457ff]">
              {t("bottom.brand", { year: currentYear })}
            </span>
            {", "}
            {t("bottom.copyright")}
          </p>

          {/* MEDIA SOSIAL */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-[18px] text-[#536071] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2457ff]"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
