import { MultiLang } from "@/types/multilang";

export type AboutDTO = {
  id: string;

  part: MultiLang;

  desc: MultiLang;

  img: string | null;
};