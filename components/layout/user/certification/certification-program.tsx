import Link from "next/link";
import CertificationFilteredGrid from "./certification-filtered-grid";

export default function CertificationProgram() {
  return (
    <section id="certification" className="bg-[#e9e9e9] px-6 py-20 text-[#252d3c] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-col items-center text-center">
                <span className="rounded-md bg-[#078fd3] px-4 py-2 text-sm font-extrabold leading-none text-white shadow-[0_8px_16px_rgba(7,143,211,0.22)]">
                    Daftar Program Sertifikasi
                </span>

                <h2 className="mt-4 text-[34px] font-extrabold leading-none tracking-normal text-[#252d3c] sm:text-[40px]">
                    Daftar <span className="text-[#078fd3]">Sertifikasi</span>
                </h2>
            </div>

            <CertificationFilteredGrid limit={6} />

            <div className="mt-14 flex justify-center">
                <Link
                    href="/user/certifications"
                    className="rounded-lg bg-[#078fd3] px-8 py-3 text-[15px] font-extrabold leading-none text-white shadow-[0_8px_14px_rgba(7,143,211,0.22)]"
                >
                    Lihat Semua Skema
                </Link>
            </div>
        </div>
    </section>
  );
}
