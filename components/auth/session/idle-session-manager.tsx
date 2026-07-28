"use client"

import { useEffect, useState } from "react"

import { signOut, useSession } from "next-auth/react"

import { useRouter } from "next/navigation"

import { useIdleTimer } from "react-idle-timer"

import { useLocale, useTranslations } from "next-intl"

export default function IdleSessionManager() {
  const router = useRouter()

  const locale = useLocale()

  const t = useTranslations(
    "common.idleSession"
  )

  const { data: session } = useSession()

  const [showWarning, setShowWarning] =
    useState(false)

  const [remaining, setRemaining] =
    useState(0)

  // =========================
  // ROLE BASED TIMEOUT
  // =========================
  const isAdmin =
    session?.user?.role === "ADMIN"

  // ADMIN = 10 MINUTES
  // USER = 15 MINUTES
  const timeout = isAdmin
    ? 1000 * 60 * 10
    : 1000 * 60 * 15

  // SHOW WARNING 1 MINUTE BEFORE
  const promptBeforeIdle =
    1000 * 60

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    await signOut({
      redirect: false,
    })

    router.push(`/${locale}/login`)
  }

  // =========================
  // IDLE TIMER
  // =========================
  const {
    getRemainingTime,
    reset,
  } = useIdleTimer({
    timeout,

    promptBeforeIdle,

    onPrompt: () => {
      setShowWarning(true)
    },

    onIdle: async () => {
      setShowWarning(false)

      await handleLogout()
    },

    onActive: () => {
      setShowWarning(false)
    },

    debounce: 500,
  })

  // =========================
  // COUNTDOWN
  // =========================
  useEffect(() => {
    const interval =
      setInterval(() => {
        setRemaining(
          Math.ceil(
            getRemainingTime() /
              1000
          )
        )
      }, 1000)

    return () =>
      clearInterval(interval)
  }, [getRemainingTime])

  if (!showWarning) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {t("title")}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {t("description", {
            seconds: remaining,
            descriptionText: t("descriptionText", {
              remaining,
            }),
          })}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            {t("logout")}
          </button>

          <button
            onClick={() => {
              reset()

              setShowWarning(false)
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {t("stay")}
          </button>
        </div>
      </div>
    </div>
  )
}