"use client"

import {
  useState,
  useTransition,
} from "react"

import {
  useTranslations,
  useLocale,
} from "next-intl"

import {
  FiSearch,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi"

import { toast } from "sonner"

import {
  toggleTestimonialStatus,
} from "@/features/admin/testimonial"

import type {
  TestimonialItem,
} from "@/features/admin/testimonial"

import type {
  Locale,
} from "@/types/multilang"

import {
  getTranslation,
} from "@/utils/translation"

type Props = {
  testimonials?: TestimonialItem[]
}

export default function TestimonialManagement({
  testimonials = [],
}: Props) {

  // =========================
  // TRANSLATION
  // =========================
  const t = useTranslations(
    "admin.testimonial"
  )

  const locale =
    useLocale() as Locale

  // =========================
  // STATE
  // =========================
  const [search, setSearch] =
    useState("")

  const [isPending, startTransition] =
    useTransition()

  // =========================
  // FILTER
  // =========================
  const filtered =
    testimonials.filter((item) => {

      const testimonial =
        getTranslation(
          item.testimonial,
          locale
        )

      const keyword =
        search.toLowerCase()

      return (
        item.user.name
          ?.toLowerCase()
          .includes(keyword) ||

        item.user.email
          .toLowerCase()
          .includes(keyword) ||

        testimonial
          .toLowerCase()
          .includes(keyword)
      )
    })

  // =========================
  // TOGGLE STATUS
  // =========================
  const handleToggleStatus = async (
    item: TestimonialItem
  ) => {

    startTransition(async () => {

      const result =
        await toggleTestimonialStatus(
          item.id,
          item.status
        )

      if (!result?.success) {

        toast.error(
          t("toast.updateFailed")
        )

        return
      }

      toast.success(
        t("toast.updateSuccess")
      )
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b bg-gray-50">

        <div>

          <h2 className="text-lg font-semibold text-gray-800">
            {t("list.title")}
          </h2>

          <p className="text-sm text-gray-500">
            {t(
              "list.subtitle",
              {
                count:
                  testimonials.length,
              }
            )}
          </p>

        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-72">

          <input
            type="text"
            placeholder={t(
              "search.placeholder"
            )}
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <FiSearch
            size={16}
            className="absolute left-3 top-2.5 text-gray-400"
          />

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>

              <th className="px-6 py-3">
                {t("table.no")}
              </th>

              <th className="px-6 py-3">
                {t("table.user")}
              </th>

              <th className="px-6 py-3">
                {t(
                  "table.testimonial"
                )}
              </th>

              <th className="px-6 py-3">
                {t("table.status")}
              </th>

              <th className="px-6 py-3">
                {t("table.actions")}
              </th>

            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-400"
                >
                  {t(
                    "empty.title"
                  )}
                </td>
              </tr>

            ) : (

              filtered.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* NO */}
                    <td className="px-6 py-4 text-gray-500">
                      {index + 1}
                    </td>

                    {/* USER */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">

                          {item.user.name
                            ?.charAt(0)
                            .toUpperCase() ||
                            "U"}

                        </div>

                        <div className="flex flex-col">

                          <span className="font-medium text-gray-800">
                            {item.user.name ||
                              "-"}
                          </span>

                          <span className="text-xs text-gray-400">
                            {item.user.email}
                          </span>

                          <span className="text-xs text-gray-400">

                            {new Date(
                              item.createdAt
                            ).toLocaleString(
                              locale === "id"
                                ? "id-ID"
                                : "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}

                          </span>

                        </div>

                      </div>

                    </td>

                    {/* TESTIMONIAL */}
                    <td className="px-6 py-4 text-gray-500 max-w-md">

                      <p className="line-clamp-2">

                        "
                        {getTranslation(
                          item.testimonial,
                          locale
                        )}
                        "

                      </p>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status ===
                          "VISIBLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >

                        {item.status}

                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          handleToggleStatus(
                            item
                          )
                        }
                        disabled={
                          isPending
                        }
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs border rounded-md transition ${
                          item.status ===
                          "VISIBLE"
                            ? "border-green-400 text-green-600 hover:bg-green-50"
                            : "border-gray-300 text-gray-500 hover:bg-gray-100"
                        }`}
                      >

                        {isPending ? (
                          <FiLoader className="animate-spin" />
                        ) : item.status ===
                          "VISIBLE" ? (
                          <FiEye />
                        ) : (
                          <FiEyeOff />
                        )}

                        {item.status ===
                        "VISIBLE"
                          ? t(
                              "buttons.visible"
                            )
                          : t(
                              "buttons.hidden"
                            )}

                      </button>

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-3 text-sm text-gray-500 border-t bg-gray-50">

        {t(
          "footer.showing",
          {
            count:
              filtered.length,
          }
        )}

      </div>

    </div>
  )
}