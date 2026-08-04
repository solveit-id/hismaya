import Hero from "@/components/main/hero/hero";

import AboutUs from "@/components/main/about/about";

import OurService from "@/components/main/service/service";

import CertificationProgram from "@/components/main/certification/certification";

import PartnerLogos from "@/components/main/partner/partner-logos";

import BundlingPackage from "@/components/main/package/package";
import NewsSection from "@/components/main/news/news-section";

import { getAbouts } from "@/features/main/about";

import { getServices } from "@/features/main/service";

import { getCertifications } from "@/features/main/certification";

import { getNews } from "@/features/main/news";

import { getPackages } from "@/features/main/package";

export default async function HomePage({
  params,
}: {
  params: {
    locale: string
  }
}) {
  const [abouts, services, certifications, packages, news] = await Promise.all([
    getAbouts(),
    getServices(),
    getCertifications(),
    getPackages(),
    getNews(params.locale),
  ]);

  return (
    <div className="bg-[#e9e9e9] text-[#252d3c]">
      <Hero />

      <PartnerLogos />

      <AboutUs abouts={abouts} />

      <OurService services={services} />

      <CertificationProgram certifications={certifications} />

      <BundlingPackage />

      <NewsSection news={news} />
    </div>
  );
}
