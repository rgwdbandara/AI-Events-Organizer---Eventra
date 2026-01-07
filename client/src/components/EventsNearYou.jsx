import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export default function EventsNearYou() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(API_URL);
        setEvents(res.data.slice(0, 4)); // show only 4 cards
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading events...</p>;
  }

  return (
    <div className="mt-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Events Near You
        </h2>

        <Link
          to="/explore"
          className="text-sm text-gray-400 hover:text-white"
        >
          View All →
        </Link>
      </div>

      {/* EVENT CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="overflow-hidden transition bg-[#111827] border border-gray-800 rounded-xl hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="h-40 overflow-hidden bg-gray-700">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <span className="inline-block px-2 py-1 mb-2 text-xs text-blue-400 rounded bg-blue-400/10">
                {event.category}
              </span>

              <h3 className="text-lg font-semibold">
                {event.title}
              </h3>

              <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                {event.description}
              </p>

              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>

              <Link
                to={`/events/${event._id}`}
                className="inline-block mt-4 text-sm font-medium text-blue-400 hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
