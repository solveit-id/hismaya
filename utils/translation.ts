import type { Locale }
  from "@/lib/i18n/config"

export function getTranslation(
  field:
    | Record<string, string>
    | null
    | undefined,
  locale: Locale,
  fallback: Locale = "id"
) {
  if (!field) return ""

  return (
    field[locale] ||
    field[fallback] ||
    ""
  )
}