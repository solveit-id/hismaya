import { prisma } from "@/lib/prisma";

import type { AboutDTO } from "./types";

export const getAbouts = async (): Promise<AboutDTO[]> => {

  const data =
    await prisma.about.findMany({
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
      item.part as AboutDTO["part"],

    desc:
      item.desc as AboutDTO["desc"],

    img: item.img,
  }));
};