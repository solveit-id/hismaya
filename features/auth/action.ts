"use server";

import { RegisterSchema, SignInSchema } from "./schema";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { normalizePhone } from "@/lib/normalize-phone";
import { defaultLocale } from "@/lib/i18n/config";

type AuthState = {
  success?: boolean;
  redirectTo?: string;
  toastType?: string;
  error?: any;
};

export const signInCredentials = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const validated = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.flatten().fieldErrors,
    };
  }

  const { login, password } = validated.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: login.toLowerCase() },
        { phone: normalizePhone(login) },
      ],
    },
    select: { role: true },
  });

  try {
    await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    return {
      success: true,
      toastType: "success",
      redirectTo:
        user?.role === "ADMIN"
          ? `/${defaultLocale}/admin/dashboard`
          : `/${defaultLocale}`,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        toastType: "invalid_credentials",
      };
    }

    return {
      success: false,
      toastType: "failed",
    };
  }
};

export const signUpCredentials = async (
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const validated = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.flatten().fieldErrors,
    };
  }

  let { name, email, phone, password, ConfirmPassword } =
    validated.data;

  email = email.toLowerCase().trim();
  phone = normalizePhone(phone);

  if (password !== ConfirmPassword) {
    return {
      success: false,
      toastType: "password_mismatch",
    };
  }

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });

  if (exists) {
    return { success: false, toastType: "already_exists" };
  }

  const hashed = hashSync(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashed,
      role: "USER",
    },
  });

  await signIn("credentials", {
    login: email,
    password,
    redirect: false,
  });

  return {
    success: true,
    toastType: "success",
    redirectTo: `/${defaultLocale}`,
  };
};