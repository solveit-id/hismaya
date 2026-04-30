import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Admin Panel</h2>

          <ul className="space-y-2">
            <li>Dashboard</li>
            <li>Products</li>
            <li>Users</li>
          </ul>
        </div>

        {/* Logout Button */}
        {session && (
          <form
            action={async () => {
              "use server";

              await signOut({
                redirect: false,
              });

              redirect("/");
            }}
          >
            <button
              type="submit"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign Out
            </button>
          </form>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;