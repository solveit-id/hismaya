"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

import { CertificationSchema } from "./schema"

import { auth } from "@/auth"

import {
  uploadImage,
  deleteImage,
} from "@/lib/blob"

export const createCertification = async (
  formData: FormData
) => {
  try {
    const validated =
      CertificationSchema.safeParse({
        img:
          formData.get("img") as File,

        name_id:
          formData.get("name_id"),

        name_en:
          formData.get("name_en"),

        desc_id:
          formData.get("desc_id"),

        desc_en:
          formData.get("desc_en"),

        sector_id:
          formData.get("sector_id"),

        sector_en:
          formData.get("sector_en"),

        duration_id:
          formData.get("duration_id"),

        duration_en:
          formData.get("duration_en"),

        price:
          formData.get("price"),

        status:
          formData.get("status"),

        categoryId:
          formData.get("categoryId"),
      })

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed",
        errors:
          validated.error.flatten()
            .fieldErrors,
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

    let imagePath: string | null = null

    if (
      data.img &&
      typeof data.img !== "string" &&
      data.img.size > 0
    ) {
      imagePath = await uploadImage(
        data.img,
        "certifications"
      )
    }

    await prisma.certification.create({
      data: {
        img: imagePath,

        name: {
          id: data.name_id,
          en: data.name_en,
        },

        desc: {
          id: data.desc_id || "",
          en: data.desc_en || "",
        },

        sector: {
          id: data.sector_id || "",
          en: data.sector_en || "",
        },

        duration: {
          id:
            data.duration_id || "",

          en:
            data.duration_en || "",
        },

        price: parseFloat(
          data.price
        ),

        status: data.status,

        categoryId:
          data.categoryId,

        adminId:
          session.user.id,
      },
    })

    revalidatePath("/admin/certification", "page")

    return {
      success: true,
      message:
        "Certification created successfully",
    }
  } catch {
    return {
      success: false,
      message:
        "Failed to create certification",
    }
  }
}

export const updateCertification =
  async (
    id: string,
    formData: FormData
  ) => {
    try {
      const validated =
        CertificationSchema.safeParse({
          img:
            formData.get("img") as File,

          name_id:
            formData.get("name_id"),

          name_en:
            formData.get("name_en"),

          desc_id:
            formData.get("desc_id"),

          desc_en:
            formData.get("desc_en"),

          sector_id:
            formData.get("sector_id"),

          sector_en:
            formData.get("sector_en"),

          duration_id:
            formData.get(
              "duration_id"
            ),

          duration_en:
            formData.get(
              "duration_en"
            ),

          price:
            formData.get("price"),

          status:
            formData.get("status"),

          categoryId:
            formData.get(
              "categoryId"
            ),
        })

      if (!validated.success) {
        return {
          success: false,
          message:
            "Validation failed",

          errors:
            validated.error.flatten()
              .fieldErrors,
        }
      }

      const data = validated.data

      const existingCertification =
        await prisma.certification.findUnique({
          where: { id },
          select: {
            img: true,
          },
        })

      let imagePath: string | undefined

      if (
        data.img &&
        typeof data.img !== "string" &&
        data.img.size > 0
      ) {
        if (existingCertification?.img) {
          await deleteImage(
            existingCertification.img
          )
        }

        imagePath = await uploadImage(
          data.img,
          "certifications"
        )
      }

      await prisma.certification.update({
        where: { id },

        data: {
          ...(imagePath && {
            img: imagePath,
          }),
          
          name: {
            id: data.name_id,
            en: data.name_en,
          },

          desc: {
            id:
              data.desc_id || "",

            en:
              data.desc_en || "",
          },

          sector: {
            id:
              data.sector_id || "",

            en:
              data.sector_en || "",
          },

          duration: {
            id:
              data.duration_id ||
              "",

            en:
              data.duration_en ||
              "",
          },

          price: parseFloat(
            data.price
          ),

          status: data.status,

          categoryId:
            data.categoryId,
        },
      })

      revalidatePath("/admin/certification", "page")

      return {
        success: true,
        message:
          "Certification updated successfully",
      }
    } catch {
      return {
        success: false,
        message:
          "Failed to update certification",
      }
    }
  }

export const deleteCertification =
  async (id: string) => {
    try {

      const certification =
        await prisma.certification.findUnique({
          where: { id },

          select: {
            img: true,
          },
        })

      // DELETE IMAGE FILE
      if (certification?.img) {

        await deleteImage(
          certification.img
        )
      }

      // DELETE DATABASE
      await prisma.certification.delete({
        where: { id },
      })

      revalidatePath("/admin/about", "page")

      return {
        success: true,
        message:
          "Certification deleted successfully",
      }

    } catch {
      return {
        success: false,
        message:
          "Failed to delete certification",
      }
    }
  }