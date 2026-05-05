

import { getUsers } from "@/lib/data"
import { FiTrash2 } from "react-icons/fi"
import Link from "next/link"


const UserTable = async () => {
  const users = await getUsers()

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-4 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">
            Manage your system users
          </p>
        </div>

        <Link 
        href="/admin/addUser"
        className="bg-blue-600 text-white px-4 py-2 rounded-[20px] text-sm font-medium hover:bg-blue-700 transition">
          + Add User
        </Link>
      </div>

      {!users?.length ? (
        <div className="text-center py-10 text-gray-500">
          No users found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600 text-left">
                <th className="py-3 px-6">No</th>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b transition hover:bg-gray-50
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                >
                  <td className="py-3 px-6">{index + 1}</td>

                  <td className="py-3 px-6 text-gray-400 text-xs">
                    {user.id}
                  </td>

                  <td className="py-3 px-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </td>

                  <td className="py-3 px-6 text-gray-600">
                    {user.email}
                  </td>

                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        user.role === "ADMIN"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-6">
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete user"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
    
  )
  
}

export default UserTable