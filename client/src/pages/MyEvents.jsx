import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_URL}/my-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(res.data);
      } catch (error) {
        console.error("Failed to load my events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-900">
        Loading your events...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-6 text-4xl font-bold">My Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-400">
          You haven’t created any events yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-5 bg-gray-800 rounded-lg shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold text-blue-400">
                {event.title}
              </h2>

              <p className="mb-4 text-gray-300 line-clamp-3">
                {event.description}
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/events/${event._id}`}
                  className="px-3 py-1 text-sm bg-gray-600 rounded hover:bg-gray-700"
                >
                  View
                </Link>

                <Link
                  to={`/events/${event._id}/edit`}
                  className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
