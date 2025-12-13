import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white flex items-center">
      <div className="grid items-center max-w-6xl gap-10 px-6 mx-auto md:grid-cols-2">

        {/* Left content */}
        <div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight">
            Discover & Create <br />
            <span className="text-blue-400">Amazing Events</span>
          </h1>

          <p className="mb-8 text-lg text-gray-300">
            Eventra helps you discover, organize, and manage events effortlessly.
            From tech meetups to workshops — everything in one place.
          </p>

          <div className="flex gap-4">
            <Link
              to="/events"
              className="px-6 py-3 font-semibold bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Explore Events
            </Link>

            <Link
              to="/create"
              className="px-6 py-3 font-semibold border border-gray-500 rounded-lg hover:bg-white/10"
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* Right visual */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute bg-blue-500 rounded-full -top-10 -left-10 w-72 h-72 blur-3xl opacity-30"></div>
            <div className="absolute bg-purple-500 rounded-full -bottom-10 -right-10 w-72 h-72 blur-3xl opacity-30"></div>

            <div className="relative p-8 border shadow-xl bg-white/10 backdrop-blur-lg border-white/10 rounded-2xl">
              <h3 className="mb-4 text-xl font-semibold">🔥 Upcoming Event</h3>
              <p className="mb-2 text-gray-300">AI & Tech Meetup</p>
              <p className="text-sm text-gray-400">📍 NSBM • 📅 Feb 10</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
