import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { roleAccessMap, ROLES, Role } from "@/lib/rbac";

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const role = req.auth?.user?.role as Role | undefined;

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/redirect"
  ) {
    return NextResponse.next();
  }

  if (!role) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (!Object.values(ROLES).includes(role)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  const allowedPaths = roleAccessMap[role];

  const isAllowed = allowedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/redirect", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};