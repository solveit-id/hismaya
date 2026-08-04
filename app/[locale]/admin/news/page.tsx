import { prisma } from "@/lib/prisma"

import NewsManagement from "@/components/admin/news/news-management"

export default async function AdminNewsPage() {
  const [blogs, categories] = await Promise.all([
    prisma.blog.findMany({
      include: {
        admin: true,
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ])

  return <NewsManagement blogs={blogs as any} categories={categories as any} />
}