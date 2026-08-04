"use client";

import { Link, usePathname } from "@/lib/i18n/navigation";
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
    INFORMASI LINK
    ============================================
    */

    const [hrefPath, sectionId] = href.split("#");

    const targetPath = hrefPath || "/";
    const isSectionLink = Boolean(sectionId);
    const isHomePage = pathname === "/" || pathname === "";

    /*
    ============================================
    ACTIVE BERDASARKAN HALAMAN / ROUTE
    ============================================
    Contoh:
    /news
    /news/judul-berita
    /certification
    /bundling
    ============================================
    */

    if (!isSectionLink && targetPath !== "/") {
      const isSameRoute =
        pathname === targetPath || pathname.startsWith(`${targetPath}/`);

      setActive(isSameRoute);

      return;
    }

    /*
    ============================================
    ACTIVE KHUSUS BERANDA
    ============================================
    */

    if (!isSectionLink && targetPath === "/") {
      const checkHome = () => {
        setActive(isHomePage && window.scrollY < 100);
      };

      checkHome();

      window.addEventListener("scroll", checkHome);

      return () => {
        window.removeEventListener("scroll", checkHome);
      };
    }

    /*
    ============================================
    SECTION HANYA AKTIF DI HOMEPAGE
    ============================================
    */

    if (!isHomePage || !sectionId) {
      setActive(false);
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      setActive(false);
      return;
    }

    /*
    ============================================
    ACTIVE BERDASARKAN HASH
    ============================================
    */

    const checkHash = () => {
      const currentHash = window.location.hash;

      if (currentHash === `#${sectionId}`) {
        setActive(true);
      }
    };

    checkHash();

    window.addEventListener("hashchange", checkHash);

    /*
    ============================================
    ACTIVE BERDASARKAN SCROLL SECTION
    ============================================
    */

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-80px 0px -55% 0px",
        threshold: 0,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", checkHash);
    };
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={`
        ${mobile ? "inline-flex w-fit self-start" : "inline-flex"}

        relative w-fit py-2 transition
        hover:text-[#078fd3]

        after:absolute
        after:bottom-0
        after:left-0
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
