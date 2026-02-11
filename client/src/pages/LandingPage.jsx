import { Link } from "react-router-dom";
import api from "../api/api";

export default function LandingPage() {
  return (
    <div className="text-white bg-[#020617]">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-[#020617] to-[#020617]">
        <div className="grid items-center gap-12 px-6 py-20 mx-auto max-w-7xl md:grid-cols-2">

          {/* LEFT */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Organize & Discover Events
              <span className="text-blue-400"> Smarter with AI</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400">
              Create, manage & attend events powered by AI,
              QR tickets and smart capacity control.
            </p>

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <Link
                to="/register"
                className="px-6 py-3 text-center text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Get Started Free
              </Link>

              <Link
                to="/explore"
                className="px-6 py-3 text-center text-white border border-gray-600 rounded hover:bg-gray-800"
              >
                Explore Events
              </Link>
            </div>
          </div>

          {/* RIGHT (Hidden on Mobile) */}
          <div className="hidden md:block">
            <img
              src="/hero-dashboard.png"
              alt="Dashboard Preview"
              className="w-full shadow-xl rounded-xl"
            />
          </div>

        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section className="py-20 bg-[#020617]">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            How Eventra Works
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-xl font-semibold text-blue-400">
                Create Event
              </h3>
              <p className="text-gray-400">
                Organizers create events with capacity, AI help and QR tickets.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-xl font-semibold text-blue-400">
                Discover & Register
              </h3>
              <p className="text-gray-400">
                Users explore events and instantly book tickets.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-xl font-semibold text-blue-400">
                QR Check-In
              </h3>
              <p className="text-gray-400">
                Scan QR codes at entry and track attendance in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FEATURES
      ========================== */}
      <section className="py-20 bg-[#020617]">
        <div className="max-w-6xl px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
            Powerful Features
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">🎟 QR Tickets</h3>
              <p className="text-gray-400">
                Secure QR-based tickets with instant verification.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">🪑 Capacity Control</h3>
              <p className="text-gray-400">
                Automatically stop registrations when seats are full.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">🤖 AI Assistance</h3>
              <p className="text-gray-400">
                AI helps generate event details & recommendations.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">📊 Organizer Dashboard</h3>
              <p className="text-gray-400">
                Track registrations, tickets and check-ins.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">🔐 Secure Auth</h3>
              <p className="text-gray-400">
                JWT authentication & protected routes.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">📱 Mobile Friendly</h3>
              <p className="text-gray-400">
                Fully responsive design for all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================== */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-1000">
        <div className="max-w-4xl px-6 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to build your next event?
          </h2>

          <p className="mb-8 text-gray-200">
            Join Eventra and experience the future of event management.
          </p>

          <Link
            to="/register"
            className="px-8 py-3 font-semibold text-blue-600 bg-white rounded hover:bg-gray-200"
          >
            Start Free Today
          </Link>
        </div>
      </section>

    </div>
  );
}