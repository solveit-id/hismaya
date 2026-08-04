import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getVisitorStats() {
  const now = new Date();

  // Hari ini
  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);

  // 7 hari terakhir (termasuk hari ini)
  const startWeek = new Date(now);
  startWeek.setDate(now.getDate() - 6);

  // Awal bulan ini
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Minggu sebelumnya
  const startPreviousWeek = new Date(now);
  startPreviousWeek.setDate(now.getDate() - 13);

  const endPreviousWeek = new Date(now);
  endPreviousWeek.setDate(now.getDate() - 6);

  const [
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    uniqueVisitors,
    loggedInVisitors,
    guestVisitors,
    topPages,
    previousWeekVisitors,
    visitors,
  ] = await Promise.all([
    prisma.visitor.count(),

    prisma.visitor.count({
      where: {
        createdAt: {
          gte: startToday,
        },
      },
    }),

    prisma.visitor.count({
      where: {
        createdAt: {
          gte: startWeek,
        },
      },
    }),

    prisma.visitor.count({
      where: {
        createdAt: {
          gte: startMonth,
        },
      },
    }),

    prisma.visitor.groupBy({
      by: ["sessionId"],
      where: {
        sessionId: {
          not: null,
        },
      },
    }),

    prisma.visitor.count({
      where: {
        userId: {
          not: null,
        },
      },
    }),

    prisma.visitor.count({
      where: {
        userId: null,
      },
    }),

    prisma.visitor.groupBy({
      by: ["path"],
      _count: {
        path: true,
      },
      orderBy: {
        _count: {
          path: "desc",
        },
      },
      take: 10,
    }),

    prisma.visitor.count({
      where: {
        createdAt: {
          gte: startPreviousWeek,
          lt: endPreviousWeek,
        },
      },
    }),

    prisma.visitor.findMany({
      select: {
        referer: true,
      },
    }),
  ]);

  // =========================
  // Grafik Visitor 7 Hari
  // =========================

  const last7Days = await prisma.$queryRaw<
    {
      day: string;
      total: bigint;
    }[]
  >(Prisma.sql`
      SELECT
        TO_CHAR("createdAt", 'YYYY-MM-DD') AS day,
        COUNT(*) AS total
      FROM visitors
      WHERE "createdAt" >= NOW() - INTERVAL '6 days'
      GROUP BY day
      ORDER BY day ASC
  `);

  const weeklyVisitors: {
    day: string;
    visitors: number;
  }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const key = date.toISOString().split("T")[0];

    const found = last7Days.find((item) => item.day === key);

    weeklyVisitors.push({
      day: date.toLocaleDateString("id-ID", {
        weekday: "short",
      }),
      visitors: Number(found?.total ?? 0),
    });
  }

  // =========================
  // Growth
  // =========================

  const growth =
    previousWeekVisitors === 0
      ? weekVisitors > 0
        ? 100
        : 0
      : Number(
          (
            ((weekVisitors - previousWeekVisitors) /
              previousWeekVisitors) *
            100
          ).toFixed(1)
        );

  // =========================
  // Traffic Sources
  // =========================

  let direct = 0;
  let google = 0;
  let social = 0;
  let referral = 0;

  for (const visitor of visitors) {
    const ref = visitor.referer?.toLowerCase() ?? "";

    if (!ref) {
      direct++;
    } else if (
      ref.includes("google.") ||
      ref.includes("bing.") ||
      ref.includes("yahoo.")
    ) {
      google++;
    } else if (
      ref.includes("facebook.") ||
      ref.includes("instagram.") ||
      ref.includes("linkedin.") ||
      ref.includes("twitter.") ||
      ref.includes("x.com") ||
      ref.includes("tiktok.")
    ) {
      social++;
    } else {
      referral++;
    }
  }

  const totalTraffic =
    direct + google + social + referral;

  const trafficSources = [
    {
      label: "Direct",
      visitors: direct,
      percentage:
        totalTraffic === 0
          ? 0
          : Math.round((direct / totalTraffic) * 100),
    },
    {
      label: "Google Search",
      visitors: google,
      percentage:
        totalTraffic === 0
          ? 0
          : Math.round((google / totalTraffic) * 100),
    },
    {
      label: "Social Media",
      visitors: social,
      percentage:
        totalTraffic === 0
          ? 0
          : Math.round((social / totalTraffic) * 100),
    },
    {
      label: "Referral",
      visitors: referral,
      percentage:
        totalTraffic === 0
          ? 0
          : Math.round((referral / totalTraffic) * 100),
    },
  ];

  return {
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,

    uniqueVisitors: uniqueVisitors.length,

    loggedInVisitors,
    guestVisitors,

    growth,

    weeklyVisitors,

    topPages: topPages.map((page) => ({
      path: page.path,
      visitors: page._count.path,
    })),

    trafficSources,
  };
}