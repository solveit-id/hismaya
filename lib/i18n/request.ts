import { getRequestConfig } from "next-intl/server";

import {
  locales,
  defaultLocale,
} from "@/lib/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const activeLocale =
    requested && locales.includes(requested as any)
      ? requested
      : defaultLocale;

  const messages = {
    common: (
      await import(`@/messages/${activeLocale}/common.json`)
    ).default,

    auth: {
      login: (
        await import(`@/messages/${activeLocale}/auth/login.json`)
      ).default,

      register: (
        await import(`@/messages/${activeLocale}/auth/register.json`)
      ).default,
    },

    admin: {
      sidebar: (
        await import(`@/messages/${activeLocale}/admin/sidebar.json`)
      ).default,

      dashboard: (
        await import(`@/messages/${activeLocale}/admin/dashboard.json`)
      ).default,

      user: (
        await import(`@/messages/${activeLocale}/admin/user.json`)
      ).default,

      about: (
        await import(`@/messages/${activeLocale}/admin/about.json`)
      ).default,

      service: (
        await import(`@/messages/${activeLocale}/admin/service.json`)
      ).default,

      package: (
        await import(`@/messages/${activeLocale}/admin/packages.json`)
      ).default,

      category: (
        await import(`@/messages/${activeLocale}/admin/category.json`)
      ).default,

      certification: (
        await import(`@/messages/${activeLocale}/admin/certification.json`)
      ).default,

      testimonial: (
        await import(`@/messages/${activeLocale}/admin/testimonial.json`)
      ).default,
    },

    main: {
      navbar: (
        await import(`@/messages/${activeLocale}/main/navbar.json`)
      ).default,
      
      hero: (
        await import(`@/messages/${activeLocale}/main/hero.json`)
      ).default,

      partner: (
        await import(`@/messages/${activeLocale}/main/partner.json`)
      ).default,

      about: (
        await import(`@/messages/${activeLocale}/main/about.json`)
      ).default,

      service: (
        await import(`@/messages/${activeLocale}/main/service.json`)
      ).default,

      certification: (
        await import(`@/messages/${activeLocale}/main/certification.json`)
      ).default,

      package: (
        await import(`@/messages/${activeLocale}/main/packages.json`)
      ).default,

      testimonial: (
        await import(`@/messages/${activeLocale}/main/testimonial.json`)
      ).default,

      footer: (
        await import(`@/messages/${activeLocale}/main/footer.json`)
      ).default,
    },
  };

  return {
    locale: activeLocale,
    messages,
  };
});