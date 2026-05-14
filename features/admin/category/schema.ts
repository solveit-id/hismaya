import { z } from "zod"

export const CategorySchema = z.object({
  name_id: z
    .string()
    .min(1, "Category name indonesia is required"),

  name_en: z
    .string()
    .min(1, "Category name english is required"),

  desc_id: z.string().optional(),

  desc_en: z.string().optional(),
})