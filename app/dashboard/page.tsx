import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="px-4 py-8 max-w-7xl mx-auto">
          <Link href="/dashboard/@modal" className="block p-4 border rounded-lg hover:bg-gray-100">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-500">Manage and view user information.</p>
          </Link>
    </main>
  )
}