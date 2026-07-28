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
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiLoader,
} from "react-icons/fi"

import { toast } from "sonner"

import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/features/admin/certification"

import type {
  CertificationItem,
  CertificationFormState,
} from "@/features/admin/certification"

import type {
  Locale,
} from "@/types/multilang"

import {
  getTranslation,
} from "@/utils/translation"

type Props = {
  certifications?: CertificationItem[]
  categories?: {
    id: string
    name: any
  }[]
}

export default function CertificationManagement({
  certifications = [],
  categories = [],
}: Props) {

  // =========================
  // TRANSLATION
  // =========================
  const t = useTranslations(
    "admin.certification"
  )

  const locale = useLocale() as Locale

  // =========================
  // STATE
  // =========================
  const [open, setOpen] = useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [mode, setMode] = useState<
    "add" | "edit"
  >("add")

  const [selected, setSelected] =
    useState<CertificationItem | null>(
      null
    )

  const [isPending, startTransition] =
    useTransition()

  // =========================
  // FORM
  // =========================
  const initialFormState: CertificationFormState =
    {
      img: null,

      name: {
        id: "",
        en: "",
      },

      desc: {
        id: "",
        en: "",
      },

      sector: {
        id: "",
        en: "",
      },

      duration: {
        id: "",
        en: "",
      },

      price: "0",

      status: "ACTIVE",

      categoryId: "",
    }

  const [form, setForm] =
    useState<CertificationFormState>(
      initialFormState
    )

  // =========================
  // OPEN ADD
  // =========================
  const handleOpenAdd = () => {
    setMode("add")
    setSelected(null)
    setForm(initialFormState)
    setOpen(true)
  }

  // =========================
  // OPEN EDIT
  // =========================
  const handleOpenEdit = (
    item: CertificationItem
  ) => {
    setMode("edit")

    setSelected(item)

    setForm({
      img: item.img || "",

      name: item.name,

      desc:
        item.desc || {
          id: "",
          en: "",
        },

      sector:
        item.sector || {
          id: "",
          en: "",
        },

      duration:
        item.duration || {
          id: "",
          en: "",
        },

      price: String(item.price),

      status: item.status,

      categoryId: item.categoryId,
    })

    setOpen(true)
  }

  // =========================
  // OPEN DELETE
  // =========================
  const handleOpenDelete = (
    item: CertificationItem
  ) => {
    setSelected(item)
    setDeleteOpen(true)
  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const formData = new FormData()

    if (form.img instanceof File) {
      formData.append(
        "img",
        form.img
      )
    }

    formData.append(
      "name_id",
      form.name.id
    )

    formData.append(
      "name_en",
      form.name.en
    )

    formData.append(
      "desc_id",
      form.desc.id
    )

    formData.append(
      "desc_en",
      form.desc.en
    )

    formData.append(
      "sector_id",
      form.sector.id
    )

    formData.append(
      "sector_en",
      form.sector.en
    )

    formData.append(
      "duration_id",
      form.duration.id
    )

    formData.append(
      "duration_en",
      form.duration.en
    )

    formData.append(
      "price",
      form.price || "0"
    )

    formData.append(
      "status",
      form.status
    )

    formData.append(
      "categoryId",
      form.categoryId
    )

    setOpen(false)

    startTransition(async () => {

      // =========================
      // CREATE
      // =========================
      if (mode === "add") {

        const result =
          await createCertification(
            formData
          )

        if (!result?.success) {
          toast.error(
            t("toast.createFailed")
          )
          return
        }

        toast.success(
          t("toast.createSuccess")
        )

        return
      }

      // =========================
      // UPDATE
      // =========================
      if (
        mode === "edit" &&
        selected
      ) {

        const result =
          await updateCertification(
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
      }
    })
  }

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {

    if (!selected) return

    setDeleteOpen(false)

    startTransition(async () => {

      const result =
        await deleteCertification(
          selected.id
        )

      if (!result?.success) {

        toast.error(
          t("toast.deleteFailed")
        )

        return
      }

      toast.success(
        t("toast.deleteSuccess")
      )
    })
  }

  return (
    <>
      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

        {/* HEADER */}
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
                    certifications.length,
                }
              )}
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <FiPlus size={16} />

            {t("buttons.add")}
          </button>
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
                  {t("table.image")}
                </th>

                <th className="px-6 py-3">
                  {t("table.name")}
                </th>

                <th className="px-6 py-3">
                  {t("table.description")}
                </th>

                <th className="px-6 py-3">
                  {t("table.sector")}
                </th>

                <th className="px-6 py-3">
                  {t("table.category")}
                </th>

                <th className="px-6 py-3">
                  {t("table.duration")}
                </th>

                <th className="px-6 py-3">
                  {t("table.price")}
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

              {certifications.length === 0 ? (

                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-10 text-gray-400"
                  >
                    {t(
                      "empty.title"
                    )}
                  </td>
                </tr>

              ) : (

                certifications.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 text-gray-500">
                        {index + 1}
                      </td>

                      {/* IMAGE */}
                      <td className="px-6 py-4">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={getTranslation(
                              item.name,
                              locale
                            )}
                            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">

                          <span className="font-medium text-gray-800">
                            {getTranslation(
                              item.name,
                              locale
                            )}
                          </span>

                          <span className="text-xs text-gray-400 mt-1">
                            {t("table.createdBy")}{" "}
                            {item.admin?.name || "-"}
                          </span>

                          <span className="text-xs text-gray-400">
                            {t(
                              "table.created"
                            )}{" "}

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
                      </td>

                      {/* DESCRIPTION */}
                      <td className="px-6 py-4">
                        <div className="max-w-xs">

                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {getTranslation(
                              item.desc,
                              locale
                            ) || "-"}
                          </p>

                        </div>
                      </td>

                      {/* SECTOR */}
                      <td className="px-6 py-4 text-gray-500">
                        {getTranslation(
                          item.sector,
                          locale
                        ) || "-"}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-6 py-4">
                        {item.category ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 border border-gray-300">
                            {getTranslation(
                              item.category.name,
                              locale
                            )}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {getTranslation(
                          item.duration,
                          locale
                        ) || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        Rp.{" "}
                        {item.price.toLocaleString("id-ID")}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status ===
                            "ACTIVE"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          {/* EDIT */}
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

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleOpenDelete(
                                item
                              )
                            }
                            className="flex items-center gap-1 px-3 py-1.5 text-xs border border-red-400 text-red-500 rounded-md hover:bg-red-50"
                          >
                            <FiTrash2 size={14} />

                            {t(
                              "buttons.delete"
                            )}
                          </button>

                        </div>
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
                certifications.length,
            }
          )}
        </div>
      </div>

      {/* FORM MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {mode === "add"
                    ? t(
                        "modal.addTitle"
                      )
                    : t(
                        "modal.editTitle"
                      )}
                </h2>

                <p className="text-xs text-gray-500">
                  {mode === "add"
                    ? t(
                        "modal.addSubtitle"
                      )
                    : t(
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

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="px-6 py-5 space-y-4 overflow-y-auto"
            >
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("form.image")}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      img:
                        e.target.files?.[0] || null,
                    })
                  }
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {typeof form.img === "string" &&
                  form.img && (
                    <img
                      src={form.img}
                      alt="Preview"
                      className="mt-3 w-24 h-24 rounded-lg object-cover border"
                    />
                  )}
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* NAME ID */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.nameId"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.name.id
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        name: {
                          ...form.name,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* NAME EN */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.nameEn"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.name.en
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        name: {
                          ...form.name,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* SECTOR ID */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.sectorId")}
                  </label>

                  <input
                    type="text"
                    value={form.sector.id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sector: {
                          ...form.sector,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* SECTOR EN */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.sectorEn")}
                  </label>

                  <input
                    type="text"
                    value={form.sector.en}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sector: {
                          ...form.sector,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t(
                    "form.category"
                  )}
                </label>

                <select
                  value={
                    form.categoryId
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      categoryId:
                        e.target
                          .value,
                    })
                  }
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">
                    {t(
                      "form.selectCategory"
                    )}
                  </option>

                  {categories.map(
                    (
                      category
                    ) => (
                      <option
                        key={
                          category.id
                        }
                        value={
                          category.id
                        }
                      >
                        {getTranslation(
                          category.name,
                          locale
                        )}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* DESC ID */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t(
                    "form.descId"
                  )}
                </label>

                <textarea
                  rows={3}
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
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* DESC EN */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t(
                    "form.descEn"
                  )}
                </label>

                <textarea
                  rows={3}
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
                  className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* DURATION ID */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.durationId"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.duration.id
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        duration: {
                          ...form.duration,
                          id: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* DURATION EN */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.durationEn"
                    )}
                  </label>

                  <input
                    type="text"
                    value={
                      form.duration.en
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        duration: {
                          ...form.duration,
                          en: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* PRICE */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.price")}
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <p className="mt-1 text-xs text-gray-400">
                    {t("form.priceHint")}
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t(
                      "form.status"
                    )}
                  </label>

                  <select
                    value={
                      form.status
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        status:
                          e.target
                            .value as
                            | "ACTIVE"
                            | "INACTIVE",
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>

                    <option value="INACTIVE">
                      INACTIVE
                    </option>
                  </select>
                </div>

              </div>

              {/* ACTION */}
              <div className="flex justify-end gap-2 pt-3 border-t">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
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
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isPending && (
                    <FiLoader className="animate-spin" />
                  )}

                  {mode === "add"
                    ? t(
                        "buttons.save"
                      )
                    : t(
                        "buttons.update"
                      )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteOpen &&
        selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">

              <div className="p-6">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <FiTrash2
                      size={22}
                      className="text-red-600"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-gray-800">
                      {t(
                        "delete.title"
                      )}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {t(
                        "delete.subtitle"
                      )}
                    </p>

                  </div>
                </div>

                <div className="mt-5 text-sm text-gray-600">

                  {t(
                    "delete.confirmation"
                  )}{" "}

                  <span className="font-semibold">
                    {getTranslation(
                      selected.name,
                      locale
                    )}
                  </span>
                  ?

                </div>

                <div className="flex justify-end gap-2 mt-6">

                  <button
                    onClick={() =>
                      setDeleteOpen(
                        false
                      )
                    }
                    className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                  >
                    {t(
                      "buttons.cancel"
                    )}
                  </button>

                  <button
                    onClick={
                      handleDelete
                    }
                    disabled={
                      isPending
                    }
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {isPending && (
                      <FiLoader className="animate-spin" />
                    )}

                    {t(
                      "buttons.delete"
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}