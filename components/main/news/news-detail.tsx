import Image from "next/image";
import Link from "next/link";

import type { News } from "@/types/news";

type NewsDetailProps = {
  news: News;
};

export default function NewsDetail({ news }: NewsDetailProps) {
  return (
    <article className="min-h-screen bg-white">
      <header className="relative overflow-hidden bg-gradient-to-b from-[078fd3]-50 via-gray-50 to-white px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        {/* Dekorasi blur di background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#E9E9E9] blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#078fd3] transition hover:gap-3 hover:text-black"
          >
            <span aria-hidden="true" className="transition-transform">
              ←
            </span>
            Kembali ke berita
          </Link>

          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#078fd3]/20 px-3 py-1.5 text-sm  text-black">
              {news.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            {news.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
            <span className="font-medium text-gray-800">{news.author}</span>
            <span aria-hidden="true">•</span>
            <time>{news.publishedAt}</time>
            <span aria-hidden="true">•</span>
            <span>{news.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto -mt-8 h-64 max-w-6xl overflow-hidden rounded-2xl bg-gray-100 shadow-xl ring-1 ring-black/5 sm:h-96 sm:-mt-10 lg:h-[500px]">
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {news.content.map((paragraph, index) => (
              <p
                key={`${news.slug}-${index}`}
                className="text-base leading-8 text-gray-700 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
