import NewsDetail from "@/components/main/news/news-detail";

type NewsDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const dummyNews = {
    id: 1,
    title: "Pentingnya Sertifikasi Halal bagi Pelaku Usaha",
    slug: params.slug,
    excerpt: "Sertifikasi halal membantu meningkatkan kepercayaan konsumen.",
    content: [
      "Sertifikasi halal menjadi bagian penting dalam pengembangan usaha.",
      "Dengan sertifikasi halal, produk memiliki nilai tambah dan tingkat kepercayaan yang lebih tinggi.",
    ],
    image: "/images/news/sertifikasi-halal.jpg",
    category: "Sertifikasi Halal",
    author: "Tim Hismaya",
    publishedAt: "28 Juli 2026",
    readingTime: "5 menit baca",
  };

  return <NewsDetail news={dummyNews} />;
}
