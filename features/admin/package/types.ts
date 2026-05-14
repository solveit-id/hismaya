import { MultiLang } from "@/types/multilang"

export type PackageItem = {
  id: string

  title: MultiLang

  subtitle: MultiLang

  short_desc: MultiLang

  long_desc: MultiLang

  createdAt: Date

  updatedAt: Date
}

export type PackageFormState = {
  title: MultiLang

  subtitle: MultiLang

  short_desc: MultiLang

  long_desc: MultiLang
}