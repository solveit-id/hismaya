import createMiddleware from "next-intl/middleware";

import { NextResponse } from "next/server";

import { auth } from "@/auth";

import {
  defaultLocale,
  locales,
} from "@/lib/i18n/config";

import {
  roleAccessMap,
  Role,
} from "@/lib/rbac";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default auth((req) => {
  const intlResponse = intlMiddleware(req);

  const { nextUrl } = req;

  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  const role =
    req.auth?.user?.role as
      | Role
      | undefined;

  // ======================
  // ROOT REDIRECT
  // ======================

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}`,
        nextUrl,
      ),
    );
  }

  // ======================
  // LOCALE DETECTION
  // ======================

  const segments =
    pathname.split("/");

  const locale = locales.includes(
    segments[1] as any,
  )
    ? segments[1]
    : null;

  if (!locale) {
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname}`,
        nextUrl,
      ),
    );
  }

  const pathWithoutLocale =
    pathname.replace(
      `/${locale}`,
      "",
    ) || "/";

  // ======================
  // AUTH ROUTES
  // ======================

  if (
    pathWithoutLocale.startsWith(
      "/login",
    ) ||
    pathWithoutLocale.startsWith(
      "/register",
    )
  ) {
    if (isLoggedIn && role) {
      const redirectPath =
        role === "ADMIN"
          ? `/${locale}/admin/dashboard`
          : `/${locale}`;

      return NextResponse.redirect(
        new URL(
          redirectPath,
          nextUrl,
        ),
      );
    }

    return intlResponse;
  }

  // ======================
  // ADMIN PROTECTION
  // ======================

  if (
    pathWithoutLocale.startsWith(
      "/admin",
    )
  ) {
    if (
      !isLoggedIn ||
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(
          `/${locale}/login`,
          nextUrl,
        ),
      );
    }

    return intlResponse;
  }

  // ======================
  // USER ACTION GUARD
  // ======================

  const protectedActions = [
    "/apply",
    "/testimonial/create",
    "/profile",
  ];

  const isProtectedAction =
    protectedActions.some((p) =>
      pathWithoutLocale.startsWith(
        p,
      ),
    );

  if (
    isProtectedAction &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(
      new URL(
        `/${locale}/login`,
        nextUrl,
      ),
    );
  }

  return intlResponse;
});

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
  ],
};