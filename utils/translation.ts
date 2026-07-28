export function getTranslation(
  field:
    | Record<string, string>
    | string
    | null
    | undefined,
  locale: string
): string {
  if (!field) return "";

  if (typeof field === "string") {
    return field;
  }

  return (
    field[locale] ||
    field.id ||
    field.en ||
    Object.values(field)[0] ||
    ""
  );
}