import { auth } from "@/auth";
import Image from "next/image";
import localFont from "next/font/local";
import { Link } from "@/lib/i18n/navigation";
import LanguageDropdown from "../../shared/navigation/language-dropdown";
import UserDropdown from "../../shared/navigation/user-dropdown";
import ActiveNavLink from "../../shared/navigation/active-nav-link";
import { getTranslations } from "next-intl/server";

const manropeBold = localFont({
  src: "../../../app/fonts/manrope.bold.otf",
  weight: "700",
  display: "swap",
});

const Navbar = async () => {
  const session = await auth();
  const t = await getTranslations("main.navbar");

  const dashboardHref =
    session?.user.role === "admin"
      ? "/admin/dashboard"
      : "/user/dashboard";

  const menuItems = [
    { label: t("menu.home"), href: "/#" },
    { label: t("menu.about"), href: "/#about" },
    { label: t("menu.service"), href: "/#service" },
    { label: t("menu.certification"), href: "/#certification" },
    { label: t("menu.package"), href: "/#bundling" },
  ];

  return (
    <header className="sticky top-0 z-[99999] border-b border-black/5 bg-[#E9E9E9]/95 backdrop-blur-md">
      <nav className="group mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 xl:px-0">

        <input
          id="dashboard-navbar-toggle"
          type="checkbox"
          className="peer sr-only"
        />

        <div className="grid h-[76px] grid-cols-[80px_1fr_auto] items-center xl:grid-cols-[120px_1fr_auto]">

          {/* LOGO */}
          <Link href={dashboardHref} className="flex items-center xl:justify-self-start">
            <Image
              src="/img/hismayaaaa.png"
              alt="Hismaya"
              width={60}
              height={45}
              priority
              className="h-auto w-[54px] sm:w-[58px] md:w-[60px] xl:w-[62px] transition duration-300 hover:scale-[1.03]"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div
            className={`${manropeBold.className} hidden items-center justify-center gap-[46px] text-[14px] text-[#555555] xl:flex`}
          >
            {menuItems.map((item) => (
              <ActiveNavLink
                key={item.label}
                href={item.href}
                label={item.label}
              />
            ))}
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden items-center justify-self-end gap-3 xl:flex">
            <LanguageDropdown />

            {session ? (
              <UserDropdown
                name={session.user.name || "User"}
                role={session.user.role || "user"}
                phone={session.user.phone || "+62 812-3456-7890"}
              />
            ) : (
              <Link
                href="/login"
                className="rounded-[10px] bg-[#078fd3] px-6 py-3 text-sm font-bold leading-none text-white transition duration-300 hover:-translate-y-[1px] hover:bg-[#067fbb]"
              >
                {t("auth.login")}
              </Link>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <label
            htmlFor="dashboard-navbar-toggle"
            className="ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-[#078fd3]/30 text-[#078fd3] transition hover:bg-[#078fd3]/5 xl:hidden"
          >
            <div className="relative h-6 w-6">
              <svg
                className="absolute inset-0 h-6 w-6 transition-all duration-300 group-has-[input:checked]:scale-0 group-has-[input:checked]:rotate-90 group-has-[input:checked]:opacity-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg
                className="absolute inset-0 h-6 w-6 scale-0 rotate-90 opacity-0 transition-all duration-300 group-has-[input:checked]:scale-100 group-has-[input:checked]:rotate-0 group-has-[input:checked]:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </label>
        </div>

        {/* MOBILE MENU */}
        <div className="hidden peer-checked:block xl:!hidden">
          <div className="mt-2 rounded-[20px] bg-white/90 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">

            <div className={`${manropeBold.className} flex flex-col gap-3 border-t border-black/5 pt-4 text-[14px] text-[#555555]`}>
              {menuItems.map((item) => (
                <ActiveNavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className="rounded-md px-2 py-2 hover:bg-white"
                />
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <LanguageDropdown />

              {session ? (
                <UserDropdown
                  name={session.user.name || "User"}
                  role={session.user.role || "user"}
                  phone={session.user.phone || "+62 812-3456-7890"}
                />
              ) : (
                <Link
                  href="/login"
                  className="rounded-[12px] bg-[#078fd3] px-5 py-3 text-center text-sm font-bold text-white transition duration-300 hover:bg-[#067fbb]"
                >
                  {t("auth.login")}
                </Link>
              )}
            </div>

          </div>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;