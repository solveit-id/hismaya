"use client"

import { useState } from "react"
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi"

type Program = {
  id: number
  name: string
  slug: string
  description?: string
  category: string
  duration?: string
  price: number
  status: "ACTIVE" | "INACTIVE"
  createdAt: string
}

const mockPrograms: Program[] = [
  {
    id: 1,
    name: "Finance Accounting",
    slug: "finance-accounting",
    description: "duit",
    category: "Business & Economy Certification",
    duration: "1",
    price: 0,
    status: "ACTIVE",
    createdAt: "18 Dec 2025",
  },
  {
    id: 2,
    name: "Health Sciences Careers",
    slug: "health-sciences-careers",
    description: "Certification medical administration skills...",
    category: "Health & Safety",
    price: 0,
    status: "ACTIVE",
    createdAt: "14 Dec 2025",
  },
]

export default function SertifikasiTable() {
  const [openModal, setOpenModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    duration: "",
    price: 0,
    status: "ACTIVE",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    setIsEdit(false)
    setForm({
      name: "",
      slug: "",
      description: "",
      category: "",
      duration: "",
      price: 0,
      status: "ACTIVE",
    })
    setOpenModal(true)
  }

  const handleEdit = (item: Program) => {
    setIsEdit(true)
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      category: item.category,
      duration: item.duration || "",
      price: item.price,
      status: item.status,
    })
    setOpenModal(true)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b bg-gray-50">
          
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Program List
            </h2>
            <p className="text-sm text-gray-500">
              Total: {mockPrograms.length} registered programs
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search name / category..."
                className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              <FiPlus size={16} />
              Add Program
            </button>

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {mockPrograms.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">

                  <td className="px-6 py-4 text-gray-500">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          Slug: {item.slug}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.duration || "-"}
                    <p className="text-xs text-gray-400">
                      Created: {item.createdAt}
                    </p>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-700">
                    Rp {item.price}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(item)}
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
          Showing 1 – {mockPrograms.length} of {mockPrograms.length} programs
        </div>

      </div>

      {/* MODAL */}
      
        {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <div>
                <h3 className="text-lg font-semibold text-gray-800">
                    {isEdit ? "Edit Program" : "Add Program"}
                </h3>
                <p className="text-sm text-gray-500">
                    {isEdit
                    ? "Update your certification program"
                    : "Create a new certification program"}
                </p>
                </div>

                <button
                onClick={() => setOpenModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
                >
                ×
                </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

                {/* Name */}
                <div>
                <label className="text-sm font-medium text-gray-700">
                    Program Name
                </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Fullstack Developer"
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                </div>

                {/* Slug */}
                <div>
                <label className="text-sm font-medium text-gray-700">
                    Slug <span className="text-xs text-gray-400">(auto generated)</span>
                </label>
                <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg bg-gray-100 text-gray-500"
                />
                </div>

                {/* Category */}
                <div>
                <label className="text-sm font-medium text-gray-700">
                    Category
                </label>
                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g. Technology"
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Duration + Price */}
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Duration
                    </label>
                    <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="3 Months"
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Price
                    </label>
                    <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                </div>

                {/* Description */}
                <div>
                <label className="text-sm font-medium text-gray-700">
                    Short Description
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Short program description..."
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Status */}
                <div>
                <label className="text-sm font-medium text-gray-700">
                    Status
                </label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
                </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                Cancel
                </button>

                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow">
                Save
                </button>
            </div>

            </div>
        </div>
        )}
    </>
  )
}