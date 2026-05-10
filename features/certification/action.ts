"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CertificationSchema } from "./schema"
import { auth } from "@/auth"

export const createCertification = async (formData: FormData) => {
  try {
    const validated = CertificationSchema.safeParse({
      name_id: formData.get("name_id"),
      name_en: formData.get("name_en"),

      desc_id: formData.get("desc_id"),
      desc_en: formData.get("desc_en"),

      duration_id: formData.get("duration_id"),
      duration_en: formData.get("duration_en"),

      price: formData.get("price"),
      status: formData.get("status"),

      categoryId: formData.get("categoryId"),
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

    await prisma.certification.create({
      data: {
        name: {
          id: data.name_id,
          en: data.name_en,
        },
        desc: {
          id: data.desc_id || "",
          en: data.desc_en || "",
        },
        duration: {
          id: data.duration_id || "",
          en: data.duration_en || "",
        },
        price: parseFloat(data.price),
        status: data.status,
        categoryId: data.categoryId,
        adminId: session.user.id
      },
    })

    revalidatePath("/admin/certification")

    return {
      success: true,
      message: "Certification created successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to create certification",
    }
  }
}

export const updateCertification = async (
  id: string,
  formData: FormData
) => {
  try {
    const validated = CertificationSchema.safeParse({
      name_id: formData.get("name_id"),
      name_en: formData.get("name_en"),

      desc_id: formData.get("desc_id"),
      desc_en: formData.get("desc_en"),

      duration_id: formData.get("duration_id"),
      duration_en: formData.get("duration_en"),

      price: formData.get("price"),
      status: formData.get("status"),

      categoryId: formData.get("categoryId"),
    })

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validated.error.flatten().fieldErrors,
      }
    }

    const data = validated.data

    await prisma.certification.update({
      where: { id },
      data: {
        name: {
          id: data.name_id,
          en: data.name_en,
        },
        desc: {
          id: data.desc_id || "",
          en: data.desc_en || "",
        },
        duration: {
          id: data.duration_id || "",
          en: data.duration_en || "",
        },
        price: parseFloat(data.price),
        status: data.status,
        categoryId: data.categoryId,
      },
    })

    revalidatePath("/admin/certification")

    return {
      success: true,
      message: "Certification updated successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to update certification",
    }
  }
}

export const deleteCertification = async (id: string) => {
  try {
    await prisma.certification.delete({
      where: { id },
    })

    revalidatePath("/admin/certification")

    return {
      success: true,
      message: "Certification deleted successfully",
    }
  } catch {
    return {
      success: false,
      message: "Failed to delete certification",
    }
  }
}