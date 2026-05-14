import { z } from "zod"

export const AboutSchema = z.object({
  img: z.any().optional(),

  part_id: z
    .string()
    .min(1, "Part ID is required"),

  part_en: z
    .string()
    .min(1, "Part EN is required"),

  desc_id: z.string().optional(),

  desc_en: z.string().optional(),
})