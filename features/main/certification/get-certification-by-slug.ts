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

export const getCertificationBySlug =
  async (
    slug: string
  ): Promise<CertificationDTO | null> => {

    const items =
      await prisma.certification.findMany(
        {
          where: {
            status: "ACTIVE",
          },

          include: {
            category: true,
          },
        }
      );

    const certification =
      items.find((item) => {

        const name =
          parseMultilangField(
            item.name
          );

        const generatedSlug =
          generateSlug(
            name.en ||
              name.id ||
              item.id
          );

        return (
          generatedSlug === slug
        );
      });

    if (!certification)
      return null;

    const name =
      parseMultilangField(
        certification.name
      );

    return {
      id: certification.id,

      slug,

      name,

      desc:
        parseMultilangField(
          certification.desc
        ),

      sector:
        parseMultilangField(
          certification.sector
        ),

      duration:
        parseMultilangField(
          certification.duration
        ),

      img: certification.img,

      price: certification.price,

      status:
        certification.status,

      category: {
        id:
          certification
            .category.id,

        name:
          parseMultilangField(
            certification.category
              .name
          ),
      },
    };
  };