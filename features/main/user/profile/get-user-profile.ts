import { prisma } from "@/lib/prisma";
import { UserProfileDTO } from "./types";

export const getUserProfile = async (
  userId: string
): Promise<UserProfileDTO | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
    role: user.role,
  };
};