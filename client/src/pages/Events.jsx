import { useEffect, useState } from "react";
import api from "../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);

 useEffect(() => {
  api.get("/events")
    .then(res => {
      console.log("EVENTS FROM API 👉", res.data);
      setEvents(res.data);
    })
    .catch(err => console.error(err));
}, []);


  console.log("EVENTS FROM API 👉", events);


  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="mb-8 text-4xl font-bold">Upcoming Events</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {events.map(event => (
          <div
            key={event._id}
            className="p-5 transition bg-gray-800 rounded-lg shadow-lg hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-green-400">
              {event.title}
            </h2>

            <p className="mt-2 text-gray-300">
              {event.description}
            </p>

            <div className="mt-4 text-sm text-gray-400">
              📅 {event.date} <br />
              ⏰ {event.time} <br />
              📍 {event.location}
            </div>

            <p className="mt-3 text-sm">
              Category:{" "}
              <span className="font-medium text-blue-400">
                {event.category}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
