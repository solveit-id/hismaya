"use server";

import { prisma } from "@/lib/prisma";
import { hashSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { normalizePhone } from "@/lib/normalize-phone";
import {
    CreateUserSchema,
    UpdateUserSchema,
} from "./schema";

// ======================
// GET USERS
// ======================
export const getUsers = async () => {
    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {
        return [];
    }

    return await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
        },
    });
};

// ======================
// CREATE USER
// ======================
export const createUser = async (
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {
        return {
            message: "Unauthorized",
        };
    }

    const validatedFields =
        CreateUserSchema.safeParse(
            Object.fromEntries(
                formData.entries()
            )
        );

    if (!validatedFields.success) {
        return {
            error:
                validatedFields.error.flatten()
                    .fieldErrors,
        };
    }

    const {
        name,
        email,
        phone,
        password,
        role,
    } = validatedFields.data;

    const sanitizedName =
        name.trim();

    const sanitizedEmail =
        email.toLowerCase().trim();

    const sanitizedPhone =
        normalizePhone(phone);

    const existingUser =
        await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email:
                            sanitizedEmail,
                    },
                    {
                        phone:
                            sanitizedPhone,
                    },
                ],
            },
        });

    if (existingUser) {
        return {
            message:
                "Email or phone already exists",
        };
    }

    const hashedPassword =
        hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                phone: sanitizedPhone,
                password: hashedPassword,
                role,
            },
        });
        revalidatePath("/admin/users");
        return {
            success: true,
            message:
                "User created successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "Failed to create user",
        };
    }
};

// ======================
// UPDATE USER
// ======================
export const updateUser = async (
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {
        return {
            message: "Unauthorized",
        };
    }

    const validatedFields =
        UpdateUserSchema.safeParse(
            Object.fromEntries(
                formData.entries()
            )
        );

    if (!validatedFields.success) {
        return {
            error:
                validatedFields.error.flatten()
                    .fieldErrors,
        };
    }

    const {
        id,
        name,
        email,
        phone,
        role,
    } = validatedFields.data;

    const sanitizedName =
        name.trim();

    const sanitizedEmail =
        email.toLowerCase().trim();

    const sanitizedPhone =
        normalizePhone(phone);

    const existingUser =
        await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email:
                            sanitizedEmail,
                    },
                    {
                        phone:
                            sanitizedPhone,
                    },
                ],
                NOT: {
                    id,
                },
            },
        });

    if (existingUser) {
        return {
            message:
                "Email or phone already exists",
        };
    }

    // ADMIN CANNOT DOWNGRADE SELF
    if (
        session.user.id === id &&
        role !== "ADMIN"
    ) {
        return {
            message:
                "You cannot change your own admin role",
        };
    }

    try {
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                phone: sanitizedPhone,
                role,
            },
        });
        revalidatePath("/admin/users");
        return {
            success: true,
            message:
                "User updated successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "Failed to update user",
        };
    }
};

// ======================
// DELETE USER
// ======================
export const deleteUser = async (
    id: string
) => {
    const session = await auth();

    if (
        !session?.user ||
        session.user.role !== "ADMIN"
    ) {
        return {
            message: "Unauthorized",
        };
    }

    // ADMIN CANNOT DELETE SELF
    if (session.user.id === id) {
        return {
            message:
                "You cannot delete your own account",
        };
    }

    try {
        await prisma.user.delete({
            where: { id },
        });
        revalidatePath("/admin/users");
        return {
            success: true,
            message:
                "User deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "Failed to delete user",
        };
    }
};