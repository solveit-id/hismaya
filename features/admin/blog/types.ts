import { MultiLang } from "@/types/multilang";

export type BlogItem = {
    id: string
    
    title: MultiLang
    slug: string
    excerpt: MultiLang | null
    content: MultiLang

    img?: string | null
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
    categoryId: string | null

    publishedAt: Date | null

    adminId: string

    admin?: {
        id: string
        name: string | null
    }

    category?: {
        id: string
        name: MultiLang
    } | null

    createdAt: Date
    updatedAt: Date
}

export type BlogFormState = {
    img: File | string | null

    title: MultiLang
    slug: string
    excerpt: MultiLang
    content: MultiLang

    status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
}