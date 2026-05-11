export type IsoCertification = {
  id: number;
  title: string;
  image: string;
  imageAlt: string;
  description: string;

  category: string;
  duration: string;

  benefits: string[];

};

export const isoCertifications: IsoCertification[] = [
  {
    id: 1,
    title: "Workshop ISO 21001:2018",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=520&q=80",
    imageAlt: "Workshop ISO 21001 untuk sistem manajemen pendidikan",

    category: "Manajemen Pendidikan",
    duration: "2 Hari",

    description:
      "Pelatihan pemahaman dan implementasi ISO 21001:2018 untuk sistem manajemen organisasi pendidikan.",

    benefits: [
      "Memahami standar ISO 21001:2018",
      "Meningkatkan kualitas sistem pendidikan",
      "Membantu pengelolaan organisasi pendidikan lebih efektif",
    ],

  },

  {
    id: 2,
    title: "Workshop ISO 9001:2015",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=520&q=80",
    imageAlt: "Workshop ISO 9001 manajemen mutu",

    category: "Manajemen Mutu",
    duration: "3 Hari",

    description:
      "Workshop implementasi ISO 9001:2015 untuk meningkatkan sistem manajemen mutu perusahaan dan organisasi.",

    benefits: [
      "Memahami sistem manajemen mutu",
      "Meningkatkan efisiensi operasional perusahaan",
      "Meningkatkan kualitas produk dan layanan",
    ],

  },

  {
    id: 3,
    title: "Workshop ISO 31000",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=520&q=80",
    imageAlt: "Workshop ISO 31000 manajemen risiko",

    category: "Manajemen Risiko",
    duration: "2 Hari",

    description:
      "Pelatihan dasar hingga implementasi ISO 31000 dalam pengelolaan risiko organisasi secara efektif.",

    benefits: [
      "Memahami konsep manajemen risiko",
      "Membantu identifikasi dan mitigasi risiko",
      "Meningkatkan pengambilan keputusan organisasi",
    ],

  },
];