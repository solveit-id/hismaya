"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  usePathname,
  useRouter,
} from "@/lib/i18n/navigation";

import { useLocale } from "next-intl";

import { createPortal } from "react-dom";

export default function LanguageDropdown() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [position, setPosition] = useState<{
    top: number,
    left: number
  } | null>(null);

  const languages = [
    {
      code: "id",
      label: "Indonesia",
      flag: "/img/id.png",
    },
    {
      code: "en",
      label: "English",
      flag: "/img/gb.png",
    },
  ];

  const activeLanguage =
    languages.find((lang) => lang.code === locale) ||
    languages[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (dropdownRef.current?.contains(target)) return;

      if (buttonRef.current?.contains(target)) return;

      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 10,
        left: rect.left,
      });
    }
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="
          flex h-[40px] items-center gap-2
          rounded-[10px]
          px-3 transition hover:bg-white/40
        "
      >
        <Image
          src={activeLanguage.flag}
          alt={activeLanguage.label}
          width={28}
          height={20}
          className="h-5 w-7 object-cover"
        />

        <svg
          className={`
            block shrink-0
            h-4 w-4
            text-[#078fd3]
            transition duration-300
            ${open ? "rotate-180" : ""}
          `}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {mounted &&
        position &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`
              fixed z-[999999]
              overflow-hidden
              rounded-[16px]
              bg-white
              shadow-[0_12px_40px_rgba(0,0,0,0.12)]
              transition-all duration-200
              w-[180px]

              ${
                open
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }
            `}
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {languages.map((lang) => {
              const active = lang.code === locale;

              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    router.replace(pathname, {
                      locale: lang.code,
                    });

                    router.refresh();
                    setOpen(false);
                  }}
                  className={`
                    flex w-full items-center gap-3
                    px-4 py-3 text-left
                    text-sm font-semibold transition

                    ${
                      active
                        ? "bg-[#f8f8f8] text-[#2563eb]"
                        : "text-[#444] hover:bg-[#f5f5f5]"
                    }
                  `}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    width={28}
                    height={20}
                    className="h-5 w-7 object-cover"
                  />

                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}