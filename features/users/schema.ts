import { z } from "zod";
import { normalizePhone, isValidIndonesiaPhone } from "@/lib/normalize-phone";

const phoneRegex =
    /^(\+62|62|0)[0-9]{9,13}$/;

export const CreateUserSchema = z.object({
    name: z
        .string()
        .min(3, "Name minimum 3 characters"),

    email: z
        .string()
        .email("Invalid email"),

    phone: z
        .string()
        .refine(
            (value) =>
                isValidIndonesiaPhone(
                    normalizePhone(value)
                ),
            {
                message:
                    "Invalid Indonesian phone number",
            }
        ),

    password: z
        .string()
        .min(8, "Password minimum 8 characters"),

    role: z.enum(["ADMIN", "USER"]),
});

export const UpdateUserSchema = z.object({
    id: z.string(),

    name: z
        .string()
        .min(3, "Name minimum 3 characters"),

    email: z
        .string()
        .email("Invalid email"),

    phone: z
        .string()
        .refine(
            (value) =>
                isValidIndonesiaPhone(
                    normalizePhone(value)
                ),
            {
                message:
                    "Invalid Indonesian phone number",
            }
        ),

    role: z.enum(["ADMIN", "USER"]),
});