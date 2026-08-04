export type PublicNewsDTO = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string[]
  image: string | null
  category: string
  author: string
  publishedAt: string
  readingTime: string
}
