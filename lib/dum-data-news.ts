import type { News } from "@/types/news";

export const newsData: News[] = [
  {
    id: 1,
    title: "Pentingnya Sertifikasi Halal bagi Pelaku Usaha",
    slug: "pentingnya-sertifikasi-halal-bagi-pelaku-usaha",
    excerpt:
      "Sertifikasi halal menjadi salah satu aspek penting untuk meningkatkan kepercayaan konsumen dan memperluas pasar produk.",
    content: [
      "Sertifikasi halal merupakan bentuk jaminan bahwa produk telah memenuhi standar kehalalan yang ditetapkan. Bagi pelaku usaha, sertifikasi halal bukan hanya menjadi kewajiban administratif, tetapi juga bagian dari strategi untuk membangun kepercayaan konsumen.",
      "Dengan adanya sertifikat halal, konsumen dapat memperoleh informasi yang lebih jelas mengenai proses produksi, bahan baku, serta pengelolaan produk. Hal ini sangat penting terutama bagi pelaku usaha yang bergerak di bidang makanan, minuman, kosmetik, dan produk konsumsi lainnya.",
      "Selain meningkatkan kepercayaan konsumen, sertifikasi halal juga memberikan peluang bagi pelaku usaha untuk menjangkau pasar yang lebih luas. Produk yang telah tersertifikasi memiliki nilai tambah dan lebih mudah diterima oleh berbagai kelompok masyarakat.",
      "Hismaya hadir untuk membantu pelaku usaha dalam memahami dan menjalani proses sertifikasi halal secara lebih terarah, mudah, dan sesuai dengan ketentuan yang berlaku.",
    ],
    image: "/images/news/sertifikasi-halal.jpg",
    category: "Sertifikasi Halal",
    author: "Tim Hismaya",
    publishedAt: "28 Juli 2026",
    readingTime: "5 menit baca",
  },
  {
    id: 2,
    title: "Pelatihan Pendampingan Halal untuk Pelaku UMKM",
    slug: "pelatihan-pendampingan-halal-untuk-pelaku-umkm",
    excerpt:
      "Pelatihan pendampingan halal membantu pelaku UMKM memahami proses pengajuan sertifikat halal secara sistematis.",
    content: [
      "Pelaku UMKM memiliki peranan penting dalam pertumbuhan ekonomi masyarakat. Namun, masih banyak pelaku usaha yang belum memahami prosedur pengajuan sertifikasi halal.",
      "Melalui pelatihan pendampingan halal, pelaku usaha mendapatkan pemahaman mengenai dokumen, bahan baku, proses produksi, serta persyaratan yang harus dipenuhi.",
      "Pelatihan tersebut diharapkan dapat membantu pelaku usaha mempersiapkan proses sertifikasi halal dengan lebih baik dan mengurangi kesalahan dalam pengajuan dokumen.",
    ],
    image: "/images/news/pelatihan-umkm.jpg",
    category: "Pelatihan",
    author: "Tim Hismaya",
    publishedAt: "25 Juli 2026",
    readingTime: "4 menit baca",
  },
  {
    id: 3,
    title: "Sertifikasi Halal Membuka Peluang Pasar Ekspor",
    slug: "sertifikasi-halal-membuka-peluang-pasar-ekspor",
    excerpt:
      "Produk bersertifikat halal memiliki peluang lebih besar untuk masuk ke pasar nasional maupun internasional.",
    content: [
      "Perkembangan industri halal dunia memberikan peluang besar bagi pelaku usaha Indonesia. Produk yang telah memiliki sertifikat halal dinilai memiliki tingkat kepercayaan yang lebih tinggi.",
      "Sertifikasi halal juga dapat menjadi salah satu persyaratan ketika pelaku usaha ingin memperluas pemasaran ke negara dengan mayoritas penduduk muslim.",
      "Pelaku usaha perlu mempersiapkan kualitas produk, legalitas usaha, kapasitas produksi, serta standar keamanan agar mampu bersaing di pasar ekspor.",
    ],
    image: "/images/news/ekspor-produk.jpg",
    category: "Bisnis",
    author: "Tim Hismaya",
    publishedAt: "20 Juli 2026",
    readingTime: "6 menit baca",
  },
];

export function getNewsBySlug(slug: string): News | undefined {
  return newsData.find((news) => news.slug === slug);
}
