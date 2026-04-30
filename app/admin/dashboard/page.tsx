import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let session;

  try {
    session = await auth();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return <div>Error loading session</div>;
  }

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/user/dashboard");
  }

  const totalUsers = await prisma.user.count();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Total Users: {totalUsers}</p>
    </div>
  );
}