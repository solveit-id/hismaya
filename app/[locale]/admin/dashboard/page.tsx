import { auth } from "@/auth"
import { redirect } from "@/lib/i18n/navigation"
import { prisma } from "@/lib/prisma"

import type { Metadata } from "next"

import { getTranslations } from "next-intl/server"

import Link from "next/link"

import {
  FiUsers,
  FiActivity,
  FiLayers,
  FiZap,
  FiServer,
  FiUserCheck,
  FiBookOpen,
  FiMessageSquare,
} from "react-icons/fi"

type Props = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "admin.dashboard",
  })

  return {
    title: t("page.metadata.title"),
  }
}

export default async function AdminDashboardPage({
  params,
}: Props) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "admin.dashboard",
  })

  // =========================
  // AUTH
  // =========================
  const session = await auth()

  if (!session?.user) {
    redirect({
      href: "/login",
      locale,
    })

    return null
  }

  const user = session.user

  if (user.role !== "ADMIN") {
    redirect({
      href: "/user/dashboard",
      locale,
    })

    return null
  }

  // =========================
  // FETCH DATA
  // =========================
  const [
    totalUsers,
    totalAdmins,
    totalSessions,
    totalCategories,
    totalCertifications,
    totalTestimonials,
    activeCertifications,
    inactiveCertifications,
    visibleTestimonials,
    hiddenTestimonials,
    recentUsers,
    recentCertifications,
    recentTestimonials,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        role: "ADMIN",
      },
    }),

    prisma.session.count(),

    prisma.category.count(),

    prisma.certification.count(),

    prisma.testimonial.count(),

    prisma.certification.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.certification.count({
      where: {
        status: "INACTIVE",
      },
    }),

    prisma.testimonial.count({
      where: {
        status: "VISIBLE",
      },
    }),

    prisma.testimonial.count({
      where: {
        status: "HIDDEN",
      },
    }),

    prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),

    prisma.certification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        category: true,
        admin: true,
      },
    }),

    prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        user: true,
      },
    }),
  ])

  // =========================
  // TOP SECTIONS
  // =========================
  const topSections = [
    {
      name: t("topSections.users"),
      hits: totalUsers,
    },
    {
      name: t("topSections.categories"),
      hits: totalCategories,
    },
    {
      name: t("topSections.certifications"),
      hits: totalCertifications,
    },
    {
      name: t("topSections.testimonials"),
      hits: totalTestimonials,
    },
  ]

  // =========================
  // ACTIVITIES
  // =========================
  const activities = [
    ...recentUsers.map((recentUser) => ({
      text: `${recentUser.name || "User"} ${t(
        "activities.userRegistered"
      )}`,
      time: recentUser.createdAt,
    })),

    ...recentCertifications.map((cert) => ({
      text: t("activities.certificationCreated"),
      time: cert.createdAt,
    })),

    ...recentTestimonials.map((testimonial) => ({
      text: t("activities.testimonialSubmitted"),
      time: testimonial.createdAt,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.time).getTime() -
        new Date(a.time).getTime()
    )
    .slice(0, 6)

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t("header.welcome", {
            name: user.name || "Admin",
          })}
        </h1>

        <p className="text-gray-500 text-sm">
          {t("header.subtitle")}
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* TOTAL USERS */}
        <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              {t("cards.totalUsers.title")}
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {totalUsers}
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              {t("cards.totalUsers.subtitle", {
                total: totalAdmins,
              })}
            </p>
          </div>

          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <FiUsers size={20} />
          </div>
        </div>

        {/* ACTIVE SESSIONS */}
        <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              {t("cards.activeSessions.title")}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-1">
              {totalSessions}
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              {t("cards.activeSessions.subtitle")}
            </p>
          </div>

          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <FiActivity size={20} />
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              {t("cards.certifications.title")}
            </p>

            <h2 className="text-3xl font-bold text-purple-600 mt-1">
              {totalCertifications}
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              {t("cards.certifications.subtitle", {
                total: activeCertifications,
              })}
            </p>
          </div>

          <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
            <FiBookOpen size={20} />
          </div>
        </div>

        {/* VISIBLE TESTIMONIALS */}
        <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">
              {t("cards.visibleTestimonials.title")}
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-1">
              {visibleTestimonials}
            </h2>

            <p className="text-xs text-gray-400 mt-2">
              {t("cards.visibleTestimonials.subtitle")}
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-lg">
            <FiMessageSquare size={20} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT USERS */}
        <div className="bg-white p-5 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FiUserCheck size={18} />
            </span>

            {t("sections.recentUsers")}
          </h3>

          <ul className="space-y-4">
            {recentUsers.length > 0 ? (
              recentUsers.map((recentUser) => (
                <li
                  key={recentUser.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {recentUser.name || "Unnamed User"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {recentUser.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {recentUser.role}
                    </span>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(
                        recentUser.createdAt
                      ).toLocaleDateString(locale)}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                {t("empty.noUsers")}
              </p>
            )}
          </ul>
        </div>

        {/* SYSTEM INFO */}
        <div className="bg-white p-5 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 p-2 rounded-lg">
              <FiServer size={18} />
            </span>

            {t("sections.systemInformation")}
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{t("system.serverStatus")}</span>

              <span className="text-green-500 font-medium">
                {t("system.online")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.database")}</span>

              <span className="font-medium">
                PostgreSQL
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.totalCategories")}</span>

              <span className="font-medium">
                {totalCategories}
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                {t("system.inactiveCertifications")}
              </span>

              <span className="font-medium">
                {inactiveCertifications}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.hiddenTestimonials")}</span>

              <span className="font-medium">
                {hiddenTestimonials}
              </span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-6 rounded-[20px] shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiZap />

            {t("sections.quickActions")}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* USERS */}
            <Link
              href={`/${locale}/admin/users`}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2"
            >
              <FiUsers />

              {t("quickActions.addUser")}
            </Link>

            {/* CATEGORY */}
            <Link
              href={`/${locale}/admin/category`}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2"
            >
              <FiLayers />

              {t("quickActions.addCategory")}
            </Link>

            {/* CERTIFICATION */}
            <Link
              href={`/${locale}/admin/certification`}
              className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-sm flex items-center justify-center gap-2"
            >
              <FiBookOpen />

              {t("quickActions.addCertification")}
            </Link>

            {/* TESTIMONIAL */}
            <Link
              href={`/${locale}/admin/testimonial`}
              className="bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition text-sm flex items-center justify-center gap-2"
            >
              <FiMessageSquare />

              {t("quickActions.viewTestimonial")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}