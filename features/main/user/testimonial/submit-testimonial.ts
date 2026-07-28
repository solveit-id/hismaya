import { prisma } from "@/lib/prisma";

export const submitTestimonial = async (
  userId: string,
  message: Record<string, string>
) => {
  return prisma.testimonial.create({
    data: {
      userId,
      testimonial: message,
      status: "VISIBLE",
    },
  });
};