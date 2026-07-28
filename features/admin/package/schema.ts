import { z } from "zod"

export const PackageSchema = z.object({
  title_id: z
    .string()
    .min(1, "Title ID is required"),

  title_en: z
    .string()
    .min(1, "Title EN is required"),

  subtitle_id: z.string().optional(),

  subtitle_en: z.string().optional(),

  short_desc_id: z.string().optional(),

  short_desc_en: z.string().optional(),

  long_desc_id: z.string().optional(),

  long_desc_en: z.string().optional(),
})