"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [language, setLanguage] = useState("ID");

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const languages = [
    {
      code: "ID",
      label: "Indonesia",
      flag: "/img/id.png",
    },
    {
      code: "EN",
      label: "English",
      flag: "/img/gb.png",
    },
  ];

  const activeLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      // klik di dropdown
      if (dropdownRef.current?.contains(target)) return;

      // klik di button trigger
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
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }
            `}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {languages.map((lang) => {
              const active = lang.code === language;

              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
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