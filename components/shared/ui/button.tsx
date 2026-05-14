"use client"

import { useFormStatus } from "react-dom";

import { useTranslations } from "next-intl";

export const LoginButton = () => {

    const { pending } =
        useFormStatus();

    const t =
        useTranslations(
            "auth.login"
        );

    return (
        <button
            type="submit"
            disabled={pending}
            className='w-full text-[#008FCC] bg-white font-medium rounded-[15px] px-5 py-2.5 text-center uppercase hover:bg-[#FFF19B]'
        >
            {pending
                ? t("button.loading")
                : t("button.submit")}
        </button>
    )
}

export const RegisterButton = () => {

    const { pending } =
        useFormStatus();

    const t =
        useTranslations(
            "auth.register"
        );

    return (
        <button
            type="submit"
            disabled={pending}
            className='w-full text-[#008FCC] bg-white font-medium rounded-[15px] px-5 py-2.5 text-center uppercase hover:bg-[#FFF19B]'
        >
            {pending
                ? t("button.loading")
                : t("button.submit")}
        </button>
    )
}