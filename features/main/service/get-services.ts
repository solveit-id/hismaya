import { prisma } from "@/lib/prisma";

import type { ServiceDTO } from "./types";

export const getServices = async (): Promise<ServiceDTO[]> => {

  const data =
    await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },

      select: {
        id: true,
        part: true,
        desc: true,
        img: true,
      },
    });

  return data.map((item) => ({
    id: item.id,

    part:
      item.part as ServiceDTO["part"],

    desc:
      item.desc as ServiceDTO["desc"],

    img: item.img,
  }));
};