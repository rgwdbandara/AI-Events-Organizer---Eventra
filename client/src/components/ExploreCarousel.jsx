import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function ExploreCarousel({ currentEventId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      // remove current event from list
      const filtered = res.data.filter(
        (e) => e._id !== currentEventId
      );
      setEvents(filtered);
    });
  }, [currentEventId]);

  if (events.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-3xl font-bold text-white">
        Explore More Events
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {events.map((event) => (
          <Link
            key={event._id}
            to={`/events/${event._id}`}
            className="min-w-[280px] bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition"
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-400">
                {event.title}
              </h3>

              <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                {event.description}
              </p>

              <div className="mt-3 text-xs text-gray-400 space-y-1">
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
