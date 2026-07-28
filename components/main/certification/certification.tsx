import {
  useLocale,
  useTranslations,
} from "next-intl";

import { Link } from "@/lib/i18n/navigation";

import CertificationFilteredGrid from "../../shared/certification/certification-filtered-grid";

import type {
  CertificationDTO,
} from "@/features/main/certification";

type Props = {
  certifications: CertificationDTO[];
};

export default function CertificationProgram({
  certifications,
}: Props) {

  const t =
    useTranslations(
      "main.certification"
    );

  const locale =
    useLocale();

  return (
    <section
      id="certification"
      className="bg-[#e9e9e9] px-6 py-20 text-[#252d3c] sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-[1120px]">

        <div className="flex flex-col items-center text-center">

          <span className="rounded-md bg-[#078fd3] px-5 py-2.5 text-sm font-bold leading-none text-white md:text-base">
            {t("sectionBadge")}
          </span>

          <h2 className="mt-4 text-[34px] font-extrabold leading-none tracking-normal text-[#252d3c] sm:text-[40px]">
            {t("sectionTitle")}{" "}

            <span className="text-[#078fd3]">
              {t(
                "sectionHighlight"
              )}
            </span>
          </h2>

        </div>

        <CertificationFilteredGrid
          certifications={
            certifications
          }
          limit={6}
        />

        <div className="mt-14 flex justify-center">
          <Link
            href={{
              pathname:
                "/certification",
            }}
            locale={locale}
            className="rounded-lg bg-[#078fd3] px-8 py-3 text-[15px] font-extrabold leading-none text-white shadow-[0_8px_14px_rgba(7,143,211,0.22)]"
          >
            {t(
              "viewAllButton"
            )}
          </Link>
        </div>

      </div>
    </section>
  );
}