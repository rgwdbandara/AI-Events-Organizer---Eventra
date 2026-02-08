import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <p className="text-xl">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-8 text-4xl font-bold">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-400">No events available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="block"
            >
              <div className="p-5 transition bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:scale-105">
                <h2 className="text-xl font-semibold text-green-400">
                  {event.title}
                </h2>

                <p className="mt-2 text-gray-300 line-clamp-3">
                  {event.description}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  👤 Event by{" "}
                  <span className="font-medium text-gray-200">
                    {event.organizer?.name || "Unknown"}
                  </span>
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-400">
                  <p>📅 {event.date}</p>
                  <p>⏰ {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>

                <p className="mt-3 text-sm">
                  Category:{" "}
                  <span className="font-medium text-blue-400">
                    {event.category}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}