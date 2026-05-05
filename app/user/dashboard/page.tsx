import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function UserDashboardPage() {
  const session = await auth();

  // 🔒 proteksi
  if (!session?.user) redirect("/login");
  if (session.user.role !== "user") redirect("/admin/dashboard");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* 🔍 Session Debug */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-2">Session Info</h2>
        <p><b>ID:</b> {session.user.id}</p>
        <p><b>Email:</b> {session.user.email}</p>
        <p><b>Role:</b> {session.user.role}</p>
      </div>
    </div>
  );
}