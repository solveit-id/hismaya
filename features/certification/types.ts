import { MultiLang } from "@/types/multilang"

export type CertificationItem = {
  id: string

  name: MultiLang
  desc: MultiLang
  duration: MultiLang

  price: number
  status: "ACTIVE" | "INACTIVE"

  categoryId: string
  category?: {
    id: string
    name: MultiLang
  }

  admin?: {
    id: string
    name: string | null
  }

  createdAt: Date
  updatedAt: Date
}

export type CertificationFormState = {
  name: MultiLang
  desc: MultiLang
  duration: MultiLang
  price: string
  status: "ACTIVE" | "INACTIVE"
  categoryId: string
}