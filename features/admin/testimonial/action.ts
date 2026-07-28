"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const toggleTestimonialStatus = async (
  id: string,
  currentStatus: "VISIBLE" | "HIDDEN"
) => {
  try {

    await prisma.testimonial.update({
      where: {
        id,
      },

      data: {
        status:
          currentStatus === "VISIBLE"
            ? "HIDDEN"
            : "VISIBLE",
      },
    })

    revalidatePath("/admin/testimonial")

    return {
      success: true,
      message:
        "Testimonial updated successfully",
    }

  } catch (error) {

    return {
      success: false,
      message:
        "Failed to update testimonial",
    }
  }
}