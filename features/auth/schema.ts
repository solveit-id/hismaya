import { z } from "zod";
import { normalizePhone, isValidIndonesiaPhone } from "@/lib/normalize-phone";

export const SignInSchema = z.object({
    login: z
        .string()
        .min(3, "Email or phone is required"),

    password: z
        .string()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .min(1, "Name must be more than 1 character"),

        email: z
            .string()
            .email("Invalid Email"),

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
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),

        ConfirmPassword: z
            .string()
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
    })

    .refine((data) => data.password === data.ConfirmPassword, {
        message: "Password does not match",
        path: ["ConfirmPassword"],
    });