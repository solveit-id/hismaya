import AboutUs from "@/components/layout/user/about/about-us";
import Hero from "@/components/layout/user/hero/hero";
import PartnerLogos from "@/components/layout/user/partner/partner-logos";
import OurService from "@/components/layout/user/service/our-service";
// import Navbar from "@/components/layout/user/navbar/navbar";
import CertificationProgram from "@/components/layout/user/certification/certification-program";
import BundlingPackage from "@/components/layout/user/certification/bundling-package";
import Testimonials from "@/components/layout/user/testimonial/testimonials";
import CollaborationCta from "@/components/layout/user/cta/collaboration-cta";
// import Footer from "@/components/layout/user/footer/footer";
import FloatingWhatsapp from "@/components/layout/user/whatsapp/floating-whatsapp";


export default function Home() {
  return (
    <div>
        {/* <Navbar /> */}
        <Hero />
        <PartnerLogos />
        <div id="about">
        <AboutUs />
        </div>
        <div id="service">
        <OurService />
        </div>
        <div id="certification">
        <CertificationProgram />
        </div>
        <div id="bundling">
        <BundlingPackage />
        </div>
        {/* <div id="testimonials">
        <Testimonials />
        </div> */}
        <div id="collaboration">
        <CollaborationCta />
        </div>
        {/* <Footer /> */}

        
        <FloatingWhatsapp />

    </div>
  );
}
