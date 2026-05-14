"use client";

import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

type UserDropdownProps = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
};

export default function UserDropdown({
  name,
  role,
  email,
  phone,
}: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const t = useTranslations("main.navbar");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: `/${locale}`,
    });
  };

  return (
    <div
    className="relative z-[99999] overflow-visible"
    ref={dropdownRef}
    >
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2
          rounded-[12px]
          border border-[#078fd3]/15
          bg-[#078fd3]
          px-4 py-2.5
          text-left
          backdrop-blur-md
          transition duration-300
          hover:border-[#078fd3]/40
          hover:bg-[#005C8A]
        "
      >
        <span className="text-sm font-bold text-white">
          {name || "User"}
        </span>

        <svg
          className={`h-4 w-4 text-white transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

            {/* DROPDOWN */}
            {open && (
              <div
                className="
                  absolute
                  top-[calc(100%+12px)]

                  left-0
                  translate-x-[5px]

                  xl:left-[-175px]
                  xl:translate-x-0

                  z-[9999]

                  w-[260px]
                  sm:w-[280px]

                  overflow-hidden
                  rounded-[20px]
                  border border-black/5
                  bg-white
                  shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                "
              >
          {/* HEADER */}
          <div className="border-b border-black/5 px-5 py-5">
            <p className="text-base font-bold text-[#1f2937]">
              {name}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {email || "user@gmail.com"}
            </p>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#078fd3]">
                {t("userDropdown.phone")}
              </p>

              <p className="mt-1 text-sm font-medium text-[#1f2937]">
                {phone || "+62 812-3456-7890"}
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="
                w-full
                rounded-[12px]
                px-4 py-3
                text-left
                text-sm font-semibold
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              {t("userDropdown.logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}