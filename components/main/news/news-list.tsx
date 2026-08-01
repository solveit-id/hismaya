import type { News } from "@/types/news";

import NewsCard from "./news-card";

type NewsListProps = {
  news: News[];
};

export default function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Berita belum tersedia
        </h2>

        <p className="mt-2 text-gray-600">
          Informasi dan artikel terbaru akan segera ditampilkan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
