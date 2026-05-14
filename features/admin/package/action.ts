"use server"

import { prisma } from "@/lib/prisma"

import { revalidatePath } from "next/cache"

import { PackageSchema } from "./schema"

export const updatePackage = async (
  id: string,
  formData: FormData
) => {
  try {

    const validated =
      PackageSchema.safeParse({

        title_id:
          formData.get("title_id"),

        title_en:
          formData.get("title_en"),

        subtitle_id:
          formData.get("subtitle_id"),

        subtitle_en:
          formData.get("subtitle_en"),

        short_desc_id:
          formData.get(
            "short_desc_id"
          ),

        short_desc_en:
          formData.get(
            "short_desc_en"
          ),

        long_desc_id:
          formData.get(
            "long_desc_id"
          ),

        long_desc_en:
          formData.get(
            "long_desc_en"
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

    await prisma.package.update({
      where: { id },

      data: {

        title: {
          id:
            data.title_id,

          en:
            data.title_en,
        },

        subtitle: {
          id:
            data.subtitle_id ||
            "",

          en:
            data.subtitle_en ||
            "",
        },

        short_desc: {
          id:
            data.short_desc_id ||
            "",

          en:
            data.short_desc_en ||
            "",
        },

        long_desc: {
          id:
            data.long_desc_id ||
            "",

          en:
            data.long_desc_en ||
            "",
        },
      },
    })

    revalidatePath(
      "/admin/package"
    )

    return {
      success: true,
      message:
        "Package page data updated successfully",
    }

  } catch {
    return {
      success: false,
      message:
        "Failed to update package page data",
    }
  }
}