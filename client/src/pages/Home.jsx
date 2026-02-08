import { Link } from "react-router-dom";
import DiscoverCarousel from "../components/DiscoverCarousel";
import EventsNearYou from "../components/EventsNearYou";
import CategoryGrid from "../components/CategoryGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white pt-20">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center bg-[#0b1120]">
        <div className="grid items-center grid-cols-1 gap-12 px-10 mx-auto max-w-7xl lg:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">
              Discover & <br />
              create amazing{" "}
              <span className="text-blue-400">events</span>.
            </h1>

            <p className="max-w-xl mt-6 text-lg text-gray-300">
              Whether you're hosting or attending, Eventra makes every
              event memorable. Join our community today.
            </p>

            <Link
              to="/explore"
              className="inline-block px-8 py-3 mt-8 text-sm font-semibold text-black transition bg-white rounded-full hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl"></div>
              <img
                src="/hero.png"
                alt="Event App Preview"
                className="w-[360px] lg:w-[420px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= DISCOVER EVENTS ================= */}
      <section className="px-10 mt-20">
        <h2 className="mb-6 text-3xl font-bold">
          Discover Events
        </h2>

        <p className="mb-8 text-gray-400">
          Explore featured events happening around you
        </p>

        {/* 🔥 AUTO ROTATING EVENT (click → /events/:id handled inside component) */}
        <DiscoverCarousel />
      </section>

      {/* ================= EVENTS NEAR YOU ================= */}
      <EventsNearYou />

      {/* ================= CATEGORY GRID ================= */}
      <CategoryGrid />

      {/* ================= CTA ================= */}
      <section className="px-10 py-24 mt-24 text-center bg-[#0f172a]">
        <h2 className="text-4xl font-bold">
          Ready to host your own event?
        </h2>

        <p className="mt-4 text-gray-400">
          Create and manage events easily with Eventra
        </p>

        <Link
          to="/create-event"
          className="inline-block px-8 py-4 mt-8 font-semibold text-black bg-green-400 rounded-full hover:bg-green-500"
        >
          Create Event
        </Link>
      </section>
    </div>
  );
}
