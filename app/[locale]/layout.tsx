import type { Metadata } from "next";
import "../globals.css";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";

import {
  locales,
} from "@/lib/i18n/config";

import AuthSessionProvider from "@/components/shared/provider/session-provider";
import IdleSessionManager from "@/components/auth/session/idle-session-manager";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hismaya Cahaya Rahayu",
  description: "Hismaya Platform",
  icons: {
    icon: "/logo-hismaya.png",
    shortcut: "/logo-hismaya.png",
    apple: "/logo-hismaya.png",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  // PENTING: memberitahu next-intl locale aktif
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <AuthSessionProvider>
            <IdleSessionManager />
            {children}

            <Toaster
              position="top-right"
              richColors
              closeButton
            />
          </AuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}