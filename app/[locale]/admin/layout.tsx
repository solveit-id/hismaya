import Sidebar from "@/components/admin/sidebar/sidebar"

import {
  auth,
  signOut,
} from "@/auth"

import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode

  params: {
    locale: string
  }
}) {

  const session =
    await auth();

  async function handleLogout() {

    "use server"

    await signOut({
      redirect: false,
    });

    redirect(
      `/${params.locale}`
    );
  }

  return (
    <div className="h-[100dvh] flex bg-gray-100">

      {/* Sidebar */}
      {session && (
        <Sidebar
          logoutAction={
            handleLogout
          }
        />
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

    </div>
  );
}