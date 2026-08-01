"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { News } from "@/types/news";

import NewsCard from "./news-card";

type NewsSectionProps = {
  news: News[];
};

const headerVariants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: "easeOut" as const,
    },
  },
};

export default function NewsSection({ news }: NewsSectionProps) {
  const latestNews = news.slice(0, 3);

  return (
    <section
      id="news"
      className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          {/* HEADER MUNCUL DARI KIRI */}
          <motion.div
            className="max-w-2xl"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2457ff]">
              Informasi Terkini
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#252d3c] sm:text-4xl">
              Berita dan Artikel Hismaya
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Temukan informasi terbaru mengenai sertifikasi, layanan, dan
              perkembangan Hismaya.
            </p>
          </motion.div>

          {/* BUTTON MUNCUL DARI KANAN */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            <Link
              href="/news"
              className="inline-flex w-fit rounded-lg border bg-[#078fd3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#013f5e] hover:text-white"
            >
              Lihat semua berita
            </Link>
          </motion.div>
        </div>

        {/* NEWS CARD */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              <NewsCard news={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
