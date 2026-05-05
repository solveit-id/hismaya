import UserTable from "@/components/layout/user-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Users",
}

const UserPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-6">
      
      <div className="max-w-screen-xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all users in your system
          </p>
        </div>

        {/* Table */}
        <UserTable />

      </div>
    </div>
  )
}

export default UserPage