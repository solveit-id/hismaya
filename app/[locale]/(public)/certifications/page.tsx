import CertificationFilteredGrid from "@/components/layout/user/certification/certification-filtered-grid";
import Footer from "@/components/layout/user/footer/footer";
import Navbar from "@/components/layout/user/navbar/navbar";

export default function CertificationsPage() {
  return (
    <div className="bg-[#e9e9e9] text-[#252d3c]">
      <Navbar />

      <main className="px-6 py-20 sm:px-10 lg:px-20">
        <section id="certification" className="mx-auto max-w-[1120px]">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-md bg-[#078fd3] px-4 py-2 text-sm font-extrabold leading-none text-white shadow-[0_8px_16px_rgba(7,143,211,0.22)]">
              Semua Program Sertifikasi
            </span>

            <h1 className="mt-4 text-[34px] font-extrabold leading-none tracking-normal text-[#252d3c] sm:text-[42px]">
              Daftar <span className="text-[#078fd3]">Sertifikasi</span>
            </h1>
          </div>

          <CertificationFilteredGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
