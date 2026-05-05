"use client"

import { useState } from "react"
import { FiEdit, FiSearch, FiEye, FiEyeOff } from "react-icons/fi"

type Testimonial = {
  id: number
  name: string
  role: string
  message: string
  date: string
  isVisible: boolean
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Fa'iq Brinatta",
    role: "Students",
    message: "The Govind program really helpful",
    date: "18 Jan 2026",
    isVisible: false,
  },
  {
    id: 2,
    name: "bimo setya",
    role: "Staff Accounting",
    message: "good job",
    date: "18 Dec 2025",
    isVisible: false,
  },
  {
    id: 3,
    name: "User",
    role: "Students",
    message: "MANTAB JOS JIS BOLO",
    date: "14 Dec 2025",
    isVisible: true,
  },
]

export default function TestimonialTable() {
  const [data, setData] = useState(mockTestimonials)
  const [search, setSearch] = useState("")

  const toggleVisibility = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isVisible: !item.isVisible }
          : item
      )
    )
  }

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b bg-gray-50">

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Testimonial List
          </h2>
          <p className="text-sm text-gray-500">
            Total: {data.length} testimonials recorded
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search name / role / text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Occupation</th>
              <th className="px-6 py-3">Testimonial</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50 transition">

                {/* NO */}
                <td className="px-6 py-4 text-gray-500">
                  {index + 1}
                </td>

                {/* CLIENT */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>
                    </div>

                  </div>
                </td>

                {/* ROLE */}
                <td className="px-6 py-4 text-gray-600">
                  {item.role}
                </td>

                {/* MESSAGE */}
                <td className="px-6 py-4 text-gray-600 max-w-md">
                  <p className="line-clamp-2">
                    "{item.message}"
                  </p>
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-gray-500">
                  {item.date}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      item.isVisible
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.isVisible ? "Visible" : "Hidden"}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">

                    {/* TOGGLE */}
                    <button
                      onClick={() => toggleVisibility(item.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border transition ${
                        item.isVisible
                          ? "border-green-400 text-green-600 hover:bg-green-50"
                          : "border-gray-300 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {item.isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                      {item.isVisible ? "Visible" : "Hidden"}
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
        Showing 1 – {filtered.length} of {data.length} testimonials
      </div>

    </div>
  )
}