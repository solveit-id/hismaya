import { prisma } from "@/lib/prisma";

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};