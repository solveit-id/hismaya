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
  updateService,
} from "@/features/admin/service"

import type {
  ServiceItem,
  ServiceFormState,
} from "@/features/admin/service"

import type {
  Locale,
} from "@/types/multilang"

import {
  getTranslation,
} from "@/utils/translation"

type Props = {
  services?: ServiceItem[]
}

export default function ServiceManagement({
  services = [],
}: Props) {

  const t = useTranslations(
    "admin.service"
  )

  const locale =
    useLocale() as Locale

  const [open, setOpen] =
    useState(false)

  const [selected, setSelected] =
    useState<ServiceItem | null>(
      null
    )

  const [
    isPending,
    startTransition,
  ] = useTransition()

  const initialFormState:
    ServiceFormState = {

    part: {
      id: "",
      en: "",
    },

    desc: {
      id: "",
      en: "",
    },

    img: null,
  }

  const [form, setForm] =
    useState(initialFormState)

  const handleOpenEdit = (
    item: ServiceItem
  ) => {

    setSelected(item)

    setForm({
      part: item.part,

      desc:
        item.desc || {
          id: "",
          en: "",
        },

      img: item.img || null,
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
      "part_id",
      form.part.id
    )

    formData.append(
      "part_en",
      form.part.en
    )

    formData.append(
      "desc_id",
      form.desc.id
    )

    formData.append(
      "desc_en",
      form.desc.en
    )

    if (
      form.img instanceof File
    ) {
      formData.append(
        "img",
        form.img
      )
    }

    setOpen(false)

    startTransition(async () => {

      const result =
        await updateService(
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
                    services.length,
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
                  {t("table.image")}
                </th>

                <th className="px-6 py-3">
                  {t("table.part")}
                </th>

                <th className="px-6 py-3">
                  {t("table.description")}
                </th>

                <th className="px-6 py-3">
                  {t("table.actions")}
                </th>

              </tr>
            </thead>

            <tbody>

              {services.map((
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

                  <td className="px-6 py-4">

                    {item.img ? (
                      <img
                        src={item.img}
                        alt="Service"
                        className="w-16 h-16 rounded-xl object-cover border"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-700">
                    {getTranslation(
                      item.part,
                      locale
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-500 max-w-sm">
                    <p className="line-clamp-2">
                      {getTranslation(
                        item.desc,
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

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">

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
                      "form.partId"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.part.id
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        part: {
                          ...form.part,
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
                      "form.partEn"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.part.en
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        part: {
                          ...form.part,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t(
                    "form.descId"
                  )}
                </label>

                <textarea
                  rows={4}
                  value={
                    form.desc.id
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      desc: {
                        ...form.desc,
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
                    "form.descEn"
                  )}
                </label>

                <textarea
                  rows={4}
                  value={
                    form.desc.en
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      desc: {
                        ...form.desc,
                        en: e.target.value,
                      },
                    })
                  }
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t(
                    "form.image"
                  )}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      img:
                        e.target.files?.[0] ||
                        null,
                    })
                  }
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm"
                />

                {typeof form.img ===
                  "string" &&
                  form.img && (
                    <img
                      src={form.img}
                      alt="Preview"
                      className="mt-3 w-28 h-28 rounded-xl object-cover border"
                    />
                  )}
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