import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt-ts";
import { SignInSchema } from "@/features/auth/schema";
import { normalizePhone } from "@/lib/normalize-phone";

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({

    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",

        // 2 HOURS
        maxAge: 60 * 60 * 2,

        // REFRESH EVERY 15 MINUTES
        updateAge: 60 * 15,
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        // ======================
        // GOOGLE
        // ======================
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,

            allowDangerousEmailAccountLinking: true,
        }),

        // ======================
        // CREDENTIALS
        // ======================
        Credentials({
            credentials: {
                login: {},
                password: {},
            },

            authorize: async (credentials) => {
                const validatedFields =
                    SignInSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    return null;
                }

                const {
                    login,
                    password,
                } = validatedFields.data;

                const sanitizedLogin =
                    login.includes("@")
                        ? login.toLowerCase().trim()
                        : normalizePhone(login);

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
                    });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch =
                    await compare(
                        password,
                        user.password
                    );

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        // ======================
        // REDIRECT
        // ======================
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }

            if (url.startsWith(baseUrl)) {
                return url;
            }

            return baseUrl;
        },

        // ======================
        // JWT
        // ======================
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role ?? "USER";

                token.phone =
                    user.phone ?? null;
            }

            return token;
        },

        // ======================
        // SESSION
        // ======================
        async session({ session, token }) {
            session.user.id =
                token.id as string;

            session.user.role =
                token.role as string;

            session.user.phone =
                token.phone as string | null;

            return session;
        },
    },
});