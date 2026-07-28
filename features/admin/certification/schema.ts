import { z } from "zod"

export const CertificationSchema = z.object({
  img: z.any().optional(),
  
  name_id: z.string().min(1, "Certification name Indonesia is required"),
  name_en: z.string().min(1, "Certification name English is required"),

  desc_id: z.string().optional(),
  desc_en: z.string().optional(),

  sector_id: z.string().optional(),
  sector_en: z.string().optional(),

  duration_id: z.string().optional(),
  duration_en: z.string().optional(),

  price: z.string().min(1, "Price is required"),

  status: z.enum(["ACTIVE", "INACTIVE"]),

  categoryId: z.string().min(1, "Category is required"),
})