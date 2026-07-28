"use client"

import { useFormState } from 'react-dom';
import { Link } from "@/lib/i18n/navigation"
import { signInCredentials } from '@/features/auth/action';
import { LoginButton } from '@/components/shared/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useTranslations,
  useLocale,
} from "next-intl";
import type { AuthState } from "@/features/auth";

const formLogin = () => {
  const [state, formAction] = useFormState<AuthState, FormData>(
    signInCredentials,
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth.login");
  const locale = useLocale();

  useEffect(() => {

    if (
        state?.toastType ===
        "invalid_credentials"
    ) {

        toast.error(
        t(
            "toast.invalidCredentialsTitle"
        ),
        {
            description: t(
            "toast.invalidCredentialsDescription"
            ),
        }
        );
    }

    if (
        state?.toastType ===
        "something_wrong"
    ) {

        toast.error(
        t(
            "toast.somethingWrongTitle"
        ),
        {
            description: t(
            "toast.somethingWrongDescription"
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
      <form action={formAction} className='space-y-6'>
        {state?.message ? (
            <div className='w-full h-screen p-4 mb-4 text-sm text-red-800 rounded-100px bg-red-100' role='alert'>
                <span className='font-medium'>{state?.message}</span>
            </div>
        ): null}
        <div>
            <label htmlFor="login" className='block mb-2 text-sm font-semibold text-white'>{t("form.loginLabel")}</label>
            <input type="text" name="login" placeholder={t("form.loginPlaceholder")} className='bg-white border border-white text-gray-900 rounded-[15px] w-full p-2.5 justify-center' />
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.login}</span>
            </div>
        </div>
        <div className='relative'>
            <label htmlFor="password" className='block mb-2 text-sm font-semibold text-white'>{t("form.passwordLabel")}</label>
            <input type={showPassword ? "text":"password"} name="password" placeholder={t("form.passwordPlaceholder")} className='bg-white border border-white text-gray-900 rounded-[15px] w-full p-2.5' />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-[38px]'>{showPassword ? "🙈" : "👁️"}</button>
            <div aria-live='polite' aria-atomic='true'>
                <span className='text-sm text-red-500 mt-2'>{state?.error?.password}</span>
            </div>
        </div>
        <LoginButton />
        <p className='text-sm font-semibold text-white'>{t("form.registerText")}
            <Link
                href="/register"
                locale={locale}
            >
                <span className='font-semibold pl-1 text-[#FFF19B] hover:text-[#FAB95B]'>{t("form.registerLink")}</span>
            </Link>
        </p>
      </form>
    </div>
  ) 
}

export default formLogin
