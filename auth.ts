import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@/lib/zod";
import { compare } from "bcrypt-ts";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),

        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse(credentials);
                if (!validatedFields.success) return null;

                const { email, password } = validatedFields.data;

                const user = await prisma.user.findUnique({
                where: { email },
                });

                if (!user || !user.password) return null;

                const passwordMatch = await compare(password, user.password);
                if (!passwordMatch) return null;

                return user;
            },
        }),
    ],

    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (url.startsWith(baseUrl)) return url;
            return baseUrl;
        },

        async signIn() {
            return true;
        },

        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role?.toLowerCase().trim() ?? "user";
            }
            return token;
        },

        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = (token.role as string) ?? "user";
            return session;
        },
    },
});