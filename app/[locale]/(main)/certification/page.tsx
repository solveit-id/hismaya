import { getTranslations } from "next-intl/server";

import CertificationFilteredGrid from "@/components/shared/certification/certification-filtered-grid";

import {
  getCertifications,
} from "@/features/main/certification";

export default async function CertificationsPage() {

  const t =
    await getTranslations(
      "main.certification.page"
    );

  const certifications =
    await getCertifications();

  return (
    <div className="bg-[#e9e9e9] text-[#252d3c]">
      <main className="px-6 py-20 sm:px-10 lg:px-20">
        <section className="mx-auto max-w-[1120px]">

          <div className="flex flex-col items-center text-center">
            <span className="rounded-md bg-[#078fd3] px-4 py-2 text-sm font-extrabold text-white">
              {t("badge")}
            </span>

            <h1 className="mt-4 text-[34px] font-extrabold sm:text-[42px]">
              {t.rich("title", {
                highlight: (
                  chunks
                ) => (
                  <span className="text-[#078fd3]">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </div>

          <CertificationFilteredGrid
            certifications={
              certifications
            }
          />

        </section>
      </main>
    </div>
  );
}