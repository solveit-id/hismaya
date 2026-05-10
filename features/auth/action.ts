"use server";

import { RegisterSchema, SignInSchema } from "./schema";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { normalizePhone } from "@/lib/normalize-phone";
import { defaultLocale } from "@/lib/i18n/config";

// ======================
// SIGN IN
// ======================
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields =
    SignInSchema.safeParse(
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
    login,
    password,
  } = validatedFields.data;

  const sanitizedLogin =
    login.includes("@")
      ? login.toLowerCase().trim()
      : normalizePhone(login);

  // ======================
  // FIND USER FIRST
  // ======================
  const user =
    await prisma.user.findFirst({
      where: {
        OR: [
          {
            email:
              sanitizedLogin,
          },
          {
            phone:
              sanitizedLogin,
          },
        ],
      },

      select: {
        role: true,
      },
    });

  try {
    // ======================
    // LOGIN
    // ======================
    await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    // ======================
    // ROLE REDIRECT
    // ======================
    if (user?.role === "ADMIN") {
      return {
        success: true,
        redirectTo:
          `/${defaultLocale}/admin/dashboard`,
      };
    }

    return {
      success: true,
      redirectTo:
        `/${defaultLocale}/user/dashboard`,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error.type ===
        "CredentialsSignin"
      ) {
        return {
          message:
            "Invalid credentials",
        };
      }

      return {
        message:
          "Something went wrong",
      };
    }

    throw error;
  }
};

// ======================
// SIGN UP
// ======================
export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields =
    RegisterSchema.safeParse(
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

  let {
    name,
    email,
    phone,
    password,
    ConfirmPassword,
  } = validatedFields.data;

  email = email.toLowerCase().trim();

  name = name.trim();

  phone = normalizePhone(phone);

  // ======================
  // PASSWORD CHECK
  // ======================
  if (
    password !== ConfirmPassword
  ) {
    return {
      error: {
        ConfirmPassword: [
          "Passwords do not match",
        ],
      },
    };
  }

  // ======================
  // CHECK EXISTING USER
  // ======================
  const existingUser =
    await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },

      select: {
        id: true,
      },
    });

  if (existingUser) {
    return {
      message:
        "Email or phone already registered",
    };
  }

  // ======================
  // HASH PASSWORD
  // ======================
  const hashedPassword =
    hashSync(password, 10);

  try {
    // ======================
    // CREATE USER
    // ======================
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
    });

    // ======================
    // AUTO LOGIN
    // ======================
    await signIn("credentials", {
      login: email,
      password,
      redirect: false,
    });

    // ======================
    // REDIRECT
    // ======================
    return {
      success: true,
      redirectTo:
        `/${defaultLocale}/user/dashboard`,
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        message:
          "Email or phone already registered",
      };
    }

    return {
      message:
        "Failed to register user",
    };
  }
};