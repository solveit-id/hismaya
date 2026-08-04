import { prisma } from "@/lib/prisma"

import type { PublicNewsDTO } from "./types"

const fallbackImage = "/images/news/sertifikasi-halal.jpg"

const parseMultilangField = (
  value: unknown
): Record<string, string> => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<string, string>
  }

  if (typeof value === "string") {
    return {
      id: value,
      en: value,
    }
  }

  return {
    id: "",
    en: "",
  }
}

const getLocalizedText = (
  value: unknown,
  locale: string
) => {
  const data = parseMultilangField(value)

  return data[locale] || data.id || data.en || ""
}

const formatDate = (
  value: Date | null,
  locale: string
) =>
  new Intl.DateTimeFormat(
    locale === "en" ? "en-US" : "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(value || new Date())

const getParagraphs = (content: string) =>
  content
    .split(/\n{2,}|\r\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

const getReadingTime = (
  content: string,
  locale: string
) => {
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  const minutes = Math.max(
    1,
    Math.ceil(wordCount / 200)
  )

  return locale === "en"
    ? `${minutes} min read`
    : `${minutes} menit baca`
}

const mapBlogToNews = (
  blog: {
    id: string
    title: unknown
    slug: string
    excerpt: unknown
    content: unknown
    img: string | null
    publishedAt: Date | null
    createdAt: Date
    admin: {
      name: string | null
    } | null
    category?: {
      name: unknown
    } | null
  },
  locale: string
): PublicNewsDTO => {
  const content = getLocalizedText(
    blog.content,
    locale
  )

  return {
    id: blog.id,
    title: getLocalizedText(blog.title, locale),
    slug: blog.slug,
    excerpt: getLocalizedText(blog.excerpt, locale),
    content: getParagraphs(content),
    image: blog.img || fallbackImage,
    category:
      getLocalizedText(
        blog.category?.name,
        locale
      ) ||
      (locale === "en"
        ? "Hismaya News"
        : "Berita Hismaya"),
    author: blog.admin?.name || "Tim Hismaya",
    publishedAt: formatDate(
      blog.publishedAt || blog.createdAt,
      locale
    ),
    readingTime: getReadingTime(content, locale),
  }
}

export const getNews = async (
  locale: string
): Promise<PublicNewsDTO[]> => {
  const blogs = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      admin: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  })

  return blogs.map((blog) =>
    mapBlogToNews(blog, locale)
  )
}

export const getNewsBySlug = async (
  slug: string,
  locale: string
) => {
  const blog = await prisma.blog.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      admin: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!blog) return null

  return mapBlogToNews(blog, locale)
}
