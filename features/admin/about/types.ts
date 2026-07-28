import { MultiLang } from "@/types/multilang"

export type AboutItem = {
  id: string

  img?: string | null

  part: MultiLang

  desc: MultiLang

  createdAt: Date

  updatedAt: Date
}

export type AboutFormState = {
  img: File | string | null

  part: MultiLang

  desc: MultiLang
}