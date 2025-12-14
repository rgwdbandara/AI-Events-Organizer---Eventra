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
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-6 text-4xl font-bold">Explore Events</h1>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full p-3 bg-gray-800 rounded md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-full p-3 bg-gray-800 rounded md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
          <option value="Business">Business</option>
          <option value="Workshop">Workshop</option>
        </select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <p className="text-gray-400">Loading events...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="p-5 transition bg-gray-800 rounded-lg hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-blue-400">
                {event.title}
              </h2>

              <p className="mt-2 text-gray-300 line-clamp-3">
                {event.description}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-400">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
                <p>🏷 {event.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="mt-6 text-gray-400">No events found.</p>
      )}
    </div>
  );
}