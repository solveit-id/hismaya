export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const roleAccessMap: Record<Role, string[]> = {
  admin: ["/admin"],
  user: ["/user"],
};