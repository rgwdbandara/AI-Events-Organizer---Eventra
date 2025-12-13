import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white flex items-center">
      <div className="grid items-center max-w-6xl gap-10 px-6 mx-auto md:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="animate-fade-up animate-delay-1">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
            Discover & Create <br />
            <span className="text-blue-400">Amazing Events</span>
          </h1>

          <p className="mb-8 text-lg text-gray-300 animate-fade-up animate-delay-2">
            Eventra helps you discover, organize, and manage events effortlessly.
            From tech meetups to workshops — everything in one powerful platform.
          </p>

          <div className="flex gap-4 animate-fade-up animate-delay-3">
            <Link
              to="/events"
              className="px-6 py-3 font-semibold transition bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
            >
              Explore Events
            </Link>

            <Link
              to="/create"
              className="px-6 py-3 font-semibold transition border border-gray-500 rounded-lg hover:bg-white/10 hover:scale-105"
            >
              Create Event
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hidden md:block">
          <div className="relative overflow-visible isolate animate-fade-up animate-delay-200">

            {/* Glow effects */}
            <div className="absolute bg-blue-500 rounded-full -top-12 -left-12 w-72 h-72 blur-3xl opacity-30"></div>
            <div className="absolute bg-purple-500 rounded-full -bottom-12 -right-12 w-72 h-72 blur-3xl opacity-30"></div>

            {/* Event preview card */}
            <div className="relative p-8 border shadow-xl bg-white/10 backdrop-blur-lg border-white/10 rounded-2xl">
              <h3 className="mb-4 text-xl font-semibold">🔥 Upcoming Event</h3>
              <p className="mb-2 text-lg text-gray-200">AI & Tech Meetup</p>
              <p className="text-sm text-gray-400">📍 NSBM • 📅 Feb 10</p>

              <div className="w-16 h-1 mt-4 bg-blue-500 rounded"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
