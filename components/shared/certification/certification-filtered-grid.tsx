"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLocale,
  useTranslations,
} from "next-intl";

import {
  usePathname,
  useRouter,
} from "@/lib/i18n/navigation";

import {
  useSearchParams,
} from "next/navigation";

import type { IconType } from "react-icons";

import {
  FaAward,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";

import {
  FiChevronDown,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

import CertificationCard from "../ui/certification-card";

import type { CertificationDTO } from "@/features/main/certification";

import { getTranslation } from "@/utils/translation";

import type { Locale } from "@/types/multilang";

type CertificationFilteredGridProps = {
  certifications: CertificationDTO[];
  limit?: number;
};

type DropdownOption = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  label: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  icon: IconType;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function FilterDropdown({
  label,
  value,
  placeholder,
  options,
  icon: Icon,
  disabled = false,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] =
    useState(false);

  const selectedLabel =
    options.find(
      (option) =>
        option.value === value
    )?.label || placeholder;

  return (
    <div className="relative w-full max-w-[300px] sm:w-[260px]">
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          setOpen(
            (current) => !current
          )
        }
        onBlur={() => {
          window.setTimeout(
            () => setOpen(false),
            120
          );
        }}
        className="
          flex
          h-[54px]
          w-full
          items-center
          justify-between
          gap-3
          rounded-xl
          bg-[#078fd3]
          px-5
          text-left
          text-white
          shadow-[0_10px_22px_rgba(7,143,211,0.22)]
          transition
          hover:bg-[#067fbb]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <span className="flex min-w-0 items-center gap-3">
          <Icon className="h-4 w-4 shrink-0" />

          <span className="min-w-0">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em]">
              {label}
            </span>

            <span className="mt-1 block truncate text-[13px] font-bold">
              {selectedLabel}
            </span>
          </span>
        </span>

        <FiChevronDown
          className={`h-4 w-4 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && !disabled ? (
        <div
          className="
            absolute
            left-0
            top-[calc(100%+10px)]
            z-40
            w-full
            overflow-hidden
            rounded-xl
            border
            border-black/5
            bg-white
            py-2
            shadow-[0_18px_36px_rgba(0,0,0,0.16)]
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onMouseDown={(event) =>
                event.preventDefault()
              }
              onClick={() => {
                onChange(option.value);

                setOpen(false);
              }}
              className={`
                block
                w-full
                px-4
                py-3
                text-left
                text-[13px]
                font-semibold
                transition
                hover:bg-[#eaf7fd]
                ${
                  value === option.value
                    ? "bg-[#eaf7fd] text-[#078fd3]"
                    : "text-[#555]"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function CertificationFilteredGrid({
  certifications,
  limit,
}: CertificationFilteredGridProps) {

  const t = useTranslations(
    "main.certification"
  );

  const locale =
    useLocale() as Locale;

  const router = useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const isAllCertificationPage =
    pathname ===
    "/certification";

  const hasQueryFilter =
    !!searchParams.get(
      "category"
    ) &&
    !!searchParams.get(
      "sector"
    ) &&
    !!searchParams.get(
      "duration"
    );

  const initialCategory =
    searchParams.get(
      "category"
    ) || "";

  const initialSector =
    searchParams.get(
      "sector"
    ) || "";

  const initialDuration =
    searchParams.get(
      "duration"
    ) || "";

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    initialCategory
  );

  const [
    selectedSector,
    setSelectedSector,
  ] = useState(
    initialSector
  );

  const [
    selectedDuration,
    setSelectedDuration,
  ] = useState(
    initialDuration
  );

  useEffect(() => {

    const category =
      searchParams.get(
        "category"
      ) || "";

    const sector =
      searchParams.get(
        "sector"
      ) || "";

    const duration =
      searchParams.get(
        "duration"
      ) || "";

    setSelectedCategory(
      category
    );

    setSelectedSector(
      sector
    );

    setSelectedDuration(
      duration
    );

  }, [searchParams]);

  /*
   |--------------------------------------------------------------------------
   | CATEGORY OPTIONS
   |--------------------------------------------------------------------------
   */

  const categoryOptions =
    useMemo(() => {
      return certifications.reduce(
        (acc, certification) => {

          const exists =
            acc.find(
              (item) =>
                item.value ===
                certification.category.id
            );

          if (!exists) {
            acc.push({
              value:
                certification.category.id,

              label:
                getTranslation(
                  certification
                    .category.name,
                  locale
                ),
            });
          }

          return acc;

        },
        [] as DropdownOption[]
      );
    }, [certifications, locale]);

  /*
   |--------------------------------------------------------------------------
   | CATEGORY FILTERED
   |--------------------------------------------------------------------------
   */

  const categoryFiltered =
    useMemo(() => {

      if (!selectedCategory)
        return [];

      return certifications.filter(
        (certification) =>
          certification.category.id ===
          selectedCategory
      );

    }, [
      certifications,
      selectedCategory,
    ]);

  /*
   |--------------------------------------------------------------------------
   | SECTOR OPTIONS
   |--------------------------------------------------------------------------
   */

  const sectorOptions =
    useMemo(() => {

      return categoryFiltered.reduce(
        (acc, certification) => {

          const sector =
            getTranslation(
              certification.sector,
              locale
            );

          const exists =
            acc.find(
              (item) =>
                item.value === sector
            );

          if (!exists && sector) {
            acc.push({
              value: sector,
              label: sector,
            });
          }

          return acc;

        },
        [] as DropdownOption[]
      );

    }, [
      categoryFiltered,
      locale,
    ]);

  /*
   |--------------------------------------------------------------------------
   | SECTOR FILTERED
   |--------------------------------------------------------------------------
   */

  const sectorFiltered =
    useMemo(() => {

      if (!selectedSector)
        return [];

      return categoryFiltered.filter(
        (certification) =>
          getTranslation(
            certification.sector,
            locale
          ) === selectedSector
      );

    }, [
      categoryFiltered,
      selectedSector,
      locale,
    ]);

  /*
   |--------------------------------------------------------------------------
   | DURATION OPTIONS
   |--------------------------------------------------------------------------
   */

  const durationOptions =
    useMemo(() => {

      return sectorFiltered.reduce(
        (acc, certification) => {

          const duration =
            getTranslation(
              certification.duration,
              locale
            );

          const exists =
            acc.find(
              (item) =>
                item.value === duration
            );

          if (!exists && duration) {
            acc.push({
              value: duration,
              label: duration,
            });
          }

          return acc;

        },
        [] as DropdownOption[]
      );

    }, [
      sectorFiltered,
      locale,
    ]);

  /*
   |--------------------------------------------------------------------------
   | FILTERED DATA
   |--------------------------------------------------------------------------
   */

  const filteredData =
    useMemo(() => {

      if (
        !selectedCategory ||
        !selectedSector ||
        !selectedDuration
      ) {

        return typeof limit ===
          "number"
          ? certifications.slice(
              0,
              limit
            )
          : certifications;
      }

      const result =
        certifications.filter(
          (certification) =>
            certification.category.id ===
              selectedCategory &&
            getTranslation(
              certification.sector,
              locale
            ) ===
              selectedSector &&
            getTranslation(
              certification.duration,
              locale
            ) ===
              selectedDuration
        );

      return typeof limit ===
        "number"
        ? result.slice(0, limit)
        : result;

    }, [
      certifications,
      selectedCategory,
      selectedSector,
      selectedDuration,
      locale,
      limit,
    ]);

  /*
   |--------------------------------------------------------------------------
   | HANDLE FIND
   |--------------------------------------------------------------------------
   */

  const handleFind = () => {

    const params =
      new URLSearchParams();

    params.set(
      "category",
      selectedCategory
    );

    params.set(
      "sector",
      selectedSector
    );

    params.set(
      "duration",
      selectedDuration
    );

    router.push({
      pathname: "/certification",
      query: {
        category:
          selectedCategory,
        sector:
          selectedSector,
        duration:
          selectedDuration,
      },
    });
  };

  /*
   |--------------------------------------------------------------------------
   | HANDLE RESET
   |--------------------------------------------------------------------------
   */

  const handleReset = () => {
    router.push({
      pathname: "/certification",
    });
  };

  const hasFilter =
    selectedCategory &&
    selectedSector &&
    selectedDuration;

  return (
    <>
      <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">

        <FilterDropdown
          label={t(
            "filters.category"
          )}
          value={selectedCategory}
          placeholder={t(
            "filters.allCategories"
          )}
          options={categoryOptions}
          icon={FaAward}
          onChange={(value) => {

            setSelectedCategory(
              value
            );

            setSelectedSector("");

            setSelectedDuration(
              ""
            );
          }}
        />

        <FilterDropdown
          label={t(
            "filters.sector"
          )}
          value={selectedSector}
          placeholder={t(
            "filters.allSectors"
          )}
          options={sectorOptions}
          icon={FaLayerGroup}
          disabled={
            !selectedCategory
          }
          onChange={(value) => {

            setSelectedSector(
              value
            );

            setSelectedDuration(
              ""
            );
          }}
        />

        <FilterDropdown
          label={t(
            "filters.duration"
          )}
          value={selectedDuration}
          placeholder={t(
            "filters.allDurations"
          )}
          options={durationOptions}
          icon={FaBriefcase}
          disabled={
            !selectedSector
          }
          onChange={
            setSelectedDuration
          }
        />

        {(!isAllCertificationPage ||
          !hasQueryFilter) && (
          <button
            type="button"
            disabled={!hasFilter}
            onClick={handleFind}
            className="
              flex
              h-[54px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#078fd3]
              px-6
              text-[14px]
              font-extrabold
              text-white
              shadow-[0_10px_22px_rgba(7,143,211,0.22)]
              transition
              hover:bg-[#067fbb]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FiSearch className="h-4 w-4" />

            {t("filters.find")}
          </button>
        )}

        {isAllCertificationPage &&
          hasQueryFilter && (
            <button
              type="button"
              onClick={handleReset}
              className="
                flex
                h-[54px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border-2
                border-[#078fd3]
                bg-white
                px-6
                text-[14px]
                font-extrabold
                text-[#078fd3]
                transition
                hover:bg-[#eaf7fd]
              "
            >
              <FiRefreshCw className="h-4 w-4" />

              {t("filters.reset")}
            </button>
        )}

      </div>

      <div className="mt-[72px] grid gap-x-[78px] gap-y-[64px] sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map(
          (certification) => (
            <CertificationCard
              key={
                certification.id
              }
              certification={
                certification
              }
            />
          )
        )}
      </div>

      {filteredData.length ===
      0 ? (
        <p className="mt-12 text-center text-[15px] font-semibold text-[#747474]">
          {t("filters.empty")}
        </p>
      ) : null}
    </>
  );
}