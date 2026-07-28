import { prisma } from "@/lib/prisma";
import { TestimonialDTO } from "./types";

export const getTestimonials = async (): Promise<TestimonialDTO[]> => {
  const data = await prisma.testimonial.findMany({
    where: {
      status: "VISIBLE",
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data.map((item) => ({
    id: item.id,

    testimonial: item.testimonial as Record<string, string>,

    user: {
      id: item.user.id,
      name: item.user.name,
      image: item.user.image,
    },

    status: item.status,
  }));
};