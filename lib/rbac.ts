export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const roleAccessMap: Record<Role, string[]> = {
  ADMIN: ["/admin"],
  USER: ["/"],
};