import type { Metadata } from "next"

import {
  getTranslations,
} from "next-intl/server"

import UserManagement
  from "@/components/admin/user/user-management"

import {
  getUsers,
} from "@/features/admin/user"

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
        "admin.user",
    })

  return {
    title: `${t("page.metadata.title")}`,
  }
}

const UserDashboard = async ({
  params,
}: {
  params: {
    locale: string
  }
}) => {

  const t =
    await getTranslations({
      locale: params.locale,
      namespace:
        "admin.user",
    })

  const users =
    await getUsers()

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

        <UserManagement
          users={users}
        />

      </div>
    </div>
  )
}

export default UserDashboard