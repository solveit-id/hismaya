import type { Metadata } from "next"

import {
  getTranslations,
} from "next-intl/server"

import { prisma } from "@/lib/prisma"

import ServiceManagement
  from "@/components/admin/service/service-management"

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
        "admin.service",
    })

  return {
    title:
      t("page.metadata.title"),
  }
}

export default async function ServicePage({
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
        "admin.service",
    })

  const services =
    await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })

  return (
    <div className="bg-slate-50 min-h-screen p-6">

      <div className="max-w-screen-xl mx-auto">

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            {t("page.title")}
          </h1>

          <p className="text-sm text-gray-500">
            {t("page.subtitle")}
          </p>

        </div>

        <ServiceManagement
          services={services as any}
        />
      </div>
    </div>
  )
}