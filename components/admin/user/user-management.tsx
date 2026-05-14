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
  createUser,
  updateUser,
  deleteUser,
} from "@/features/admin/user"

type User = {
  id: string
  name: string | null
  email: string
  phone: string | null
  role: "ADMIN" | "USER"
  createdAt: Date
}

interface UserManagementProps {
  users: User[]
}

export default function UserManagement({
  users,
}: UserManagementProps) {

  // =========================
  // TRANSLATION
  // =========================
  const t =
    useTranslations(
      "admin.user"
    )

  const locale =
    useLocale()

  // =========================
  // STATES
  // =========================
  const [open, setOpen] =
    useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [mode, setMode] =
    useState<"add" | "edit">(
      "add"
    )

  const [selected, setSelected] =
    useState<User | null>(null)

  const [isPending, startTransition] =
    useTransition()

  const [form, setForm] =
    useState({
      id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    })

  // =========================
  // OPEN ADD MODAL
  // =========================
  const handleOpenAdd = () => {

    setMode("add")

    setSelected(null)

    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    })

    setOpen(true)
  }

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleOpenEdit = (
    user: User
  ) => {

    setMode("edit")

    setSelected(user)

    setForm({
      id: user.id,
      name: user.name || "",
      email: user.email,
      phone: user.phone || "",
      password: "",
      role: user.role,
    })

    setOpen(true)
  }

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const handleOpenDelete = (
    user: User
  ) => {

    setSelected(user)

    setDeleteOpen(true)
  }

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    const formData =
      new FormData()

    formData.append(
      "id",
      form.id
    )

    formData.append(
      "name",
      form.name
    )

    formData.append(
      "email",
      form.email
    )

    formData.append(
      "phone",
      form.phone
    )

    formData.append(
      "password",
      form.password
    )

    formData.append(
      "role",
      form.role
    )

    setOpen(false)

    startTransition(async () => {

      // ======================
      // CREATE USER
      // ======================
      if (mode === "add") {

        const result =
          await createUser(
            null,
            formData
          )

        if (result?.error) {

          const errorMessage =
            Object.values(
              result.error
            )
              .flat()
              .join(", ")

          toast.error(
            errorMessage
          )

          return
        }

        if (!result?.success) {

          toast.error(
            t("toast.createFailed")
          )

          return
        }

        toast.success(
          t("toast.createSuccess")
        )
      }

      // ======================
      // UPDATE USER
      // ======================
      if (mode === "edit") {

        const result =
          await updateUser(
            null,
            formData
          )

        if (result?.error) {

          const errorMessage =
            Object.values(
              result.error
            )
              .flat()
              .join(", ")

          toast.error(
            errorMessage
          )

          return
        }

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
  // HANDLE DELETE
  // =========================
  const handleDelete =
    async () => {

      if (!selected) return

      setDeleteOpen(false)

      startTransition(async () => {

        const result =
          await deleteUser(
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
                    users.length,
                }
              )}
            </p>

          </div>

          <button
            onClick={
              handleOpenAdd
            }
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <FiPlus size={16} />

            {t(
              "buttons.add"
            )}
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
                  {t("table.name")}
                </th>

                <th className="px-6 py-3">
                  {t("table.email")}
                </th>

                <th className="px-6 py-3">
                  {t("table.phone")}
                </th>

                <th className="px-6 py-3">
                  {t("table.role")}
                </th>

                <th className="px-6 py-3">
                  {t(
                    "table.actions"
                  )}
                </th>
              </tr>

            </thead>

            <tbody>

              {users.map((
                user,
                index
              ) => (

                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">

                        {user.name?.charAt(0).toUpperCase() || "U"}

                      </div>

                      <div className="flex flex-col">

                        <span className="font-medium text-gray-800">
                          {user.name}
                        </span>

                        <span className="text-xs text-gray-400 mt-1">

                          {t(
                            "table.created"
                          )}
                          {" "}

                          {new Date(
                            user.createdAt
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

                  <td className="px-6 py-4 text-gray-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {user.phone || "-"}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleOpenEdit(
                            user
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-yellow-400 text-yellow-600 rounded-md hover:bg-yellow-50"
                      >
                        <FiEdit size={14} />

                        {t(
                          "buttons.edit"
                        )}
                      </button>

                      <button
                        onClick={() =>
                          handleOpenDelete(
                            user
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
              ))}

              {users.length === 0 && (
                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400"
                  >
                    {t(
                      "empty.title"
                    )}
                  </td>

                </tr>
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
                users.length,
            }
          )}

        </div>

        {/* FORM MODAL */}
        {open && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">

                <div>

                  <h2 className="text-lg font-semibold text-gray-800">

                    {mode === "add"
                      ? t("modal.addTitle")
                      : t("modal.editTitle")}

                  </h2>

                  <p className="text-xs text-gray-500">

                    {mode === "add"
                      ? t("modal.addSubtitle")
                      : t("modal.editSubtitle")}

                  </p>

                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <FiX size={18} />
                </button>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="px-6 py-5 space-y-4"
              >

                {/* NAME */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    {t("form.fullName")}
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    {t("form.email")}
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />

                </div>

                {/* PHONE */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    {t("form.phone")}
                  </label>

                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                </div>

                {/* PASSWORD */}
                {mode === "add" && (

                  <div>

                    <label className="text-sm font-medium text-gray-700">
                      {t("form.password")}
                    </label>

                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />

                  </div>
                )}

                {/* ROLE */}
                <div>

                  <label className="text-sm font-medium text-gray-700">
                    {t("form.role")}
                  </label>

                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value as "ADMIN" | "USER",
                      })
                    }
                    className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="ADMIN">
                      ADMIN
                    </option>

                    <option value="USER">
                      USER
                    </option>

                  </select>

                </div>

                {/* ACTION */}
                <div className="flex justify-end gap-2 pt-3 border-t">

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                  >
                    {t("buttons.cancel")}
                  </button>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
                  >

                    {isPending && (
                      <FiLoader className="animate-spin" />
                    )}

                    {mode === "add"
                      ? t("buttons.save")
                      : t("buttons.update")}

                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

        {/* DELETE MODAL */}
        {deleteOpen && selected && (

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
                      {t("delete.title")}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {t("delete.subtitle")}
                    </p>

                  </div>

                </div>

                <div className="mt-5 text-sm text-gray-600">

                  {t("delete.confirmation")}
                  {" "}

                  <span className="font-semibold">
                    {selected.name}
                  </span>
                  ?

                </div>

                <div className="flex justify-end gap-2 mt-6">

                  <button
                    onClick={() =>
                      setDeleteOpen(false)
                    }
                    className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
                  >
                    {t("buttons.cancel")}
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                  >

                    {isPending && (
                      <FiLoader className="animate-spin" />
                    )}

                    {t("buttons.delete")}

                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  )
}