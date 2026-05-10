import type { Metadata } from "next"

import {
  getTranslations,
} from "next-intl/server"

import { prisma } from "@/lib/prisma"

import CertificationManagement
  from "@/components/layout/admin/certification-management"

export async function generateMetadata({
  params,
}: {
  params: {
    locale: string
  }
}): Promise<Metadata> {

  const t =
    await getTranslations({
      locale: params.locale,
      namespace:
        "admin.certification",
    })

  return {
    title: `${t("page.metadata.title")}`,
  }
}

export default async function CertificationDashboard({
  params,
}: {
  params: {
    locale: string
  }
}) {

  const t =
    await getTranslations({
      locale: params.locale,
      namespace:
        "admin.certification",
    })

  // =========================
  // GET CERTIFICATIONS
  // =========================
  const certifications =
    await prisma.certification.findMany({
      include: {
        category: true,
        admin: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    })

  // =========================
  // GET CATEGORIES
  // =========================
  const categories =
    await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

  return (
    <div className="bg-slate-50 min-h-screen p-6">

      <div className="max-w-screen-xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            {t("page.title")}
          </h1>

          <p className="text-sm text-gray-500">
            {t("page.subtitle")}
          </p>

        </div>

        {/* TABLE */}
        <CertificationManagement
          certifications={certifications as any}
          categories={categories as any}
        />

      </div>
    </div>
  )
}