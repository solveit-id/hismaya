import { auth } from "@/auth";
import { redirect } from "@/lib/i18n/navigation";
import { prisma } from "@/lib/prisma";

import { getVisitorStats } from "@/lib/dashboard/get-visitor-stats";

import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import Link from "next/link";

import {
  FiUsers,
  FiActivity,
  FiLayers,
  FiZap,
  FiServer,
  FiUserCheck,
  FiBookOpen,
  FiMessageSquare,
  FiEye,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "admin.dashboard",
  });

  return {
    title: t("page.metadata.title"),
  };
}

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "admin.dashboard",
  });

  // =========================
  // AUTH
  // =========================
  const session = await auth();

  if (!session?.user) {
    redirect({
      href: "/login",
      locale,
    });

    return null;
  }

  const user = session.user;

  if (user.role !== "ADMIN") {
    redirect({
      href: "/user/dashboard",
      locale,
    });

    return null;
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
    visitorStats,
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

    getVisitorStats(), // <-- tambahkan ini
  ]);

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
  ];

  // =========================
  // ACTIVITIES
  // =========================
  const activities = [
    ...recentUsers.map((recentUser) => ({
      text: `${recentUser.name || "User"} ${t("activities.userRegistered")}`,
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
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 6);

  // DATA FOR TRACKING
  const visitStatistics = {
    totalVisits: visitorStats.totalVisitors,
    todayVisits: visitorStats.todayVisitors,
    uniqueVisitors: visitorStats.uniqueVisitors,
    growth: visitorStats.growth,
  };

  const weeklyVisits = visitorStats.weeklyVisitors.map((item) => ({
    day: item.day,
    visits: item.visitors,
  }));

  const trafficSources = visitorStats.trafficSources.map((item) => ({
    source: item.label,
    visitors: item.visitors,
    percentage: item.percentage,
  }));

  const maximumVisit = Math.max(...weeklyVisits.map((item) => item.visits));

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t("header.welcome", {
            name: user.name || "Admin",
          })}
        </h1>

        <p className="text-gray-500 text-sm">{t("header.subtitle")}</p>
      </div>
      {/* VISITOR TRACKING */}
      <div className="space-y-6">
        {/* VISITOR SUMMARY */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL VISITS */}
          <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow transition hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500">
                {t("cards.sumvisitor.title")}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-800">
                {visitStatistics.totalVisits.toLocaleString(locale)}
              </h2>

              <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <FiTrendingUp size={13} />
                {visitStatistics.growth}% {t("cards.sumvisitor.subtitle")}
              </p>
            </div>

            <div className="rounded-lg bg-cyan-100 p-3 text-cyan-600">
              <FiEye size={20} />
            </div>
          </div>

          {/* TODAY VISITS */}
          <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow transition hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500">
                {t("cards.visitortoday.title")}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-blue-600">
                {visitStatistics.todayVisits.toLocaleString(locale)}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {t("cards.visitortoday.subtitle")}
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <FiActivity size={20} />
            </div>
          </div>

          {/* UNIQUE VISITORS */}
          <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow transition hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500">
                {t("cards.unicvisitor.title")}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-purple-600">
                {visitStatistics.uniqueVisitors.toLocaleString(locale)}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {t("cards.unicvisitor.subtitle")}
              </p>
            </div>

            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <FiUsers size={20} />
            </div>
          </div>

          {/* TRAFFIC GROWTH */}
          <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow transition hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500">
                {t("cards.growtraffic.title")}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-green-600">
                +{visitStatistics.growth}%
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                {t("cards.growtraffic.subtitle")}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <FiTrendingUp size={20} />
            </div>
          </div>
        </div>

        {/* VISITOR DETAIL */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* WEEKLY VISITS */}
          <div className="rounded-[20px] bg-white p-5 shadow lg:col-span-2">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <span className="rounded-lg bg-cyan-100 p-2 text-cyan-600">
                    <FiActivity size={18} />
                  </span>
                  {t("cards.statistiview.title")}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {t("cards.statistiview.subtitle")}
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                +{visitStatistics.growth}%
              </span>
            </div>

            <div className="flex h-[260px] items-end justify-between gap-3 border-b border-gray-100 pb-4">
              {weeklyVisits.map((item) => {
                const barHeight = (item.visits / maximumVisit) * 100;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className="text-xs font-medium text-gray-500">
                      {item.visits}
                    </span>

                    <div className="flex h-[190px] w-full items-end justify-center">
                      <div
                        className="w-full max-w-[48px] rounded-t-lg bg-[#078fd3] transition-all duration-300 hover:bg-[#013f5e]"
                        style={{
                          height: `${barHeight}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-gray-500">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRAFFIC SOURCES */}
          <div className="rounded-[20px] bg-white p-5 shadow">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <span className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                  <FiGlobe size={18} />
                </span>
                {t("cards.sourcevisitor.title")}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {t("cards.sourcevisitor.subtitle")}
              </p>
            </div>

            <div className="space-y-5">
              {trafficSources.map((item) => (
                <div key={item.source}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {item.source}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.visitors.toLocaleString(locale)}{" "}
                        {t("cards.sourcevisitor.description")}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-gray-600">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#078fd3]"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

                    <p className="text-sm text-gray-500">{recentUser.email}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {recentUser.role}
                    </span>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(recentUser.createdAt).toLocaleDateString(
                        locale,
                      )}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">{t("empty.noUsers")}</p>
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

              <span className="font-medium">PostgreSQL</span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.totalCategories")}</span>

              <span className="font-medium">{totalCategories}</span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.inactiveCertifications")}</span>

              <span className="font-medium">{inactiveCertifications}</span>
            </div>

            <div className="flex justify-between">
              <span>{t("system.hiddenTestimonials")}</span>

              <span className="font-medium">{hiddenTestimonials}</span>
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
  );
}
