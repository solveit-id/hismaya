import { Link } from "@/lib/i18n/navigation";
import { getTranslations } from "next-intl/server";

import Reveal from "@/components/shared/animation/reveal";

import type { News } from "@/types/news";

type NewsDetailProps = {
  news: News;
};

export default async function NewsDetail({ news }: NewsDetailProps) {
  const t = await getTranslations("main.news");

  return (
    <article className="min-h-screen overflow-hidden bg-white">
      <header className="relative overflow-hidden bg-gradient-to-b from-[#078fd3]/10 via-gray-50 to-white px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#E9E9E9] blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl">
          <Reveal direction="left">
            <Link
              href="/news"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#078fd3] transition hover:gap-3 hover:text-black"
            >
              <span aria-hidden="true">←</span>

              {t("button.back")}
            </Link>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#078fd3]/20 px-3 py-1.5 text-sm text-black">
                {news.category}
              </span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {news.title}
            </h1>
          </Reveal>

          <Reveal direction="left" delay={0.25}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {news.excerpt}
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
              <span className="font-medium text-gray-800">{news.author}</span>

              <span aria-hidden="true">•</span>

              <time>{news.publishedAt}</time>

              <span aria-hidden="true">•</span>

              <span>{news.readingTime}</span>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8">
        <Reveal
          direction="up"
          delay={0.2}
          className="relative mx-auto -mt-8 max-w-6xl sm:-mt-10"
        >
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gray-100 shadow-xl ring-1 ring-black/5 sm:h-96 lg:h-[500px]">
            {news.image ? (
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-lg font-semibold text-gray-400">
                Hismaya
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[780px]">
          <div className="space-y-7">
            {news.content.map((paragraph, index) => (
              <Reveal
                key={`${news.slug}-${index}`}
                direction="up"
                delay={Math.min(index * 0.05, 0.2)}
              >
                <p className="text-justify text-[17px] font-normal leading-[1.9] tracking-[0.005em] text-gray-700 sm:text-[18px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
