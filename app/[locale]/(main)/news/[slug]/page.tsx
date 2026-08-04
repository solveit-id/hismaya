import { notFound } from "next/navigation";

import NewsDetail from "@/components/main/news/news-detail";
import { getNewsBySlug } from "@/features/main/news";

type NewsDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = await getNewsBySlug(
    params.slug,
    params.locale
  );

  if (!news) {
    notFound();
  }

  return <NewsDetail news={news} />;
}
