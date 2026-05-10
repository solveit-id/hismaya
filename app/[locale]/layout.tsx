import type { Metadata } from "next"
import "../globals.css"

import {
  NextIntlClientProvider,
} from "next-intl"

import {
  getMessages,
} from "next-intl/server"

import AuthSessionProvider from "@/components/providers/session-provider"

import IdleSessionManager from "@/components/auth/idle-session-manager"

import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Hismaya",
  description: "Hismaya Platform",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode

  params: {
    locale: string
  }
}) {
  const messages =
    await getMessages({
      locale: params.locale,
    })

  return (
    <html lang={params.locale}>
      <body className="antialiased">

        <NextIntlClientProvider
          locale={params.locale}
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
  )
}