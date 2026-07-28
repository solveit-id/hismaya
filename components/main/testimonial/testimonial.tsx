"use client";

import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";

type TestimonialItem = {
  name: string;
  role: string;
  avatar: string;
};

export default function Testimonials() {
  const t = useTranslations("main.testimonial");

  const testimonials = t.raw("testimonials") as TestimonialItem[];

  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#e9e9e9] px-6 py-[98px] text-[#252d3c] sm:px-10 lg:px-0">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-md bg-[#078fd3] px-5 py-2.5 text-sm font-bold leading-none text-white md:text-base">
            {t("badge")}
          </span>

          <h2 className="mt-4 text-[35px] font-extrabold leading-none tracking-normal text-[#252d3c] sm:text-[44px]">
            {t("title.first")}{" "}
            <span className="text-[#078fd3]">
              {t("title.highlight")}
            </span>{" "}
            {t("title.last")}
          </h2>
        </div>

        <div className="mt-[78px] -mx-6 overflow-hidden sm:-mx-10 lg:mx-0">
          <div className="testimonial-marquee flex w-max gap-[28px] pl-6 sm:pl-10 lg:pl-0">
            {marqueeTestimonials.map((testimonial, itemIndex) => (
              <article
                key={`${testimonial.name}-${itemIndex}`}
                className="h-[264px] w-[344px] shrink-0 bg-white px-[26px] pb-8 pt-[30px] shadow-[0_9px_14px_rgba(0,0,0,0.08)] transition duration-300 [border-radius:46px_0_46px_0] hover:-translate-y-2 hover:shadow-[0_16px_26px_rgba(0,0,0,0.12)] sm:w-[352px]"
              >
                <div className="flex gap-1.5 text-[#ff7a1a]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} className="h-[18px] w-[18px]" />
                  ))}
                </div>

                <p className="mt-[22px] max-w-[276px] text-[15px] font-medium leading-[1.46] text-[#66708b]">
                  &quot;{t("description")}&quot;
                </p>

                <div className="mt-[26px] flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-[38px] w-[38px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-[13px] font-extrabold leading-none text-[#252d3c]">
                      {testimonial.name}
                    </h3>

                    <p className="mt-2 text-[13px] font-medium leading-none text-[#66708b]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes testimonial-marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 14px));
            }
          }

          .testimonial-marquee {
            animation: testimonial-marquee 24s linear infinite;
          }

          .testimonial-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
}