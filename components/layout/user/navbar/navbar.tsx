import { auth } from "@/auth";
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import LanguageDropdown from "./language-dropdown";
import UserDropdown from "./user-dropdown";
import ActiveNavLink from "./active-nav-link";

const manropeBold = localFont({
    src: "../../../../app/fonts/manrope.bold.otf",
    weight: "700",
    display: "swap",
});

const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/#about" },
    { label: "Layanan Kami", href: "/#service" },
    { label: "Sertifikasi", href: "/#certification" },
    { label: "Paket Bundling", href: "/#bundling" },
];

const Navbar = async () => {
    const session = await auth();

    const dashboardHref =
        session?.user.role === "admin"
        ? "/admin/dashboard"
        : "/user/dashboard";

    return (
    <header className="sticky top-0 z-[99999] border-b border-black/5 bg-[#E9E9E9]/95 backdrop-blur-md">
        <nav className="group mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10 xl:px-0">

            {/* TOGGLE */}
            <input
            id="dashboard-navbar-toggle"
            type="checkbox"
            className="peer sr-only"
            />

            {/* NAVBAR */}
            <div className="grid h-[76px] grid-cols-[80px_1fr_auto] items-center xl:grid-cols-[120px_1fr_auto]">

                {/* LOGO */}
                <Link
                    href={dashboardHref}
                    className="flex items-center xl:justify-self-start"
                >
                    <Image
                    src="/img/hismayaaaa.png"
                    alt="Hismaya"
                    width={60}
                    height={45}
                    priority
                    className="
                        h-auto
                        w-[54px]
                        sm:w-[58px]
                        md:w-[60px]
                        xl:w-[62px]
                        transition duration-300 hover:scale-[1.03]
                    "
                    />
                </Link>

                {/* DESKTOP MENU */}
                <div
                    className={`
                    ${manropeBold.className}
                    hidden items-center justify-center
                    gap-[46px]
                    text-[14px]
                    text-[#555555]
                    xl:flex
                    `}
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
                            className="
                            rounded-[10px]
                            bg-[#078fd3]
                            px-6 py-2
                            text-sm font-bold
                            leading-none text-white
                            transition duration-300
                            hover:-translate-y-[1px]
                            hover:bg-[#067fbb]
                            "
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* MOBILE TOGGLE BUTTON */}
                <label
                    htmlFor="dashboard-navbar-toggle"
                    aria-label="Toggle navigation"
                    className="
                    ml-auto flex
                    h-10 w-10
                    cursor-pointer
                    items-center justify-center
                    rounded-[10px]
                    border border-[#078fd3]/30
                    text-[#078fd3]
                    transition hover:bg-[#078fd3]/5
                    xl:hidden
                    "
                >
                    <div className="relative h-6 w-6">

                        {/* HAMBURGER */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="
                            absolute inset-0 h-6 w-6
                            transition-all duration-300

                            group-has-[input:checked]:scale-0
                            group-has-[input:checked]:rotate-90
                            group-has-[input:checked]:opacity-0
                            "
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                            />
                        </svg>

                        {/* CLOSE */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="
                            absolute inset-0 h-6 w-6
                            scale-0 rotate-90 opacity-0
                            transition-all duration-300

                            group-has-[input:checked]:scale-100
                            group-has-[input:checked]:rotate-0
                            group-has-[input:checked]:opacity-100
                            "
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>

                    </div>
                </label>
            </div>

            {/* MOBILE MENU */}
            <div
            className="
                hidden
                peer-checked:block
                xl:!hidden
            "
            >
                <div
                    className="
                    mt-2 rounded-[20px]
                    bg-white/90
                    p-4
                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                    backdrop-blur-md
                    "
                >
                    {/* MOBILE NAVIGATION */}
                    <div
                    className={`
                        ${manropeBold.className}
                        flex flex-col gap-3
                        border-t border-black/5
                        pt-4
                        text-[14px]
                        text-[#555555]
                    `}
                    >
                        {menuItems.map((item) => (
                            <ActiveNavLink
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            className="
                                rounded-md px-2 py-2
                                hover:bg-white
                            "
                            />
                        ))}
                    </div>

                    {/* MOBILE RIGHT */}
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
                            className="
                                rounded-[12px]
                                bg-[#078fd3]
                                px-5 py-3
                                text-center
                                text-sm font-bold
                                text-white
                                transition duration-300
                                hover:bg-[#067fbb]
                            "
                            >
                            Login
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