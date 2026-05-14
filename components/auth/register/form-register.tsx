"use client"

import { useTransition, useEffect, useState } from "react";
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";
import { Link } from "@/lib/i18n/navigation"
import { signUpCredentials } from "@/features/auth/action";
import { RegisterButton } from '@/components/shared/ui/button';
import { toast } from "sonner";
import {
  useTranslations,
  useLocale,
} from "next-intl";
import type { AuthState } from "@/features/auth";

const formRegister = () => {
  const [state, formAction] = useFormState<AuthState, FormData>(
    signUpCredentials,
    {}
  );
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations("auth.register");
  const locale = useLocale();

  useEffect(() => {

    if (
        state?.toastType ===
        "already_exists"
    ) {

        toast.error(
        t(
            "toast.alreadyExistsTitle"
        ),
        {
            description: t(
            "toast.alreadyExistsDescription"
            ),
        }
        );
    }

    if (
        state?.toastType ===
        "password_mismatch"
    ) {

        toast.error(
        t(
            "toast.passwordMismatchTitle"
        ),
        {
            description: t(
            "toast.passwordMismatchDescription"
            ),
        }
        );
    }

    if (
        state?.toastType ===
        "failed"
    ) {

        toast.error(
        t(
            "toast.failedTitle"
        ),
        {
            description: t(
            "toast.failedDescription"
            ),
        }
        );
    }

    if (
        state?.success &&
        state?.redirectTo
    ) {

        toast.success(
        t("toast.successTitle"),
        {
            description: t(
            "toast.successDescription"
            ),
        }
        );

        setTimeout(() => {
            router.push(
                state.redirectTo!
            );
        }, 1200);
    }

    }, [state, router, t]);
  
  return (
    <div>
      <form
        action={(formData) =>
            startTransition(() => formAction(formData))
        }
        className='space-y-6'
      >
        {state?.message ? (
            <div className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100' role='alert'>
                <span className='font-medium'>{state?.message}</span>
            </div>
        ): null}
        <div>
            <label htmlFor="name" className='block mb-2 text-sm font-medium text-white'>{t("form.nameLabel")}</label>
            <input type="text" name="name" placeholder={t("form.namePlaceholder")} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.name}</span>
            </div>
        </div>
        <div>
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-white'>{t("form.emailLabel")}</label>
            <input type="email" name="email" placeholder={t("form.emailPlaceholder")} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.email}</span>
            </div>
        </div>
        <div>
            <label htmlFor="phone" className='block mb-2 text-sm font-medium text-white'>{t("form.phoneLabel")}</label>
            <input type="text" name="phone" placeholder={t("form.phonePlaceholder")} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.phone}</span>
            </div>
        </div>
        <div className="relative">
            <label htmlFor="password" className='block mb-2 text-sm font-medium text-white'>{t("form.passwordLabel")}</label>
            <input type={showPassword ? "text" : "password"} name="password" placeholder={t("form.passwordPlaceholder")} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute right-3 top-[38px]"> {showPassword ? "🙈" : "👁️"}</button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
            </div>
        </div>
        <div className="relative">
            <label htmlFor="ConfirmPassword" className='block mb-2 text-sm font-medium text-white'>{t("form.confirmPasswordLabel")}</label>
            <input type={showConfirmPassword ? "text": "password"} name="ConfirmPassword" placeholder={t("form.confirmPasswordPlaceholder")} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type="button" onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px]">{showConfirmPassword ?"🙈" : "👁️"} </button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.ConfirmPassword}</span>
            </div>
        </div>
        <RegisterButton />
        <p className='text-sm font-light text-white'>{t("form.loginText")}
            <Link
                href="/login"
                locale={locale}
            >
                <span className='font-medium pl-1 text-[#FFF19B] hover:text-[#FAB95B]'>{t("form.loginLink")}</span>
            </Link>
        </p>
      </form>
    </div>
  )
}

export default formRegister
