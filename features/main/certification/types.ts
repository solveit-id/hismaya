export type CertificationDTO = {
  id: string;

  slug: string;

  name: Record<string, string>;

  desc: Record<string, string>;

  sector: Record<string, string>;

  duration: Record<string, string>;

  img: string | null;

  price: number;

  status: "ACTIVE" | "INACTIVE";

  category: {
    id: string;
    name: Record<string, string>;
  };
};