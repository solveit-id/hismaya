import Hero from "@/components/main/hero/hero";

import AboutUs from "@/components/main/about/about";

import OurService from "@/components/main/service/service";

import CertificationProgram from "@/components/main/certification/certification";

import PartnerLogos from "@/components/main/partner/partner-logos";

import BundlingPackage from "@/components/main/package/package";

import { getAbouts }
  from "@/features/main/about";

import { getServices }
  from "@/features/main/service";

import {
  getCertifications,
} from "@/features/main/certification";

import { getPackages } from "@/features/main/package";

export default async function HomePage() {

  const [
    abouts,
    services,
    certifications,
    packages,
  ] = await Promise.all([
    getAbouts(),
    getServices(),
    getCertifications(),
    getPackages(),
  ]);

  return (
    <div className="bg-[#e9e9e9] text-[#252d3c]">

      <Hero />

      <PartnerLogos />

      <AboutUs
        abouts={abouts}
      />

      <OurService
        services={services}
      />

      <CertificationProgram
        certifications={
          certifications
        }
      />

      <BundlingPackage />

    </div>
  );
}