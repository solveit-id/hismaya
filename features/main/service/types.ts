import { MultiLang } from "@/types/multilang";

export type ServiceDTO = {
  id: string;

  part: MultiLang;

  desc: MultiLang;

  img: string | null;
};