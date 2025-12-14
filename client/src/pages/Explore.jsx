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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Explore Events</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          className="p-3 bg-gray-800 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 bg-gray-800 rounded w-full md:w-1/4"
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
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="bg-gray-800 p-5 rounded-lg hover:scale-105 transition"
            >
              <h2 className="text-xl font-semibold text-blue-400">
                {event.title}
              </h2>

              <p className="text-gray-300 mt-2 line-clamp-3">
                {event.description}
              </p>

              <div className="mt-4 text-sm text-gray-400 space-y-1">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
                <p>🏷 {event.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="text-gray-400 mt-6">No events found.</p>
      )}
    </div>
  );
}
