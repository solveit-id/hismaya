"use server"

import { prisma } from "@/lib/prisma"

import { revalidatePath } from "next/cache"

import { AboutSchema } from "./schema"

import path from "path"

import fs from "fs/promises"

export const updateAbout = async (
  id: string,
  formData: FormData
) => {
  try {

    const validated =
      AboutSchema.safeParse({
        img:
          formData.get("img") as File,

        part_id:
          formData.get("part_id"),

        part_en:
          formData.get("part_en"),

        desc_id:
          formData.get("desc_id"),

        desc_en:
          formData.get("desc_en"),
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

    const existingAbout =
      await prisma.about.findUnique({
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

      const bytes =
        await data.img.arrayBuffer()

      const buffer =
        Buffer.from(bytes)

      const fileName =
        `${Date.now()}-${data.img.name}`

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/abouts"
      )

      await fs.mkdir(uploadDir, {
        recursive: true,
      })

      if (existingAbout?.img) {

        const oldImagePath =
          path.join(
            process.cwd(),
            "public",
            existingAbout.img
          )

        try {
          await fs.unlink(
            oldImagePath
          )
        } catch {}
      }

      const filePath = path.join(
        uploadDir,
        fileName
      )

      await fs.writeFile(
        filePath,
        buffer
      )

      imagePath =
        `/uploads/abouts/${fileName}`
    }

    await prisma.about.update({
      where: { id },

      data: {
        ...(imagePath && {
          img: imagePath,
        }),

        part: {
          id: data.part_id,
          en: data.part_en,
        },

        desc: {
          id:
            data.desc_id || "",

          en:
            data.desc_en || "",
        },
      },
    })

    revalidatePath("/admin/about")

    return {
      success: true,
      message:
        "About page data updated successfully",
    }

  } catch {
    return {
      success: false,
      message:
        "Failed to update about page data",
    }
  }
}