import { MultiLang } from "@/types/multilang"

export type ServiceItem = {
  id: string

  img?: string | null

  part: MultiLang

  desc: MultiLang

  createdAt: Date

  updatedAt: Date
}

export type ServiceFormState = {
  img: File | string | null

  part: MultiLang

  desc: MultiLang
}