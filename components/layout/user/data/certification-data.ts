export const nationalCertificationFields = [
  "K3",
  "SERTIFIKASI MEDIA, PUBLIKASI, KREATIF & PENYIARAN",
  "Sertifikasi Metodologi Pelatihan",
  "ADMINISTRASI, SDM & MANAJEMEN",
];

export const internationalCertificationFields = [
  "CPSP (Certified Public Speaking Professional)",
  "CCSP (Certified Customer Service Professional)",
  "Financial Planning Level Basic (RFA)",
  "CPHRM (Certified Professional Human Resource Management)",
];

export const certificationTypes = ["Nasional", "Internasional"] as const;

export type CertificationType = (typeof certificationTypes)[number];

export type Certification = {
  id: number;
  title: string;
  type: CertificationType;
  field: string;

  category: string;
  duration: string;

  image: string;
  imageAlt: string;
  description: string;

  benefits?: string[];

};

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Ahli K3 Muda",
    type: "Nasional",
    field: "K3",

    category: "Keselamatan Kerja",
    duration: "3 Hari",

    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Peserta sertifikasi keselamatan kerja di area industri",

    description:
      "Program sertifikasi untuk membuktikan kompetensi dasar dalam penerapan keselamatan dan kesehatan kerja.",

  },

  {
    id: 2,
    title: "Ahli K3 Umum",
    type: "Nasional",
    field: "K3",

    category: "Keselamatan Kerja",
    duration: "5 Hari",

    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Pekerja industri mengenakan perlengkapan keselamatan",

    description:
      "Skema sertifikasi untuk profesional yang bertanggung jawab mengelola penerapan K3 di lingkungan kerja.",

  },

  {
    id: 3,
    title: "Operator Forklift",
    type: "Nasional",
    field: "K3",

    category: "Operator Alat Berat",
    duration: "4 Hari",

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Aktivitas logistik dan pergudangan",

    description:
      "Sertifikasi kompetensi bagi operator alat angkat angkut dalam area logistik, gudang, dan industri.",

  },

  {
    id: 4,
    title: "Administrasi Perkantoran",
    type: "Nasional",
    field: "ADMINISTRASI, SDM & MANAJEMEN",

    category: "Administrasi",
    duration: "2 Hari",

    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Diskusi profesional sumber daya manusia",

    description:
      "Validasi kompetensi untuk fungsi administrasi, pengelolaan data, dan layanan sumber daya manusia.",

  },

  {
    id: 5,
    title: "Digital Content Creator",
    type: "Nasional",
    field: "SERTIFIKASI MEDIA, PUBLIKASI, KREATIF & PENYIARAN",

    category: "Digital Marketing",
    duration: "3 Hari",

    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Analisis pemasaran digital di layar komputer",

    description:
      "Sertifikasi untuk mengukur kemampuan perencanaan, eksekusi, dan evaluasi aktivitas pemasaran digital.",

  },

  {
    id: 6,
    title: "Metodologi Pelatihan",
    type: "Nasional",
    field: "Sertifikasi Metodologi Pelatihan",

    category: "Trainer Professional",
    duration: "2 Hari",

    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Pembicara menyampaikan materi di depan audiens",

    description:
      "Skema untuk membuktikan kemampuan komunikasi, presentasi, dan penyampaian pesan secara profesional.",

  },

  {
    id: 7,
    title: "CPSP",
    type: "Internasional",
    field: "CPSP (Certified Public Speaking Professional)",

    category: "Public Speaking",
    duration: "4 Hari",

    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Petugas layanan pelanggan membantu klien",

    description:
      "Sertifikasi kompetensi layanan untuk meningkatkan kualitas interaksi, respons, dan kepuasan pelanggan.",

  },

  {
    id: 8,
    title: "CCSP",
    type: "Internasional",
    field: "CCSP (Certified Customer Service Professional)",

    category: "Customer Service",
    duration: "3 Hari",

    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Instruktur memfasilitasi pelatihan profesional",

    description:
      "Pengakuan kompetensi bagi instruktur dalam merancang, melaksanakan, dan mengevaluasi pembelajaran.",

  },

  {
    id: 9,
    title: "Financial Planning Level Basic",
    type: "Internasional",
    field: "Financial Planning Level Basic (RFA)",

    category: "Financial Planning",
    duration: "5 Hari",

    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Profesional meninjau dokumen dan grafik bisnis",

    description:
      "Sertifikasi untuk memahami proses identifikasi, analisis, pengendalian, dan pemantauan risiko organisasi.",

  },

  {
    id: 10,
    title: "CPHRM",
    type: "Internasional",
    field: "CPHRM (Certified Professional Human Resource Management)",

    category: "Human Resource",
    duration: "5 Hari",

    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=520&q=80",

    imageAlt: "Diskusi profesional sumber daya manusia",

    description:
      "Program sertifikasi internasional untuk profesional human resource management dan pengembangan SDM.",

  },
];