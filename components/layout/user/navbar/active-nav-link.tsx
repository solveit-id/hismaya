"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ActiveNavLinkProps {
    href: string;
    label: string;
    className?: string;
    mobile?: boolean;
}

const ActiveNavLink = ({
    href,
    label,
    className = "",
    mobile = false,
}: ActiveNavLinkProps) => {
    const [active, setActive] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        /*
        ============================================
        ACTIVE BERDASARKAN HALAMAN / ROUTE
        ============================================
        */

        // Sertifikasi
        if (
            href.includes("certification") &&
            (pathname.includes("/certifications") ||
                pathname.includes("/certifications-iso"))
        ) {
            setActive(true);
            return;
        }

        // Bundling
        if (
            href.includes("bundling") &&
            pathname.includes("/bundling")
        ) {
            setActive(true);
            return;
        }

        /*
        ============================================
        ACTIVE BERDASARKAN SCROLL SECTION
        ============================================
        */

        // ambil id dari hash
        // contoh:
        // "/#about" => "about"
        const sectionId = href.split("#")[1];

        // jika bukan hash section
        if (!sectionId) {
        const checkHome = () => {
            const isHomePage =
            pathname === "/" ||
            pathname === "/id" ||
            pathname === "/en";
            
            setActive(isHomePage && window.scrollY < 100);
        };

        checkHome();

        window.addEventListener("scroll", checkHome);

        return () => {
            window.removeEventListener("scroll", checkHome);
        };
        }

        const section = document.getElementById(sectionId);

        if (!section) {
            setActive(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setActive(entry.isIntersecting);
            },
            {
                rootMargin: "-80px 0px -45% 0px",
                threshold: 0,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, [href, pathname]);
    
    return (
    
    <Link
      href={href}
      className={`
        ${
          mobile
            ? "inline-flex w-fit self-start"
            : "inline-flex"
        }
        
        relative w-fit py-2 transition
        hover:text-[#078fd3]

        after:absolute
        after:left-0
        after:bottom-0
        after:h-[2px]
        after:bg-[#078fd3]
        after:transition-all
        after:duration-300

        ${
          active
            ? "text-[#078fd3] after:w-full"
            : "after:w-0 hover:after:w-full"
        }

        ${className}
      `}
    >
      {label}
    </Link>
  );
};

export default ActiveNavLink;