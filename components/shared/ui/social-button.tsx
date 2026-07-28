"use client"

import { IoLogoGoogle } from "react-icons/io5";

import { signIn } from "next-auth/react";

import {
  useLocale,
  useTranslations,
} from "next-intl";

export const GoogleButton = () => {

    const locale =
        useLocale();

    const t =
        useTranslations(
            "auth.login"
        );

    return (
        <button
            type="button"
            onClick={() =>
                signIn(
                    "google",
                    {
                        callbackUrl:
                            `/${locale}`,
                    }
                )
            }
            className="
                flex items-center justify-center gap-1 
                py-2.5 rounded-full uppercase 
                text-[#008FCC] font-medium text-sm 
                bg-white w-full hover:bg-[#FFF19B]
            "
        >
            <IoLogoGoogle />

            {t("button.google")}
        </button>
    )
}