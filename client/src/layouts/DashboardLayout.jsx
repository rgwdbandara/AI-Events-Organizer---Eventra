import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-6 hidden md:block">
        <h2 className="text-xl font-bold text-blue-400 mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard/my-events">My Events</Link>
          <Link to="/create">Create Event</Link>
          <Link to="/dashboard/analytics">Analytics</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}