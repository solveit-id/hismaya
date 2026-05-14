import { prisma } from "@/lib/prisma";

import { CertificationDTO } from "./types";

const generateSlug = (
  text: string
) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const parseMultilangField = (
  value: unknown
): Record<string, string> => {

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<
      string,
      string
    >;
  }

  if (typeof value === "string") {
    return {
      id: value,
      en: value,
    };
  }

  return {
    id: "",
    en: "",
  };
};

export const getCertifications =
  async (): Promise<
    CertificationDTO[]
  > => {

    const data =
      await prisma.certification.findMany(
        {
          where: {
            status: "ACTIVE",
          },

          include: {
            category: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        }
      );

    return data.map(
      (item) => {

        const name =
          parseMultilangField(
            item.name
          );

        return {
          id: item.id,

          slug: generateSlug(
            name.en ||
              name.id ||
              item.id
          ),

          name,

          desc:
            parseMultilangField(
              item.desc
            ),

          sector:
            parseMultilangField(
              item.sector
            ),

          duration:
            parseMultilangField(
              item.duration
            ),

          img: item.img,

          price: item.price,

          status: item.status,

          category: {
            id: item.category.id,

            name:
              parseMultilangField(
                item.category.name
              ),
          },
        };
      }
    );
  };