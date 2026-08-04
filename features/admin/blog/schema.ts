import { z } from "zod";

export const BlogSchema = z.object({
    img: z.any().optional(),

    title_id: z.string().min(1, { message: "Title Indonesia is required" }),
    title_en: z.string().min(1, { message: "Title English is required" }),

    slug: z.string().min(1, { message: "Slug is required" }),

    excerpt_id: z.string().optional(),
    excerpt_en: z.string().optional(),

    content_id: z.string().min(1, { message: "Content Indonesia is required" }),
    content_en: z.string().min(1, { message: "Content English is required" }),

    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    categoryId: z.string().min(1, { message: "Category is required" }),
})