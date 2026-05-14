import { MultiLang } from "@/types/multilang"

export type TestimonialItem = {
  id: string

  testimonial: MultiLang

  status: "VISIBLE" | "HIDDEN"

  createdAt: Date
  updatedAt: Date

  userId: string

  user: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
}