export type UserProfileDTO = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  image: string | null;
  role: "ADMIN" | "USER";
};