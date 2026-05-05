import Sidebar from "@/components/layout/sidebar"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div className="h-[100dvh] flex bg-gray-100">

      {/* 🔹 Sidebar Wrapper */}
      <div className="flex flex-col justify-between">
        <Sidebar />

        {/* Logout (desktop) */}
        {session && (
          <form
            action={async () => {
              "use server"
              await signOut({ redirect: false })
              redirect("/")
            }}
            className="hidden md:block p-4 bg-[#008FCC]"
          >
            <button className="w-full bg-red-400 px-4 py-2 rounded-[20px] hover:bg-red-500 transition text-white">
              Sign Out
            </button>
          </form>
        )}
      </div>

      {/* 🔹 Content Area (INI YANG SCROLL) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

        {/* 🔸 Mobile Logout */}
        {session && (
          <div className="md:hidden mb-4">
            <form
              action={async () => {
                "use server"
                await signOut({ redirect: false })
                redirect("/")
              }}
            >
              <button className="w-full bg-red-400 px-4 py-2 rounded-xl hover:bg-red-500 transition text-white">
                Sign Out
              </button>
            </form>
          </div>
        )}

        {children}
      </main>

    </div>
  )
}