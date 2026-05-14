import FormLogin from "@/components/auth/login/form-login";

import { GoogleButton } from "@/components/shared/ui/social-button";

import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {

  const t =
    await getTranslations(
      "auth.login"
    );

  return {
    title:
      t("page.metadata.title"),
  };
}

const Login = async () => {

  const t =
    await getTranslations(
      "auth.login"
    );

  return (
    <div className='p-6 space-y-4 bg-[#008FCC] rounded-tl-[50px] rounded-br-[50px]'>

      <h1 className='text-2xl text-center font-semibold text-white'>
        {t("page.title")}
      </h1>

      <p className="text-center text-white">
        {t("page.subtitle")}
      </p>

      <FormLogin />

      <div
        className="
          my-4 flex items-center 
          before:flex-1 before:border-t before:border-gray-300 
          after:flex-1 after:border-t after:border-gray-300
        "
      >
        <p className="mx-4 mb-0 text-center font-semibold text-white">
          {t("page.or")}
        </p>
      </div>

      <GoogleButton />

    </div>
  );
};

export default Login;