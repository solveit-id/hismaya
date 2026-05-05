"use client"

import { useState } from "react"
import { FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi"

type Category = {
  id: number
  name: string
  createdAt: string
  description?: string
}

const initialData: Category[] = [
  { id: 1, name: "Bidang K3", createdAt: "18 Dec 2025" },
  { id: 2, name: "Sertifikasi Media, Publikasi, Kreatif dan Penyiaran", createdAt: "14 Dec 2025" },
  { id: 3, name: "Sertifikasi Metodologi Pelatihan", createdAt: "14 Dec 2025" },
  { id: 4, name: "Administrasi SDM dan Manajemen", createdAt: "14 Dec 2025" },
]

export default function CategoryTable() {
  const [data, setData] = useState<Category[]>(initialData)

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"add" | "edit">("add")
  const [selected, setSelected] = useState<Category | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
  })

  // ===== HANDLER =====
  const handleOpenAdd = () => {
    setMode("add")
    setForm({ name: "", description: "" })
    setOpen(true)
  }

  const handleOpenEdit = (item: Category) => {
    setMode("edit")
    setSelected(item)
    setForm({
      name: item.name,
      description: item.description || "",
    })
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "add") {
      const newItem: Category = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        createdAt: new Date().toDateString(),
      }
      setData([...data, newItem])
    }

    if (mode === "edit" && selected) {
      setData(
        data.map((item) =>
          item.id === selected.id
            ? { ...item, name: form.name, description: form.description }
            : item
        )
      )
    }

    setOpen(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Category List
          </h2>
          <p className="text-sm text-gray-500">
            Total: {data.length} categories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          <FiPlus size={16} />
          Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-500">
                  {index + 1}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      Created: {item.createdAt}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {item.description || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs border border-yellow-400 text-yellow-600 rounded-md hover:bg-yellow-50"
                    >
                      <FiEdit size={14} />
                      Edit
                    </button>

                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-red-400 text-red-500 rounded-md hover:bg-red-50">
                      <FiTrash2 size={14} />
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-3 text-sm text-gray-500 border-t bg-gray-50">
        Showing {data.length} categories
      </div>

      {/* MODAL */}
     {open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <div>
            <h2 className="text-lg font-semibold text-gray-800">
                {mode === "add" ? "Add Category" : "Edit Category"}
            </h2>
            <p className="text-xs text-gray-500">
                {mode === "add"
                ? "Create a new program category"
                : "Update category information"}
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
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

            {/* Category Name */}
            <div>
            <label className="text-sm font-medium text-gray-700">
                Category Name
            </label>
            <input
                type="text"
                placeholder="Example: Cloud Computing"
                value={form.name}
                onChange={(e) =>
                setForm({ ...form, name: e.target.value })
                }
                className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />
            </div>

            {/* Description */}
            <div>
            <label className="text-sm font-medium text-gray-700">
                Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
                placeholder="Category description..."
                value={form.description}
                onChange={(e) =>
                setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="mt-1 w-full border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2 pt-3 border-t">

            <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100 transition"
            >
                Cancel
            </button>

            <button
                type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                {mode === "add" ? "Save" : "Update"}
            </button>

            </div>

        </form>
        </div>
    </div>
    )}
    </div>
  )
}