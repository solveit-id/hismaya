"use client"

import { useState } from "react"

import {
  useLocale,
  useTranslations,
} from "next-intl"

import {
  Link,
  usePathname
} from "@/lib/i18n/navigation"

import {
  FiHome,
  FiUsers,
  FiGrid,
  FiAward,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiLogOut,
  FiGlobe,
  FiChevronDown,
  FiChevronRight,
  FiFileText
} from "react-icons/fi"

import {
  Locale,
  locales,
} from "@/lib/i18n/config"

type MenuItem = {
  name: string
  href?: string
  icon: React.ReactNode
  children?: {
    name: string
    href: string
  }[]
}

export default function Sidebar({
  logoutAction,
}: {
  logoutAction: () => Promise<void>
}) {
  // =========================
  // TRANSLATION
  // =========================
  const t = useTranslations(
    "admin.sidebar"
  )

  // =========================
  // NAVIGATION
  // =========================
  const pathname = usePathname()

  // =========================
  // LOCALE
  // =========================
  const locale = useLocale() as Locale

  // =========================
  // SIDEBAR STATE
  // =========================
  const [collapsed, setCollapsed] =
    useState(false)

  const [open, setOpen] =
    useState(false)

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(
      "user-pages"
    )

  // =========================
  // MENU
  // =========================
  const menu: MenuItem[] = [
    {
      name: t("menu.dashboard"),
      href: "/admin/dashboard",
      icon: <FiHome />,
    },

    {
      name: t("menu.users"),
      href: "/admin/users",
      icon: <FiUsers />,
    },

    {
      name: t("menu.userPages.title"),
      icon: <FiFileText />,
      children: [
        {
          name: t(
            "menu.userPages.aboutUs"
          ),
          href: "/admin/about",
        },
        {
          name: t(
            "menu.userPages.ourServices"
          ),
          href: "/admin/service",
        },
        // {
        //   name: t(
        //     "menu.userPages.bundlingPackage"
        //   ),
        //   href: "/admin/package",
        // },
      ],
    },

    {
      name: t("menu.category"),
      href: "/admin/category",
      icon: <FiGrid />,
    },

    {
      name: t("menu.certification"),
      href: "/admin/certification",
      icon: <FiAward />,
    },

    // {
    //   name: t("menu.testimonial"),
    //   href: "/admin/testimonial",
    //   icon: <FiMessageSquare />,
    // },
  ]

  // =========================
  // CHANGE LANGUAGE
  // =========================
  const handleChangeLanguage = (
    lang: Locale
  ) => {
    if (lang === locale) return

    const currentPath =
      window.location.pathname

    const segments =
      currentPath.split("/")

    segments[1] = lang

    const newPath =
      segments.join("/")

    window.location.assign(
      newPath
    )
  }

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="fixed top-4 left-4 z-50 p-2 bg-[#008FCC] text-white rounded-md md:hidden"
      >
        <FiMenu size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-screen bg-[#008FCC] text-white
          flex flex-col justify-between
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* TOP */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <h2 className="text-lg font-bold tracking-wide border-b border-[#C1DCDC]/50">
                {t("title")}
              </h2>
            )}

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setCollapsed(
                    (v) => !v
                  )
                }
                className="p-2 rounded-md hover:bg-[#005C8A]"
              >
                <FiMenu size={20} />
              </button>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="p-2 rounded-md hover:bg-[#005C8A] md:hidden"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* LANGUAGE SWITCHER */}
          <div className="px-2 mt-2">
            <div
              className={`
                flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-between"
                }
                gap-2 px-3 py-2 mx-2 rounded-[20px]
                bg-[#005C8A]
              `}
            >
              <div className="flex items-center gap-2">
                <FiGlobe className="text-lg shrink-0" />

                {!collapsed && (
                  <span className="text-sm font-bold">
                    {t("language")}
                  </span>
                )}
              </div>

              {!collapsed && (
                <div className="flex items-center gap-1">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() =>
                        handleChangeLanguage(
                          lang
                        )
                      }
                      className={`
                        px-2 py-1 rounded-md text-xs font-semibold transition uppercase
                        ${
                          locale === lang
                            ? "bg-white text-[#008FCC]"
                            : "bg-transparent hover:bg-white/20"
                        }
                      `}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MENU */}
          <nav className="mt-4 space-y-1">
            {menu.map((item) => {
              const normalizedPathname =
                pathname.replace(
                  `/${locale}`,
                  ""
                )

              const hasChildren =
                !!item.children

              const isChildActive =
                item.children?.some(
                  (child) =>
                    normalizedPathname ===
                      child.href ||
                    normalizedPathname.startsWith(
                      `${child.href}/`
                    )
                ) ?? false

              const isActive =
                item.href
                  ? normalizedPathname ===
                      item.href ||
                    normalizedPathname.startsWith(
                      `${item.href}/`
                    )
                  : isChildActive

              // =========================
              // DROPDOWN MENU
              // =========================
              if (hasChildren) {
                const isDropdownOpen =
                  openDropdown ===
                    item.name ||
                  isChildActive

                return (
                  <div
                    key={item.name}
                    className="mx-2"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(
                          isDropdownOpen
                            ? null
                            : item.name
                        )
                      }
                      className={`
                        w-full relative flex items-center justify-between gap-3 px-3 py-2 rounded-md
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#005C8A] rounded-[20px]"
                            : "hover:bg-[#005C8A] hover:rounded-[20px]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {item.icon}
                        </span>

                        {!collapsed && (
                          <span className="text-sm font-bold">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {!collapsed &&
                        (isDropdownOpen ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronRight />
                        ))}

                      <span
                        className={`
                          absolute left-0 h-6 w-1 rounded-r
                          ${
                            isActive
                              ? "bg-blue-400"
                              : "bg-transparent"
                          }
                        `}
                      />
                    </button>

                    {!collapsed &&
                      isDropdownOpen && (
                        <div className="mt-1 ml-6 space-y-1">
                          {item.children?.map(
                            (child) => {
                              const childActive =
                                normalizedPathname ===
                                  child.href ||
                                normalizedPathname.startsWith(
                                  `${child.href}/`
                                )

                              return (
                                <Link
                                  key={
                                    child.href
                                  }
                                  href={
                                    child.href
                                  }
                                  onClick={() =>
                                    setOpen(
                                      false
                                    )
                                  }
                                  className={`
                                    block px-3 py-2 text-sm rounded-md transition-all duration-200
                                    ${
                                      childActive
                                        ? "bg-[#005C8A] rounded-[20px] font-bold"
                                        : "hover:bg-[#005C8A] hover:rounded-[20px]"
                                    }
                                  `}
                                >
                                  {
                                    child.name
                                  }
                                </Link>
                              )
                            }
                          )}
                        </div>
                      )}
                  </div>
                )
              }

              // =========================
              // NORMAL MENU
              // =========================
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`
                    relative flex items-center gap-3 px-3 py-2 mx-2 rounded-md
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#005C8A] rounded-[20px]"
                        : "hover:bg-[#005C8A] hover:rounded-[20px]"
                    }
                  `}
                  title={
                    collapsed
                      ? item.name
                      : undefined
                  }
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className="text-sm font-bold">
                      {item.name}
                    </span>
                  )}

                  <span
                    className={`
                      absolute left-0 h-6 w-1 rounded-r
                      ${
                        isActive
                          ? "bg-blue-400"
                          : "bg-transparent"
                      }
                    `}
                  />
                </Link>
              )
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="p-2">
          <form action={logoutAction}>
            <button
              type="submit"
              className={`
                w-full flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-center gap-3"
                }
                px-3 py-2 rounded-[20px]
                bg-red-400 hover:bg-red-500
                transition-all duration-200
              `}
              title={
                collapsed
                  ? t("buttons.logout")
                  : undefined
              }
            >
              <FiLogOut className="text-lg shrink-0" />

              {!collapsed && (
                <span className="text-sm font-bold">
                  {t("buttons.logout")}
                </span>
              )}
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}