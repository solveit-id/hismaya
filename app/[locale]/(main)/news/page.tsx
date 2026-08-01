import type { Metadata } from "next";

import NewsList from "@/components/main/news/news-list";
import { newsData } from "@/lib/dum-data-news";

export const metadata: Metadata = {
  title: "Berita dan Artikel | Hismaya",
  description:
    "Informasi terbaru mengenai sertifikasi halal, pelatihan, UMKM, dan pengembangan industri halal.",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-[#078fd3] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Hismaya News
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Berita dan Artikel
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-white">
            Temukan informasi, wawasan, dan perkembangan terbaru mengenai
            sertifikasi halal serta pengembangan usaha.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <NewsList news={newsData} />
        </div>
      </section>
    </main>
  );
}
