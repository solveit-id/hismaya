"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiHome, FiBox, FiUsers, FiX } from "react-icons/fi"

type MenuItem = {
  name: string
  href: string
  icon: React.ReactNode
}

const menu: MenuItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <FiHome /> },
  { name: "Users", href: "/admin/user", icon: <FiUsers /> },
  { name: "Category", href: "/admin/category", icon: <FiBox /> },
  { name: "Certification", href: "/admin/sertifikasi", icon: <FiMenu /> },
  { name: "Testimonial", href: "/admin/testimonial", icon: <FiMenu /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false) // mobile control

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-[#008FCC] text-white rounded-md md:hidden"
      >
        <FiMenu size={20} />
      </button>

      {/* 🔹 Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
        fixed md:static z-50 top-0 left-0 h-screen bg-[#008FCC] text-white flex flex-col justify-between
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Top */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <h2 className="text-lg font-bold tracking-wide border-b border-[#C1DCDC]/50">
                Admin Panel
              </h2>
            )}

            <div className="flex gap-2">
              {/* Collapse (desktop) */}
              <button
                onClick={() => setCollapsed((v) => !v)}
                className="p-2 rounded-md hover:bg-[#005C8A]"
              >
                <FiMenu size={20} />
              </button>

              {/* Close (mobile) */}
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-[#005C8A] md:hidden"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="mt-4 space-y-1">
            {menu.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)} // close mobile after click
                  className={`relative flex items-center gap-3 px-3 py-2 mx-2 rounded-md
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#005C8A] rounded-[20px]"
                      : "hover:bg-[#005C8A] hover:rounded-[20px]"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="text-lg">{item.icon}</span>

                  {!collapsed && (
                    <span className="text-sm font-bold">
                      {item.name}
                    </span>
                  )}

                  {/* indicator */}
                  <span
                    className={`absolute left-0 h-6 w-1 rounded-r
                    ${isActive ? "bg-blue-400" : "bg-transparent"}`}
                  />
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}