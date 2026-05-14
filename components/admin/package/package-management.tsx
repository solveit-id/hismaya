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
  FiEdit,
  FiLoader,
  FiX,
} from "react-icons/fi"

import { toast } from "sonner"

import {
  updatePackage,
} from "@/features/admin/package"

import type {
  PackageItem,
  PackageFormState,
} from "@/features/admin/package"

import type {
  Locale,
} from "@/types/multilang"

import {
  getTranslation,
} from "@/utils/translation"

type Props = {
  packages?: PackageItem[]
}

export default function PackageManagement({
  packages = [],
}: Props) {

  const t = useTranslations(
    "admin.package"
  )

  const locale =
    useLocale() as Locale

  const [open, setOpen] =
    useState(false)

  const [selected, setSelected] =
    useState<PackageItem | null>(
      null
    )

  const [
    isPending,
    startTransition,
  ] = useTransition()

  const initialFormState:
    PackageFormState = {

    title: {
      id: "",
      en: "",
    },

    subtitle: {
      id: "",
      en: "",
    },

    short_desc: {
      id: "",
      en: "",
    },

    long_desc: {
      id: "",
      en: "",
    },
  }

  const [form, setForm] =
    useState(initialFormState)

  const handleOpenEdit = (
    item: PackageItem
  ) => {

    setSelected(item)

    setForm({
      title: item.title,

      subtitle:
        item.subtitle || {
          id: "",
          en: "",
        },

      short_desc:
        item.short_desc || {
          id: "",
          en: "",
        },

      long_desc:
        item.long_desc || {
          id: "",
          en: "",
        },
    })

    setOpen(true)
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault()

    if (!selected) return

    const formData =
      new FormData()

    formData.append(
      "title_id",
      form.title.id
    )

    formData.append(
      "title_en",
      form.title.en
    )

    formData.append(
      "subtitle_id",
      form.subtitle.id
    )

    formData.append(
      "subtitle_en",
      form.subtitle.en
    )

    formData.append(
      "short_desc_id",
      form.short_desc.id
    )

    formData.append(
      "short_desc_en",
      form.short_desc.en
    )

    formData.append(
      "long_desc_id",
      form.long_desc.id
    )

    formData.append(
      "long_desc_en",
      form.long_desc.en
    )

    setOpen(false)

    startTransition(async () => {

      const result =
        await updatePackage(
          selected.id,
          formData
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
    <>
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              {t("list.title")}
            </h2>

            <p className="text-sm text-gray-500">
              {t(
                "list.subtitle",
                {
                  count:
                    packages.length,
                }
              )}
            </p>

          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-left">

              <tr>

                <th className="px-6 py-3">
                  {t("table.no")}
                </th>

                <th className="px-6 py-3">
                  {t("table.title")}
                </th>

                <th className="px-6 py-3">
                  {t("table.subtitle")}
                </th>

                <th className="px-6 py-3">
                  {t("table.shortDesc")}
                </th>

                <th className="px-6 py-3">
                  {t("table.longDesc")}
                </th>

                <th className="px-6 py-3">
                  {t("table.actions")}
                </th>

              </tr>
            </thead>

            <tbody>

              {packages.map((
                item,
                index
              ) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-700">
                    {getTranslation(
                      item.title,
                      locale
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {getTranslation(
                      item.subtitle,
                      locale
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-sm">

                    <p className="line-clamp-2">
                      {getTranslation(
                        item.short_desc,
                        locale
                      )}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-md">

                    <p className="line-clamp-3 leading-relaxed">
                      {getTranslation(
                        item.long_desc,
                        locale
                      )}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        handleOpenEdit(
                          item
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1.5 text-xs border border-yellow-400 text-yellow-600 rounded-md hover:bg-yellow-50"
                    >
                      <FiEdit size={14} />

                      {t(
                        "buttons.edit"
                      )}
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">

            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {t(
                    "modal.editTitle"
                  )}
                </h2>

                <p className="text-xs text-gray-500">
                  {t(
                    "modal.editSubtitle"
                  )}
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FiX size={18} />
              </button>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="px-6 py-5 space-y-4 overflow-y-auto"
            >

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.titleId"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.title.id
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: {
                          ...form.title,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.titleEn"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.title.en
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: {
                          ...form.title,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.subtitleId"
                    )}
                  </label>

                  <textarea
                    rows={3}
                    value={
                      form.subtitle.id
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subtitle: {
                          ...form.subtitle,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.subtitleEn"
                    )}
                  </label>

                  <textarea
                    rows={3}
                    value={
                      form.subtitle.en
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subtitle: {
                          ...form.subtitle,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.shortDescId"
                    )}
                  </label>

                  <textarea
                    rows={5}
                    value={
                      form.short_desc.id
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        short_desc: {
                          ...form.short_desc,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.shortDescEn"
                    )}
                  </label>

                  <textarea
                    rows={5}
                    value={
                      form.short_desc.en
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        short_desc: {
                          ...form.short_desc,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.longDescId"
                    )}
                  </label>

                  <textarea
                    rows={8}
                    value={
                      form.long_desc.id
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        long_desc: {
                          ...form.long_desc,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.longDescEn"
                    )}
                  </label>

                  <textarea
                    rows={8}
                    value={
                      form.long_desc.en
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        long_desc: {
                          ...form.long_desc,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  {t(
                    "buttons.cancel"
                  )}
                </button>

                <button
                  type="submit"
                  disabled={
                    isPending
                  }
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >

                  {isPending && (
                    <FiLoader className="animate-spin" />
                  )}

                  {t(
                    "buttons.update"
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}