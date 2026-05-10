import { auth } from "@/auth"
import { NextResponse } from "next/server"

import {
  roleAccessMap,
  Role,
} from "@/lib/rbac"

import {
  defaultLocale,
  locales,
} from "@/lib/i18n/config"

export default auth((req) => {

  const { nextUrl } = req

  const pathname =
    nextUrl.pathname

  const isLoggedIn =
    !!req.auth

  const role =
    req.auth?.user?.role as
      | Role
      | undefined

  // ======================
  // ROOT REDIRECT
  // ======================
  if (pathname === "/") {

    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}`,
        nextUrl
      )
    )
  }

  // ======================
  // CHECK LOCALE
  // ======================
  const segments =
    pathname.split("/")

  const locale =
    locales.includes(
      segments[1] as any
    )
      ? segments[1]
      : null

  // ======================
  // INVALID / MISSING LOCALE
  // ======================
  if (!locale) {

    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname}`,
        nextUrl
      )
    )
  }

  // ======================
  // REMOVE LOCALE
  // ======================
  const pathnameWithoutLocale =
    pathname.replace(
      `/${locale}`,
      ""
    ) || "/"

  // ======================
  // AUTH PAGES
  // ======================
  if (
    pathnameWithoutLocale.startsWith(
      "/login"
    ) ||
    pathnameWithoutLocale.startsWith(
      "/register"
    )
  ) {

    if (isLoggedIn && role) {

      if (role === "ADMIN") {

        return NextResponse.redirect(
          new URL(
            `/${locale}/admin/dashboard`,
            nextUrl
          )
        )
      }

      return NextResponse.redirect(
        new URL(
          `/${locale}/user/dashboard`,
          nextUrl
        )
      )
    }

    return NextResponse.next()
  }

  // ======================
  // PRIVATE ROUTES
  // ======================
  if (
    pathnameWithoutLocale.startsWith(
      "/admin"
    ) ||
    pathnameWithoutLocale.startsWith(
      "/user"
    )
  ) {

    if (!isLoggedIn || !role) {

      return NextResponse.redirect(
        new URL(
          `/${locale}/login`,
          nextUrl
        )
      )
    }

    const allowedPaths =
      roleAccessMap[role] || []

    const isAllowed =
      allowedPaths.some((path) =>
        pathnameWithoutLocale.startsWith(
          path
        )
      )

    if (!isAllowed) {

      if (role === "ADMIN") {

        return NextResponse.redirect(
          new URL(
            `/${locale}/admin/dashboard`,
            nextUrl
          )
        )
      }

      return NextResponse.redirect(
        new URL(
          `/${locale}/user/dashboard`,
          nextUrl
        )
      )
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|.*\\..*).*)",
  ],
}