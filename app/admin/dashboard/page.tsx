import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  FiUsers,
  FiActivity,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiLayers,
  FiClock,
  FiZap,
  FiServer,
  FiUserCheck
} from "react-icons/fi"

export default async function AdminDashboardPage() {
  let session

  try {
    session = await auth()
  } catch (error) {
    console.error("AUTH ERROR:", error)
    return <div>Error loading session</div>
  }

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    redirect("/user/dashboard")
  }

  const totalUsers = await prisma.user.count()
  // ===== MOCK DATA (simulate backend) =====
const visitsData = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 10 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 16 },
  { day: "Sat", value: 28 },
  { day: "Sun", value: 20 },
]

const topSections = [
  { name: "Hero Section", hits: 29 },
  { name: "About Section", hits: 17 },
  { name: "Contact Section", hits: 12 },
]

const activities = [
  { text: "User John registered", time: "2m ago" },
  { text: "New testimonial added", time: "10m ago" },
  { text: "Admin updated category", time: "1h ago" },
]

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening in your system today
        </p>
      </div>

      {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">
                {totalUsers}
              </h2>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <FiUsers size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Active Sessions</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-1">
                120
              </h2>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <FiActivity size={20} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-[20px] shadow hover:shadow-md transition flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <h2 className="text-3xl font-bold text-green-600 mt-1">
                Rp 12.5M
              </h2>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>

        </div>
          {/* ===================== VISIT ANALYTICS ===================== */}
       <div className="bg-white p-6 rounded-[20px] shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FiBarChart2 /> Visit Analytics
            </h3>
            <span className="text-xs text-green-500 flex items-center gap-1">
              <FiTrendingUp /> +12%
            </span>
          </div>

          <div className="flex items-end gap-2 h-40">
            {visitsData.map((item, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-400 rounded-md hover:bg-blue-500 transition"
                  style={{ height: `${item.value * 2}px` }}
                />
                <span className="text-xs text-gray-400 mt-1">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <div className="bg-white p-5 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FiUserCheck size={18} />
            </span>
            Recent Users
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex justify-between items-center">
              <span>John Doe</span>
              <span className="text-green-500 text-xs font-medium">
                Active
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>Jane Smith</span>
              <span className="text-gray-400 text-xs font-medium">
                Pending
              </span>
            </li>
          </ul>
        </div>

        {/* System Info */}
        <div className="bg-white p-5 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 p-2 rounded-lg">
              <FiServer size={18} />
            </span>
            System Info
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Server Status:{" "}
              <span className="text-green-500 font-medium">Online</span>
            </p>
            <p>Last Backup: 2 hours ago</p>
            <p>Version: v1.0</p>
          </div>
        </div>

        {/* ===================== TOP SECTIONS ===================== */}
        <div className="bg-white p-6 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiLayers /> Top Sections
          </h3>

          <div className="space-y-4 text-sm">
            {topSections.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-gray-600">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.hits}</span>
                </div>

                <div className="w-full bg-gray-100 h-2 rounded mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: `${item.hits * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ===================== RECENT ACTIVITY ===================== */}
       <div className="bg-white p-6 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiClock /> Recent Activity
          </h3>

          <ul className="space-y-4 text-sm text-gray-600">
            {activities.map((item, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{item.text}</span>
                <span className="text-xs text-gray-400">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===================== QUICK ACTION ===================== */}
        <div className="bg-white p-6 rounded-[20px] shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FiZap /> Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2">
              <FiUsers /> Add User
            </button>
            <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2">
              <FiLayers /> Add Product
            </button>
            <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-sm flex items-center justify-center gap-2">
              <FiActivity /> Add Testimonial
            </button>
            <button className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition text-sm flex items-center justify-center gap-2">
              <FiBarChart2 /> Reports
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}