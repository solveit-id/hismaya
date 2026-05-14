import { prisma } from "@/lib/prisma";
import { PackageDTO } from "./types";

export const getPackages = async (): Promise<PackageDTO[]> => {
  const data = await prisma.package.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return data.map((item) => ({
    id: item.id,

    title: item.title as Record<string, string>,
    subtitle: item.subtitle as Record<string, string>,

    short_desc: item.short_desc as Record<string, string>,
    long_desc: item.long_desc as Record<string, string>,
  }));
};