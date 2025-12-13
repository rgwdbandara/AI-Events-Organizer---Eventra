import { useEffect, useState } from "react";
import api from "../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Upcoming Events</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {events.map(event => (
          <div
            key={event._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>

            <div className="mt-3 text-sm text-gray-500">
              📅 {event.date} <br />
              📍 {event.location}
            </div>

            <p className="mt-2 text-sm">
              Category: <span className="font-medium">{event.category}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
