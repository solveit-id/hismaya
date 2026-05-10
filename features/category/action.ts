"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CategorySchema } from "./schema"

export const createCategory = async (
  formData: FormData
) => {
  try {
    const validatedFields =
      CategorySchema.safeParse({
        name_id: formData.get("name_id"),
        name_en: formData.get("name_en"),

        desc_id: formData.get("desc_id"),
        desc_en: formData.get("desc_en"),
      })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const {
      name_id,
      name_en,
      desc_id,
      desc_en,
    } = validatedFields.data

    await prisma.category.create({
      data: {
        name: {
          id: name_id,
          en: name_en,
        },

        desc: {
          id: desc_id || "",
          en: desc_en || "",
        },
      },
    })

    revalidatePath("/admin/category")

    return {
      success: true,
      message: "Category created successfully",
    }

  } catch (error) {
    return {
      success: false,
      message: "Failed to create category",
    }
  }
}

export const updateCategory = async (
  id: string,
  formData: FormData
) => {
  try {
    const validatedFields =
      CategorySchema.safeParse({
        name_id: formData.get("name_id"),
        name_en: formData.get("name_en"),

        desc_id: formData.get("desc_id"),
        desc_en: formData.get("desc_en"),
      })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const {
      name_id,
      name_en,
      desc_id,
      desc_en,
    } = validatedFields.data

    await prisma.category.update({
      where: {
        id,
      },

      data: {
        name: {
          id: name_id,
          en: name_en,
        },

        desc: {
          id: desc_id || "",
          en: desc_en || "",
        },
      },
    })

    revalidatePath("/admin/category")

    return {
      success: true,
      message: "Category updated successfully",
    }

  } catch (error) {
    return {
      success: false,
      message: "Failed to update category",
    }
  }
}

export const deleteCategory = async (
  id: string
) => {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    })

    revalidatePath("/admin/category")

    return {
      success: true,
      message: "Category deleted successfully",
    }

  } catch (error) {
    return {
      success: false,
      message: "Failed to delete category",
    }
  }
}