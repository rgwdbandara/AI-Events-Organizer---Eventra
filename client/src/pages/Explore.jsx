import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}?search=${search}&category=${category}`
      );
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  return (
    <div className="flex min-h-screen bg-[#0b1120] text-white">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-72 p-6 bg-[#0f172a] border-r border-gray-800">
        <h2 className="mb-6 text-xl font-bold">Explore</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
          <option value="Business">Business</option>
          <option value="Workshop">Workshop</option>
        </select>

        <p className="mt-6 text-sm text-gray-400">
          Discover events curated for you 🚀
        </p>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">
        <h1 className="mb-6 text-3xl font-bold">Discover Events</h1>

        {loading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400">No events found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="text-gray-900 transition bg-white shadow-md rounded-xl hover:-translate-y-1"
              >
                <div className="p-4">
                  <span className="inline-block px-2 py-1 mb-2 text-xs text-blue-600 bg-blue-100 rounded">
                    {event.category}
                  </span>

                  <h3 className="text-lg font-semibold">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}