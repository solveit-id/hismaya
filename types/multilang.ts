import { Locale } from "@/lib/i18n/config"

export type { Locale }

export type MultiLang = {
  [key in Locale]: string
}