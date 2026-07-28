import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl =
  createNextIntlPlugin(
    "./lib/i18n/request.ts"
  )

const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "lh3.googleusercontent.com",
      },

      {
        protocol: "https",
        hostname:
          "public.blob.vercel-storage.com",
      },
    ],
  },
}

export default withNextIntl(
  nextConfig
)