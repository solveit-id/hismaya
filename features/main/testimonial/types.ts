export type TestimonialDTO = {
  id: string;

  testimonial: Record<string, string>;

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };

  status: "VISIBLE" | "HIDDEN";
};