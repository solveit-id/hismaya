import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  // =========================
  // ABOUT
  // =========================
  const aboutCount =
    await prisma.about.count()

  if (aboutCount === 0) {

    await prisma.about.createMany({
      data: [
        {
          part: {
            id: "Siapa Kami",
            en: "Who We Are",
          },

          desc: {
            id: "Lembaga profesional berkomitmen meningkatkan kualitas dan kompetensi individu secara berkelanjutan",
            en: "Professional institutions are committed to continuously improving the quality and competence of individuals",
          },

          img: "",
        },

        {
          part: {
            id: "Apa yang Kami Lakukan",
            en: "What We Do",
          },

          desc: {
            id: "Menyediakan pelatihan pembelajaran dan sertifikasi inovatif sesuai kebutuhan industri saat ini",
            en: "Providing innovative learning training and certification according to current industry needs",
          },

          img: "",
        },

        {
          part: {
            id: "Bagaimana Kami Membantu",
            en: "How We Help",
          },

          desc: {
            id: "Membantu mengembangkan pengetahuan keterampilan dan sikap kerja melalui proses terstruktur profesional",
            en: "Help develop knowledge, skills and work attitudes through a professional structured process",
          },

          img: "",
        },

        {
          part: {
            id: "Menciptakan Kompetensi Unggul",
            en: "Creating Superior Competence",
          },

          desc: {
            id: "Memastikan peserta memiliki standar kompetensi tinggi menjadi profesional siap bersaing global",
            en: "Ensuring that participants have high competency standards to become professionals ready to compete globally",
          },

          img: "",
        },
      ],
    })
  }

  // =========================
  // SERVICE
  // =========================
  const serviceCount =
    await prisma.service.count()

  if (serviceCount === 0) {

    await prisma.service.createMany({
      data: [
        {
          part: {
            id: "Sertifikasi Kompetensi Nasional",
            en: "National Competency Certification",
          },

          desc: {
            id: "Proses sertifikasi yang mengacu pada Standar Kompetensi Kerja Nasional Indonesia (SKKNI) melalui uji kompetensi yang dilakukan oleh Lembaga Sertifikasi Profesi (LSP) berlisensi Badan Nasional Sertifikasi Profesi (BNSP). Melalui proses ini, peserta diuji secara objektif untuk memastikan kemampuan kerja sesuai standar nasional sehingga siap bersaing di dunia kerja dan industri.",
            en: "The certification process, which adheres to the Indonesian National Work Competency Standards (SKKNI), involves a competency test conducted by a Professional Certification Institute (LSP) licensed by the National Professional Certification Agency (BNSP). This process objectively assesses participants to ensure their work skills meet national standards, ensuring they are ready to compete in the workforce and industry.",
          },

          img: "",
        },

        {
          part: {
            id: "Sertifikasi Internasional",
            en: "International Certification",
          },

          desc: {
            id: "Program sertifikasi yang diakui secara global dan menggunakan standar internasional untuk memastikan kompetensi peserta relevan dengan kebutuhan industri dunia. Dengan sertifikasi ini, peserta memiliki nilai tambah berupa pengakuan lintas negara sehingga membuka peluang karier yang lebih luas dan profesional.",
            en: "This globally recognized certification program adheres to international standards to ensure participants' competencies are relevant to global industry needs. This certification provides participants with the added value of international recognition, opening up broader and more professional career opportunities.",
          },

          img: "",
        },

        {
          part: {
            id: "Sertifikasi ISO",
            en: "ISO certification",
          },

          desc: {
            id: "Program sertifikasi dan workshop ISO untuk membantu individu maupun perusahaan memahami penerapan standar internasional secara efektif. Materi disusun secara aplikatif dengan pembahasan implementasi ISO yang relevan terhadap kebutuhan industri modern dan pengembangan sistem manajemen.",
            en: "ISO certification programs and workshops help individuals and companies understand the effective implementation of international standards. The material is structured in an applicable manner, discussing ISO implementation relevant to the needs of modern industry and management system development.",
          },

          img: "",
        },

        {
          part: {
            id: "Paket Bundling",
            en: "Bundling Package",
          },

          desc: {
            id: "Paket bundling memberikan kombinasi pelatihan dan sertifikasi dengan harga yang lebih efisien serta materi yang saling terintegrasi. Cocok bagi peserta yang ingin meningkatkan kompetensi secara lebih lengkap dalam satu program pembelajaran profesional.",
            en: "Bundling packages offer a combination of training and certification at a more cost-effective price point and integrated materials. Suitable for participants seeking a more comprehensive competency development within a single professional learning program.",
          },

          img: "",
        },
      ],
    })
  }

  // =========================
  // PACKAGE
  // =========================
  const packageCount =
    await prisma.package.count()

  if (packageCount === 0) {

    await prisma.package.createMany({
      data: [
        {
          title: {
            id: "Paket Bundling I",
            en: "Bundling Package I",
          },

          subtitle: {
            id: "INSTRUKTUR LEVEL IV + PUBLIC SPEAKING",
            en: "LEVEL IV INSTRUCTOR + PUBLIC SPEAKING",
          },

          short_desc: {
            id: "Tingkatkan komunikasi dan kemampuan mengajar.",
            en: "Improve communication and teaching skills.",
          },

          long_desc: {
            id: "Paket pelatihan untuk meningkatkan kompetensi instruktur sekaligus kemampuan komunikasi, presentasi, dan penyampaian materi di depan audiens.",
            en: "Training packages to improve instructor competency as well as communication, presentation and material delivery skills in front of an audience.",
          },
        },

        {
          title: {
            id: "Paket Bundling II",
            en: "Bundling Package II",
          },

          subtitle: {
            id: "INSTRUKTUR LEVEL IV + PELAYANAN PRIMA",
            en: "LEVEL IV INSTRUCTOR + EXCELLENT SERVICE",
          },

          short_desc: {
            id: "Bangun pelayanan prima yang profesional.",
            en: "Build professional, excellent service.",
          },

          long_desc: {
            id: "Kombinasi pelatihan instruktur dan service excellence untuk membangun kemampuan mengajar yang profesional serta pelayanan yang responsif.",
            en: "A combination of instructor training and service excellence to build professional teaching skills and responsive service.",
          },
        },

        {
          title: {
            id: "Paket Bundling III",
            en: "Bundling Package III",
          },

          subtitle: {
            id: "INSTRUKTUR LEVEL IV + PUBLIC SPEAKING",
            en: "LEVEL IV INSTRUCTOR + PUBLIC SPEAKING",
          },

          short_desc: {
            id: "Perkuat public speaking dan rasa percaya diri.",
            en: "Strengthen public speaking and self-confidence.",
          },

          long_desc: {
            id: "Program bundling untuk memperkuat keterampilan instruktur dalam memfasilitasi pembelajaran dan membangun kepercayaan diri saat berbicara.",
            en: "Bundling program to strengthen instructors' skills in facilitating learning and building confidence when speaking.",
          },
        },
      ],
    })
  }

  console.log(
    "✅ Seeder completed"
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })