"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { uploadImage, deleteImage } from "@/lib/blob"
import { revalidatePath } from "next/cache"

import { BlogSchema } from "./schema"

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

const createUniqueSlug = async (
  title: string,
  currentId?: string
) => {
  const baseSlug =
    createSlug(title) || `blog-${Date.now()}`

  let slug = baseSlug
  let counter = 1

  while (true) {
    const existingBlog =
      await prisma.blog.findUnique({
        where: { slug },
        select: { id: true },
      })

    if (
      !existingBlog ||
      existingBlog.id === currentId
    ) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter += 1
  }
}

const fileToDataUrl = async (file: File) => {
  const buffer = Buffer.from(
    await file.arrayBuffer()
  )

  return `data:${file.type};base64,${buffer.toString("base64")}`
}

const uploadBlogImage = async (file: File) => {
  try {
    return await uploadImage(file, "blogs")
  } catch (error) {
    console.error("Failed to upload blog image:", error)

    return fileToDataUrl(file)
  }
}

export const createBlog = async (formData: FormData) => {
  try {
    const titleId = String(
      formData.get("title_id") || ""
    )
    const categoryId = String(
      formData.get("categoryId") || ""
    )

    const validated = BlogSchema.safeParse({
      img: formData.get("img") as File,

      title_id: titleId,
      title_en: formData.get("title_en"),

      slug: await createUniqueSlug(titleId),

      excerpt_id: formData.get("excerpt_id"),
      excerpt_en: formData.get("excerpt_en"),

      content_id: formData.get("content_id"),
      content_en: formData.get("content_en"),

      status: formData.get("status"),
      categoryId,
    })

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      }
    }

    const data = validated.data

    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true },
    })

    if (!categoryExists) {
      return {
        success: false,
        message: "Selected category is invalid",
      }
    }

    let imagePath: string | null = null

    if (
      data.img &&
      typeof data.img !== "string" &&
      data.img.size > 0
    ) {
      imagePath = await uploadBlogImage(data.img)
    }

    await prisma.blog.create({
      data: {
        img: imagePath,

        title: {
          id: data.title_id,
          en: data.title_en,
        },

        slug: data.slug,

        excerpt: {
          id: data.excerpt_id || "",
          en: data.excerpt_en || "",
        },

        content: {
          id: data.content_id,
          en: data.content_en,
        },

        status: data.status,
        categoryId: data.categoryId,

        publishedAt:
          data.status === "PUBLISHED" ? new Date() : null,

        adminId: session.user.id,
      },
    })

    revalidatePath("/admin/news", "page")
    revalidatePath("/", "page")
    revalidatePath("/news", "page")

    return {
      success: true,
      message: "Blog created successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to create blog",
    }
  }
}

export const updateBlog = async (
  id: string,
  formData: FormData
) => {
  try {
    const titleId = String(
      formData.get("title_id") || ""
    )
    const categoryId = String(
      formData.get("categoryId") || ""
    )

    const validated = BlogSchema.safeParse({
      img: formData.get("img") as File,

      title_id: titleId,
      title_en: formData.get("title_en"),

      slug: await createUniqueSlug(titleId, id),

      excerpt_id: formData.get("excerpt_id"),
      excerpt_en: formData.get("excerpt_en"),

      content_id: formData.get("content_id"),
      content_en: formData.get("content_en"),

      status: formData.get("status"),
      categoryId,
    })

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      }
    }

    const data = validated.data

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      select: {
        img: true,
        status: true,
        publishedAt: true,
        categoryId: true,
      },
    })

    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true },
    })

    if (!categoryExists) {
      return {
        success: false,
        message: "Selected category is invalid",
      }
    }

    let imagePath: string | undefined

    if (
      data.img &&
      typeof data.img !== "string" &&
      data.img.size > 0
    ) {
      if (
        existingBlog?.img &&
        !existingBlog.img.startsWith("data:")
      ) {
        await deleteImage(existingBlog.img)
      }

      imagePath = await uploadBlogImage(data.img)
    }

    await prisma.blog.update({
      where: { id },

      data: {
        ...(imagePath && {
          img: imagePath,
        }),

        title: {
          id: data.title_id,
          en: data.title_en,
        },

        slug: data.slug,

        excerpt: {
          id: data.excerpt_id || "",
          en: data.excerpt_en || "",
        },

        content: {
          id: data.content_id,
          en: data.content_en,
        },

        status: data.status,
        categoryId: data.categoryId,

        publishedAt:
          data.status === "PUBLISHED" && !existingBlog?.publishedAt
            ? new Date()
            : data.status === "PUBLISHED"
              ? existingBlog?.publishedAt
              : null,
      },
    })

    revalidatePath("/admin/news", "page")
    revalidatePath("/", "page")
    revalidatePath("/news", "page")

    return {
      success: true,
      message: "Blog updated successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to update blog",
    }
  }
}

export const deleteBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        img: true,
      },
    })

    if (blog?.img) {
      await deleteImage(blog.img)
    }

    await prisma.blog.delete({
      where: { id },
    })

    revalidatePath("/admin/news", "page")
    revalidatePath("/", "page")
    revalidatePath("/news", "page")

    return {
      success: true,
      message: "Blog deleted successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to delete blog",
    }
  }
}
