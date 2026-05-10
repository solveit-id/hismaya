import { getRequestConfig } from "next-intl/server"

import {
  locales,
  defaultLocale,
} from "@/lib/i18n/config"

export default getRequestConfig(
  async ({ locale }) => {

    const activeLocale =
      locale &&
      locales.includes(locale as any)
        ? locale
        : defaultLocale

    const messages = {
      admin: {

        sidebar: (
          await import(
            `@/messages/${activeLocale}/admin/sidebar.json`
          )
        ).default,

        dashboard: (
          await import(
            `@/messages/${activeLocale}/admin/dashboard.json`
          )
        ).default,

        users: (
          await import(
            `@/messages/${activeLocale}/admin/users.json`
          )
        ).default,

        category: (
          await import(
            `@/messages/${activeLocale}/admin/category.json`
          )
        ).default,

        certification: (
          await import(
            `@/messages/${activeLocale}/admin/certification.json`
          )
        ).default,

        testimonial: (
          await import(
            `@/messages/${activeLocale}/admin/testimonial.json`
          )
        ).default,
      },
    }

    return {
      locale: activeLocale,
      messages,
    }
  }
)