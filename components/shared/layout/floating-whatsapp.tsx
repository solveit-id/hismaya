"use client";

import Image from "next/image";
import { useState } from "react";

export default function FloatingWhatsapp() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "6285933486769";

  const message = encodeURIComponent(
    "Halo admin, saya ingin bertanya mengenai pelatihan dan sertifikasi."
  );

  return (
    <>
      {/* CHAT BOX */}
      <div
        className={`
          fixed bottom-[110px] right-5 z-[9999]
          w-[360px] overflow-hidden rounded-[22px]
          bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]
          transition-all duration-300
          ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-5 opacity-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between bg-[#078fd3] px-5 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white">
              <Image
                src="/img/hismayaaaa.png"
                alt="Logo"
                width={58}
                height={58}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-[22px] font-extrabold leading-none">
                Support Hismaya
              </h3>

              <p className="mt-1 text-[13px] font-medium text-[#5cff76]">
                online
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[32px] font-bold text-white transition hover:rotate-90"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-6">
          <h4 className="text-[15px] font-bold text-[#3a3a3a]">
            Support Hismaya
          </h4>

          <div className="mt-4 rounded-[16px] border border-[#ececec] bg-white px-4 py-5 shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
            <p className="text-[16px] leading-[1.7] text-[#444]">
              Hi, <br />
              Ada yang bisa kami bantu?
            </p>
          </div>

          <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex h-[54px] w-full items-center justify-center rounded-full bg-[#25D366] text-[18px] font-bold text-white shadow-[0_10px_25px_rgba(37,211,102,0.28)] transition hover:scale-[1.02] hover:bg-[#1fc15b]"
          >
            Chat Sekarang
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 text-[14px] text-[#666]">
            <span>⚡</span>

            <span>
              by{" "}
              <span className="font-bold text-[#24b35f]">
                Solveit
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* FLOATING BUTTON */}
        <button
        type="button"
        onClick={() => setOpen(!open)}
        id="waBtn"
        className="
            fixed bottom-6 right-6 z-50
            rounded-full bg-[#25D366]
            p-4
            shadow-[0_14px_35px_rgba(37,211,102,0.35)]
            transition duration-300
            hover:scale-110
            hover:bg-[#1fc15b]
        "
        >
            <img
            src="https://img.icons8.com/ios-filled/30/ffffff/whatsapp.png"
            alt="WhatsApp Icon"
            className="h-[30px] w-[30px] object-contain"
            />
        </button>
    </>
  );
}