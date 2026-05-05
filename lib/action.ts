"use server";
import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Sign In Credentials Action
export const signInCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = SignInSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/redirect"
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Invalid Credentials." };
                default:
                    return { message: "Something went wrong." };
            }
        }
        throw error;
    }
};

// Sign Up Credentials Action
export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = RegisterSchema.safeParse(
        Object.fromEntries(formData.entries())
    );
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    let { name, email, password, ConfirmPassword } =
        validatedFields.data as {
            name: string;
            email: string;
            password: string;
            ConfirmPassword: string;
        };

    email = email.toLowerCase().trim();
    name = name.trim();
    if (password !== ConfirmPassword) {
        return {
            error: {
                ConfirmPassword: ["Passwords do not match"],
            },
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });
    if (existingUser) {
        return { message: "Email already registered." };
    }

    const hashedPassword = hashSync(password, 10);
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER",
            },
        });

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/redirect",
        });

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        if (error.code === "P2002") {
            return { message: "Email already registered." };
        }

        console.error("REGISTER ERROR:", error);
        return { message: "Failed to register user" };
    }
};