import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import NewsList from "@/components/main/news/news-list";
import Reveal from "@/components/shared/animation/reveal";

import { getNews } from "@/features/main/news";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("main.news.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

type NewsPageProps = {
  params: {
    locale: string;
  };
};

export default async function NewsPage({ params }: NewsPageProps) {
  const t = await getTranslations("main.news");
  const news = await getNews(params.locale);

  return (
    <main className="min-h-screen overflow-hidden bg-gray-50">
      <section className="bg-[#078fd3] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              {t("header.eyebrow")}
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t("header.title")}
            </h1>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <p className="mt-5 max-w-2xl leading-7 text-white">
              {t("header.description")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" delay={0.2}>
            <NewsList news={news} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
