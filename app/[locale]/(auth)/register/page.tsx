import FormRegister from "@/components/auth/register/form-register";

import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {

  const t =
    await getTranslations(
      "auth.register"
    );

  return {
    title:
      t("page.metadata.title"),
  };
}

const Register = async () => {

  const t =
    await getTranslations(
      "auth.register"
    );

  return (
    <div className='p-6 space-y-4 bg-[#008FCC] rounded-tl-[50px] rounded-br-[50px]'>

      <h1 className='text-2xl font-bold text-white text-center'>
        {t("page.title")}
      </h1>

      <p className="text-center text-white font-semibold">
        {t("page.subtitle")}
      </p>

      <FormRegister />

    </div>
  );
};

export default Register;