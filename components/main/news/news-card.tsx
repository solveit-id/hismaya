import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types/news";

type NewsCardProps = {
  news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
  const detailUrl = `/news/${news.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={detailUrl}
        className="relative block h-56 overflow-hidden bg-gray-200"
      >
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-gray-500">{news.publishedAt}</p>

        <Link href={detailUrl}>
          <h3 className="mt-3 text-xl font-semibold text-[#252d3c] transition group-hover:text-[#2457ff]">
            {news.title}
          </h3>
        </Link>

        <p className="mt-3 text-sm leading-6 text-gray-600">{news.excerpt}</p>

        <Link
          href={detailUrl}
          className="mt-auto pt-5 text-sm font-semibold text-[#2457ff]"
        >
          Baca selengkapnya →
        </Link>
      </div>
    </article>
  );
}
