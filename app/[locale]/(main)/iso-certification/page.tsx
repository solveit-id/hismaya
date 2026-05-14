import {
  getTranslations,
} from "next-intl/server";

import CertificationCard
  from "@/components/shared/ui/certification-card";

import {
  getCertifications,
} from "@/features/main/certification";

export default async function CertificationIsoPage() {

  const t =
    await getTranslations(
      "main.certification.page"
    );

  const certifications =
    await getCertifications();

  /*
   |--------------------------------------------------------------------------
   | FILTER ISO CATEGORY
   |--------------------------------------------------------------------------
   */

  const isoCertifications =
    certifications.filter(
      (certification) => {

        const categoryId =
          certification.category.name.id?.toLowerCase() ||
          "";

        const categoryEn =
          certification.category.name.en?.toLowerCase() ||
          "";

        return (
          categoryId.includes(
            "iso"
          ) ||
          categoryEn.includes(
            "iso"
          )
        );
      }
    );

  return (
    <div className="bg-[#e9e9e9] text-[#252d3c]">

      <main className="px-6 py-20 sm:px-10 lg:px-20">

        <section className="mx-auto max-w-[1120px]">

          <div className="flex flex-col items-center text-center">

            <span className="rounded-md bg-[#078fd3] px-4 py-2 text-sm font-extrabold text-white">
              {t("badgeIso")}
            </span>

            <h1 className="mt-4 text-[34px] font-extrabold sm:text-[42px]">

              {t.rich("titleIso", {
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

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">

            {isoCertifications.map(
              (
                certification
              ) => (
                <CertificationCard
                  key={
                    certification.id
                  }
                  certification={
                    certification
                  }
                />
              ),
            )}

          </div>

          {isoCertifications.length ===
          0 ? (
            <p className="mt-14 text-center text-[15px] font-semibold text-[#747474]">
              {t(
                "emptyIso"
              )}
            </p>
          ) : null}

        </section>
      </main>
    </div>
  );
}