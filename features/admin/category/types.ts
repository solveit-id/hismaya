import { MultiLang } from "@/types/multilang"

export type CategoryFormState = {
  name: MultiLang
  desc: MultiLang
}

export type CategoryItem = {
  id: string
  name: MultiLang
  desc: MultiLang
  createdAt: Date
  updatedAt: Date
}